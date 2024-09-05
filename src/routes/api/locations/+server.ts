import { json, type RequestHandler } from "@sveltejs/kit";
import { parseStationStopLocation } from "$lib/server/parse/parse";
import { getSuccessResponse, getZugErrorFromHafasError } from "$lib/server/responses";
import { hafasClient } from "$lib/server/setup";

export const GET: RequestHandler = async ({ url }) => {
	const result = await hafasClient
		.locations(url.searchParams.get("name") ?? "", { results: 10 })
		.then((locations) => getSuccessResponse(locations.map(parseStationStopLocation)))
		.catch(getZugErrorFromHafasError);
	return json(result, { status: result.isError ? result.code : 200 });
};
