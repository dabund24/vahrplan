import { client } from "$lib/server/setup";
import type { Journey, Journeys, JourneysOptions } from "hafas-client";
import type { JourneyNode, ZugResponse } from "$lib/types";
import { getSuccessResponse, getZugError, getZugErrorFromHafasError } from "$lib/server/responses";
import { getFirstOrLastTime, journeysToBlocks } from "$lib/server/parse";

const MAX_DATE = 8640000000000000;

export async function getJourneyTree(
	stops: string[],
	opt: JourneysOptions
): Promise<ZugResponse<JourneyNode[]>> {
	opt.routingMode = "REALTIME";
	opt.stopovers = true;
	opt.polylines = true;
	opt.startWithWalking = true;
	const journeysArray: Journey[][] = [];

	let firstJourneysResponse: Journeys;
	try {
		firstJourneysResponse = await findJourneys(stops[0], stops[1], opt);
	} catch (e) {
		return getZugErrorFromHafasError(e, 0, 1);
	}

	if (
		firstJourneysResponse.journeys === undefined ||
		firstJourneysResponse.journeys.length === 0
	) {
		return getZugError("NO_CONNECTIONS", 0, 1);
	}
	journeysArray.push(firstJourneysResponse.journeys.concat());

	// latest departure for next journeys
	const latestNext = getLatestArrivalFromJourneys(firstJourneysResponse.journeys);
	if (latestNext === undefined) {
		return getZugError("MISSING_PROPERTY", 0, 1);
	}
	const earliestArrival = getEarliestArrivalFromJourney(firstJourneysResponse.journeys);
	if (earliestArrival !== null && earliestArrival !== undefined) {
		opt.departure = new Date(earliestArrival);
	}

	delete opt.arrival;
	opt.routingMode = "HYBRID";
	for (let i = 1; i < stops.length - 1; i++) {
		// latest departure for next journeys
		const latestNext = getLatestArrivalFromJourneys(journeysArray[i - 1]);
		if (latestNext === undefined) {
			return getZugError("NO_CONNECTIONS", i - 1, i);
		}

		delete opt.laterThan;
		let journeysResponse: Journeys;
		try {
			journeysResponse = await findJourneys(stops[i], stops[i + 1], opt);
		} catch (e) {
			return getZugErrorFromHafasError(e, i, i + 1);
		}
		if (journeysResponse.journeys === undefined || journeysResponse.journeys.length === 0) {
			return getZugError("NO_CONNECTIONS", i, i + 1);
		}

		const journeys = removeJourneysStartingTooEarly(
			journeysResponse.journeys,
			opt.departure ?? new Date(0)
		);

		const latestDeparture = getLatestDepartureFromJourneys(journeysResponse.journeys);

		// check if fetching more journeys is necessary
		if (
			latestDeparture !== undefined &&
			new Date(latestDeparture).getTime() < new Date(latestNext).getTime()
		) {
			const remainingJourneys = await requestMoreJourneys(
				journeysResponse.laterRef ?? "",
				stops[i],
				stops[i + 1],
				opt,
				new Date(latestNext)
			);
			journeysArray.push(journeys.concat(remainingJourneys));
		} else {
			journeysArray.push(journeys.concat());
		}

		const earliestArrival = getEarliestArrivalFromJourney(journeysArray[i]);
		if (earliestArrival !== undefined) {
			opt.departure = new Date(earliestArrival);
		}
	}
	/*
	let matrixCopy = [];
	for (let i = 0; i < journeysArray.length; i++) {
		journeysArray[i] = journeysArray[i].filter((journey) =>
			journey.legs.every((leg) => leg.cancelled !== true)
		);
		matrixCopy.push(journeysArray[i].slice());
	}
	
 */

	const tree = journeyMatrixToJourneyTree(journeysArray);

	return getSuccessResponse<JourneyNode[]>(tree);
}

