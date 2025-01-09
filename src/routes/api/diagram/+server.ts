import { json, type RequestHandler } from "@sveltejs/kit";
import { getJourneyTree } from "./treePlantation.server";
import { parseApiJourneysUrl } from "$lib/urls";
import { VahrplanError } from "$lib/VahrplanError";

export const GET: RequestHandler = async function ({ url }) {
	const diagramData = parseApiJourneysUrl(url);

	if (diagramData === undefined) {
		return json(new VahrplanError("NOT_FOUND"), { status: 404 });
	}

	const { stops, timeRole, options } = diagramData;

	if (stops.length > 7) {
		return json(new VahrplanError("ERROR"), { status: 500 });
	}

	options[timeRole] = diagramData.time;
	options.results = 10;
	options.language = "de";
	const result = await getJourneyTree(stops, options, timeRole).catch(() => {
		return VahrplanError.withMessage("ERROR", "Diagramm konnte nicht generiert werden");
	});
	return json(result, { status: result.isError ? result.code : 200 });
};
