import type { RequestHandler } from "./$types";
import { getDatabaseEntry } from "$lib/server/serverUtils.server";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";
import { apiClient } from "$lib/api-client/apiClientFactory";
import type { GetDiagramApiClient } from "../../getClient";

type ResType = Parameters<GetDiagramApiClient["request"]>[0];

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const reqContent = client.parse(reqEvent);
	const diagramData = await getDatabaseEntry<ResType>("journeys", reqContent);
	if (diagramData === undefined) {
		// invalid token
		return client.formatResponse(
			VahrplanError.withMessage(
				"NOT_FOUND",
				"Der angegebene Link ist fehlerhaft oder nicht mehr gültig."
			)
		);
	}
	return client.formatResponse(new VahrplanSuccess(diagramData));
};
