import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { fetchJourneys } from "../../fetchJourneys.server";
import type { RelativeTimeType, TimeData, TransitType } from "$lib/types";
import { buildTree, subJourneyToNodeData, unfoldTree } from "../../treePlantation.server";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import type { DiagramData } from "$lib/state/diagramData.svelte.js";
import { buildTransferLocationEquivalenceSystemFromSubJourneys } from "../../locationRepresentatives.server";
import { generateSvgData } from "$lib/server/svgData/svgData.server";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";

export const POST: RequestHandler = async function (reqEvent) {
	const client = apiClient("POST", reqEvent.route.id);
	const { lang, profile, reqContent } = client.parseRequest(reqEvent);
	const { scrollDirection, tokens, stops, tree, filters, recommendedVias } = await reqContent;
	let { transferLocations } = await reqContent;
	const dataService = journeyDataService(profile, lang);

	const timeStart: TimeData[] = tokens.map((token) => ({
		type: "relative",
		time: token,
		scrollDirection
	}));
	const resColumns = await fetchJourneys(stops, { timeStart, filters }, { dataService, lang });
	if (resColumns.isError) {
		return client.formatResponse(resColumns);
	}
	const subJourneyMatrix = resColumns.content.map((column) => column.journeys);

	const newNodeData = subJourneyMatrix.map((column) => column.map(subJourneyToNodeData));
	const oldNodeData = unfoldTree(tree, tokens.length);
	const isNew = computeIsNew(scrollDirection, oldNodeData, newNodeData);

	oldNodeData.forEach((column, columnIndex) => {
		if (scrollDirection === "earlier") {
			column.unshift(...newNodeData[columnIndex]);
		} else {
			column.push(...newNodeData[columnIndex]);
		}
	});
	const resTree = buildTree(oldNodeData);

	transferLocations = buildTransferLocationEquivalenceSystemFromSubJourneys(
		subJourneyMatrix.flat(),
		transferLocations
	);

	const svgData = generateSvgData(subJourneyMatrix, {
		timeData: oldNodeData,
		transferLocations: transferLocations
	});

	return client.formatResponse(
		new VahrplanSuccess({
			columns: resColumns.content,
			tree: resTree,
			svgData,
			transferLocations: transferLocations,
			recommendedVias,
			isNew
		})
	);
};

function computeIsNew(
	scrollDirection: RelativeTimeType,
	oldNodeData: Record<TransitType, string>[][],
	newNodeData: Record<TransitType, string>[][]
): DiagramData["isNew"] {
	return Array.from(oldNodeData, (oldColumn, columnIndex) => {
		const newColumn = newNodeData[columnIndex];

		return Array.from({ length: oldColumn.length + newColumn.length }, (_, rowIndex) => {
			if (scrollDirection === "earlier") {
				return rowIndex < newColumn.length;
			}
			return rowIndex > oldColumn.length;
		});
	});
}
