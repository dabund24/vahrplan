import type { RequestHandler } from "./$types";
import { journeyDataService } from "$lib/server/setup";
import { apiClient } from "$lib/api-client/apiClientFactory";

export const GET: RequestHandler = async (reqEvent) => {
	const client = apiClient("GET", reqEvent.route.id);
	const name = client.parse(reqEvent);
	const result = await journeyDataService.locations(name);
	return client.formatResponse(result);
};
