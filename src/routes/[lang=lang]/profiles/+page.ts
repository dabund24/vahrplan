import type { PageLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { EMPTY_PROFILE } from "$lib/constants";

export const load: PageLoad = async ({ params: { lang }, fetch }) => {
	const client = apiClient("GET", "profiles");
	const { content: profiles } = (
		await client.request({ lang: lang }, { fetchFn: fetch, lang, profileConfig: EMPTY_PROFILE })
	).throwIfError();
	return {
		profiles
	};
};