async function requestMoreJourneys(
	laterRef: string,
	from: string,
	to: string,
	opt: JourneysOptions,
	latest: Date
): Promise<Journey[]> {
	let journeys: Journey[] = [];
	opt.laterThan = laterRef;
	delete opt.departure;
	for (let i = 0; i < 5; i++) {
		const nextJourneys: Journeys = await findJourneys(from, to, opt).catch(() => ({}));
		journeys = journeys.concat(nextJourneys.journeys ?? []);
		const laterResultLastLegDeparture = getLatestDepartureFromJourneys(
			nextJourneys.journeys ?? []
		);
		if (new Date(laterResultLastLegDeparture ?? MAX_DATE).getTime() > latest.getTime()) {
			return journeys;
		}
		opt.laterThan = nextJourneys.laterRef;
	}
	return journeys;
}

async function findJourneys(from: string, to: string, opt: JourneysOptions): Promise<Journeys> {
	return client.journeys(from, to, opt).then((journeys) => {
		journeys.journeys =
			journeys.journeys?.filter((journey) =>
				journey.legs.every((leg) => leg.cancelled !== true)
			) ?? [];
		return journeys;
	});
}

function removeJourneysStartingTooEarly(journeys: readonly Journey[], time: Date): Journey[] {
	let indexOfFirstValidJourney = 0;
	while (new Date(journeys[indexOfFirstValidJourney].legs[0].departure ?? MAX_DATE) < time) {
		indexOfFirstValidJourney++;
	}
	return journeys.slice(indexOfFirstValidJourney);
}

function getLatestArrivalFromJourneys(
	journeys: readonly Journey[] | Journey[]
): string | undefined {
	const lastJourney = journeys.at(-1);
	return lastJourney?.legs.findLast((leg) => leg.cancelled !== true)?.arrival;
}

function getLatestDepartureFromJourneys(
	journeys: readonly Journey[] | Journey[]
): string | undefined {
	const lastJourney = journeys.at(-1);
	return lastJourney?.legs.find((leg) => leg.cancelled !== true)?.departure;
}

function getEarliestArrivalFromJourney(
	journeys: readonly Journey[] | Journey[]
): string | undefined {
	const firstJourney = journeys[0];
	return firstJourney.legs.findLast((leg) => leg.cancelled !== true)?.arrival;
}

let idInDepthCounters: number[];

function journeyMatrixToJourneyTree(matrix: Journey[][]): JourneyNode[] {
	idInDepthCounters = Array.from(Array(matrix.length), () => 0);
	return getNodesFromMatrix(matrix, new Date(8640000000000000), 0);
}

function getNodesFromMatrix(
	matrix: Journey[][],
	nextDeparture: Date,
	depth: number
): JourneyNode[] {
	if (depth === matrix.length) {
		return [];
	}

	const childNodes: JourneyNode[] = [];
	const end = getLastMatchingJourneyIndex(nextDeparture, matrix[depth]);
	const children = matrix[depth].splice(0, end);
	if (matrix[depth].length > 0) {
		// for knowing what the arrival upper bound is
		children.push(matrix[depth][0]);
	} else {
		// for knowing that no more blocks proceeds
		children.push({ type: "journey", legs: [] });
	}

	for (let i = 0; i < children.length - 1; i++) {
		let nextArrival: Date;
		const nextChild = children[i + 1];
		if (nextChild.legs.length === 0) {
			nextArrival = new Date(MAX_DATE);
		} else {
			nextArrival = new Date(nextChild.legs.at(-1)?.arrival ?? MAX_DATE);
		}
		const blocks = journeysToBlocks([children[i]]);
		const childNode: JourneyNode = {
			depth: depth,
			idInDepth: idInDepthCounters[depth],
			refreshToken: children[i].refreshToken ?? "",
			blocks,
			departure: getFirstOrLastTime(blocks, "departure"),
			arrival: getFirstOrLastTime(blocks, "arrival"),
			children: getNodesFromMatrix(matrix, nextArrival, depth + 1)
		};
		childNodes.push(childNode);
		idInDepthCounters[depth]++;
	}
	return childNodes;
}

function getLastMatchingJourneyIndex(
	nextJourneyDeparture: Date,
	journeysToCheck: Journey[]
): number {
	let endIndex = 0;
	while (
		endIndex < journeysToCheck.length &&
		nextJourneyDeparture.getTime() >
			new Date(journeysToCheck[endIndex].legs[0].departure!).getTime()
	) {
		endIndex++;
	}
	return endIndex;
}
