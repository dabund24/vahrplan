import { json, type RequestHandler } from "@sveltejs/kit";
import type { KeylessDatabaseEntry } from "$lib/types";
import {
	generateHashedDatabaseEntry,
	getDatabaseEntry,
	setDatabaseEntry
} from "$lib/server/serverUtils";
import type { DiagramRequestData } from "$lib/types";
import { getSuccessResponse, getZugError } from "$lib/server/responses";

export const PUT: RequestHandler = async function ({ request }) {
	const keylessEntryData = (await request.json()) as KeylessDatabaseEntry<DiagramRequestData>;
	const entryData = generateHashedDatabaseEntry(keylessEntryData);
	await setDatabaseEntry(entryData);
	return json(getSuccessResponse(entryData.key));
};

export const GET: RequestHandler = async function ({ url }) {
	const shortToken = url.searchParams.get("token");
	if (shortToken === null) {
		// no token
		return json(getZugError("NOT_FOUND"), { status: 404 });
	}
	const diagramData = await getDatabaseEntry<DiagramRequestData>("journeys", shortToken);
	if (diagramData === undefined) {
		// invalid token
		return json(getZugError("NOT_FOUND"), { status: 404 });
	}
	return json(getSuccessResponse(diagramData), { status: 200 });
};
