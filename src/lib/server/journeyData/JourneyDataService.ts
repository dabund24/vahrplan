import type { JourneysOptions } from "hafas-client";
import type { ParsedLocation, SubJourney, ZugResponse } from "$lib/types";

export type JourneyNodesWithRefs = {
	journeys: SubJourney[];
	earlierRef: string;
	laterRef: string;
};

export type JourneyDataService = {
	/**
	 * get journeys between two stations
	 * @param from the location to start from
	 * @param to the location to go to
	 * @param options additional options
	 */
	journeys: (
		from: ParsedLocation["requestParameter"],
		to: ParsedLocation["requestParameter"],
		options: JourneysOptions
	) => Promise<JourneyNodesWithRefs>;

	/**
	 * get a journey consisting of multiple sub-journeys
	 * @param tokens refresh tokens of the sub-journeys
	 */
	refresh: (tokens: string[]) => Promise<ZugResponse<SubJourney[]>>;

	/**
	 * suggest locations based on a string. Can be used for autocomplete inputs
	 * @param name the location to find
	 */
	locations: (name: string) => Promise<ZugResponse<ParsedLocation[]>>;

	/**
	 * get a single location based on a token
	 * @param token the request token of the location
	 */
	location: (token: ParsedLocation["requestParameter"]) => Promise<ZugResponse<ParsedLocation>>;
};
