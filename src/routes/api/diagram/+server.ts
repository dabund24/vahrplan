import { json, type RequestHandler } from "@sveltejs/kit";
import { getJourneyTree } from "$lib/server/treePlantation";
import { getZugError } from "$lib/server/responses";
import { parseApiJourneysUrl } from "$lib/urls";

export const GET: RequestHandler = async function ({ url }) {
	const diagramData = parseApiJourneysUrl(url);

	if (diagramData === undefined) {
		return json(getZugError("HAFAS_INVALID_REQUEST"));
	}

	const { stops, timeRole, options } = diagramData;

	options[timeRole] = diagramData.time;
	options.results = 10;
	options.language = "de";
	const result = await getJourneyTree(stops, options, timeRole);
	return json(result);
};
