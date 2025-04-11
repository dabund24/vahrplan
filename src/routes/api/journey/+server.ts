import type { RequestHandler } from "./$types";
import { journeyDataService } from "$lib/server/setup";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { buildLocationEquivalenceSystemFromSubJourneys } from "../diagram/locationRepresentatives.server";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const tokens = client.parse(reqEvent);
	const { content: subJourneys } = (await journeyDataService.refresh(tokens)).throwIfError();
	const locationEquivalenceSystem = buildLocationEquivalenceSystemFromSubJourneys(subJourneys);
	return client.formatResponse(new VahrplanSuccess({ subJourneys, locationEquivalenceSystem }));
};
