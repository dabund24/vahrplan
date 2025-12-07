import type { LayoutLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { EMPTY_PROFILE } from "$lib/constants";

export const load: LayoutLoad = async ({ params: { lang, profile }, fetch }) => {
	const profileApiClient = apiClient("GET", "profile");
	const { content: profileConfig } = (
		await profileApiClient.request(
			{ lang, profile },
			{ fetchFn: fetch, lang, profileConfig: EMPTY_PROFILE }
		)
	).throwIfError();
	return {
		profileConfig
	};
};
