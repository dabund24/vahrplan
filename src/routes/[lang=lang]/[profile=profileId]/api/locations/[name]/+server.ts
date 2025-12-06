import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";

export const GET: RequestHandler = async ({ url, route, params }) => {
	const client = apiClient("GET", route.id);
	const { lang, profile, reqContent } = client.parseRequest({ url, params });
	const dataService = journeyDataService(profile, lang);
	const result = await dataService.locations(reqContent, { lang });
	return client.formatResponse(result);
};
