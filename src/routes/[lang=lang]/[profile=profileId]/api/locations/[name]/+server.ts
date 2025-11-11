import type { RequestHandler } from "./$types";
import { journeyDataService } from "$lib/server/setup";
import { apiClient } from "$lib/api-client/apiClientFactory";

export const GET: RequestHandler = async (reqEvent) => {
	const client = apiClient("GET", reqEvent.route.id);
	const { language, profile, reqContent } = client.parseRequest(reqEvent);
	const result = await journeyDataService.locations(reqContent);
	return client.formatResponse(result);
};
