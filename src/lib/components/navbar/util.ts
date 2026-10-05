type RouteSuffix = "" | "/diagram" | "/journey" | "/trip/[tripId]";
export type Route =
	`/${`[profile=profileId]${RouteSuffix}` | "profiles" | "bookmarks" | "settings" | "about" | "privacy" | "imprint"}`;
