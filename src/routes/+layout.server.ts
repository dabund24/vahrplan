import type { LayoutServerLoad } from "./$types";
import { news } from "$lib/server/news.server";
import { allProfileConfigs, profileRegistry } from "$lib/server/profiles/profileRegistry";
import { extractLocaleFromUrl } from "$lib/paraglide/runtime";
import { DEFAULT_LOCALE } from "$lib/constants";

export const load: LayoutServerLoad = ({ url }) => {
	const lang = extractLocaleFromUrl(url) ?? DEFAULT_LOCALE;
	return {
		news,
		profileConfig: profileRegistry("empty").configOfLanguage(lang),
		lang,
		allProfileConfigs: allProfileConfigs(lang),
	};
};
