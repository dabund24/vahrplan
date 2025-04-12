import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { fetchJourneys } from "../../fetchJourneys.server";
import type { RelativeTimeType, TimeData, TransitType } from "$lib/types";
import { buildTree, subJourneyToNodeData, unfoldTree } from "../../treePlantation.server";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import type { DiagramData } from "$lib/state/diagramData.svelte";
import { buildLocationEquivalenceSystemFromSubJourneys } from "../../locationRepresentatives.server";
import { generateSvgData } from "$lib/server/svgData/svgData.server";

export const POST: RequestHandler = async function (reqEvent) {
	const client = apiClient("POST", reqEvent.route.id);
	const reqData = await client.parse(reqEvent);
	const { scrollDirection, tokens, stops, tree, options, recommendedVias } = reqData;
	let { locationEquivalenceSystem } = reqData;

	const timeData: TimeData[] = tokens.map((token) => ({
		type: "relative",
		time: token,
		scrollDirection
	}));
	const resColumns = await fetchJourneys(stops, timeData, options);
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

	locationEquivalenceSystem = buildLocationEquivalenceSystemFromSubJourneys(
		subJourneyMatrix.flat(),
		locationEquivalenceSystem
	);

	const svgData = generateSvgData(subJourneyMatrix, {
		timeData: oldNodeData,
		locationEquivalenceSystem
	});

	return client.formatResponse(
		new VahrplanSuccess({
			columns: resColumns.content,
			tree: resTree,
			svgData,
			locationEquivalenceSystem,
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
