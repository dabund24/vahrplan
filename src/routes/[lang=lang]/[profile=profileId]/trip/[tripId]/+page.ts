import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import type { ServerRequestData } from "$lib/api-client/ApiClient";
import type { DisplayedJourney } from "$lib/state/displayedJourney.svelte";
import type { Trip } from "$lib/types";

export const load: PageLoad = async ({ fetch, parent, url, params }) => {
	const { lang, profileConfig } = await parent();
	const tripApiClient = apiClient("GET", "trip/[tripId]");

	console.log(params);

	const { reqContent } = tripApiClient.parseNonApiUrl(url, { profileConfig });

	const serverRequestData: ServerRequestData = {
		fetchFn: fetch,
		lang,
		profileConfig,
	};

	console.log(reqContent);

	const { content: trip } = (
		await tripApiClient.request(reqContent, serverRequestData)
	).throwIfError();

	const displayedJourney = tripToDisplayedJourney(trip);

	return {
		displayedJourney,
		trip,
	};
};

function tripToDisplayedJourney(trip: Trip): DisplayedJourney {
	const departureTime = trip.leg.departureData.time.departure;
	const arrivalTime = trip.leg.arrivalData.time.arrival;
	return {
		departure: departureTime?.time,
		arrival: arrivalTime?.time,
		blocks: [{ key: trip.leg.blockKey, value: [trip.leg] }],
		locations: [
			{ key: 0, value: trip.leg.departureData.location },
			{ key: 0, value: trip.leg.arrivalData.location },
		],
		selectedSubJourneys: [
			{ blocks: [trip.leg], departureTime, arrivalTime, refreshToken: trip.leg.tripId },
		],
		statuses: new Set(),
	};
}
