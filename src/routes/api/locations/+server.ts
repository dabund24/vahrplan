import { json, type RequestHandler } from "@sveltejs/kit";
import { journeyDataService } from "$lib/server/setup";

export const GET: RequestHandler = async ({ url }) => {
	const nameParam = url.searchParams.get("name") ?? "";
	const result = await journeyDataService.locations(nameParam);
	return json(result, { status: result.isError ? result.code : 200 });
};
