import type {
	JourneyBlock,
	LocationBlock,
	ParsedLocation,
	ParsedTime,
	TransferBlock,
	TransitData,
	WalkingBlock
} from "$lib/types";
import { dateDifferenceString, getRawLocationBlock, mergeTransitData } from "$lib/util";

/**
 * figures out how to merge two journeys by returning a merging block
 * that can later be inserted between both journeys
 * @param precedingBlock - the last block of the journey coming before the merging block
 * @param location - the location where the merge happens
 * @param succeedingBlock - the first block of the journey coming after the merging block
 */
export function getMergingBlock(
	precedingBlock: JourneyBlock,
	location: ParsedLocation,
	succeedingBlock: JourneyBlock
): LocationBlock | WalkingBlock | TransferBlock | undefined {
	if (
		(precedingBlock.type !== "unselected" &&
			precedingBlock.type !== "leg" &&
			precedingBlock.type !== "location") ||
		(succeedingBlock.type !== "unselected" &&
			succeedingBlock?.type !== "leg" &&
			succeedingBlock?.type !== "location")
	) {
		console.error(precedingBlock?.type);
		console.error(succeedingBlock?.type);
		// this should not happen at normal instances
		// since first and last blocks of journeys are expected to be of type DefiningBlock!
		return undefined;
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
		return undefined;
	} else if (precedingBlock.type === "leg" && succeedingBlock.type === "leg") {
		// either add transfer or walk between legs as merging block
		if (
			positionsAreEqual(
				precedingBlock.arrivalData.location.position,
				succeedingBlock.departureData.location.position
			)
		) {
			return transferToBlock(
				precedingBlock.arrivalData,
				precedingBlock.line.product ?? "",
				succeedingBlock.departureData,
				succeedingBlock.line.product ?? ""
			);
		} else {
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
			succeedingBlock.hidden = true;
			return undefined;
		} else {
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
		} else {
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
			a: arrivalBlock.time.a,
			b: departureBlock.time.b
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
		distance: 0,
		walkingTime: undefined,
		transferTime: dateDifferenceString(departureTime.a?.time, arrivalTime.b?.time)
	};
}

export function transferToBlock(
	arrivalData: TransitData,
	arrivalProduct: string,
	departureData: TransitData,
	departureProduct: string
): TransferBlock {
	return {
		type: "transfer",
		transferTime: dateDifferenceString(arrivalData.time.a?.time, departureData.time.b?.time),
		transitData: mergeTransitData(arrivalData, departureData),
		arrivalProduct,
		departureProduct
	};
}

function positionsAreEqual(
	positionA: ParsedLocation["position"],
	positionB: ParsedLocation["position"]
) {
	return positionA.lat === positionB.lat && positionA.lng === positionB.lng;
}
