import { derived, get, writable } from "svelte/store";
import type {
	JourneyBlock,
	JourneyNode,
	LocationBlock,
	ParsedLocation,
	TransferBlock,
	WalkingBlock
} from "$lib/types";
import { getApiData, getRawLocationBlock, getTreeUrl } from "$lib/util";
import { browser } from "$app/environment";
import { getMergingBlock } from "$lib/merge";

export type SelectedJourney = {
	blocks: JourneyBlock[];
	selectedBy: number;
	refreshToken: string;
};

export const displayedLocations = writable<ParsedLocation[]>([]);

// this is reset to an empty array when displayedLocations changes
export const mergingBlocks = writable<(WalkingBlock | TransferBlock | LocationBlock | undefined)[]>(
	[]
);
displayedLocations.subscribe(resetMergingBlocks);

// this is reset to an empty array when displayedLocations changes
export const selectedJourneys = writable<SelectedJourney[]>();
displayedLocations.subscribe(resetSelectedJourneys);

// this is recalculated when and only when displayedLocations changes
export const displayedTree = derived(displayedLocations, calculateTree);
export function setDisplayedLocations(locations: ParsedLocation[]): void {
	displayedLocations.set(locations);
}
export function addDisplayedLocation(location: ParsedLocation, index: number): void {
	displayedLocations.update((locations) => locations.splice(index, 0, location));
}
export function removeDisplayedLocation(index: number): void {
	displayedLocations.update((blocks) => blocks.splice(index, 0));
}

function resetSelectedJourneys(locations: ParsedLocation[]): void {
	selectedJourneys.set(
		Array.from({ length: locations.length - 1 }, (_v, i) => {
			return {
				blocks: [{ type: "unselected" }],
				selectedBy: -1,
				refreshToken: i.toString()
			};
		})
	);
}

function resetMergingBlocks(locations: ParsedLocation[]): void {
	mergingBlocks.set(
		Array.from({ length: locations.length }, (_v, i) => getRawLocationBlock(locations[i]))
	);
}

async function calculateTree(locations: ParsedLocation[]): Promise<JourneyNode[]> {
	if (locations.length < 2) {
		return Promise.all([]);
	}
	const url = getTreeUrl(locations);
	return getApiData<JourneyNode[]>(url).then((response) => {
		console.log(response);
		return response.isError ? [] : response.content;
	});
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
): void {
	selectedJourneys.update((journeys) => {
		// transition from previous journey
		const previousJourney = depth > 0 ? journeys[depth - 1] : undefined;
		const nextJourney = journeys.at(depth + 1);
		updateMergingBlocks(
			previousJourney,
			blocks.at(0) ?? { type: "unselected" },
			blocks.at(-1) ?? { type: "unselected" },
			nextJourney,
			depth
		);

		// selected journey
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
export function unselectJourneyBlocks(depth: number): void {
	selectedJourneys.update((journeys) => {
		const previousJourney = depth > 0 ? journeys[depth - 1] : undefined;
		const nextJourney = journeys.at(depth + 1);
		updateMergingBlocks(
			previousJourney,
			{ type: "unselected" },
			{ type: "unselected" },
			nextJourney,
			depth
		);

		journeys[depth].blocks = [{ type: "unselected" }];
		journeys[depth].selectedBy = -1;
		journeys[depth].refreshToken = depth.toString();
		return journeys;
	});
}

function updateMergingBlocks(
	previousJourney: SelectedJourney | undefined,
	startingBlock: JourneyBlock,
	endingBlock: JourneyBlock,
	nextJourney: SelectedJourney | undefined,
	index: number
): void {
	mergingBlocks.update((mergingBlocks) => {
		const locations = get(displayedLocations);
		const mergingBlockPrevious = getMergingBlock(
			previousJourney?.blocks.at(-1) ?? { type: "unselected" },
			locations[index],
			startingBlock
		);
		const mergingBlockNext = getMergingBlock(
			endingBlock,
			locations[index + 1],
			nextJourney?.blocks[0] ?? { type: "unselected" }
		);
		return [
			...mergingBlocks.slice(0, index),
			mergingBlockPrevious,
			mergingBlockNext,
			...mergingBlocks.slice(index + 2)
		];
	});
}

export const L = writable<typeof import("leaflet")>();
if (browser) {
	void import("leaflet").then((importedLeaflet) => {
		const l = importedLeaflet.default;
		L.set(l);
	});
}
