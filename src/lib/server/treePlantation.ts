import { client } from "$lib/server/setup";
import type { JourneysOptions } from "hafas-client";
import type { JourneyNode, TransitType, ZugResponse } from "$lib/types";
import { getSuccessResponse } from "$lib/server/responses";
import { journeyToBlocks } from "$lib/server/parse";
import { getFirstAndLastTime } from "$lib/util";

const MAX_DATE = 8_640_000_000_000_000;
const SEARCH_MAX_THRESHOLD = 3;

type FromToOpt = {
	from: string;
	to: string;
	opt: JourneysOptions;
};

type TimeLimit = {
	type: TransitType;
	date: Date;
};

type JourneyNodesWithRefs = {
	nodes: JourneyNode[];
	earlierRef: string;
	laterRef: string;
};

export async function getJourneyTree(
	stops: string[],
	opt: JourneysOptions,
	transitType: TransitType
): Promise<ZugResponse<JourneyNode[]>> {
	// find all journeys of the tree
	let nodess = await getNodeArrays(stops, opt, transitType);

	// remove nodes that would lack a parent in the resulting tree
	nodess = cleanupNodeArrays(nodess);

	progressInDepths = Array.from({ length: stops.length - 1 }, () => 0);
	// construct the tree
	const result = getTreeFromNodeArrays(nodess, new Date(MAX_DATE), 0);

	return getSuccessResponse<JourneyNode[]>(result);
}

/**
 * get arrays of journeys for every neighboring pair of stops
 * @param stops stops part of the resulting diagram
 * @param opt user options
 * @param transitType meaning of the time the user specified
 */
async function getNodeArrays(
	stops: string[],
	opt: JourneysOptions,
	transitType: TransitType
): Promise<JourneyNode[][]> {
	// if `transitType` is `arrival`, the journeys have to be searched in reverse order
	const reverseOrder = transitType === "arrival";
	const complimentaryTransitType = reverseOrder ? "departure" : "arrival";
	const fallbackDate = new Date(transitType === "departure" ? 0 : MAX_DATE);

	opt.routingMode = reverseOrder ? "HYBRID" : "REALTIME"; // https://github.com/public-transport/hafas-client/issues/282
	opt.stopovers = true;
	opt.polylines = true;
	opt.startWithWalking = true;

	const nodess: JourneyNode[][] = [];
	const timeLimit: TimeLimit = {
		type: transitType,
		date: fallbackDate
	};
	const fromToOpt: FromToOpt = {
		from: "",
		to: "",
		opt
	};

	const start = reverseOrder ? stops.length - 2 : 0;
	const step = reverseOrder ? -1 : 1;

	for (let i = start; reverseOrder ? i >= 0 : i < stops.length - 1; i += step) {
		fromToOpt.from = stops[i];
		fromToOpt.to = stops[i + 1];
		const depthNodes = await findJourneysUntil({ ...fromToOpt }, timeLimit);
		fromToOpt.opt[transitType] =
			depthNodes.at(reverseOrder ? -1 : 0)?.[complimentaryTransitType][
				complimentaryTransitType
			]?.time ?? fallbackDate;

		nodess[i] = depthNodes;
		timeLimit.date =
			depthNodes.at(reverseOrder ? 0 : -1)?.[complimentaryTransitType][
				complimentaryTransitType
			]?.time ?? fallbackDate;
	}

	return nodess;
}

/**
 * searches for journeys with a given origin, destination and options until limit is exceeded
 * @param fromToOpt origin, destination and options
 * @param limit when to stop looking for more journeys
 */
async function findJourneysUntil(fromToOpt: FromToOpt, limit: TimeLimit): Promise<JourneyNode[]> {
	fromToOpt.opt = { ...fromToOpt.opt };
	const nodes: JourneyNode[] = [];
	const timeComparisonPrefix = limit.type === "departure" ? "later" : "earlier";

	// find first journeys
	let lastNodesWithRefs = await findJourneys(fromToOpt);
	nodes.push(...lastNodesWithRefs.nodes);

	// find remaining journeys
	delete fromToOpt.opt[limit.type]; // laterThan/earlierThan will be used instead
	let remainingSearches = SEARCH_MAX_THRESHOLD;
	// repeat finding process until limit is exceeded or `SEARCH_MAX_THRESHOLD` times
	while (
		!nodesExceedLimit[limit.type](lastNodesWithRefs.nodes, limit.date) &&
		remainingSearches > 0
	) {
		fromToOpt.opt[`${timeComparisonPrefix}Than`] =
			lastNodesWithRefs[`${timeComparisonPrefix}Ref`];
		lastNodesWithRefs = await findJourneys(fromToOpt);
		if (limit.type === "departure") {
			nodes.push(...lastNodesWithRefs.nodes);
		} else {
			nodes.unshift(...lastNodesWithRefs.nodes);
		}
		remainingSearches--;
	}
	return nodes;
}

