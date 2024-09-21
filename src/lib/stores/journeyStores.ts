import { derived, get, writable } from "svelte/store";
import type {
	AdhesiveBlock,
	Diagram,
	JourneyBlock,
	JourneyNode,
	KeyedItem,
	ParsedLocation,
	ParsedTime,
	TransitType,
	TreeNode
} from "$lib/types";
import { getApiData, getFirstAndLastTime, getRawLocationBlock } from "$lib/util";
import { getMergingBlock } from "$lib/merge";
import { getApiRefreshUrl, getApiJourneysUrl, getDiagramUrlFromFormData } from "$lib/urls";
import type { Settings } from "$lib/stores/settingStore";
import { goto } from "$app/navigation";
import { toast } from "$lib/stores/toastStore";

export type DisplayedFormData = {
	locations: KeyedItem<ParsedLocation, number>[];
	time: Date;
	timeRole: TransitType;
	options: Settings["journeysOptions"];
	geolocationDate: Date;
};

export type SelectedJourney = {
	blocks: JourneyBlock[];
	selectedBy: number;
	refreshToken: string;
	arrival: ParsedTime;
	departure: ParsedTime;
};

export const displayedFormData = writable<DisplayedFormData | undefined>(undefined);
let locations: ParsedLocation[] = [];
displayedFormData.subscribe((formData) => {
	if (formData === undefined) {
		locations = [];
		return;
	}
	locations = formData.locations.map((keyedLocation) => keyedLocation.value);
});

/**
 * initializes the application state to a shared journey
 * @param formData everything the main form should display
 * @param journeyNodes all sub-journeys as tree nodes. They should not be connected to a tre yet!
 */
export function initializeSharedData(
	formData: DisplayedFormData,
	journeyNodes: JourneyNode[]
): void {
	formData.time = new Date(formData.time);
	displayedFormData.set(formData);
	displayedDiagram.set(
		Promise.resolve({ recommendedVias: [], tree: journeyNodesToPathGraph(journeyNodes) })
	);
	journeyNodes.forEach((node) => {
		const selectedJourney: SelectedJourney = {
			blocks: node.blocks,
			refreshToken: node.refreshToken,
			arrival: node.arrival,
			departure: node.departure,
			selectedBy: 0
		};
		selectJourneyBlocks(selectedJourney, node.depth);
	});
}

/**
 * Arranges journey nodes to a path graph such that the i-th node points to the (i+1)-th node
 * @param nodes an array of journey nodes. They should not be connected to a tre yet!
 * @returns the resulting path graph
 */
function journeyNodesToPathGraph(nodes: JourneyNode[]): TreeNode[] {
	if (nodes.length === 0) {
		return [];
	}
	nodes[0].children = journeyNodesToPathGraph(nodes.slice(1));
	return [nodes[0]];
}

// this is reset to an empty array when displayedLocations changes
export const mergingBlocks = writable<AdhesiveBlock[]>([]);
displayedFormData.subscribe(resetMergingBlocks);

// this is reset to an empty array when displayedLocations changes
export const selectedJourneys = writable<SelectedJourney[]>([]);
displayedFormData.subscribe(resetSelectedJourneys);

export const displayedJourneys = derived(selectedJourneys, calculateDisplayedJourneys);

// this is recalculated when and only when displayedLocations changes
export const displayedDiagram = writable<Promise<Diagram>>(
	Promise.resolve({ recommendedVias: [], tree: [] })
);

export function setDisplayedFormDataAndTree(formData: DisplayedFormData): void {
	displayedFormData.set(formData);
	displayedDiagram.set(calculateDiagram(formData));
}

export function updateDisplayedLocations(
	updateLocationsFn: (formData: DisplayedFormData) => DisplayedFormData["locations"]
): void {
	displayedFormData.update((formData) => {
		if (formData === undefined) {
			return formData;
		}

		const locations = updateLocationsFn(formData);
		if (formData.locations === locations) {
			console.log("SAME");
		}
		if (locations.length < 2) {
			toast("Mindestens zwei Stationen sind notwendig.", "red");
			return formData;
		}
		if (locations.length > 7) {
			toast("Es sind maximal fünf Zwischenstationen möglich.", "red");
			return formData;
		}
		const newFormData: DisplayedFormData = {
			locations,
			time: formData.time,
			timeRole: formData.timeRole,
			options: formData.options,
			geolocationDate: formData.geolocationDate
		};

		void goto(getDiagramUrlFromFormData(newFormData), {
			state: { showFilterModal: false, showRecommendationModal: false }
		});
		displayedDiagram.set(calculateDiagram(newFormData));
		return newFormData;
	});
}

export function addDisplayedLocation(location: ParsedLocation, index: number): void {
	updateDisplayedLocations((formData) => [
		...formData.locations.slice(0, index),
		{ value: location, key: Math.random() },
		...formData.locations.slice(index)
	]);
}
export function removeDisplayedLocation(index: number): void {
	updateDisplayedLocations((formData) => [
		...formData.locations.slice(0, index),
		...formData.locations.slice(index + 1)
	]);
}

