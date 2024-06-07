import type { Leg, Station, Stop, Location, StopOver, Journey } from "hafas-client";
import type {
	JourneyBlock,
	LegBlock,
	LocationBlock,
	ParsedLocation,
	ParsedTime,
	TransitData,
	TransitType,
	WalkingBlock
} from "$lib/types";
import { dateDifference } from "$lib/util";
import { transferToBlock } from "$lib/merge";

export function journeyToBlocks(journey: Journey | undefined): JourneyBlock[] {
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
			const nextDeparture =
				nextLeg !== undefined
					? nextLeg.departure ?? nextLeg.plannedDeparture
					: leg.arrival ?? leg.plannedArrival;
			const thisBlock = walkToBlock(leg, nextDeparture);
			blocks.push(thisBlock);
			if (i === 0) {
				// journey starts with walk => location at beginning
				const locationBlock = locationToBlock(
					leg.departure,
					thisBlock.originLocation,
					"departure"
				);
				blocks.splice(0, 0, locationBlock);
			} else if (nextLeg === undefined) {
				// journey ends with walk => location at end
				const locationBlock = locationToBlock(
					leg.arrival,
					thisBlock.destinationLocation,
					"arrival"
				);
				blocks.push(locationBlock);
			}
			continue;
		}
		const thisBlock = legToBlock(leg);
		blocks.push(thisBlock);
		if (lastBlock?.type === "leg") {
			// last two blocks are legs => no walk => transfer needs to be inserted
			const transferBlock = transferToBlock(
				lastBlock.arrivalData,
				lastBlock.line.product ?? "",
				thisBlock.departureData,
				thisBlock.line.product ?? "",
				false
			);
			blocks.splice(-1, 0, transferBlock);
			lastBlock.succeededBy = "transfer";
			thisBlock.precededBy = "transfer";
		}
	}
	return blocks;
}

function legToBlock(leg: Leg): LegBlock {
	const departurePlatform = leg.departurePlatform ?? undefined;
	const arrivalPlatform = leg.arrivalPlatform ?? undefined;
	return {
		type: "leg",
		tripId: leg.tripId ?? "",
		blockKey:
			"" + leg.line?.operator?.name + leg.line?.fahrtNr + leg.line?.name + leg.direction,
		attribute: leg.cancelled ? "cancelled" : undefined,
		departureData: {
			location: parseStationStopLocation(leg.origin),
			attribute: leg.stopovers?.at(0)?.cancelled ? "cancelled" : undefined,
			time: parseSingleTime(
				{
					time: leg.departure,
					timePlanned: leg.plannedDeparture,
					delay: leg.departureDelay
				},
				"departure"
			),
			platformData:
				departurePlatform === undefined
					? null
					: {
							platform: departurePlatform,
							platformChanged: leg.departurePlatform !== leg.plannedDeparturePlatform
						}
		},
		arrivalData: {
			location: parseStationStopLocation(leg.destination),
			attribute: leg.stopovers?.at(-1)?.cancelled ? "cancelled" : undefined,
			time: parseSingleTime(
				{ time: leg.arrival, timePlanned: leg.plannedArrival, delay: leg.arrivalDelay },
				"arrival"
			),
			platformData:
				arrivalPlatform === undefined
					? null
					: {
							platform: arrivalPlatform,
							platformChanged: leg.arrivalPlatform !== leg.plannedArrivalPlatform
						}
		},
		duration:
			dateDifference(
				leg.departure ?? leg.plannedDeparture,
				leg.arrival ?? leg.plannedArrival
			) ?? 0,
		direction: leg.direction ?? "undefined",
		line: leg.line ?? { type: "line" },
		currentLocation:
			leg.currentLocation !== undefined
				? {
						type: "currentLocation",
						name: `${leg.line?.name} → ${leg.direction}`,
						requestParameter: { type: "location" },
						position: {
							lat: leg.currentLocation.latitude ?? 0,
							lng: leg.currentLocation.longitude ?? 0
						},
						asAt: new Date()
					}
				: undefined,
		stopovers: leg.stopovers?.slice(1, -1).map(parseStopover) ?? [],
		polyline:
			leg.polyline?.features.map((feature) => [
				feature.geometry.coordinates[1],
				feature.geometry.coordinates[0]
			]) ?? []
	};
}

function locationToBlock(
	time: string | undefined,
	location: ParsedLocation,
	type: TransitType
): LocationBlock {
	return {
		type: "location",
		location,
		time: parseSingleTime({ time, timePlanned: time, delay: undefined }, type),
		hidden: false
	};
}

export function walkToBlock(walk: Leg, nextDeparture: string | undefined): WalkingBlock {
	return {
		type: "walk",
		originLocation: parseStationStopLocation(walk.origin),
		destinationLocation: parseStationStopLocation(walk.destination),
		transferTime: dateDifference(walk.departure ?? walk.plannedDeparture, nextDeparture) ?? 0,
		walkingTime: dateDifference(walk.departure, walk.arrival),
		distance: walk.distance ?? 0
	};
}

type HafasTimeData = {
	time: Leg[TransitType];
	timePlanned: Leg[TransitType];
	delay: Leg[`${TransitType}Delay`];
};

export function parseSingleTime(
	{ time, timePlanned, delay }: HafasTimeData,
	type: TransitType
): ParsedTime {
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
			status
		}
	};
}

export function parseTimePair(
	arrivalTimeData: HafasTimeData,
	departureTimeData: HafasTimeData
): ParsedTime {
	return {
		...parseSingleTime(arrivalTimeData, "arrival"),
		...parseSingleTime(departureTimeData, "departure")
	};
}

export function parseStationStopLocation(
	location: Station | Stop | Location | undefined
): ParsedLocation {
	if (location === undefined) {
		return {
			name: "undefined",
			requestParameter: "",
			type: "station",
			position: {
				lat: 0,
				lng: 0
			}
		};
	}
	if (location.type === "station" || location.type === "stop") {
		return {
			name: location.name ?? "undefined",
			requestParameter: location.id ?? location,
			type: "station",
			position: {
				lat: location.location?.latitude ?? 0,
				lng: location.location?.longitude ?? 0
			}
		};
	} else if (location.poi) {
		return {
			name: location.name ?? "undefined",
			requestParameter: location,
			type: "poi",
			position: {
				lat: location.latitude ?? 0,
				lng: location.longitude ?? 0
			}
		};
	} else {
		return {
			name: location.address ?? "undefined",
			requestParameter: location,
			type: "address",
			position: {
				lat: location.latitude ?? 0,
				lng: location.longitude ?? 0
			}
		};
	}
}

export function parseStopover(stopover: StopOver): TransitData {
	const platform = stopover.arrivalPlatform ?? stopover.departurePlatform ?? undefined;
	const time = parseTimePair(
		{
			time: stopover.arrival,
			timePlanned: stopover.plannedArrival,
			delay: stopover.arrivalDelay
		},
		{
			time: stopover.departure,
			timePlanned: stopover.plannedDeparture,
			delay: stopover.departureDelay
		}
	);
	let attribute: TransitData["attribute"] = undefined;
	if (time.arrival?.status === "cancelled" && time.departure?.status === "cancelled") {
		attribute = "cancelled";
	} else if (stopover.additional) {
		attribute = "additional";
	}
	return {
		location: parseStationStopLocation(stopover.stop),
		attribute,
		time,
		platformData:
			platform === undefined
				? null
				: {
						platform: platform,
						platformChanged:
							(stopover.arrivalPlatform ?? stopover.departurePlatform) !==
							(stopover.plannedArrivalPlatform ?? stopover.plannedDeparturePlatform)
					}
	};
}
