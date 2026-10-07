import type { RequestHandler } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { GetTripApiClient } from "./getClient";
import type { LegBlock, Trip } from "$lib/types";

export const GET: RequestHandler = async function (reqEvent) {
	const client = apiClient("GET", reqEvent.route.id);
	const { lang, profile, reqContent } = client.parseRequest(reqEvent);
	const dataService = journeyDataService(profile, lang);
	const tripData = await dataService.trip(reqContent.tripId, { lang });
	if (tripData.isError) {
		return client.formatResponse(tripData);
	}

	if (reqContent.highlightData !== undefined) {
		tripData.content = assignTripHighlightData(tripData.content, reqContent.highlightData);
	}
	return client.formatResponse(tripData);
};

function assignTripHighlightData(
	trip: Trip,
	highlightData: NonNullable<
		ReturnType<GetTripApiClient["parseRequest"]>["reqContent"]["highlightData"]
	>,
): Trip {
	const stopovers = trip.leg.stopovers;
	const result: LegBlock["highlightData"] = {
		beginIndex: 0,
		endIndex: stopovers.length + 1,
	};

	for (let i = 0; i < stopovers.length; i++) {
		const {
			location: { id },
		} = stopovers[i];

		if (id === highlightData.fromStop) {
			result.beginIndex = i + 1;
		} else if (
			id === highlightData.toStop &&
			(result.beginIndex !== 0 ||
				trip.leg.departureData.location.id === highlightData.fromStop) // ensure we have already encountered `fromStop`
		) {
			result.endIndex = i + 1;
			break;
		}
	}

	trip.leg.highlightData = result;
	return trip;
}
