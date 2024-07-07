import type { DisplayedFormData } from "$lib/stores/journeyStores";

export function getDiagramUrl(formData: DisplayedFormData | undefined): URL {
	let url = new URL("/diagram", location.origin);
	if (formData !== undefined) {
		url = setDiagramSearchParams(formData, url);
	}
	return url;
}

export function getApiJourneysUrl(formData: DisplayedFormData): URL {
	let url = new URL("/api/journeys", location.origin);
	url = setDiagramSearchParams(formData, url);
	return url;
}

function setDiagramSearchParams(formData: DisplayedFormData, url: URL): URL {
	url.searchParams.set(
		"stops",
		JSON.stringify(
			formData.locations.map((keyedLocation) => keyedLocation.value.requestParameter)
		)
	);
	url.searchParams.set("time", formData.time.toJSON());
	url.searchParams.set("timeRole", formData.timeRole);
	url.searchParams.set("options", JSON.stringify(formData.options));
	return url;
}

export function getApiRefreshUrl(tokens: (string | null)[]): URL {
	const url = new URL("/api/refresh", location.origin);
	url.searchParams.set("tokens", btoa(JSON.stringify(tokens)));
	return url;
}

export function getApiLocationsUrl(input: string, hafas: boolean): URL {
	const url = new URL("/api/locations", location.origin);
	url.searchParams.set("name", input);
	url.searchParams.set("hafas", String(hafas));
	return url;
}
