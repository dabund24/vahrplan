import { JourneyDataResponseParser } from "$lib/server/journey-data/JourneyDataResponseParser";
import type {
	JourneyBlock,
	LegBlock,
	LocationBlock,
	OnwardJourneyBlock,
	ParsedGeolocation,
	ParsedLocation,
	ParsedTime,
	Product,
	SubJourney,
	TransitAttribute,
	TransitData,
	TransitType,
	WalkingBlock,
} from "$lib/types";
import type {
	FptfDataService,
	FptfDataServiceConfig,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
import type { LineShapeParser } from "$lib/server/journey-data/line-shapes/LineShapeParser";
import type { TicketUrlParser } from "$lib/server/journey-data/TicketUrlParser";
import type { UnpackedVahrplanResult } from "$lib/VahrplanResult";
import { dateDifference, getFirstAndLastTime } from "$lib/util";
import type { Journey, Leg, Line, Location, Station, Stop, StopOver } from "hafas-client";
import { transferToBlock } from "$lib/merge";

type FptfResponseFormatterConfig<ProductT extends Product> = Pick<
	FptfDataServiceConfig<ProductT>,
	"productMapping" | "lineShapeParser" | "ticketUrlParser"
>;

type HafasTimeData = {
	time: Leg[TransitType];
	timePlanned: Leg[TransitType];
	delay: Leg[`${TransitType}Delay`];
};

export class FptfResponseParser<
	ProductT extends Product,
> extends JourneyDataResponseParser<ProductT> {
	private readonly lineShapeParser: LineShapeParser<Line>;
	private readonly ticketUrlParser?: TicketUrlParser;

	public constructor({
		lineShapeParser,
		ticketUrlParser,
		...config
	}: FptfResponseFormatterConfig<ProductT>) {
		super(config);
		this.lineShapeParser = lineShapeParser;
		this.ticketUrlParser = ticketUrlParser;
	}

	protected override readonly parseSubJourney = (journey: Journey): SubJourney => {
		const blocks = this.parseJourneyBlocks(journey);
		const { arrival, departure } = getFirstAndLastTime(blocks);
		const ticketData = this.parseTicketData(journey);
		const res = {
			refreshToken: journey.refreshToken ?? "",
			blocks,
			arrivalTime: arrival.arrival ?? { time: new Date(0).toISOString() },
			departureTime: departure.departure ?? { time: new Date(0).toISOString() },
		};
		if (this.ticketUrlParser !== undefined && ticketData !== undefined) {
			ticketData.url = this.ticketUrlParser.generateTicketUrl(res);
		}

		return {
			...res,
			ticketData,
		};
	};

	protected override readonly parseJourneyBlocks = (journey: Journey): JourneyBlock[] => {
		if (journey?.legs === undefined) {
			return [{ type: "error" }];
		}
		const legs = journey.legs;
		const blocks: JourneyBlock[] = [];
		for (let i = 0; i < legs.length; i++) {
			const leg = legs[i];
			if (leg === undefined) {
				blocks.push({ type: "unselected" });
				continue;
			}
			const nextLeg = i < legs.length - 1 ? legs[i + 1] : undefined;
			const lastBlock = blocks.at(-1);
			if (leg.walking) {
				if (leg.distance === null) {
					// this leg is a transfer and will be skipped for now, it is handled in the next loop iteration
					continue;
				}
				const nextDeparture =
					nextLeg !== undefined
						? (nextLeg.departure ?? nextLeg.plannedDeparture)
						: (leg.arrival ?? leg.plannedArrival);
				const thisBlock = leg.transfer
					? this.parseOnwardJourneyBlock(leg, nextDeparture)
					: this.parseWalkingBlock(leg, nextDeparture);
				blocks.push(thisBlock);
				if (i === 0) {
					// journey starts with walk => location at beginning
					const locationBlock = this.parseLocationBlock(
						leg.departure,
						thisBlock.originLocation,
						"departure",
					);
					blocks.splice(0, 0, locationBlock);
				} else if (nextLeg === undefined) {
					// journey ends with walk => location at end
					const locationBlock = this.parseLocationBlock(
						leg.arrival,
						thisBlock.destinationLocation,
						"arrival",
					);
					blocks.push(locationBlock);
				}
				continue;
			}
			const thisBlock = this.parseLegBlock(leg);
			blocks.push(thisBlock);
			if (lastBlock?.type === "leg") {
				// last two blocks are legs => no walk => transfer needs to be inserted
				const transferBlock = transferToBlock(
					lastBlock.arrivalData,
					lastBlock.product ?? "",
					thisBlock.departureData,
					thisBlock.product ?? "",
					false,
				);
				blocks.splice(-1, 0, transferBlock);
				lastBlock.succeededBy = "transfer";
				thisBlock.precededBy = "transfer";
			}
		}
		return blocks;
	};

	protected override readonly parseLegBlock = (leg: Leg): LegBlock => {
		const departurePlatform = leg.departurePlatform ?? undefined;
		const arrivalPlatform = leg.arrivalPlatform ?? undefined;
		const block: LegBlock = {
			type: "leg",
			tripId: leg.tripId ?? "",
			blockKey:
				`${leg.line?.operator?.name}${leg.line?.fahrtNr}${leg.line?.name}${leg.direction}`.replace(
					/\W/g,
					"_",
				), // make it usable as a css variable
			attribute: leg.cancelled ? "cancelled" : undefined,
			departureData: {
				location: this.parseStationStopLocation(leg.origin),
				attribute: this.parseTransitAttribute(leg.stopovers?.at(0)),
				time: this.parseSingleTime(
					{
						time: leg.departure,
						timePlanned: leg.plannedDeparture,
						delay: leg.departureDelay,
					},
					"departure",
				),
				platformData: this.parsePlatformData(
					departurePlatform,
					leg.plannedDeparturePlatform,
				),
			},
			arrivalData: {
				location: this.parseStationStopLocation(leg.destination),
				attribute: this.parseTransitAttribute(leg.stopovers?.at(-1)),
				time: this.parseSingleTime(
					{ time: leg.arrival, timePlanned: leg.plannedArrival, delay: leg.arrivalDelay },
					"arrival",
				),
				platformData: this.parsePlatformData(arrivalPlatform, leg.plannedArrivalPlatform),
			},
			duration:
				dateDifference(
					leg.departure ?? leg.plannedDeparture,
					leg.arrival ?? leg.plannedArrival,
				) ?? 0,
			direction: leg.direction ?? undefined,
			name: leg.line?.name ?? leg.line?.productName,
			productName: leg.line?.productName ?? leg.line?.name,
			product: this.parseProduct(leg.line?.product),
			lineShape: this.lineShapeParser.getLineShape(leg.line),
			operator: leg.line?.operator?.name,
			loadFactor: this.parseLoadFactor(leg.loadFactor),
			cycle: this.parseCycle(leg.cycle),
			tripNumber: leg.line?.fahrtNr,
			info: this.parseLegInfo(leg),
			currentLocation: this.parseLegCurrentLocation(leg),
			stopovers: leg.stopovers?.slice(1, -1).map(this.parseStopover) ?? [],
			polyline:
				leg.polyline?.features.map((feature) => [
					feature.geometry.coordinates[1],
					feature.geometry.coordinates[0],
				]) ?? [],
		};
		if (block.polyline.length === 0) {
			block.polyline = [block.departureData, ...block.stopovers, block.arrivalData].map(
				(stop) => [stop.location.position.lat, stop.location.position.lng],
			);
		}
		return block;
	};

	protected override readonly parseLegCurrentLocation = (
		leg: Leg,
	): ParsedGeolocation | undefined => {
		if (leg.currentLocation === undefined) {
			return undefined;
		}
		return {
			type: "currentLocation",
			name: `${leg.line?.name} → ${leg.direction}`,
			id: JSON.stringify({ type: "location" } as Location),
			position: {
				lat: leg.currentLocation.latitude ?? 0,
				lng: leg.currentLocation.longitude ?? 0,
			},
			asAt: new Date(),
		};
	};

	protected override readonly parseLocationBlock = (
		time: string | undefined,
		location: ParsedLocation,
		type: TransitType,
	): LocationBlock => ({
		type: "location",
		location,
		time: this.parseSingleTime({ time, timePlanned: time, delay: undefined }, type),
		hidden: false,
	});

	protected override readonly parseWalkingBlock = (
		walk: Leg,
		nextDeparture: string | undefined,
	): WalkingBlock => ({
		type: "walk",
		originLocation: this.parseStationStopLocation(walk.origin),
		destinationLocation: this.parseStationStopLocation(walk.destination),
		time: this.parseTimePair(
			{
				time: walk.departure,
				timePlanned: walk.plannedDeparture,
				delay: walk.departureDelay,
			},
			{
				time: walk.arrival,
				timePlanned: walk.plannedArrival,
				delay: walk.arrivalDelay,
			},
		),
		transferTime: dateDifference(walk.departure ?? walk.plannedDeparture, nextDeparture) ?? 0,
		travelTime: dateDifference(walk.departure, walk.arrival),
		distance: walk.distance ?? 0,
	});

	protected override readonly parseOnwardJourneyBlock = (
		leg: Leg,
		nextDeparture: string | undefined,
	): OnwardJourneyBlock => ({
		type: "onward-journey",
		originLocation: this.parseStationStopLocation(leg.origin),
		destinationLocation: this.parseStationStopLocation(leg.destination),
		time: this.parseTimePair(
			{ time: leg.departure, timePlanned: leg.plannedDeparture, delay: leg.departureDelay },
			{
				time: leg.arrival,
				timePlanned: leg.plannedArrival,
				delay: leg.arrivalDelay,
			},
		),
		transferTime: dateDifference(leg.departure ?? leg.plannedDeparture, nextDeparture) ?? 0,
		travelTime: dateDifference(leg.departure, leg.arrival),
		recommendedAction: undefined,
		distance: leg.distance ?? 0,
	});

	public override readonly parseStationStopLocation = (
		location: Station | Stop | Location | undefined,
	): ParsedLocation => {
		if (location === undefined) {
			return {
				name: "undefined",
				id: "",
				type: "station",
				position: {
					lat: 0,
					lng: 0,
				},
			};
		}
		if (location.type === "station" || location.type === "stop") {
			return {
				name: location.name ?? "undefined",
				id: location.id ?? JSON.stringify(location),
				type: "station",
				position: {
					lat: location.location?.latitude ?? 0,
					lng: location.location?.longitude ?? 0,
				},
			};
		} else if (location.poi) {
			return {
				name: location.name ?? "undefined",
				id: JSON.stringify(location),
				type: "poi",
				position: {
					lat: location.latitude ?? 0,
					lng: location.longitude ?? 0,
				},
			};
		} else {
			return {
				name: location.address ?? "undefined",
				id: JSON.stringify(location),
				type: "address",
				position: {
					lat: location.latitude ?? 0,
					lng: location.longitude ?? 0,
				},
			};
		}
	};

	protected override readonly parseStopover = (stopover: StopOver): TransitData => {
		const platform = stopover.arrivalPlatform ?? stopover.departurePlatform ?? undefined;
		const time = this.parseTimePair(
			{
				time: stopover.arrival,
				timePlanned: stopover.plannedArrival,
				delay: stopover.arrivalDelay,
			},
			{
				time: stopover.departure,
				timePlanned: stopover.plannedDeparture,
				delay: stopover.departureDelay,
			},
		);
		let attribute: TransitData["attribute"] = undefined;
		if (
			(time.arrival === null || time.arrival?.status === "cancelled") &&
			(time.departure === null || time.departure?.status === "cancelled")
		) {
			attribute = "cancelled";
		} else if (stopover.additional) {
			attribute = "additional";
		}
		return {
			location: this.parseStationStopLocation(stopover.stop),
			attribute,
			time,
			platformData: this.parsePlatformData(
				platform,
				stopover.plannedArrivalPlatform ?? stopover.plannedDeparturePlatform,
			),
		};
	};

	protected override readonly parseSingleTime = (
		{ time, timePlanned, delay }: HafasTimeData,
		type: TransitType,
	): ParsedTime => {
		if ((timePlanned ?? undefined) === undefined) {
			return { [type]: null };
		}
		const hasRealtime = delay !== null && delay !== undefined;

		let status: NonNullable<ParsedTime[TransitType]>["status"];
		if (time === null) {
			status = "cancelled";
		} else if (!hasRealtime) {
			status = undefined;
		} else {
			status = delay <= 300 ? "on-time" : "delayed";
		}

		return {
			[type]: {
				time: new Date((hasRealtime ? time : timePlanned) ?? ""),
				delay: hasRealtime ? delay / 60 : undefined,
				status,
			},
		};
	};

	protected override readonly parseTimePair = (
		arrivalTimeData: HafasTimeData,
		departureTimeData: HafasTimeData,
	): ParsedTime => ({
		...this.parseSingleTime(arrivalTimeData, "arrival"),
		...this.parseSingleTime(departureTimeData, "departure"),
	});

	protected override readonly parsePlatformData = (
		platform: Leg[`${TransitType}Platform`],
		plannedPlatform: Leg[`${TransitType}Platform`],
	): TransitData["platformData"] => {
		if (platform === undefined) {
			return null;
		}
		return {
			platform,
			platformChanged: platform !== plannedPlatform,
		};
	};

	protected override readonly parseTransitAttribute = (
		stopover: StopOver | undefined,
	): TransitAttribute => {
		if (stopover?.cancelled) {
			return "cancelled";
		}
		if (stopover?.additional) {
			return "additional";
		}
		return undefined;
	};

	protected override readonly parseLegInfo = (leg: Leg): LegBlock["info"] => {
		const info: LegBlock["info"] = {
			statuses: [],
			hints: [],
		};

		const remarks = leg.remarks?.concat() ?? [];
		remarks.push(...(leg.stopovers?.at(0)?.remarks ?? []));
		remarks.push(...(leg.stopovers?.at(-1)?.remarks ?? []));

		for (const remark of remarks ?? []) {
			if (remark.type === "hint") {
				info.hints.push(remark.text);
			} else if (remark.text !== undefined) {
				info.statuses.push(remark.text);
			}
		}

		return info;
	};

	protected override readonly parseLoadFactor = (
		loadFactor: string | undefined,
	): LegBlock["loadFactor"] => {
		switch (loadFactor) {
			case "low-to-medium":
				return "low";
			case "high":
				return "medium";
			case "very-high":
				return "high";
			case "exceptionally-high":
				return "very-high";
		}
		return undefined;
	};

	protected override readonly parseCycle = (cycle: Leg["cycle"]): LegBlock["cycle"] => {
		if (cycle === undefined) {
			return undefined;
		}
		const { min, max } = cycle;
		if (min === undefined || max === undefined) {
			return undefined;
		}
		return { min, max };
	};

	protected override readonly parseTicketData = (journey: Journey): SubJourney["ticketData"] => {
		return {
			hint: journey.price?.hint,
			currency: journey.price?.currency ?? "EUR",
			minPrice: journey.price?.amount,
		};
	};

	public override readonly parseResponse = {
		journeys: (
			unparsedJourneys: Awaited<ReturnType<FptfDataService<ProductT>["client"]["journeys"]>>,
		): UnpackedVahrplanResult<Awaited<ReturnType<FptfDataService<ProductT>["journeys"]>>> => ({
			journeys: unparsedJourneys.journeys?.map(this.parseSubJourney) ?? [],
			earlierRef: unparsedJourneys.earlierRef,
			laterRef: unparsedJourneys.laterRef,
		}),

		refresh: (
			unparsedJourney: Awaited<
				ReturnType<NonNullable<FptfDataService<ProductT>["client"]["refreshJourney"]>>
			>,
		): UnpackedVahrplanResult<Awaited<ReturnType<FptfDataService<ProductT>["refresh"]>>> =>
			this.parseSubJourney(unparsedJourney.journey),

		locations: (
			unparsedLocations: Awaited<
				ReturnType<FptfDataService<ProductT>["client"]["locations"]>
			>,
		): UnpackedVahrplanResult<Awaited<ReturnType<FptfDataService<ProductT>["locations"]>>> =>
			unparsedLocations.map(this.parseStationStopLocation),

		location: this.parseStationStopLocation,
	};
}
