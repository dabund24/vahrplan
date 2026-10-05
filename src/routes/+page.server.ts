import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { DEFAULT_LOCALE, DEFAULT_PROFILE } from "$lib/constants";
import { extractLocaleFromRequestWithStrategies, strategy } from "$lib/paraglide/runtime";

export const load: PageServerLoad = ({ request }) => {
	const lang = extractLocaleFromRequestWithStrategies(request, strategy) ?? DEFAULT_LOCALE;
	redirect(307, `/${lang}/${DEFAULT_PROFILE}`);
};
