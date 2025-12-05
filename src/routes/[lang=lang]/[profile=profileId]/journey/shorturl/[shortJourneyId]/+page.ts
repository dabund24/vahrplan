import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { redirect } from "@sveltejs/kit";

export const load: PageLoad = async ({ params: { shortJourneyId, lang, profile }, fetch }) => {
	const profileClient = apiClient("GET", "profile");
	const shortUrlClient = apiClient("GET", "journey/shorturl/[shortJourneyId]");
	const journeyClient = apiClient("GET", "journey");

	const refreshTokensPromise = shortUrlClient.request(shortJourneyId, fetch);
	const { content: profileConfig } = (
		await profileClient.request({ profile, lang }, fetch)
	).throwIfError();
	const refreshTokens = (await refreshTokensPromise).throwIfError().content;

	const journeyUrl = journeyClient.formatNonApiUrl(refreshTokens, { profileConfig });
	redirect(308, `${journeyUrl.pathname}?${journeyUrl.searchParams.toString()}`);
};
