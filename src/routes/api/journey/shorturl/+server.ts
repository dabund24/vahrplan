import {
	generateHashedDatabaseEntry,
	getDatabaseEntry,
	setDatabaseEntry
} from "$lib/server/serverUtils";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import type { KeylessDatabaseEntry } from "$lib/types";

export const PUT: RequestHandler = async function ({ request }) {
	const keylessEntryData = (await request.json()) as KeylessDatabaseEntry<(string | null)[]>;
	const entryData = generateHashedDatabaseEntry(keylessEntryData);
	await setDatabaseEntry(entryData);
	return json(entryData.key);
};

export const GET: RequestHandler = async function ({ url }) {
	const shortToken = url.searchParams.get("token");
	if (shortToken === null) {
		// no token
		return error(404);
	}
	const hafasTokens = await getDatabaseEntry<(string | null)[]>("journey", shortToken);
	if (hafasTokens === undefined) {
		// invalid token
		return error(404);
	}
	return json(hafasTokens);
};
