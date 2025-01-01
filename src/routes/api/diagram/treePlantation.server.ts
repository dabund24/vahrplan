import { journeyDataService } from "$lib/server/setup";
import type { JourneysOptions, Location, Station, Stop } from "hafas-client";
import type {
	Diagram,
	JourneyNode,
	SubJourney,
	TransitType,
	TreeNode,
	ZugResponse
} from "$lib/types";
import { getSuccessResponse, getZugErrorFromHafasError } from "$lib/server/responses";
import recommendVias from "./viaRecommendations.server";

const MAX_DATE = 8_640_000_000_000_000;
const SEARCH_MAX_THRESHOLD = 2;

type FromToOpt = {
	from: string | Station | Stop | Location;
	to: string | Station | Stop | Location;
	opt: JourneysOptions;
};

type TimeLimit = {
	type: TransitType;
	date: Date;
};

type RecursionInfo = {
	depth: number;
	progressInDepths: number[];
};

export async function getJourneyTree(
	stops: (string | Station | Stop | Location)[],
	opt: JourneysOptions,
	transitType: TransitType
): Promise<ZugResponse<Diagram>> {
	opt.routingMode = transitType === "departure" ? "REALTIME" : "HYBRID"; // https://github.com/public-transport/hafas-client/issues/282
	opt.stopovers = true;
	opt.polylines = true;
	opt.startWithWalking = true;

	// find all journeys of the tree
	const subJourneysArraysResult = await getJourneyArrays(stops, opt, transitType);
	if (subJourneysArraysResult.isError) {
		return subJourneysArraysResult;
	}

	const progressInDepths = Array.from({ length: stops.length - 1 }, () => -1);
	// construct the tree
	const tree = getTreeFromNodeArrays(subJourneysArraysResult.content, new Date(MAX_DATE), {
		depth: 0,
		progressInDepths
	});

	// find useful vias
	const recommendedVias = subJourneysArraysResult.content.map((subJourney) =>
		recommendVias(subJourney.map((subJourney) => subJourney.blocks))
	);

	return getSuccessResponse({ recommendedVias, tree });
}

/**
 * get arrays of journeys for every neighboring pair of stops
 * @param stops stops part of the resulting diagram
 * @param opt user options
 * @param transitType meaning of the time the user specified
 */
async function getJourneyArrays(
	stops: (string | Station | Stop | Location)[],
	opt: JourneysOptions,
	transitType: TransitType
): Promise<ZugResponse<SubJourney[][]>> {
	// if `transitType` is `arrival`, the journeys have to be searched in reverse order
	const isReverseOrder = transitType === "arrival";
	const complimentaryTransitType = isReverseOrder ? "departure" : "arrival";
	const fallbackDate = new Date(transitType === "departure" ? 0 : MAX_DATE);

	const journeyss: SubJourney[][] = [];
	const timeLimit: TimeLimit = {
		type: transitType,
		date: fallbackDate
	};
	const fromToOpt: FromToOpt = {
		from: "",
		to: "",
		opt
	};

	const start = isReverseOrder ? stops.length - 2 : 0;
	const step = isReverseOrder ? -1 : 1;

	for (let i = start; isReverseOrder ? i >= 0 : i < stops.length - 1; i += step) {
		fromToOpt.from = stops[i];
		fromToOpt.to = stops[i + 1];
		let depthJourneys;
		try {
			depthJourneys = await findJourneysUntil({ ...fromToOpt }, timeLimit);
		} catch (e) {
			return getZugErrorFromHafasError(e, i, i + 1);
		}
		fromToOpt.opt[transitType] =
			depthJourneys.at(isReverseOrder ? -1 : 0)?.[`${complimentaryTransitType}Time`]?.time ??
			fallbackDate;

		journeyss[i] = depthJourneys;
		timeLimit.date =
			depthJourneys.at(isReverseOrder ? 0 : -1)?.[`${complimentaryTransitType}Time`]?.time ??
			fallbackDate;
	}

	return getSuccessResponse<SubJourney[][]>(journeyss);
}

/**
 * searches for journeys with a given origin, destination and options until limit is exceeded
 * @param fromToOpt origin, destination and options
 * @param limit when to stop looking for more journeys
 */
