import type { JourneyNodesWithRefs } from "$lib/server/journey-data/JourneyDataService";
import type { RelativeTimeType, SubJourney, TreeNode } from "$lib/types";
import {
	type DisplayedFormData,
	getDisplayedFormData
} from "$lib/state/displayedFormData.svelte.js";
import { apiClient } from "$lib/api-client/apiClientFactory";
import {
	getSelectedData,
	type SelectedData,
	setSelectedData
} from "$lib/state/selectedData.svelte";
import { browser } from "$app/environment";
import { toast } from "$lib/state/toastStore";
import type { LocationEquivalenceSystem } from "../../routes/[lang]/[profile]/api/diagram/locationRepresentativesUtils";
import type { SvgData } from "$lib/server/svgData/svgData.server";
import { MAX_DATE } from "$lib/constants";
import type { RecommendedVia } from "../../routes/[lang]/[profile]/api/diagram/viaRecommendations.server";

export type DiagramData = {
	columns: JourneyNodesWithRefs[];
	tree: TreeNode[];
	svgData: SvgData;
	transferLocations: LocationEquivalenceSystem;
	recommendedVias: RecommendedVia[][];
	isNew: boolean[][];
};

/**
 *
 */
let diagramData: Promise<DiagramData> = $state.raw(Promise.resolve(getEmptyDiagramData(0)));

export function getDiagramData(): Promise<DiagramData> {
	if (!browser) {
		return Promise.resolve(getEmptyDiagramData(0));
	}
	return diagramData;
}

function getEmptyDiagramData(columnCount: number): DiagramData {
	return {
		columns: Array.from({ length: columnCount }, () => ({
			earlierRef: "",
			laterRef: "",
			journeys: []
		})),
		tree: [],
		svgData: {
			timeMarksData: { firstTimeMark: 0, timeMarkInterval: MAX_DATE },
			minutesPerHeight: 1,
			minTime: 0,
			maxTime: 0,
			columns: []
		},
		transferLocations: { idToRepresentative: {}, representatives: {} },
		recommendedVias: Array.from({ length: columnCount }, () => []),
		isNew: Array.from({ length: columnCount }, () => [])
	};
}

export function setDiagramData(newDiagramData: Promise<DiagramData>): void {
	diagramData = newDiagramData;
}

/**
 * Fetches the diagram data based on the passed form data and sets the `diagramData` store to the result.
 * @param formData
 * @returns a promise that resolves once the data has loaded
 */
export async function setDiagramDataFromFormData(formData: DisplayedFormData): Promise<void> {
	const diagramApiClient = apiClient("GET", "diagram");
	diagramData = diagramApiClient
		.request({
			stops: formData.locations.map((l) => l.value.id),
			timeData: formData.timeData,
			options: formData.options
		})
		.then((result) => {
			if (!result.isError) {
				return result.content;
			}
			return getEmptyDiagramData(formData.locations.length - 1);
		});
	await diagramData;
}

/**
 * refresh the selected journey
 * @param selectedBy an array having a row index for every column
 */
export async function refreshDiagramData(selectedBy: SelectedData): Promise<void> {
	const journeyApiClient = apiClient("GET", "journey");
	const oldDiagramData = diagramData;
	const tokens = await Promise.all(
		selectedBy.selectedJourneys.map(
			async (rowIndex, columnIndex) => (await getJourney(columnIndex, rowIndex)).refreshToken
		)
	);
	const journeys = await journeyApiClient.request(tokens);
	if (journeys.isError || oldDiagramData !== diagramData) {
		return;
	}

	await refreshJourneyData(journeys.content.subJourneys, selectedBy);
	await refreshSvgData(journeys.content.svgData, selectedBy);

	toast("Reisedaten aktualisiert.", "green");
}

/**
 * refresh the raw data of a journey from the diagram data
 * @param refreshedJourneyData
 * @param selectedBy
 */
