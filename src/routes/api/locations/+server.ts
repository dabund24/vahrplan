import type { RequestHandler } from "@sveltejs/kit";
import { client } from "$lib/server/setup";
import { parseStationStopLocation } from "$lib/server/parse";
import { getSuccessResponse, getZugErrorFromHafasError } from "$lib/server/responses";

export const GET: RequestHandler = async ({ url }) => {
	const result = await client
		.locations(url.searchParams.get("name") ?? "", { results: 10 })
		.then((locations) => getSuccessResponse(locations.map(parseStationStopLocation)))
		.catch(getZugErrorFromHafasError);
	return new Response(JSON.stringify(result));
};
