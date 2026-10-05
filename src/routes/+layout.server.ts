import type { LayoutServerLoad } from "./$types";
import { news } from "$lib/server/news.server";
import { allProfileConfigs, profileRegistry } from "$lib/server/profiles/profileRegistry";
import {
	extractLocaleFromUrl,
	extractLocaleFromRequestWithStrategies,
	localizeUrl,
	strategy,
} from "$lib/paraglide/runtime";
import { redirect } from "@sveltejs/kit";
import { DEFAULT_LOCALE } from "$lib/constants";

export const load: LayoutServerLoad = ({ url, request }) => {
	let lang = extractLocaleFromUrl(url);
	if (lang === undefined) {
		lang = extractLocaleFromRequestWithStrategies(request, strategy);
		const localizedUrl = localizeUrl(url, { locale: lang });
		redirect(307, `${localizedUrl.pathname}${localizedUrl.search}`);
	}
	lang ??= DEFAULT_LOCALE;

	return {
		news,
		profileConfig: profileRegistry("empty").configOfLanguage(lang),
		lang,
		allProfileConfigs: allProfileConfigs(lang),
	};
};
