type RouteSuffix = "" | "/diagram" | "/journey" | "/trip/[tripId]";
export type Route =
	`/[lang=lang]/${`[profile=profileId]${RouteSuffix}` | "profiles" | "bookmarks" | "settings" | "about" | "privacy" | "imprint"}`;
