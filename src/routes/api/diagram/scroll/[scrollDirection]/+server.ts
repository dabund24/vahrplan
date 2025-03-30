import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { fetchJourneys } from "../../fetchJourneys.server";
import type { RelativeTimeType, TimeData, TransitType } from "$lib/types";
import { buildTree, subJourneyToNodeData, unfoldTree } from "../../treePlantation.server";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import type { DiagramData } from "$lib/state/diagramData.svelte";

export const POST: RequestHandler = async function (reqEvent) {
	const client = apiClient("POST", reqEvent.route.id);
	const { scrollDirection, tokens, stops, tree, options, recommendedVias } =
		await client.parse(reqEvent);

	const timeData: TimeData[] = tokens.map((token) => ({
		type: "relative",
		time: token,
		scrollDirection
	}));
	const resColumns = await fetchJourneys(stops, timeData, options);
	if (resColumns.isError) {
		return client.formatResponse(resColumns);
	}
	const newNodeData = resColumns.content.map((d) => d.journeys.map(subJourneyToNodeData));
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

	return client.formatResponse(
		new VahrplanSuccess({ columns: resColumns.content, tree: resTree, recommendedVias, isNew })
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
