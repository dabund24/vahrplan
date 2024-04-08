import { derived, writable } from "svelte/store";
import type {
	AdhesiveBlock,
	JourneyBlock,
	JourneyNode,
	KeyedItem,
	ParsedLocation,
	ParsedTime
} from "$lib/types";
import { getApiData, getRawLocationBlock, getTreeUrl } from "$lib/util";
import { browser } from "$app/environment";
import { getMergingBlock } from "$lib/merge";

export type SelectedJourney = {
	blocks: JourneyBlock[];
	selectedBy: number;
	refreshToken: string;
	arrival: ParsedTime;
	departure: ParsedTime;
};

export const displayedLocations = writable<KeyedItem<ParsedLocation, number>[]>([]);
let locations: ParsedLocation[] = [];
displayedLocations.subscribe(
	(keyedLocations) => (locations = keyedLocations.map((keyedLocation) => keyedLocation.value))
);

// this is reset to an empty array when displayedLocations changes
export const mergingBlocks = writable<AdhesiveBlock[]>([]);
displayedLocations.subscribe(resetMergingBlocks);

// this is reset to an empty array when displayedLocations changes
export const selectedJourneys = writable<SelectedJourney[]>([]);
displayedLocations.subscribe(resetSelectedJourneys);

export const displayedJourneys = derived(
	[mergingBlocks, selectedJourneys],
	calculateDisplayedJourneys
);

// this is recalculated when and only when displayedLocations changes
// export const displayedTree = derived(displayedLocations, calculateTree);

export const displayedTree = writable<Promise<JourneyNode[]>>(Promise.all([]));
displayedLocations.subscribe((locations) => displayedTree.set(calculateTree(locations)));

export function setDisplayedLocations(locations: KeyedItem<ParsedLocation, number>[]): void {
	displayedLocations.set(locations);
}
export function addDisplayedLocation(location: ParsedLocation, index: number): void {
	displayedLocations.update((locations) => [
		...locations.slice(0, index),
		{ value: location, key: Math.random() },
		...locations.slice(index)
	]);
}
export function removeDisplayedLocation(index: number): void {
	displayedLocations.update((locations) => [
		...locations.slice(0, index),
		...locations.slice(index + 1)
	]);
}

function resetSelectedJourneys(locations: KeyedItem<ParsedLocation, number>[]): void {
	selectedJourneys.set(
		Array.from({ length: locations.length - 1 }, (_v, i) => {
			return {
				blocks: [{ type: "unselected" }],
				selectedBy: -1,
				refreshToken: i.toString(),
				arrival: {},
				departure: {}
			};
		})
	);
}

function resetMergingBlocks(locations: KeyedItem<ParsedLocation, number>[]): void {
	mergingBlocks.set(
		Array.from({ length: locations.length }, (_v, i) => getRawLocationBlock(locations[i].value))
	);
}

function calculateDisplayedJourneys([merging, selected]: [
	AdhesiveBlock[],
	SelectedJourney[]
]): KeyedItem<JourneyBlock[], string>[] {
	return Array.from({ length: 2 * merging.length - 1 }, (_v, i) => {
		const mergingBlock = merging[i / 2];
		return i % 2 === 0
			? {
					value: merging[i / 2] !== undefined ? [merging[i / 2]] : [],
					key:
						(i >= 2 ? selected[i / 2 - 1].refreshToken : "") +
						(mergingBlock?.type === "location" ? mergingBlock.location.name : "-") +
						(selected.at(i / 2)?.refreshToken ?? "")
				}
			: {
					value: selected[~~(i / 2)].blocks,
					key: selected[~~(i / 2)].refreshToken
				};
	}) as KeyedItem<JourneyBlock[], string>[];
}

async function calculateTree(
	locations: KeyedItem<ParsedLocation, number>[]
): Promise<JourneyNode[]> {
	if (locations.length < 2) {
		return Promise.all([]);
	}
	const url = getTreeUrl(locations.map((location) => location.value));
	return getApiData<JourneyNode[]>(url).then((response) => {
		return response.isError ? [] : response.content;
	});
}

/**
 * updates the selectedJourneys store
 */
export function selectJourneyBlocks(selectedJourney: SelectedJourney, depth: number): void {
	selectedJourneys.update((journeys) => {
		// transition from previous journey
		const previousJourney = depth > 0 ? journeys[depth - 1] : undefined;
		const nextJourney = journeys.at(depth + 1);
		updateMergingBlocks(
			previousJourney,
			selectedJourney.blocks.at(0) ?? { type: "unselected" },
			selectedJourney.blocks.at(-1) ?? { type: "unselected" },
			nextJourney,
			depth
		);

		// selected journey
		journeys[depth] = { ...selectedJourney };
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

		journeys[depth] = {
			blocks: [{ type: "unselected" }],
			selectedBy: -1,
			refreshToken: depth.toString(),
			arrival: {},
			departure: {}
		};
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
