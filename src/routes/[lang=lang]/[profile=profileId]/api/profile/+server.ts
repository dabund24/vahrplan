import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { profileConfig } from "./profileRegistry.server";
import { VahrplanSuccess } from "$lib/VahrplanResult";

export const GET: RequestHandler = (reqEvent) => {
	const client = apiClient("GET", reqEvent.route.id);
	const { language, profile } = client.parseRequest(reqEvent);
	const result = profileConfig(profile, language);
	return client.formatResponse(new VahrplanSuccess(result));
};