async function findJourneysUntil(fromToOpt: FromToOpt, limit: TimeLimit): Promise<SubJourney[]> {
	fromToOpt.opt = { ...fromToOpt.opt };
	const journeys: SubJourney[] = [];
	const timeComparisonPrefix = limit.type === "departure" ? "later" : "earlier";

	// find first journeys
	let lastJourneysWithRef = await journeyDataService.journeys(
		fromToOpt.from,
		fromToOpt.to,
		fromToOpt.opt
	);
	journeys.push(...lastJourneysWithRef.journeys);

	// find remaining journeys
	delete fromToOpt.opt[limit.type]; // laterThan/earlierThan will be used instead
	let remainingSearches = SEARCH_MAX_THRESHOLD;
	// repeat finding process until limit is exceeded or `SEARCH_MAX_THRESHOLD` times
	while (
		!journeysExceedLimit[limit.type](lastJourneysWithRef.journeys, limit.date) &&
		remainingSearches > 0 &&
		(lastJourneysWithRef[`${timeComparisonPrefix}Ref`] ?? "") !== "" // this may happen if the journey is further in the future!
	) {
		fromToOpt.opt[`${timeComparisonPrefix}Than`] =
			lastJourneysWithRef[`${timeComparisonPrefix}Ref`];
		lastJourneysWithRef = await journeyDataService.journeys(
			fromToOpt.from,
			fromToOpt.to,
			fromToOpt.opt
		);
		if (limit.type === "departure") {
			journeys.push(...lastJourneysWithRef.journeys);
		} else {
			journeys.unshift(...lastJourneysWithRef.journeys);
		}
		remainingSearches--;
	}

	if (limit.type === "arrival") {
		// sorting is necessary because of hybrid routing
		journeys.sort(
			(a, b) =>
				(a.departureTime?.time.getTime() ?? 0) - (b.departureTime?.time.getTime() ?? 0)
		);
	}
	return journeys;
}

/**
 * determine whether given nodes exceed a given limit.
 * Two functions are available:
 * - `departure` compares the limit with the first departure of the given nodes
 * - `arrival` compares the limit with the last arrival of the given nodes
 */
const journeysExceedLimit: Record<TransitType, (subJourneys: SubJourney[], time: Date) => boolean> =
	{
		departure: (journeys, time) =>
			(journeys.at(-1)?.departureTime?.time.getTime() ?? MAX_DATE) > time.getTime(),
		arrival: (journeys, time) =>
			(journeys.at(0)?.arrivalTime?.time.getTime() ?? 0) < time.getTime()
	};

/**
 * recursively turn array of journeys into a tree fulfilling the constraints described in the readme
 * @param subJourneyss each element contains the journeys of one subsection of the entire trip
 * @param includeUntil every returned journey starts before this time
 * @param recursionInfo stores current recursion depth and progress for each depth
 */
function getTreeFromNodeArrays(
	subJourneyss: SubJourney[][],
	includeUntil: Date,
	recursionInfo: RecursionInfo
): TreeNode[] {
	const depth = recursionInfo.depth;
	const progressInDepths = recursionInfo.progressInDepths;
	if (depth === subJourneyss.length) {
		// base case
		return [];
	}

	const nodesToBeIncluded: TreeNode[] = [];

	// include nodes until no more nodes are left over or the next journey starts after `includeUntil`
	while (
		progressInDepths[depth] < 0 ||
		(progressInDepths[depth] < subJourneyss[depth].length &&
			(subJourneyss[depth][progressInDepths[depth]].departureTime?.time.getTime() ??
				MAX_DATE) < includeUntil.getTime())
	) {
		const nextArrival =
			subJourneyss[depth].at(progressInDepths[depth] + 1)?.arrivalTime?.time ??
			new Date(MAX_DATE);

		let nodeToBeIncluded: TreeNode;
		if (progressInDepths[depth] === -1) {
			// completely unreachable journeys are put into an empty node
			nodeToBeIncluded = { type: "emptyNode", children: [] };
		} else {
			const nodeJourney = subJourneyss[depth][progressInDepths[depth]];
			nodeToBeIncluded = fetchedJourneyToNode(nodeJourney, recursionInfo);
		}
		nodeToBeIncluded.children = getTreeFromNodeArrays(subJourneyss, nextArrival, {
			depth: depth + 1,
			progressInDepths: progressInDepths
		});
		nodesToBeIncluded.push(nodeToBeIncluded);
		progressInDepths[depth]++;
	}
	return nodesToBeIncluded;
}

/**
 * turns a SubJourney object into a JourneyNode object
 * @param subJourney
 * @param recursionInfo
 */
function fetchedJourneyToNode(subJourney: SubJourney, recursionInfo: RecursionInfo): JourneyNode {
	return {
		type: "journeyNode",
		subJourney: subJourney,
		depth: recursionInfo.depth,
		idInDepth: recursionInfo.progressInDepths[recursionInfo.depth],
		children: []
	};
}
