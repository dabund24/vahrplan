import type { Trip } from "$lib/types";
import type { DisplayedJourney } from "$lib/state/displayedJourney.svelte";
import type { GetTripApiClient } from "../../api/trip/[tripId]/getClient";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { toast } from "$lib/state/toastStore";

export function tripToDisplayedJourney(trip: Trip): DisplayedJourney {
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

export async function refreshTrip(
	tripId: string,
	highlightData: ReturnType<GetTripApiClient["parseRequestContent"]>["highlightData"],
): Promise<{ trip: Trip; displayedJourney: DisplayedJourney } | undefined> {
	const tripApiClient = apiClient("GET", "trip/[tripId]");
	const res = await tripApiClient.request({ tripId, highlightData });
	if (!res.isError) {
		toast("Fahrtdaten aktualisiert.", "green");
		return { trip: res.content, displayedJourney: tripToDisplayedJourney(res.content) };
	}
	return undefined;
}
