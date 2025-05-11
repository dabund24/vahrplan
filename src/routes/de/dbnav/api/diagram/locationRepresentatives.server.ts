import type { ParsedLocation, SubJourney } from "$lib/types";
import type { LocationEquivalenceSystem } from "./locationRepresentativesUtils";

export function buildTransferLocationEquivalenceSystemFromSubJourneys(
	subJourneys: SubJourney[],
	equivalenceSystem: LocationEquivalenceSystem = { idToRepresentative: {}, representatives: {} }
): LocationEquivalenceSystem {
	for (const subJourney of subJourneys) {
		buildTransferLocationEquivalenceSystem(subJourney, equivalenceSystem);
	}
	return equivalenceSystem;
}

/**
 * adds all transfer locations from the passed `subJourney` to the `equivalenceSystem`
 * @param subJourney
 * @param equivalenceSystem
 */
export function buildTransferLocationEquivalenceSystem(
	subJourney: SubJourney,
	equivalenceSystem: LocationEquivalenceSystem = { idToRepresentative: {}, representatives: {} }
): LocationEquivalenceSystem {
	const legBlocks = subJourney.blocks.filter((block) => block.type === "leg");
	for (let i = 1; i < legBlocks.length; i++) {
		equivalenceSystem = addLocationPair(
			[legBlocks[i - 1].arrivalData.location, legBlocks[i].departureData.location],
			equivalenceSystem
		);
	}
	return equivalenceSystem;
}

function addLocationPair(
	[location0, location1]: [ParsedLocation, ParsedLocation],
	equivSys: LocationEquivalenceSystem
): LocationEquivalenceSystem {
	const representativeId0 = equivSys.idToRepresentative[location0.requestParameter];
	const representativeId1 = equivSys.idToRepresentative[location1.requestParameter];

	if (representativeId0 === undefined && representativeId1 === undefined) {
		// representative is not yet mapped
		const representativeId = location0.requestParameter;
		equivSys.idToRepresentative[location0.requestParameter] = representativeId;
		equivSys.idToRepresentative[location1.requestParameter] = representativeId;
		equivSys.representatives[representativeId] = determineBetterRepresentative(
			location0,
			location1
		);
	} else if (representativeId0 !== undefined && representativeId1 === undefined) {
		// representative only mapped for location0
		equivSys.idToRepresentative[location1.requestParameter] = representativeId0;
		const currentRepresentative = equivSys.representatives[representativeId0];
		equivSys.representatives[representativeId0] = determineBetterRepresentative(
			currentRepresentative,
			location1
		);
	} else if (representativeId0 === undefined && representativeId1 !== undefined) {
		// representative only mapped for location1
		equivSys.idToRepresentative[location0.requestParameter] = representativeId1;
		const currentRepresentative = equivSys.representatives[representativeId1];
		equivSys.representatives[representativeId1] = determineBetterRepresentative(
			currentRepresentative,
			location0
		);
	} else if (representativeId0 !== undefined && representativeId1 !== undefined) {
		// representative mapped for both location
		const currentRepresentative0 = equivSys.representatives[representativeId0];
		const currentRepresentative1 = equivSys.representatives[representativeId1];
		// use the better representative and always use id of representative of location0
		equivSys.representatives[representativeId0] = determineBetterRepresentative(
			currentRepresentative0,
			currentRepresentative1
		);
		for (const locationId in equivSys.idToRepresentative) {
			if (equivSys.idToRepresentative[locationId] === representativeId1) {
				// replace key of representative of location1
				equivSys.idToRepresentative[locationId] = representativeId0;
			}
		}
		if (representativeId0 !== representativeId1) {
			delete equivSys.representatives[representativeId1]; // representative now obsolete
		}
	}
	return equivSys;
}

function determineBetterRepresentative(
	candidate0: ParsedLocation,
	candidate1: ParsedLocation
): ParsedLocation {
	if (candidate0.name.length <= candidate1.name.length) {
		return candidate0;
	}
	return candidate1;
}
