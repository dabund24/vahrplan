import type { RequestHandler } from "./$types";
import { getDatabaseEntry } from "$lib/server/database";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";
import { apiClient } from "$lib/api-client/apiClientFactory";
import type { ApiClient } from "$lib/api-client/ApiClient";
import type { GetDiagramShortUrlApiClient } from "./getClient";
import { m } from "$lib/paraglide/messages";

type ResType =
	GetDiagramShortUrlApiClient extends ApiClient<infer _A, infer ResT, infer _B, infer _C>
		? ResT
		: never;

export const GET: RequestHandler = async function ({ url, params, route }) {
	const client = apiClient("GET", route.id);
	const { reqContent, lang } = client.parseRequest({ url, params });
	const diagramData = await getDatabaseEntry<ResType>("journeys", reqContent);
	if (diagramData === undefined) {
		// invalid token
		return client.formatResponse(
			VahrplanError.withMessage("NOT_FOUND", m.error_link_invalid({}, { locale: lang })),
		);
	}
	return client.formatResponse(new VahrplanSuccess(diagramData));
};
