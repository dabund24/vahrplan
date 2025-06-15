type RouteSuffix = "" | "/diagram" | "/journey" | "/bookmarks" | "/settings" | "/about";
export type Route = `/[lang]/[profile]${RouteSuffix}` | "/[lang]/privacy" | "/[lang]/imprint";
