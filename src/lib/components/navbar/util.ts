type RouteSuffix = "" | "/diagram" | "/journey";
export type Route =
	`/[lang=lang]/${`[profile=profileId]${RouteSuffix}` | "profiles" | "bookmarks" | "settings" | "about" | "privacy" | "imprint"}`;
