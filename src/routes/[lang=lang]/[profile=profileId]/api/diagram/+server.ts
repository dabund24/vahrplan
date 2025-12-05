import type { RequestHandler } from "./$types";
import { buildTree, subJourneyToNodeData } from "./treePlantation.server";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { fetchJourneys } from "./fetchJourneys.server";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import recommendVias from "./viaRecommendations.server";
import type { DiagramData } from "$lib/state/diagramData.svelte.js";
import { buildTransferLocationEquivalenceSystemFromSubJourneys } from "./locationRepresentatives.server";
import { generateSvgData } from "$lib/server/svgData/svgData.server";
import { journeyDataService } from "../profile/profileRegistry.server";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const {
		lang,
		profile,
		reqContent: { stops, timeData: timeStart, filters }
	} = client.parseRequest(reqEvent);
	const dataService = journeyDataService(profile, lang);

	const journeyColumns = await fetchJourneys(
		stops,
		{ timeStart, filters },
		{ dataService, lang }
	);
	if (journeyColumns.isError) {
		return client.formatResponse(journeyColumns);
	}
	const subJourneyMatrix = journeyColumns.content.map((column) => column.journeys);

	const timeData = subJourneyMatrix.map((column) => column.map(subJourneyToNodeData));
	const tree = buildTree(timeData);

	const transferLocations = buildTransferLocationEquivalenceSystemFromSubJourneys(
		subJourneyMatrix.flat()
	);

	const recommendedVias = subJourneyMatrix.map((j) => recommendVias(j));

	const svgData = generateSvgData(subJourneyMatrix, { timeData, transferLocations });

	const isNew = journeyColumns.content.map((column) => column.journeys.map((_) => false));

	const result: DiagramData = {
		columns: journeyColumns.content,
		tree,
		svgData,
		transferLocations,
		recommendedVias,
		isNew
	};
	return client.formatResponse(new VahrplanSuccess(result));
};
