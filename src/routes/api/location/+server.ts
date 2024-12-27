import { json, type RequestHandler } from "@sveltejs/kit";
import { journeyDataService } from "$lib/server/setup";
import type { Location } from "hafas-client";

export const GET: RequestHandler = async ({ url }) => {
	const param = JSON.parse(url.searchParams.get("id") ?? "") as string | Location;
	const result = await journeyDataService.location(param);
	return json(result, { status: result.isError ? result.code : 200 });
};
