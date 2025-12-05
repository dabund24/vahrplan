import type { LayoutServerLoad } from "./$types";
import { news } from "$lib/server/news.server";
import { profileRegistry } from "./[lang=lang]/[profile=profileId]/api/profile/profileRegistry.server";

export const load: LayoutServerLoad = () => ({
	news,
	profileConfig: profileRegistry("empty").configOfLanguage("de"),
	lang: "de"
});
