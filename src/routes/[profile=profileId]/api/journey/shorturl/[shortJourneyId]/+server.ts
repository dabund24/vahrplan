import { getDatabaseEntry } from "$lib/server/database";
import type { RequestHandler } from "./$types";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { m } from "$lib/paraglide/messages";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const { reqContent, lang } = client.parseRequest(reqEvent);
	const journeyIds = await getDatabaseEntry<string[]>("journey", reqContent);
	if (journeyIds === undefined) {
		// invalid token
		return client.formatResponse(
			VahrplanError.withMessage("NOT_FOUND", m.error_link_invalid({}, { locale: lang })),
		);
	}
	return client.formatResponse(new VahrplanSuccess(journeyIds));
};
