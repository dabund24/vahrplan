import type { PageServerLoad } from "./$types";
import type { JourneyBlock, JourneyNode, KeyedItem, ParsedLocation, ZugResponse } from "$lib/types";
import { getBlockEnd, getBlockStart, getFirstAndLastTime } from "$lib/util";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async function ({ url, fetch }) {
	const journeyParam = url.searchParams.get("j");
	if (journeyParam === null) {
		// use selected journey
		return {
			journey: undefined
		};
	}
	// use shared journey

	// get refresh tokens from short url
	const tokensResponse = (await fetch(`/api/journey/shorturl?token=${journeyParam}`).then((res) =>
		res.json()
	)) as ZugResponse<string[]>;
	if (tokensResponse.isError) {
		error(404, "Token existiert nicht");
	}
	const tokens = tokensResponse.content;

	// get journey from refresh tokens
	const subjourneysResponse = (await fetch(
		`/api/journey?tokens=${encodeURIComponent(JSON.stringify(tokens))}`
	).then((res) => res.json())) as ZugResponse<JourneyBlock[][]>;
	if (subjourneysResponse.isError) {
		error(404, "Laden der Verbindung fehlgeschlagen");
	}
	const subjourneys = subjourneysResponse.content;

	// prepare data to be served to client
	const locations = getKeyedLocationsFromJourney(subjourneys);
	const departure = getFirstAndLastTime(subjourneys[0]).departure;
	const treeNodes = subjourneysToTreeNodes(subjourneys, tokens);

	return {
		treeNodes: treeNodes,
		formData: {
			locations,
			time: departure.departure?.time ?? new Date(),
			options: {},
			timeRole: "departure"
		}
	};
};

/**
 * determines all sub-stops for an array of sub-journeys
 * @param journey the sub-journeys
 * @returns the sub-stops with a key
 */
function getKeyedLocationsFromJourney(
	journey: JourneyBlock[][]
): KeyedItem<ParsedLocation, number>[] {
	const locations = journey.map((subjourney) => {
		const startLocation = getBlockStart(subjourney[0]);
		if (startLocation === undefined) {
			error(404);
		}
		return startLocation;
	});
	const lastLocation = getBlockEnd(journey.at(-1)?.at(-1));
	if (lastLocation === undefined) {
		error(404);
	}
	locations.push(lastLocation);
	return locations.map((location) => {
		return { value: location, key: Math.random() };
	});
}

/**
 * turns an array of sub-journeys into an array of unconnected journey nodes
 * @param subJourneys
 * @param tokens the tokens for each sub-journey. This array should be evenly long as the subjourneys array
 */
function subjourneysToTreeNodes(subJourneys: JourneyBlock[][], tokens: string[]): JourneyNode[] {
	return subJourneys.map((subJourney, i) => {
		return {
			type: "journeyNode" as const,
			depth: i,
			idInDepth: 0,
			refreshToken: tokens[i],
			blocks: subJourney,
			...getFirstAndLastTime(subJourney),
			children: []
		};
	});
}
