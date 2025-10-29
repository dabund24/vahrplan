import type { LayoutServerLoad } from "./$types";
import { news } from "$lib/server/news.server";

export const load: LayoutServerLoad = () => ({ news, profile: "dbnav", lang: "de" });
