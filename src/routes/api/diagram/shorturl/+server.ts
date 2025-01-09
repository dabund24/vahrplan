import { json, type RequestHandler } from "@sveltejs/kit";
import type { KeylessDatabaseEntry } from "$lib/types";
import {
	generateHashedDatabaseEntry,
	getDatabaseEntry,
	setDatabaseEntry
} from "$lib/server/serverUtils";
import type { DiagramRequestData } from "$lib/types";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";

export const PUT: RequestHandler = async function ({ request }) {
	const keylessEntryData = (await request.json()) as KeylessDatabaseEntry<DiagramRequestData>;
	const entryData = generateHashedDatabaseEntry(keylessEntryData);
	await setDatabaseEntry(entryData);
	return json(new VahrplanSuccess(entryData.key));
};

export const GET: RequestHandler = async function ({ url }) {
	const shortToken = url.searchParams.get("token");
	if (shortToken === null) {
		// no token
		return json(VahrplanError.withMessage("NOT_FOUND", "URL ist fehlerhaft"), { status: 404 });
	}
	const diagramData = await getDatabaseEntry<DiagramRequestData>("journeys", shortToken);
	if (diagramData === undefined) {
		// invalid token
		return json(VahrplanError.withMessage("NOT_FOUND", "URL ist fehlerhaft."), { status: 404 });
	}
	return json(new VahrplanSuccess(diagramData), { status: 200 });
};
