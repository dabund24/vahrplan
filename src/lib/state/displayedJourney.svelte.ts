import { untrack } from "svelte";
import type {
	AdhesiveBlock,
	JourneyBlock,
	KeyedItem,
	ParsedLocation,
	SubJourney,
	TransitType
} from "$lib/types";
import { getDiagramData, type DiagramData } from "$lib/state/diagramData.svelte";
import { getSelectedData, type SelectedData } from "$lib/state/selectedData.svelte";
import {
	type DisplayedFormData,
	getDisplayedFormData
} from "$lib/state/displayedFormData.svelte.js";
import { getMergingBlock } from "$lib/merge";
import { browser } from "$app/environment";

export type DisplayedJourney = {
	blocks: KeyedItem<JourneyBlock[], string>[];
	locations: KeyedItem<ParsedLocation, number>[];
	selectedSubJourneys: (SubJourney | undefined)[];
	statuses: Set<"cancelled" | "impossibleTransfer">;
} & Partial<Record<TransitType, string>>;

/**
 * stores how the `displayedFormData`, `diagramData` and `selectedData` stores result in a journey that can be displayed in the ui
 *
 * is only updated if `diagramData` or `selectedData` change
 */
let displayedJourney: DisplayedJourney = $state({
	selectedSubJourneys: [],
	blocks: [],
	locations: [],
	statuses: new Set()
});

// TODO change to async derived once supported: https://github.com/sveltejs/svelte/issues/14305
$effect.root(() => {
	$effect(() => {
		const displayedFormData = untrack(getDisplayedFormData);
		const diagramData = getDiagramData();
		const selectedData = getSelectedData();
		const j = computeDisplayedJourney({
			displayedFormData,
			diagramData,
			selectedData
		});

		void j.then((j) => {
			displayedJourney = j;
		});
	});
});

export function getDisplayedJourney(): DisplayedJourney {
	if (!browser) {
		return {
			blocks: [],
			selectedSubJourneys: [],
			locations: [],
			statuses: new Set()
		};
	}
	return displayedJourney;
}

async function computeDisplayedJourney({
	displayedFormData,
	diagramData,
	selectedData
}: {
	displayedFormData: DisplayedFormData | undefined;
	diagramData: Promise<DiagramData>;
	selectedData: SelectedData;
}): Promise<DisplayedJourney> {
	if (displayedFormData === undefined) {
		return { blocks: [], selectedSubJourneys: [], locations: [], statuses: new Set() };
	}

	const selectedSubJourneys = await computeSelectedSubJourneys(diagramData, selectedData);
	const locations = displayedFormData.locations.map((l) => l.value);
	const mergingBlocks: AdhesiveBlock[] = computeMergingBlocks(locations, selectedSubJourneys);

	const blocks = computeDisplayedBlocks(mergingBlocks, selectedSubJourneys);

	return {
		blocks,
		selectedSubJourneys,
		locations: displayedFormData.locations,
		statuses: computeStatuses(blocks),
		departure: selectedSubJourneys[0]?.departureTime?.time,
		arrival: selectedSubJourneys.at(-1)?.arrivalTime?.time
	};
}

async function computeSelectedSubJourneys(
	diagramData: Promise<DiagramData>,
	selectedData: SelectedData
): Promise<DisplayedJourney["selectedSubJourneys"]> {
	return Promise.all(
		selectedData.selectedJourneys.map(async (rowIndex, columnIndex) => {
			if (rowIndex === -1) {
				return undefined;
			}
			return (await diagramData).columns[columnIndex].journeys[rowIndex];
		})
	);
}

function computeMergingBlocks(
	locations: ParsedLocation[],
	selectedSubJourneys: DisplayedJourney["selectedSubJourneys"]
): AdhesiveBlock[] {
	return locations.map((location, columnIndex) => {
		const precedingBlock: JourneyBlock =
			columnIndex === 0
				? { type: "unselected" }
				: (selectedSubJourneys[columnIndex - 1]?.blocks.at(-1) ?? { type: "unselected" });

		const succeedingBlock: JourneyBlock =
			columnIndex === selectedSubJourneys.length
				? { type: "unselected" }
				: (selectedSubJourneys[columnIndex]?.blocks[0] ?? { type: "unselected" });

		return getMergingBlock(precedingBlock, location, succeedingBlock);
	});
}

function computeDisplayedBlocks(
	mergingBlocks: AdhesiveBlock[],
	selectedSubJourneys: DisplayedJourney["selectedSubJourneys"]
): DisplayedJourney["blocks"] {
	return Array.from({ length: 2 * mergingBlocks.length - 1 }, (_v, i) => {
		const mergingBlock = mergingBlocks[i / 2];
		if (i % 2 === 0) {
			return {
				value: mergingBlock !== undefined ? [mergingBlock] : [],
				key: `-${i}`
			};
		}

		const subJourney = selectedSubJourneys[~~(i / 2)];
		return {
			value: subJourney?.blocks ?? [{ type: "unselected" }],
			key: subJourney?.refreshToken ?? String(i)
		};
	});
}

function computeStatuses(
	displayedBlocks: DisplayedJourney["blocks"]
): DisplayedJourney["statuses"] {
	const statuses: DisplayedJourney["statuses"] = new Set();

	const flatBlocks = displayedBlocks.flatMap((journey) => journey.value);

	const hasBadTransferTime = flatBlocks
		.filter(
			(block) =>
				block.type === "transfer" ||
				block.type === "walk" ||
				block.type === "onward-journey"
		)
		.some((transfer) => {
			if (transfer.type === "transfer") {
				return transfer.transferTime < 0;
			}
			return transfer.transferTime < (transfer.travelTime ?? 0);
		});
	if (hasBadTransferTime) {
		statuses.add("impossibleTransfer");
	}

	const hasCancelledLeg = flatBlocks
		.filter((block) => block.type === "leg")
		.some((leg) => leg.attribute === "cancelled");
	if (hasCancelledLeg) {
		statuses.add("cancelled");
	}
	return statuses;
}
