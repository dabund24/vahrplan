import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { buildTransferLocationEquivalenceSystemFromSubJourneys } from "../diagram/locationRepresentatives.server";
import { generateSvgData } from "$lib/server/svgData/svgData.server";
import type { LegBlock, SubJourney, TransitType } from "$lib/types";
import { journeyDataService } from "../profile/profileRegistry.server";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const { lang, profile, reqContent } = client.parseRequest(reqEvent);
	const dataService = journeyDataService(profile, lang);
	const journeyResults = await Promise.all(
		reqContent.map((token) => dataService.refresh(token, { lang: lang }))
	);
	const subJourneys = setMergingProperties(
		journeyResults.map((subJourney) => subJourney.throwIfError().content)
	);

	const transferLocations = buildTransferLocationEquivalenceSystemFromSubJourneys(subJourneys);

	const timeData = computeJourneyTimeData(subJourneys);
	const svgData = generateSvgData(
		subJourneys.map((c) => [c]),
		{ transferLocations: transferLocations, timeData }
	);

	return client.formatResponse(new VahrplanSuccess({ subJourneys, svgData, transferLocations }));
};

function computeJourneyTimeData(subJourneys: SubJourney[]): Record<TransitType, string>[][] {
	return subJourneys.map((subJourney) => [
		{
			departure: subJourney.departureTime?.time ?? "",
			arrival: subJourney.arrivalTime?.time ?? ""
		}
	]);
}

/**
 * sets `precededBy` and `succeededBy` properties of sub-journeys
 * @param subJourneys the sub-journeys to modify
 * @private
 * @sealed
 */
function setMergingProperties(subJourneys: SubJourney[]): SubJourney[] {
	for (let i = 1; i < subJourneys.length; i++) {
		const arrivingSubJourneyBlock = subJourneys[i - 1].blocks.at(-1);
		const departingSubJourneyBlock = subJourneys[i].blocks.at(0);
		if (arrivingSubJourneyBlock?.type !== "leg" || departingSubJourneyBlock?.type !== "leg") {
			// do nothing
		} else if (arrivingSubJourneyBlock.blockKey === departingSubJourneyBlock.blockKey) {
			arrivingSubJourneyBlock.succeededBy = "stopover";
			departingSubJourneyBlock.precededBy = "stopover";
		} else if (legsHaveSameLocations(arrivingSubJourneyBlock, departingSubJourneyBlock)) {
			arrivingSubJourneyBlock.succeededBy = "transfer";
			departingSubJourneyBlock.precededBy = "transfer";
		}
	}
	return subJourneys;
}

/**
 * returns whether the destination and origin of two legs are the same
 * @param arrivingLeg the leg with the destination to check
 * @param departingLeg the leg with the origin to check
 * @private
 * @sealed
 */
function legsHaveSameLocations(arrivingLeg: LegBlock, departingLeg: LegBlock): boolean {
	return (
		arrivingLeg.arrivalData.location.position.lng ===
			departingLeg.departureData.location.position.lng &&
		arrivingLeg.arrivalData.location.position.lat ===
			departingLeg.departureData.location.position.lat
	);
}
