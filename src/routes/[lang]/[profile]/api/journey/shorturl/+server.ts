import type { RequestHandler } from "./$types";
import { generateHashedDatabaseEntry, setDatabaseEntry } from "$lib/server/serverUtils.server";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { apiClient } from "$lib/api-client/apiClientFactory";

export const PUT: RequestHandler = async function (reqEvent) {
	const client = apiClient("PUT", reqEvent.route.id);
	const keylessEntryData = await client.parse(reqEvent);
	const entryData = generateHashedDatabaseEntry(keylessEntryData);
	await setDatabaseEntry(entryData);
	return client.formatResponse(new VahrplanSuccess(entryData.key));
};
