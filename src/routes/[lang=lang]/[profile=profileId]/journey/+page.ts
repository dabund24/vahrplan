import type { PageLoad } from "./$types";
import type { KeyedItem, ParsedLocation, SubJourney, TreeNode } from "$lib/types";
import { getBlockEnd, getBlockStart } from "$lib/util";
import { error } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { type DisplayedJourney, getDisplayedJourney } from "$lib/state/displayedJourney.svelte.js";
import type { DiagramData } from "$lib/state/diagramData.svelte.js";
import { defaultJourneysOptions } from "$lib/state/settingStore";
import type { DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";

const journeyApiClient = apiClient("GET", "journey");

export const load: PageLoad = async function ({ url, fetch }) {
	if (browser && displayedJourneyMatchesUrl(url, getDisplayedJourney())) {
		// no need to refetch the journey, displayed journey is already correct
		return {
			formData: undefined,
			diagramData: undefined
		};
	}

	const tokens = await journeyApiClient.parseNonApiUrl(url);
	if (tokens.length === 0) {
		// use selected journey
		return;
	}

	// get journey from refresh tokens
	const diagramData = await diagramDataFromTokens(tokens, fetch);
	const formData = formDataFromDiagramData(diagramData);

	return { diagramData, formData };
};

/**
 * checks if the passed form data matches the passed url
 * @param url
 * @param displayedJourney
 */
function displayedJourneyMatchesUrl(url: URL, displayedJourney: DisplayedJourney): boolean {
	const currentTokens: string[] = displayedJourney.selectedSubJourneys.map(
		(j) => j?.refreshToken ?? ""
	);
	return journeyApiClient.formatNonApiUrl(currentTokens).href === url.href;
}

async function diagramDataFromTokens(
	tokens: string[],
	fetchFn: typeof fetch
): Promise<DiagramData> {
	const journeysApiClient = apiClient("GET", "journey");
	const {
		content: { subJourneys, svgData, transferLocations }
	} = (await journeysApiClient.request(tokens, fetchFn)).throwIfError();

	return Promise.resolve({
		columns: subJourneys.map((j) => ({
			journeys: [j],
			earlierRef: "",
			laterRef: ""
		})),
		tree: journeyNodesToPathGraph(subJourneys, 0),
		svgData,
		transferLocations,
		recommendedVias: [],
		isNew: Array.from({ length: subJourneys.length }, () => [false])
	});
}

/**
 * Arranges journey nodes to a path graph such that the i-th node points to the (i+1)-th node
 * @param subJourneys the journeys to construct the graph from
 * @param depth current recursion depth
 * @returns the resulting path graph
 */
function journeyNodesToPathGraph(subJourneys: SubJourney[], depth: number): TreeNode[] {
	if (subJourneys.length === 0) {
		return [];
	}
	const node: TreeNode = {
		type: "journeyNode",
		columnIndex: depth,
		rowIndex: 0,
		timeData: {
			departure: subJourneys[0].departureTime?.time ?? new Date(0).toISOString(),
			arrival: subJourneys.at(-1)?.arrivalTime?.time ?? new Date(0).toISOString()
		},
		children: journeyNodesToPathGraph(subJourneys.slice(1), depth + 1)
	};
	return [node];
}

/**
 * determines all sub-stops for an array of sub-journeys
 * @param diagramData the sub-journeys
 * @returns the sub-stops with a key
 */
function getKeyedLocationsFromDiagramData(
	diagramData: DiagramData
): KeyedItem<ParsedLocation, number>[] {
	const columns = diagramData.columns;
	const locations = columns.map((column) => {
		const subJourney = column.journeys[0];
		const startLocation = getBlockStart(subJourney?.blocks[0]);
		if (startLocation === undefined) {
			error(404);
		}
		return startLocation;
	});
	const lastLocation = getBlockEnd(columns?.at(-1)?.journeys.at(-1)?.blocks.at(-1));
	if (lastLocation === undefined) {
		error(404);
	}
	locations.push(lastLocation);
	return locations.map((location) => {
		return { value: location, key: Math.random() };
	});
}

function formDataFromDiagramData(diagramData: DiagramData): DisplayedFormData {
	return {
		options: defaultJourneysOptions,
		locations: getKeyedLocationsFromDiagramData(diagramData),
		timeData: {
			type: "absolute",
			scrollDirection: "later",
			time: diagramData.columns[0]?.journeys[0]?.departureTime?.time ?? ""
		},
		geolocationDate: new Date()
	};
}
