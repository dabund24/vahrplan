import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { resolve } from "$app/paths";

export const load: PageServerLoad = () => {
	redirect(
		308,
		resolve("/[lang=lang]/[profile=profileId]", { lang: "de", profile: "transitous" }),
	);
};
