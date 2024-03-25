import type { RequestHandler } from "@sveltejs/kit";
import { getJourneyTree } from "$lib/server/treePlantation";
import { getZugError } from "$lib/server/responses";
import type { JourneysOptions } from "hafas-client";

export const GET: RequestHandler = async ({ url }) => {
	let stops: string[];
	let options: JourneysOptions;
	try {
		stops = JSON.parse(url.searchParams.get("stops") ?? "") as string[];
		options = JSON.parse(url.searchParams.get("options") ?? "") as JourneysOptions;
	} catch (e) {
		console.log(e);
		return new Response(JSON.stringify(getZugError("HAFAS_INVALID_REQUEST")));
	}

	options.departure = new Date(Date.now());
	options.results = 10;
	const result = await getJourneyTree(stops, options);
	return new Response(JSON.stringify(result));
};
