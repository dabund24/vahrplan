import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const { lang, profile, reqContent } = client.parseRequest(reqEvent);
	const dataService = journeyDataService(profile, lang);
	const tripData = await dataService.trip(reqContent.tripId, { lang });
	return client.formatResponse(tripData);
};
