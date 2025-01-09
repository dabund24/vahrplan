import type { PageLoad } from "./$types";
import type { JourneyNode, KeyedItem, ParsedLocation, SubJourney } from "$lib/types";
import { getBlockEnd, getBlockStart } from "$lib/util";
import { error } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { getJourneyUrl } from "$lib/urls";
import { get } from "svelte/store";
import { selectedJourneys } from "$lib/stores/journeyStores";
import { toast } from "$lib/stores/toastStore";
import type { VahrplanResult } from "$lib/VahrplanResult";

export const load: PageLoad = async function ({ url, fetch }) {
	if (browser && getJourneyUrl(get(selectedJourneys)).href === url.href) {
		// no need to refetch the journey, displayed journey is already correct
		return {
			formData: undefined,
			treeNodes: undefined
		};
	}

	const shortJourneyParam = url.searchParams.get("j");
	const longJourneyParam = url.searchParams.get("journey");
	if (shortJourneyParam === null && longJourneyParam === null) {
		// use selected journey
		return {
			journey: undefined
		};
	}
	// use journey params
	let tokens: string[];

	// figure out refresh tokens
	if (longJourneyParam !== null) {
		tokens = JSON.parse(decodeURIComponent(longJourneyParam)) as string[];
	} else {
		// get refresh tokens from short url
		const tokensResponse = (await fetch(`/api/journey/shorturl?token=${shortJourneyParam}`)
			.then((res) => res.json())
			.catch(() => undefined)) as VahrplanResult<string[]> | undefined;
		if (tokensResponse === undefined) {
			if (browser) {
				toast("Zum Server konnte keine Verbindung hergestellt werden.", "red");
				return;
			}
			error(500, "Server-Fehler.");
		}
		if (tokensResponse.isError) {
			error(404, "Token existiert nicht");
		}
		tokens = tokensResponse.content;
	}

	// get journey from refresh tokens
	const subjourneysResponse = (await fetch(
		`/api/journey?tokens=${encodeURIComponent(JSON.stringify(tokens))}`
	)
		.then((res) => res.json())
		.catch(() => undefined)) as VahrplanResult<SubJourney[]> | undefined;
	if (subjourneysResponse === undefined) {
		if (browser) {
			toast("Zum Server konnte keine Verbindung hergestellt werden.", "red");
			return;
		}
		error(500, "Server-Fehler.");
	}
	if (subjourneysResponse.isError) {
		error(subjourneysResponse.code, subjourneysResponse.message);
	}
	const subjourneys = subjourneysResponse.content;

	// prepare data to be served to client
	const locations = getKeyedLocationsFromJourney(subjourneys);
	const treeNodes = subjourneysToTreeNodes(subjourneys);

	return {
		treeNodes: treeNodes,
		formData: {
			locations,
			time: subjourneys.at(0)?.departureTime?.time ?? new Date(),
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
function getKeyedLocationsFromJourney(journey: SubJourney[]): KeyedItem<ParsedLocation, number>[] {
	const locations = journey.map((subjourney) => {
		const startLocation = getBlockStart(subjourney.blocks[0]);
		if (startLocation === undefined) {
			error(404);
		}
		return startLocation;
	});
	const lastLocation = getBlockEnd(journey.at(-1)?.blocks.at(-1));
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
 */
function subjourneysToTreeNodes(subJourneys: SubJourney[]): JourneyNode[] {
	return subJourneys.map((subJourney, i) => ({
		type: "journeyNode" as const,
		depth: i,
		idInDepth: 0,
		subJourney,
		children: []
	}));
}
