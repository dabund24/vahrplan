import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ params, fetch }) => {
	const id = params.shortJourneyId;
	const shortUrlClient = apiClient("GET", "/de/dbnav/api/journey/shorturl/[shortJourneyId]");
	const { content: refreshTokens } = (await shortUrlClient.request(id, fetch)).throwIfError();
	const journeyClient = apiClient("GET", "/de/dbnav/api/journey");
	const journeyUrl = journeyClient.formatNonApiUrl(refreshTokens);
	redirect(308, `${journeyUrl.pathname}?${journeyUrl.searchParams.toString()}`);
};
