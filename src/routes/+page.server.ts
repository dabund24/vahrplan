import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { DEFAULT_LOCALE, DEFAULT_PROFILE } from "$lib/constants";

export const load: PageServerLoad = () => {
	redirect(307, `/${DEFAULT_LOCALE}/${DEFAULT_PROFILE}`);
};
