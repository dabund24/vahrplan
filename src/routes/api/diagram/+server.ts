import { json, type RequestHandler } from "@sveltejs/kit";
import { getJourneyTree } from "$lib/server/treePlantation";
import { getZugError } from "$lib/server/responses";
import { parseApiJourneysUrl } from "$lib/urls";

export const GET: RequestHandler = async function ({ url }) {
	const diagramData = parseApiJourneysUrl(url);

	if (diagramData === undefined) {
		return json(getZugError("NOT_FOUND"), { status: 404 });
	}

	const { stops, timeRole, options } = diagramData;

	if (stops.length > 7) {
		return json(getZugError("ERROR"), { status: 500 });
	}

	options[timeRole] = diagramData.time;
	options.results = 10;
	options.language = "de";
	const result = await getJourneyTree(stops, options, timeRole);
	return json(result, { status: result.isError ? result.code : 200 });
};