/**
 * determine whether given nodes exceed a given limit.
 * Two functions are available:
 * - `departure` compares the limit with the first departure of the given nodes
 * - `arrival` compares the limit with the last arrival of the given nodes
 */
const nodesExceedLimit: { [K in TransitType]: (nodes: JourneyNode[], time: Date) => boolean } = {
	departure: (nodes, time) =>
		(nodes[0].departure.departure?.time.getTime() ?? 0) > time.getTime(),
	arrival: (nodes, time) => {
		return (nodes[0].arrival.arrival?.time.getTime() ?? MAX_DATE) < time.getTime();
	}
};

/**
 * returns journeyNodes with earlierRef and laterRef
 * @param fromToOpt origin, destination and options
 */
async function findJourneys(fromToOpt: FromToOpt): Promise<JourneyNodesWithRefs> {
	return client.journeys(fromToOpt.from, fromToOpt.to, fromToOpt.opt).then((journeys) => {
		return {
			nodes:
				journeys.journeys
					?.filter((journey) => journey.legs.every((leg) => !leg.cancelled))
					.map((journey) => {
						const blocks = journeyToBlocks(journey);
						return {
							refreshToken: journey.refreshToken ?? "",
							blocks,
							children: [],
							...getFirstAndLastTime(blocks),
							depth: 0,
							idInDepth: 0
						};
					}) ?? [],
			earlierRef: journeys.earlierRef ?? "",
			laterRef: journeys.laterRef ?? ""
		};
	});
}

/**
 * removes completely unreachable journeys
 * @param nodess node arrays for each section of the full journey
 */
function cleanupNodeArrays(nodess: JourneyNode[][]): JourneyNode[][] {
	for (let i = 1; i < nodess.length; i++) {
		const firstArrivalOfLastNodes = nodess[i - 1][0].arrival.arrival?.time.getTime();
		let indexOfFirstValidNode = 0;
		// increment this while `nodess[i][indexOfFirstValidNode]` starts before `firstArrivalOfLastNodes`
		while (
			indexOfFirstValidNode < nodess[i].length &&
			(nodess[i][indexOfFirstValidNode].departure.departure?.time.getTime() ?? 0) <
				(firstArrivalOfLastNodes ?? 0)
		) {
			indexOfFirstValidNode++;
		}
		// remove nodes starting to early
		nodess[i] = nodess[i].slice(indexOfFirstValidNode);
	}
	return nodess;
}

let progressInDepths: number[];

/**
 * recursively turn array of journeys into a tree fulfilling the constraints described in the readme
 * @param nodess each element contains the journeys of one subsection of the entire trip
 * @param includeUntil every returned journey starts before this time
 * @param depth recursion depth. only `nodess[depth]` will be considered in this recursion step
 */
function getTreeFromNodeArrays(
	nodess: JourneyNode[][],
	includeUntil: Date,
	depth: number
): JourneyNode[] {
	if (depth === nodess.length) {
		// base case
		return [];
	}

	const nodesToBeIncluded: JourneyNode[] = [];

	// include nodes until no more nodes are left over or the next journey starts after `includeUntil`
	while (
		progressInDepths[depth] < nodess[depth].length &&
		!nodeExceedsTime(nodess[depth][progressInDepths[depth]], includeUntil)
	) {
		const nextArrival =
			nodess[depth].at(progressInDepths[depth] + 1)?.arrival.arrival?.time ??
			new Date(MAX_DATE);

		const nodeToBeIncluded = nodess[depth][progressInDepths[depth]];
		nodeToBeIncluded.children = getTreeFromNodeArrays(nodess, nextArrival, depth + 1);
		nodeToBeIncluded.depth = depth;
		nodeToBeIncluded.idInDepth = progressInDepths[depth];

		nodesToBeIncluded.push(nodess[depth][progressInDepths[depth]]);
		progressInDepths[depth]++;
	}
	return nodesToBeIncluded;
}

/**
 * check if a node begins after the given time
 * @param node a node holding a journey
 * @param time the time to compare against
 */
function nodeExceedsTime(node: JourneyNode, time: Date): boolean {
	return (node.departure.departure?.time.getTime() ?? 0) >= time.getTime();
}
