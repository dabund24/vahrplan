import type { RequestHandler } from "./$types";
import { journeyDataService } from "$lib/server/setup";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { buildLocationEquivalenceSystemFromSubJourneys } from "../diagram/locationRepresentatives.server";
import { generateSvgData } from "$lib/server/svgData/svgData.server";
import type { SubJourney, TransitType } from "$lib/types";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const tokens = client.parse(reqEvent);
	const { content: subJourneys } = (await journeyDataService.refresh(tokens)).throwIfError();

	const locationEquivalenceSystem = buildLocationEquivalenceSystemFromSubJourneys(subJourneys);

	const timeData = computeJourneyTimeData(subJourneys);
	const svgData = generateSvgData(
		subJourneys.map((c) => [c]),
		{ locationEquivalenceSystem, timeData }
	);

	return client.formatResponse(
		new VahrplanSuccess({ subJourneys, svgData, locationEquivalenceSystem })
	);
};

function computeJourneyTimeData(subJourneys: SubJourney[]): Record<TransitType, string>[][] {
	return subJourneys.map((subJourney) => [
		{
			departure: subJourney.departureTime?.time ?? "",
			arrival: subJourney.arrivalTime?.time ?? ""
		}
	]);
}
