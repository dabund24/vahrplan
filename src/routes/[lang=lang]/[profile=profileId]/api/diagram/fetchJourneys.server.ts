import type { Ctx, JourneysFilters, RelativeTimeType, SubJourney, TimeData } from "$lib/types";
import { type JourneyNodesWithRefs } from "$lib/server/journey-data/JourneyDataService";
import { type VahrplanResult, VahrplanSuccess } from "$lib/VahrplanResult";
import { DIAGRAM_COLUMN_MAX_REQUESTS, MAX_DATE } from "$lib/constants";
import { VahrplanError } from "$lib/VahrplanError";

type RequestData = {
	fromTo: { from: string; to: string };
	timeData: TimeData;
	filters: JourneysFilters;
};

export async function fetchJourneys(
	stops: string[],
	{ timeStart, filters }: { timeStart: TimeData[] | TimeData; filters: JourneysFilters },
	ctx: Pick<Ctx, "dataService" | "lang">,
): Promise<VahrplanResult<JourneyNodesWithRefs[]>> {
	const scrollDirection = (Array.isArray(timeStart) ? timeStart[0] : timeStart).scrollDirection;

	const isReverseOrder = scrollDirection === "earlier";

	const result: JourneyNodesWithRefs[] = [];

	let nextColumnTimeLimit = new Date(isReverseOrder ? MAX_DATE : 0).toISOString();

	const indexStart = isReverseOrder ? stops.length - 2 : 0;
	const indexStep = isReverseOrder ? -1 : 1;

	let nextColumnStart = Array.isArray(timeStart) ? timeStart[indexStart] : timeStart;

	for (let i = indexStart; isReverseOrder ? i >= 0 : i < stops.length - 1; i += indexStep) {
		const from = stops[i];
		const to = stops[i + 1];
		const column = await fetchUntil(
			{ fromTo: { from, to }, timeData: nextColumnStart, filters },
			nextColumnTimeLimit,
			ctx,
		);
		if (column.isError || column.content.journeys.length === 0) {
			const errMessage = `Keine Verbindungen von ${i + 1}. zu ${i + 2}. Station gefunden`;
			return VahrplanError.withMessage("NOT_FOUND", errMessage);
		}
		result[i] = column.content;

		if (Array.isArray(timeStart)) {
			nextColumnStart = timeStart[i + indexStep];
		} else {
			nextColumnStart = {
				type: "absolute",
				scrollDirection,
				time: determineNextCoulumnStart(column.content.journeys, scrollDirection),
			};
		}
		nextColumnTimeLimit = determineNextColumnTimeLimit(
			column.content.journeys,
			scrollDirection,
		);
	}

	return new VahrplanSuccess(result);
}

function determineNextColumnTimeLimit(
	subJourneys: SubJourney[],
	scrollDirection: RelativeTimeType,
): string {
	if (scrollDirection === "later") {
		return subJourneys.at(-1)?.arrivalTime?.time ?? "";
	}
	return subJourneys.at(0)?.departureTime?.time ?? "";
}

function determineNextCoulumnStart(
	subJourneys: SubJourney[],
	scrollDirection: RelativeTimeType,
): string {
	if (scrollDirection === "later") {
		return subJourneys.at(0)?.arrivalTime?.time ?? "";
	}
	return subJourneys.at(-1)?.departureTime?.time ?? "";
}

async function fetchUntil(
	{ fromTo, timeData, filters }: RequestData,
	timeLimit: string,
	{ dataService, lang }: Pick<Ctx, "dataService" | "lang">,
): Promise<VahrplanResult<JourneyNodesWithRefs>> {
	const reverseScrollDirection: RelativeTimeType =
		timeData.scrollDirection === "earlier" ? "later" : "earlier";
	let remainingSearches = DIAGRAM_COLUMN_MAX_REQUESTS - 1;
	const result: JourneyNodesWithRefs = { journeys: [], earlierRef: "", laterRef: "" };

	do {
		const j = await dataService.journeys(fromTo, { timeData, filters }, { lang });
		if (j.isError) {
			return j;
		}

		// update result refs
		if (result[`${reverseScrollDirection}Ref`] === "") {
			result[`${reverseScrollDirection}Ref`] = j.content[`${reverseScrollDirection}Ref`];
		}
		result[`${timeData.scrollDirection}Ref`] = j.content[`${timeData.scrollDirection}Ref`];

		// update request data
		timeData = {
			type: "relative",
			scrollDirection: timeData.scrollDirection,
			time: j.content[`${timeData.scrollDirection}Ref`],
		};

		// update result
		result.journeys.push(...j.content.journeys);
	} while (
		!journeysExceedLimit[timeData.scrollDirection](result.journeys, timeLimit) &&
		remainingSearches-- > 0 &&
		timeData.time !== ""
	);

	// sort by departure time
	result.journeys.sort(
		(a, b) =>
			new Date(a.departureTime?.time ?? 0).getTime() -
			new Date(b.departureTime?.time ?? 0).getTime(),
	);

	return new VahrplanSuccess(result);
}

/**
 * determine whether given nodes exceed a given limit.
 * Two functions are available:
 * - `departure` compares the limit with the first departure of the given nodes
 * - `arrival` compares the limit with the last arrival of the given nodes
 */
const journeysExceedLimit: Record<
	RelativeTimeType,
	(subJourneys: SubJourney[], time: string) => boolean
> = {
	later: (journeys, time) =>
		new Date(journeys.at(-1)?.departureTime?.time ?? MAX_DATE).getTime() >
		new Date(time).getTime(),
	earlier: (journeys, time) =>
		new Date(journeys.at(0)?.arrivalTime?.time ?? 0).getTime() < new Date(time).getTime(),
};
