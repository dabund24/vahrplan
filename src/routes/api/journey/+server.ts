import type { RequestHandler } from "./$types";
import { journeyDataService } from "$lib/server/setup";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { VahrplanSuccess } from "$lib/VahrplanResult";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const tokens = client.parse(reqEvent);
	const { content } = (await journeyDataService.refresh(tokens)).throwIfError();
	return client.formatResponse(new VahrplanSuccess({ subJourneys: content }));
};
