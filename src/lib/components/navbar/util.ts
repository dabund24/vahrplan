type RouteSuffix = "" | "/diagram" | "/journey" | "/bookmarks" | "/settings" | "/about";
export type Route = `/[lang=lang]/${`[profile=profileId]${RouteSuffix}` | "privacy" | "imprint"}`;
