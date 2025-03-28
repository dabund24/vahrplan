import type { JourneyNodesWithRefs } from "$lib/server/journeyData/JourneyDataService";
import type { ParsedLocation, SubJourney, TreeNode } from "$lib/types";
import type { DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import { apiClient } from "$lib/api-client/apiClientFactory";
import type { SelectedData } from "$lib/state/selectedData.svelte";
import { browser } from "$app/environment";
import { toast } from "$lib/state/toastStore";

export type DiagramData = {
	columns: JourneyNodesWithRefs[];
	tree: TreeNode[];
	recommendedVias: ParsedLocation[][];
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
		recommendedVias: Array.from({ length: columnCount }, () => [])
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
	const diagramApiClient = apiClient("GET", "/api/diagram");
	diagramData = diagramApiClient
		.request({
			stops: formData.locations.map((l) => l.value.requestParameter),
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
	const journeyApiClient = apiClient("GET", "/api/journey");
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
	const subJourneys = journeys.content.subJourneys;
	for (const subJourney of subJourneys) {
		const columnIndex = subJourneys.indexOf(subJourney);
		setJourney(subJourney, columnIndex, selectedBy.selectedJourneys[columnIndex]);
	}
	toast("Reisedaten aktualisiert.", "green");
}

async function getJourney(columnIndex: number, rowIndex: number): Promise<SubJourney> {
	return (await diagramData).columns[columnIndex].journeys[rowIndex];
}

function setJourney(journey: SubJourney, columnIndex: number, rowIndex: number): void {
	diagramData = diagramData.then((diagramData) => {
		diagramData.columns[columnIndex].journeys[rowIndex] = journey;
		return diagramData;
	});
}
