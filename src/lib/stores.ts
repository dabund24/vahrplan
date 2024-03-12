import { derived, writable } from "svelte/store";
import type { JourneyBlock, JourneyNode, ParsedLocation } from "$lib/types";
import { getApiData, getTreeUrl } from "$lib/util";
import { browser } from "$app/environment";

type SelectedJourney = {
	blocks: JourneyBlock[];
	selectedBy: number;
	refreshToken: string;
};

export const displayedLocations = writable<ParsedLocation[]>([]);

// this is reset to an empty array when displayedLocations changes
export const selectedJourneys = writable<SelectedJourney[]>();
displayedLocations.subscribe(resetSelectedJourneys);

// this is recalculated when and only when displayedLocations changes
export const displayedTree = derived(displayedLocations, calculateTree);
export function setDisplayedLocations(locations: ParsedLocation[]) {
	displayedLocations.set(locations);
}
export function addDisplayedLocation(location: ParsedLocation, index: number) {
	displayedLocations.update((locations) => locations.splice(index, 0, location));
}
export function removeDisplayedLocation(index: number) {
	displayedLocations.update((locations) => locations.splice(index, 0));
}

function resetSelectedJourneys(locations: ParsedLocation[]) {
	selectedJourneys.set(
		Array.from({ length: locations.length - 1 }, (_v, i) => {
			return {
				blocks: [],
				selectedBy: -1,
				refreshToken: i.toString()
			};
		})
	);
}

function calculateTree(locations: ParsedLocation[]) {
	if (locations.length < 2) {
		return Promise.all([]);
	}
	const url = getTreeUrl(locations);
	const treePromise = getApiData<JourneyNode[]>(url).then((response) => {
		console.log(response);
		return response.isError ? [] : response.content;
	});
	selectedJourneys.set(
		Array.from({ length: locations.length - 1 }, (_v, i) => {
			return {
				blocks: [],
				selectedBy: -1,
				refreshToken: i.toString()
			};
		})
	);
	return treePromise;
}

/**
 * updates the selectedJourneys store
 * @param depth depth in tree
 * @param selectedBy id within depth of tree
 * @param blocks blocks associated to selected journey
 * @param refreshToken refresh token of journey
 */
export function selectJourneyBlocks(
	depth: number,
	selectedBy: number,
	blocks: JourneyBlock[],
	refreshToken: string
) {
	selectedJourneys.update((journeys) => {
		journeys[depth].blocks = [...blocks];
		journeys[depth].selectedBy = selectedBy;
		journeys[depth].refreshToken = refreshToken;
		return journeys;
	});
}

/**
 * updates the selectedJourneys store
 * @param depth depth in tree
 */
export function unselectJourneyBlocks(depth: number) {
	selectedJourneys.update((journeys) => {
		journeys[depth].blocks.length = 0;
		journeys[depth].selectedBy = -1;
		journeys[depth].refreshToken = depth.toString();
		return journeys;
	});
}

type LeafletType = typeof import("leaflet");
export const L = writable<LeafletType>();
if (browser) {
	const awaitedLeaflet = await import("leaflet").then((l) => l.default);
	L.set(awaitedLeaflet);
}
