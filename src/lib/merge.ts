import type {
	AdhesiveBlock,
	JourneyBlock,
	LocationBlock,
	ParsedLocation,
	ParsedTime,
	TransferBlock,
	TransitData,
	WalkingBlock
} from "$lib/types";
import { dateDifference, getRawLocationBlock, mergeTransitData } from "$lib/util";
import type { Product } from "./types";

/**
 * Figures out how to merge two journeys by returning a merging block
 * that can later be inserted between both journeys.
 *
 * If the preceding/succeeding block is a location block,
 * it also decides whether to hide them by setting their hidden attribute
 * @param precedingBlock the last block of the journey coming before the merging block.
 * This should either be a Defining Block or an unselected block
 * @param location the location where the merge happens
 * @param succeedingBlock the first block of the journey coming after the merging block
 * @returns the corresponding merging block based on these rules:
 * | preceding block      | succeeding block     | locations match | merging block |
 * | :--------------      | :---------------     | :-------------  | ------------- |
 * | `unselected`         | `unselected`         | 	               | `location`    |
 * | `unselected`         | `leg`                |                 | `undefined`   |
 * | `unselected`         | `location`           |                 | `undefined`   |
 * | `leg`                | `leg`                | [x]             | `transfer`    |
 * | `leg`                | `leg`                | [ ]             | `walk`        |
 * | `leg`                | `location` *[hide!]* | [x]             | `undefined`   |
 * | `leg`                | `location`           | [ ]             | `undefined`   |
 * | `location` *[hide!]* | `location` *[hide!]* |                 | `location`    |
 *
 * These rules are commutative!
 */
export function getMergingBlock(
	precedingBlock: JourneyBlock,
	location: ParsedLocation,
	succeedingBlock: JourneyBlock
): AdhesiveBlock {
	if (
		(precedingBlock.type !== "unselected" &&
			precedingBlock.type !== "leg" &&
			precedingBlock.type !== "location") ||
		(succeedingBlock.type !== "unselected" &&
			succeedingBlock?.type !== "leg" &&
			succeedingBlock?.type !== "location")
	) {
		// this should not happen at normal instances
		// since first and last blocks of journeys are expected to be of type DefiningBlock!
		throw new Error();
	} else if (precedingBlock.type === "unselected" && succeedingBlock.type === "unselected") {
		return getRawLocationBlock(location);
	} else if (precedingBlock.type === "unselected" || succeedingBlock.type === "unselected") {
		// either the previous or the next journey is unselected
		// => the selected one speaks for itself, so no merging block
		if (precedingBlock?.type === "location") {
			precedingBlock.hidden = false;
		} else if (succeedingBlock?.type === "location") {
			succeedingBlock.hidden = false;
		}
		if (precedingBlock?.type === "leg") {
			precedingBlock.succeededBy = undefined;
		} else if (succeedingBlock.type === "leg") {
			succeedingBlock.precededBy = undefined;
		}
		return undefined;
	} else if (precedingBlock.type === "leg" && succeedingBlock.type === "leg") {
		// either add transfer or walk between legs as merging block
		if (
			positionsAreEqual(
				precedingBlock.arrivalData.location.position,
				succeedingBlock.departureData.location.position
			)
		) {
			const isMergeWithStopover = precedingBlock.blockKey === succeedingBlock.blockKey;
			precedingBlock.succeededBy = isMergeWithStopover ? "stopover" : "transfer";
			succeedingBlock.precededBy = isMergeWithStopover ? "stopover" : "transfer";
			return transferToBlock(
				precedingBlock.arrivalData,
				precedingBlock.product ?? "",
				succeedingBlock.departureData,
				succeedingBlock.product ?? "",
				isMergeWithStopover
			);
		} else {
			precedingBlock.succeededBy = undefined;
			succeedingBlock.precededBy = undefined;
			return mergingWalkToBlock(
				precedingBlock.arrivalData.location,
				precedingBlock.arrivalData.time,
				succeedingBlock.departureData.location,
				succeedingBlock.departureData.time
			);
		}
	} else if (precedingBlock.type === "leg" && succeedingBlock.type === "location") {
		// if leg destination and location are identical, hide location,
		// else add merging walk
		if (
			positionsAreEqual(
				precedingBlock.arrivalData.location.position,
				succeedingBlock.location.position
			)
		) {
			precedingBlock.succeededBy = undefined;
			succeedingBlock.hidden = true;
			return undefined;
		} else {
			precedingBlock.succeededBy = undefined;
			succeedingBlock.hidden = false;
			return mergingWalkToBlock(
				precedingBlock.arrivalData.location,
				precedingBlock.arrivalData.time,
				succeedingBlock.location,
				succeedingBlock.time
			);
		}
	} else if (precedingBlock.type === "location" && succeedingBlock.type === "leg") {
		// same as previous case, but other way round
		if (
			positionsAreEqual(
				precedingBlock.location.position,
				succeedingBlock.departureData.location.position
			)
		) {
			precedingBlock.hidden = true;
			succeedingBlock.precededBy = undefined;
		} else {
			precedingBlock.hidden = false;
			succeedingBlock.precededBy = undefined;
			return mergingWalkToBlock(
				precedingBlock.location,
				precedingBlock.time,
				succeedingBlock.departureData.location,
				succeedingBlock.departureData.time
			);
		}
	} else if (precedingBlock.type === "location" && succeedingBlock.type === "location") {
		// hide both locations and add merged location
		precedingBlock.hidden = true;
		succeedingBlock.hidden = true;
		return mergeLocationBlocks(precedingBlock, succeedingBlock);
	}
}

export function mergeLocationBlocks(
	arrivalBlock: LocationBlock,
	departureBlock: LocationBlock
): LocationBlock {
	return {
		type: "location",
		time: {
			arrival: arrivalBlock.time.arrival,
			departure: departureBlock.time.departure
		},
		location: arrivalBlock.location,
		hidden: false
	};
}

function mergingWalkToBlock(
	departureLocation: ParsedLocation,
	departureTime: ParsedTime,
	arrivalLocation: ParsedLocation,
	arrivalTime: ParsedTime
): WalkingBlock {
	return {
		type: "walk",
		originLocation: departureLocation,
		destinationLocation: arrivalLocation,
		time: { departure: departureTime.arrival, arrival: arrivalTime.departure },
		distance: 0,
		travelTime: undefined,
		transferTime: dateDifference(departureTime.arrival?.time, arrivalTime.departure?.time) ?? 0
	};
}

export function transferToBlock(
	arrivalData: TransitData,
	arrivalProduct: Product,
	departureData: TransitData,
	departureProduct: Product,
	isStopover: boolean
): TransferBlock {
	return {
		type: "transfer",
		transferTime:
			dateDifference(arrivalData.time.arrival?.time, departureData.time.departure?.time) ?? 0,
		transitData: mergeTransitData(arrivalData, departureData, isStopover),
		arrivalProduct,
		departureProduct,
		isStopover
	};
}

function positionsAreEqual(
	positionA: ParsedLocation["position"],
	positionB: ParsedLocation["position"]
): boolean {
	return positionA.lat === positionB.lat && positionA.lng === positionB.lng;
}
