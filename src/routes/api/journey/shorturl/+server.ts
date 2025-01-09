import {
	generateHashedDatabaseEntry,
	getDatabaseEntry,
	setDatabaseEntry
} from "$lib/server/serverUtils";
import { json, type RequestHandler } from "@sveltejs/kit";
import type { KeylessDatabaseEntry } from "$lib/types";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";

export const PUT: RequestHandler = async function ({ request }) {
	const keylessEntryData = (await request.json()) as KeylessDatabaseEntry<string[]>;
	const entryData = generateHashedDatabaseEntry(keylessEntryData);
	await setDatabaseEntry(entryData);
	return json(new VahrplanSuccess(entryData.key));
};

export const GET: RequestHandler = async function ({ url }) {
	const shortToken = url.searchParams.get("token");
	if (shortToken === null) {
		// no token
		return json(VahrplanError.withMessage("NOT_FOUND", "URL ist fehlerhaft."), { status: 404 });
	}
	const hafasTokens = await getDatabaseEntry<string[]>("journey", shortToken);
	if (hafasTokens === undefined) {
		// invalid token
		return json(VahrplanError.withMessage("NOT_FOUND", "URL ist fehlerhaft."), { status: 404 });
	}
	return json(new VahrplanSuccess(hafasTokens));
};
