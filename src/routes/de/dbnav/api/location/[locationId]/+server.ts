import type { RequestHandler } from "./$types";
import { journeyDataService } from "$lib/server/setup";
import { apiClient } from "$lib/api-client/apiClientFactory";

export const GET: RequestHandler = async (reqEvent) => {
	const client = apiClient("GET", reqEvent.route.id);
	const locationId = client.parse(reqEvent);
	const result = await journeyDataService.location(locationId);
	return client.formatResponse(result);
};
