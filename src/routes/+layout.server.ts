import type { LayoutServerLoad } from "./$types";
import { news } from "$lib/server/news.server";
import { profileConfig } from "./[lang=lang]/[profile=profileId]/api/profile/profileConfigFactory.server";

export const load: LayoutServerLoad = () => ({
	news,
	profile: profileConfig("empty", "de"),
	lang: "de"
});