function resetSelectedJourneys(formData: DisplayedFormData | undefined): void {
	if (formData === undefined) {
		selectedJourneys.set([]);
		return;
	}
	selectedJourneys.set(
		Array.from({ length: formData.locations.length - 1 }, (_v, i) => {
			return {
				blocks: [{ type: "unselected" }],
				selectedBy: -1,
				refreshToken: `${i}`,
				arrival: {},
				departure: {}
			};
		})
	);
}

function resetMergingBlocks(formData: DisplayedFormData | undefined): void {
	if (formData === undefined) {
		mergingBlocks.set([]);
		return;
	}
	mergingBlocks.set(
		Array.from({ length: formData.locations.length ?? 0 }, (_v, i) =>
			getRawLocationBlock(formData.locations[i].value)
		)
	);
}

function calculateDisplayedJourneys(
	selected: SelectedJourney[]
): KeyedItem<JourneyBlock[], string>[] {
	const merging = get(mergingBlocks);
	return Array.from({ length: 2 * merging.length - 1 }, (_v, i) => {
		const mergingBlock = merging[i / 2];
		return i % 2 === 0
			? {
					value: mergingBlock !== undefined ? [mergingBlock] : [],
					key: `-${i}`
				}
			: {
					value: selected[~~(i / 2)].blocks,
					key: selected[~~(i / 2)].refreshToken
				};
	}) as KeyedItem<JourneyBlock[], string>[];
}

async function calculateDiagram(formData: DisplayedFormData | undefined): Promise<Diagram> {
	if (formData === undefined || formData.locations.length < 2) {
		return Promise.resolve({ recommendedVias: [], tree: [] });
	}
	const url = getApiJourneysUrl(formData);
	const loadingEst = formData.locations.length * 3;
	return getApiData<Diagram>(url, loadingEst).then((response) => {
		console.log(response);
		return response.isError ? { recommendedVias: [], tree: [] } : response.content;
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

		journeys[depth] = selectedJourney;
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
		const previousBlock = previousJourney?.blocks.at(-1) ?? { type: "unselected" };
		const mergingBlockPrevious = getMergingBlock(
			previousBlock,
			locations[index],
			startingBlock
		);
		if (previousJourney !== undefined && previousBlock.type === "leg") {
			// reassign previous block to trigger possible dom updates for it since it may change
			previousJourney.blocks[previousJourney.blocks.length - 1] = { ...previousBlock };
		}

		const nextBlock = nextJourney?.blocks[0] ?? { type: "unselected" };
		const mergingBlockNext = getMergingBlock(endingBlock, locations[index + 1], nextBlock);
		if (nextJourney !== undefined && nextBlock.type === "leg") {
			// reassing next block to trigger possible dom updates for it since it may change
			nextJourney.blocks[0] = { ...nextBlock };
		}

		return [
			...mergingBlocks.slice(0, index),
			mergingBlockPrevious,
			mergingBlockNext,
			...mergingBlocks.slice(index + 2)
		];
	});
}

export async function refreshJourney(): Promise<void> {
	let idsInDepth: number[];
	const tokens = get(selectedJourneys).map((journey) =>
		journey.refreshToken.length > 5 ? journey.refreshToken : null
	);
	const url = getApiRefreshUrl(tokens);
	const response = await getApiData<JourneyBlock[][]>(url, 3);
	if (response.isError) {
		return;
	}
	const refreshedJourneys = response.content;

	selectedJourneys.update((selectedJourneys) => {
		idsInDepth = selectedJourneys.map((journey) => journey.selectedBy);
		for (let i = 0; i < selectedJourneys.length; i++) {
			selectedJourneys[i].blocks = refreshedJourneys[i];
		}
		return selectedJourneys;
	});
	displayedDiagram.update(async (diagram) => {
		const { recommendedVias, tree } = await diagram;
		return {
			recommendedVias,
			tree: replaceJourneysInTree(tree, refreshedJourneys, idsInDepth)
		};
	});
	toast("Reisedaten aktualisiert.", "green");
}

/**
 * traverses current journey tree and replaces passed journeys in tree
 * @param tree journey tree where journeys should be replaced
 * @param journeys new journeys, journey at index i lands in depth i
 * @param idsInDepth id at index i stands for id in depth i
 */
function replaceJourneysInTree(
	tree: TreeNode[],
	journeys: JourneyBlock[][],
	idsInDepth: number[]
): TreeNode[] {
	for (const node of tree) {
		if (node.type === "journeyNode" && node.idInDepth === idsInDepth[0]) {
			node.blocks = journeys[0];
			const firstAndLastTime = getFirstAndLastTime(journeys[0]);
			node.arrival = firstAndLastTime.arrival;
			node.departure = firstAndLastTime.departure;
		}
		node.children = replaceJourneysInTree(
			node.children,
			journeys.slice(1),
			idsInDepth.slice(1)
		);
	}
	return tree;
}
