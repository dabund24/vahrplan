import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import type { ServerRequestData } from "$lib/api-client/ApiClient";
import { tripToDisplayedJourney } from "./tripUtils";

export const load: PageLoad = async ({ fetch, parent, url }) => {
	const { lang, profileConfig } = await parent();
	const tripApiClient = apiClient("GET", "trip/[tripId]");

	const { reqContent } = tripApiClient.parseNonApiUrl(url, { profileConfig });

	const serverRequestData: ServerRequestData = {
		fetchFn: fetch,
		lang,
		profileConfig,
	};

	const { content: trip } = (
		await tripApiClient.request(reqContent, serverRequestData)
	).throwIfError();

	const displayedJourney = tripToDisplayedJourney(trip);

	return {
		displayedJourney,
		trip,
		highlightData: reqContent.highlightData,
	};
};
