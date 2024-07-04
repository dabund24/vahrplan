import type { DisplayedLocations } from "$lib/stores/journeyStores";
import { get } from "svelte/store";
import { settings } from "$lib/stores/settingStore";

export function getTreeUrl(dLocations: DisplayedLocations): URL {
	const url = new URL("/api/journeys", location.origin);
	url.searchParams.set(
		"stops",
		JSON.stringify(
			dLocations.locations.map((keyedLocation) => keyedLocation.value.requestParameter)
		)
	);
	url.searchParams.set("time", dLocations.time.toJSON());
	url.searchParams.set("timeRole", dLocations.timeRole);
	url.searchParams.set("options", JSON.stringify(get(settings).journeysOptions));
	return url;
}

export function getRefreshUrl(tokens: (string | null)[]): URL {
	const url = new URL("/api/refresh", location.origin);
	url.searchParams.set("tokens", btoa(JSON.stringify(tokens)));
	return url;
}

export function getLocationsUrl(input: string, hafas: boolean): URL {
	const url = new URL("/api/locations", location.origin);
	url.searchParams.set("name", input);
	url.searchParams.set("hafas", String(hafas));
	return url;
}
