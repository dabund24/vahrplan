import { generateHashedDatabaseEntry, setDatabaseEntry } from "$lib/server/database";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";

export const PUT: RequestHandler = async function (reqEvent) {
	const client = apiClient("PUT", reqEvent.route.id);
	const { reqContent } = client.parseRequest(reqEvent);
	const entryData = generateHashedDatabaseEntry(await reqContent);
	await setDatabaseEntry(entryData);
	return client.formatResponse(new VahrplanSuccess(entryData.key));
};
