import type { ParsedLocation } from "$lib/types";

export type LocationEquivalenceSystem = {
	idToRepresentative: Partial<Record<string, string>>; // resolve location id to key for representatives
	representatives: Record<string, ParsedLocation>; // get representative
};

/**
 * get the location representative of the passed location from the equivalence system
 * @param locationEquivalenceSystem
 * @param location
 */
export function getLocationRepresentative(
	locationEquivalenceSystem: LocationEquivalenceSystem,
	location: ParsedLocation
): ParsedLocation {
	const representativeId =
		locationEquivalenceSystem.idToRepresentative[location.requestParameter];
	if (representativeId === undefined) {
		return location;
	}
	return locationEquivalenceSystem.representatives[representativeId];
}
