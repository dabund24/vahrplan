import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { profileRegistry } from "$lib/server/profiles/profileRegistry";
import { VahrplanSuccess } from "$lib/VahrplanResult";

export const GET: RequestHandler = (reqEvent) => {
	const client = apiClient("GET", reqEvent.route.id);
	const { lang, profile } = client.parseRequest(reqEvent);
	const result = profileRegistry(profile).configOfLanguage(lang);
	return client.formatResponse(new VahrplanSuccess(result));
};
