import type { DisplayedLocations } from "$lib/stores/journeyStores";
import { get } from "svelte/store";
import { settings } from "$lib/stores/settingStore";
import type { JourneysOptions } from "hafas-client";

export function getTreeUrl(dLocations: DisplayedLocations): URL {
	const url = new URL("/api/journeys", location.origin);
	url.searchParams.set(
		"stops",
		JSON.stringify(
			dLocations.locations.map((keyedLocation) => keyedLocation.value.requestParameter)
		)
	);
	url.searchParams.set(
		"options",
		JSON.stringify({
			...get(settings).journeysOptions,
			[dLocations.timeRole]: dLocations.time
		} as JourneysOptions)
	);
	return url;
}

export function getRefreshUrl(tokens: (string | null)[]): URL {
	const url = new URL("/api/refresh", location.origin);
	url.searchParams.set("tokens", btoa(JSON.stringify(tokens)));
	return url;
}
