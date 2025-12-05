import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { redirect } from "@sveltejs/kit";
import type { ServerRequestData } from "$lib/api-client/ApiClient";

export const load: PageLoad = async ({ params: { shortJourneyId }, fetch, parent }) => {
	const { lang, profileConfig } = await parent();
	const shortUrlClient = apiClient("GET", "journey/shorturl/[shortJourneyId]");
	const journeyClient = apiClient("GET", "journey");

	const serverRequestData: ServerRequestData = {
		fetchFn: fetch,
		lang,
		profileConfig
	};
	const { content: refreshTokens } = (
		await shortUrlClient.request(shortJourneyId, serverRequestData)
	).throwIfError();

	const journeyUrl = journeyClient.formatNonApiUrl(refreshTokens, { profileConfig });
	redirect(308, `${journeyUrl.pathname}?${journeyUrl.searchParams.toString()}`);
};
