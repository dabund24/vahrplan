import type { Leg, Station, Stop, Location, StopOver, Journey } from "hafas-client";
import type {
	JourneyBlock,
	LegBlock,
	LocationBlock,
	ParsedLocation,
	ParsedTime,
	TransitData,
	WalkingBlock
} from "$lib/types";
import { dateDifferenceString } from "$lib/util";
import { transferToBlock } from "$lib/merge";

export function journeysToBlocks(journeys: (Journey | undefined)[]): JourneyBlock[] {
	const legs = journeys.map((journey) => journey?.legs).flat();
	const blocks: JourneyBlock[] = [];
	for (let i = 0; i < legs.length; i++) {
		const leg = legs[i];
		if (leg === undefined) {
			blocks.push({ type: "error" });
			continue;
		}
		const nextLeg = i < legs.length - 1 ? legs[i + 1] : undefined;
		const lastBlock = blocks.at(-1);
		if (leg.walking) {
			const nextDeparture = nextLeg !== undefined ? nextLeg.departure : leg.arrival;
			const thisBlock = walkToBlock(leg, nextDeparture);
			blocks.push(thisBlock);
			if (i === 0) {
				// journey starts with walk => location at beginning
				const locationBlock = locationToBlock(
					undefined,
					leg.departure,
					thisBlock.originLocation
				);
				blocks.splice(0, 0, locationBlock);
			} else if (nextLeg === undefined) {
				// journey ends with walk => location at end
				const locationBlock = locationToBlock(
					leg.arrival,
					undefined,
					thisBlock.destinationLocation
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
				thisBlock.line.product ?? ""
			);
			blocks.splice(-1, 0, transferBlock);
			lastBlock.succeededByTransferBlock = true;
			thisBlock.precededByTransferBlock = true;
		}
	}
	return blocks;
}

function legToBlock(leg: Leg): LegBlock {
	return {
		type: "leg",
		departureData: {
			location: parseStationStopLocation(leg.origin),
			attribute: leg.stopovers?.at(0)?.cancelled ? "cancelled" : undefined,
			time: parseSingleTime(leg.departure, leg.plannedDeparture, leg.departureDelay, false),
			platform: leg.departurePlatform ?? undefined,
			platformChanged: leg.departurePlatform !== leg.plannedDeparturePlatform
		},
		arrivalData: {
			location: parseStationStopLocation(leg.destination),
			attribute: leg.stopovers?.at(-1)?.cancelled ? "cancelled" : undefined,
			time: parseSingleTime(leg.arrival, leg.plannedArrival, leg.arrivalDelay, true),
			platform: leg.arrivalPlatform ?? undefined,
			platformChanged: leg.arrivalPlatform !== leg.plannedArrivalPlatform
		},
		duration: dateDifferenceString(leg.departure, leg.arrival),
		direction: leg.direction ?? "undefined",
		line: leg.line ?? { type: "line" },
		stopovers: leg.stopovers?.slice(1, -1).map(parseStopover) ?? [],
		polyline: {
			type: "LineString",
			coordinates: leg.polyline?.features.map((feature) => feature.geometry.coordinates) ?? []
		},
		precededByTransferBlock: false,
		succeededByTransferBlock: false
	};
}

function locationToBlock(
	arrivalTime: string | undefined,
	departureTime: string | undefined,
	location: ParsedLocation
): LocationBlock {
	return {
		type: "location",
		location,
		time: parseTimePair(arrivalTime, undefined, undefined, departureTime, undefined, undefined),
		hidden: false
	};
}

export function walkToBlock(walk: Leg, nextDeparture: string | undefined): WalkingBlock {
	return {
		type: "walk",
		originLocation: parseStationStopLocation(walk.origin),
		destinationLocation: parseStationStopLocation(walk.destination),
		transferTime: dateDifferenceString(walk.departure, nextDeparture),
		walkingTime: dateDifferenceString(walk.departure, walk.arrival),
		distance: walk.distance ?? 0
	};
}

export function parseSingleTime(
	time: Leg["departure"],
	timePlanned: Leg["plannedDeparture"],
	delay: Leg["departureDelay"],
	isArrival: boolean
): ParsedTime {
	const hasRealtime = delay !== null && delay !== undefined;
	const timeObject: ParsedTime["a"] = {
		time: (hasRealtime ? time : timePlanned) ?? "",
		delay: hasRealtime ? delay / 60 : undefined,
		color: hasRealtime ? (delay <= 300 ? "green" : "red") : undefined
	};
	if (isArrival) {
		return {
			a: timeObject
			/*b: hasRealtime
				? {
						time: timePlanned ?? ""
					}
				: undefined
				
			 */
		};
	} else {
		return {
			b: timeObject
		};
	}
}

export function parseTimePair(
	timeA: Leg["departure"],
	timePlannedA: Leg["plannedDeparture"],
	delayA: Leg["departureDelay"],
	timeB: Leg["departure"],
	timePlannedB: Leg["plannedDeparture"],
	delayB: Leg["departureDelay"]
): ParsedTime {
	const aHasRealtime = delayA !== null && delayA !== undefined;
	const bHasRealtime = delayB !== null && delayB !== undefined;
	return {
		a: {
			time: aHasRealtime || timePlannedA === undefined ? timeA ?? "" : timePlannedA,
			delay: aHasRealtime ? delayA / 60 : undefined,
			color: aHasRealtime ? (delayA <= 300 ? "green" : "red") : undefined
		},
		b: {
			time: bHasRealtime || timePlannedB === undefined ? timeB ?? "" : timePlannedB,
			delay: bHasRealtime ? delayB / 60 : undefined,
			color: bHasRealtime ? (delayB <= 300 ? "green" : "red") : undefined
		}
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
	return {
		location: parseStationStopLocation(stopover.stop),
		attribute: stopover.cancelled ? "cancelled" : undefined, // TODO additional
		time: parseTimePair(
			stopover.arrival,
			stopover.plannedArrival,
			stopover.arrivalDelay,
			stopover.departure,
			stopover.plannedDeparture,
			stopover.departureDelay
		),
		platform: stopover.arrivalPlatform ?? stopover.departurePlatform ?? undefined,
		platformChanged:
			(stopover.arrivalPlatform ?? stopover.departurePlatform) !==
			(stopover.plannedArrivalPlatform ?? stopover.plannedDeparturePlatform)
	};
}
