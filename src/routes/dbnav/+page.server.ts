import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { page } from "$app/state";

export const load: PageServerLoad = () => {
	redirect(308, `/${page.data.lang}/transitous`);
};
