import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { allProfileConfigs } from "$lib/server/profiles/profileRegistry";
import { VahrplanSuccess } from "$lib/VahrplanResult";

export const GET: RequestHandler = (reqEvent) => {
	const client = apiClient("GET", reqEvent.route.id);
	const { lang } = client.parseRequest(reqEvent);
	const result = allProfileConfigs(lang);
	return client.formatResponse(new VahrplanSuccess(result));
};
