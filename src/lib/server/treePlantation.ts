import { client } from "$lib/server/setup";
import type { JourneysOptions } from "hafas-client";
import type { JourneyBlock, JourneyNode, ParsedTime, TransitType, ZugResponse } from "$lib/types";
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

type FetchedJourney = {
	refreshToken: string;
	blocks: JourneyBlock[];
	arrivalTime: NonNullable<ParsedTime["arrival"]>;
	departureTime: NonNullable<ParsedTime["departure"]>;
};

type JourneyNodesWithRefs = {
	journeys: FetchedJourney[];
	earlierRef: string;
	laterRef: string;
};

type RecursionInfo = {
	depth: number;
	progressInDepths: number[];
};

export async function getJourneyTree(
	stops: string[],
	opt: JourneysOptions,
	transitType: TransitType
): Promise<ZugResponse<JourneyNode[]>> {
	opt.routingMode = transitType === "departure" ? "REALTIME" : "HYBRID"; // https://github.com/public-transport/hafas-client/issues/282
	opt.stopovers = true;
	opt.polylines = true;
	opt.startWithWalking = true;

	// find all journeys of the tree
	let journeyArrays = await getJourneyArrays(stops, opt, transitType);

	// remove nodes that would lack a parent in the resulting tree
	journeyArrays = cleanupJourneyArrays(journeyArrays);

	const progressInDepths = Array.from({ length: stops.length - 1 }, () => 0);
	// construct the tree
	const result = getTreeFromNodeArrays(journeyArrays, new Date(MAX_DATE), {
		depth: 0,
		progressInDepths
	});

	return getSuccessResponse<JourneyNode[]>(result);
}

/**
 * get arrays of journeys for every neighboring pair of stops
 * @param stops stops part of the resulting diagram
 * @param opt user options
 * @param transitType meaning of the time the user specified
 */
async function getJourneyArrays(
	stops: string[],
	opt: JourneysOptions,
	transitType: TransitType
): Promise<FetchedJourney[][]> {
	// if `transitType` is `arrival`, the journeys have to be searched in reverse order
	const reverseOrder = transitType === "arrival";
	const complimentaryTransitType = reverseOrder ? "departure" : "arrival";
	const fallbackDate = new Date(transitType === "departure" ? 0 : MAX_DATE);

	const journeyss: FetchedJourney[][] = [];
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
		const depthJourneys = await findJourneysUntil({ ...fromToOpt }, timeLimit);
		fromToOpt.opt[transitType] =
			depthJourneys.at(reverseOrder ? -1 : 0)?.[`${complimentaryTransitType}Time`]?.time ??
			fallbackDate;

		journeyss[i] = depthJourneys;
		timeLimit.date =
			depthJourneys.at(reverseOrder ? 0 : -1)?.[`${complimentaryTransitType}Time`]?.time ??
			fallbackDate;
	}

	return journeyss;
}

/**
 * searches for journeys with a given origin, destination and options until limit is exceeded
 * @param fromToOpt origin, destination and options
 * @param limit when to stop looking for more journeys
 */
async function findJourneysUntil(
	fromToOpt: FromToOpt,
	limit: TimeLimit
): Promise<FetchedJourney[]> {
	fromToOpt.opt = { ...fromToOpt.opt };
	const journeys: FetchedJourney[] = [];
	const timeComparisonPrefix = limit.type === "departure" ? "later" : "earlier";

	// find first journeys
	let lastJourneysWithRef = await findJourneys(fromToOpt);
	journeys.push(...lastJourneysWithRef.journeys);

	// find remaining journeys
	delete fromToOpt.opt[limit.type]; // laterThan/earlierThan will be used instead
	let remainingSearches = SEARCH_MAX_THRESHOLD;
	// repeat finding process until limit is exceeded or `SEARCH_MAX_THRESHOLD` times
	while (
		!journeysExceedLimit[limit.type](lastJourneysWithRef.journeys, limit.date) &&
		remainingSearches > 0
	) {
		fromToOpt.opt[`${timeComparisonPrefix}Than`] =
			lastJourneysWithRef[`${timeComparisonPrefix}Ref`];
		lastJourneysWithRef = await findJourneys(fromToOpt);
		if (limit.type === "departure") {
			journeys.push(...lastJourneysWithRef.journeys);
		} else {
			journeys.unshift(...lastJourneysWithRef.journeys);
		}
		remainingSearches--;
	}
	if (limit.type === "arrival") {
		// sorting is necessary because of hybrid routing
		journeys.sort((a, b) => a.departureTime.time.getTime() - b.departureTime.time.getTime());
	}
	return journeys;
}

