import type { SubJourney, TransitType, TreeNode } from "$lib/types";

const MAX_DATE = 8_640_000_000_000_000;

type RecursionInfo = {
	depth: number;
	progressInDepths: number[];
};

/**
 * turn columns into a tree
 * @param columns columns of arrival and departure times of sub-journeys
 */
export function buildTree(columns: Record<TransitType, string>[][]): TreeNode[] {
	const progressInDepths = Array.from({ length: columns.length }, () => -1);

	return getTreeFromNodeArrays(columns, new Date(MAX_DATE).toISOString(), {
		depth: 0,
		progressInDepths
	});
}

/**
 * recursively turn array of journeys into a tree fulfilling the constraints described in the readme
 * @param columns each element contains data of all journeys of one subsection of the entire trip
 * @param includeUntil every returned journey starts before this time
 * @param recursionInfo stores current recursion depth and progress for each depth
 */
function getTreeFromNodeArrays(
	columns: Record<TransitType, string>[][],
	includeUntil: string,
	recursionInfo: RecursionInfo
): TreeNode[] {
	const depth = recursionInfo.depth;
	const progressInDepths = recursionInfo.progressInDepths;
	if (depth === columns.length) {
		// base case
		return [];
	}

	const nodesToBeIncluded: TreeNode[] = [];

	// include nodes until no more nodes are left over or the next journey starts after `includeUntil`
	while (
		progressInDepths[depth] < 0 ||
		(progressInDepths[depth] < columns[depth].length &&
			new Date(columns[depth][progressInDepths[depth]].departure ?? MAX_DATE).getTime() <
				new Date(includeUntil).getTime())
	) {
		const nextArrival =
			columns[depth].at(progressInDepths[depth] + 1)?.arrival ??
			new Date(MAX_DATE).toISOString();

		let nodeToBeIncluded: TreeNode;
		if (progressInDepths[depth] === -1) {
			// completely unreachable journeys are put into an empty node
			nodeToBeIncluded = { type: "emptyNode", children: [] };
		} else {
			nodeToBeIncluded = {
				type: "journeyNode",
				timeData: columns[depth][progressInDepths[depth]],
				columnIndex: depth,
				rowIndex: progressInDepths[depth],
				children: []
			};
			// const nodeJourney = subJourneyss[depth][progressInDepths[depth]];
			// nodeToBeIncluded = fetchedJourneyToNode(nodeJourney, recursionInfo);
		}
		nodeToBeIncluded.children = getTreeFromNodeArrays(columns, nextArrival, {
			depth: depth + 1,
			progressInDepths
		});
		nodesToBeIncluded.push(nodeToBeIncluded);
		progressInDepths[depth]++;
	}
	return nodesToBeIncluded;
}

export function subJourneyToNodeData(subJourney: SubJourney): Record<TransitType, string> {
	return {
		departure: subJourney.departureTime?.time ?? new Date(0).toISOString(),
		arrival: subJourney.arrivalTime?.time ?? new Date(MAX_DATE).toISOString()
	};
}

export function unfoldTree(tree: TreeNode[], columnCount: number): Record<TransitType, string>[][] {
	return unfoldTreeRec(
		tree,
		0,
		Array.from({ length: columnCount }, () => [])
	);
}

/**
 * unfold tree with inorder traversal and store the result in columns
 * @param tree
 * @param depth
 * @param columns
 */
function unfoldTreeRec(
	tree: TreeNode[],
	depth: number,
	columns: Record<TransitType, string>[][]
): Record<TransitType, string>[][] {
	for (const node of tree) {
		if (node.type === "journeyNode") {
			columns[depth].push(node.timeData);
		}
		columns = unfoldTreeRec(node.children, depth + 1, columns);
	}
	return columns;
}
