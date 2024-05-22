import type { RequestHandler } from "@sveltejs/kit";
import { getJourneyTree } from "$lib/server/treePlantation";
import { getZugError } from "$lib/server/responses";
import type { JourneysOptions } from "hafas-client";
import type { TransitType } from "$lib/types";

export const GET: RequestHandler = async ({ url }) => {
	let stops: string[];
	let transitType: TransitType;
	let options: JourneysOptions;
	try {
		stops = JSON.parse(url.searchParams.get("stops") ?? "") as string[];
		options = JSON.parse(url.searchParams.get("options") ?? "") as JourneysOptions;
		transitType = url.searchParams.get("timeRole") as TransitType;
		options[transitType] = new Date(url.searchParams.get("time") as string);
	} catch (e) {
		return new Response(JSON.stringify(getZugError("HAFAS_INVALID_REQUEST")));
	}

	options.results = 10;
	const result = await getJourneyTree(stops, options, transitType);
	return new Response(JSON.stringify(result));
};