async function refreshJourneyData(
	refreshedJourneyData: SubJourney[],
	selectedBy: SelectedData
): Promise<void> {
	refreshedJourneyData.forEach((subJourney, columnIndex) => {
		const rowIndex = selectedBy.selectedJourneys[columnIndex];
		diagramData = diagramData.then((diagramData) => {
			diagramData.columns[columnIndex].journeys[rowIndex] = subJourney;
			return diagramData;
		});
	});
	await diagramData; // prevent race conditions
}

/**
 * refresh the svg data of a journey from the diagram data
 * @param refreshedSvgData
 * @param selectedBy
 */
async function refreshSvgData(refreshedSvgData: SvgData, selectedBy: SelectedData): Promise<void> {
	diagramData = diagramData.then((diagramData) => {
		diagramData.svgData.maxTime = Math.max(
			diagramData.svgData.maxTime,
			refreshedSvgData.maxTime
		);
		diagramData.svgData.minTime = Math.min(
			diagramData.svgData.minTime,
			refreshedSvgData.minTime
		);
		refreshedSvgData.columns.forEach(({ subJourneys: [refreshedJourney] }, columnIndex) => {
			const rowIndex = selectedBy.selectedJourneys[columnIndex];
			diagramData.svgData.columns[columnIndex].subJourneys[rowIndex] = refreshedJourney;
		});
		return diagramData;
	});
	await diagramData; // prevent race conditions
}

/**
 * find earlier or later journeys and update the diagramData accordingly
 * @param scrollDirection
 */
export async function scrollDiagramData(scrollDirection: RelativeTimeType): Promise<void> {
	const scrollApiClient = apiClient("POST", "diagram/scroll/[scrollDirection]");
	const oldDiagramData = diagramData;
	const { columns, tree, svgData, transferLocations, recommendedVias } = await oldDiagramData;
	const displayedFormData = getDisplayedFormData();

	const tokens = columns.map((c) => c[`${scrollDirection}Ref`]);
	if (displayedFormData === undefined || tokens.some((token) => token === "")) {
		toast("Suche nach mehr Verbindungen ist nicht möglich.", "red");
		return;
	}
	const stops = displayedFormData.locations.map((l) => l.value.id);

	const res = await scrollApiClient.request({
		scrollDirection,
		tokens,
		stops,
		tree,
		transferLocations,
		recommendedVias,
		options: displayedFormData.options
	});

	if (res.isError || oldDiagramData !== diagramData) {
		return;
	}

	columns.forEach((column, columnIndex) => {
		column.journeys[scrollDirection === "earlier" ? "unshift" : "push"](
			...res.content.columns[columnIndex].journeys
		);
		column[`${scrollDirection}Ref`] = res.content.columns[columnIndex][`${scrollDirection}Ref`];
	});

	if (scrollDirection === "earlier") {
		const updatedSelection = getSelectedData().selectedJourneys.map((rowIndex, columnIndex) => {
			if (rowIndex === -1) {
				return -1;
			}
			return rowIndex + res.content.columns[columnIndex].journeys.length;
		});
		setSelectedData(updatedSelection);
	}

	diagramData = Promise.resolve({
		columns,
		tree: res.content.tree,
		svgData: scrollSvgData(svgData, res.content.svgData, scrollDirection),
		transferLocations: res.content.transferLocations,
		recommendedVias: res.content.recommendedVias,
		isNew: res.content.isNew
	});
}

function scrollSvgData(
	oldSvgData: SvgData,
	newSvgData: SvgData,
	scrollDirection: RelativeTimeType
): SvgData {
	let arrayExpansionFn: "push" | "unshift";
	if (scrollDirection === "earlier") {
		oldSvgData.minTime = newSvgData.minTime;
		arrayExpansionFn = "unshift";
	} else {
		oldSvgData.maxTime = newSvgData.maxTime;
		arrayExpansionFn = "push";
	}
	oldSvgData.columns.forEach((column, columnIndex) => {
		column.subJourneys[arrayExpansionFn](...newSvgData.columns[columnIndex].subJourneys);
	});
	return oldSvgData;
}

async function getJourney(columnIndex: number, rowIndex: number): Promise<SubJourney> {
	return (await diagramData).columns[columnIndex].journeys[rowIndex];
}
