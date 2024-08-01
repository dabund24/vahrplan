import {
	generateHashedDatabaseEntry,
	getDatabaseEntry,
	setDatabaseEntry
} from "$lib/server/serverUtils";
import { json, type RequestHandler } from "@sveltejs/kit";
import type { KeylessDatabaseEntry } from "$lib/types";
import { getSuccessResponse, getZugError } from "$lib/server/responses";

export const PUT: RequestHandler = async function ({ request }) {
	const keylessEntryData = (await request.json()) as KeylessDatabaseEntry<string[]>;
	const entryData = generateHashedDatabaseEntry(keylessEntryData);
	await setDatabaseEntry(entryData);
	return json(getSuccessResponse(entryData.key));
};

export const GET: RequestHandler = async function ({ url }) {
	const shortToken = url.searchParams.get("token");
	if (shortToken === null) {
		// no token
		return json(getZugError("NOT_FOUND"));
	}
	const hafasTokens = await getDatabaseEntry<string[]>("journey", shortToken);
	if (hafasTokens === undefined) {
		// invalid token
		return json(getZugError("NOT_FOUND"));
	}
	return json(getSuccessResponse(hafasTokens));
};
