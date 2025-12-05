import type { LayoutLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";

export const load: LayoutLoad = async ({ params: { lang, profile }, fetch }) => {
	const profileApiClient = apiClient("GET", "profile");
	const { content: profileConfig } = (
		await profileApiClient.request({ lang, profile }, fetch)
	).throwIfError();
	return {
		profile: profileConfig
	};
};
