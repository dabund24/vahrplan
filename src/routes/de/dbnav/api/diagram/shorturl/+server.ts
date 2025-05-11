import { generateHashedDatabaseEntry, setDatabaseEntry } from "$lib/server/serverUtils.server";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";

export const PUT: RequestHandler = async function (reqEvent) {
	const client = apiClient("PUT", reqEvent.route.id);
	const reqContent = await client.parse(reqEvent);
	const entryData = generateHashedDatabaseEntry(reqContent);
	await setDatabaseEntry(entryData);
	return client.formatResponse(new VahrplanSuccess(entryData.key));
};
