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
	location: ParsedLocation | string
): ParsedLocation {
	const locationId = typeof location === "string" ? location : location.id;
	const representativeId = locationEquivalenceSystem.idToRepresentative[locationId];
	if (representativeId === undefined) {
		if (typeof location === "string") {
			throw new Error();
		}
		return location;
	}
	return locationEquivalenceSystem.representatives[representativeId];
}
