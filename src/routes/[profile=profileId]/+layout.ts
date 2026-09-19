import type { LayoutLoad } from "./$types";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { DEFAULT_LOCALE, EMPTY_PROFILE } from "$lib/constants";
import { extractLocaleFromUrl, localizeUrl } from "$lib/paraglide/runtime";
import { redirect } from "@sveltejs/kit";

export const load: LayoutLoad = async ({ params: { profile }, fetch, url }) => {
	const lang = extractLocaleFromUrl(url);
	if (lang === undefined) {
		const localizedUrl = localizeUrl(url, { locale: DEFAULT_LOCALE });
		redirect(308, `${localizedUrl.pathname}${localizedUrl.search}`);
	}
	const profileApiClient = apiClient("GET", "profile");
	const { content: profileConfig } = (
		await profileApiClient.request(
			{ lang, profile },
			{ fetchFn: fetch, lang, profileConfig: EMPTY_PROFILE },
		)
	).throwIfError();
	return {
		profileConfig,
	};
};
