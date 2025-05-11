import { getDatabaseEntry } from "$lib/server/serverUtils.server";
import type { RequestHandler } from "./$types";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";
import { apiClient } from "$lib/api-client/apiClientFactory";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const shortToken = client.parse(reqEvent);
	const hafasTokens = await getDatabaseEntry<string[]>("journey", shortToken);
	if (hafasTokens === undefined) {
		// invalid token
		return client.formatResponse(
			VahrplanError.withMessage(
				"NOT_FOUND",
				"Der angegebene Link ist fehlerhaft oder nicht mehr gültig."
			)
		);
	}
	return client.formatResponse(new VahrplanSuccess(hafasTokens));
};