/**
 * determine whether given nodes exceed a given limit.
 * Two functions are available:
 * - `departure` compares the limit with the first departure of the given nodes
 * - `arrival` compares the limit with the last arrival of the given nodes
 */
const journeysExceedLimit: {
	[K in TransitType]: (journeys: FetchedJourney[], time: Date) => boolean;
} = {
	departure: (journeys, time) =>
		(journeys.at(-1)?.departureTime.time.getTime() ?? MAX_DATE) > time.getTime(),
	arrival: (journeys, time) => (journeys.at(0)?.arrivalTime.time.getTime() ?? 0) < time.getTime()
};

/**
 * returns journeyNodes with earlierRef and laterRef
 * @param fromToOpt origin, destination and options
 */
async function findJourneys(fromToOpt: FromToOpt): Promise<JourneyNodesWithRefs> {
	return client.journeys(fromToOpt.from, fromToOpt.to, fromToOpt.opt).then((journeys) => {
		return {
			journeys:
				journeys.journeys
					?.filter((journey) => journey.legs.every((leg) => !leg.cancelled))
					.map((journey): FetchedJourney => {
						const blocks = journeyToBlocks(journey);
						const { arrival, departure } = getFirstAndLastTime(blocks);
						return {
							refreshToken: journey.refreshToken ?? "",
							blocks,
							arrivalTime: arrival.arrival ?? { time: new Date(0) },
							departureTime: departure.departure ?? { time: new Date(0) }
						};
					}) ?? [],
			earlierRef: journeys.earlierRef ?? "",
			laterRef: journeys.laterRef ?? ""
		};
	});
}

/**
 * removes completely unreachable journeys
 * @param journeyss node arrays for each section of the full journey
 */
function cleanupJourneyArrays(journeyss: FetchedJourney[][]): FetchedJourney[][] {
	for (let i = 1; i < journeyss.length; i++) {
		const firstArrivalOfLastNodes = journeyss[i - 1][0].arrivalTime.time.getTime();
		let indexOfFirstValidNode = 0;
		// increment this while `nodess[i][indexOfFirstValidNode]` starts before `firstArrivalOfLastNodes`
		while (
			indexOfFirstValidNode < journeyss[i].length &&
			journeyss[i][indexOfFirstValidNode].departureTime.time.getTime() <
				firstArrivalOfLastNodes
		) {
			indexOfFirstValidNode++;
		}
		// remove nodes starting to early
		journeyss[i] = journeyss[i].slice(indexOfFirstValidNode);
	}
	return journeyss;
}

/**
 * recursively turn array of journeys into a tree fulfilling the constraints described in the readme
 * @param journeyss each element contains the journeys of one subsection of the entire trip
 * @param includeUntil every returned journey starts before this time
 * @param recursionInfo stores current recursion depth and progress for each depth
 */
function getTreeFromNodeArrays(
	journeyss: FetchedJourney[][],
	includeUntil: Date,
	recursionInfo: RecursionInfo
): JourneyNode[] {
	const depth = recursionInfo.depth;
	const progressInDepths = recursionInfo.progressInDepths;
	if (depth === journeyss.length) {
		// base case
		return [];
	}

	const nodesToBeIncluded: JourneyNode[] = [];

	// include nodes until no more nodes are left over or the next journey starts after `includeUntil`
	while (
		progressInDepths[depth] < journeyss[depth].length &&
		journeyss[depth][progressInDepths[depth]].departureTime.time.getTime() <
			includeUntil.getTime()
	) {
		const nextArrival =
			journeyss[depth].at(progressInDepths[depth] + 1)?.arrivalTime.time ??
			new Date(MAX_DATE);

		const nodeJourney = journeyss[depth][progressInDepths[depth]];
		const nodeToBeIncluded = fetchedJourneyToNode(nodeJourney, recursionInfo);
		nodeToBeIncluded.children = getTreeFromNodeArrays(journeyss, nextArrival, {
			depth: depth + 1,
			progressInDepths: progressInDepths
		});
		nodesToBeIncluded.push(nodeToBeIncluded);
		progressInDepths[depth]++;
	}
	return nodesToBeIncluded;
}

/**
 * turns a FetchedJourney object into a JourneyNode object
 * @param journey
 * @param recursionInfo
 */
function fetchedJourneyToNode(journey: FetchedJourney, recursionInfo: RecursionInfo): JourneyNode {
	return {
		blocks: journey.blocks,
		children: [],
		refreshToken: journey.refreshToken,
		depth: recursionInfo.depth,
		idInDepth: recursionInfo.progressInDepths[recursionInfo.depth],
		arrival: { arrival: journey.arrivalTime },
		departure: { departure: journey.departureTime }
	};
}
