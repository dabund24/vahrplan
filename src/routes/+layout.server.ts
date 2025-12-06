import type { LayoutServerLoad } from "./$types";
import { news } from "$lib/server/news.server";
import { profileRegistry } from "$lib/server/profiles/profileRegistry";

export const load: LayoutServerLoad = () => ({
	news,
	profileConfig: profileRegistry("empty").configOfLanguage("de"),
	lang: "de"
});
