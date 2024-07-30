import type { DisplayedFormData } from "$lib/stores/journeyStores";
import type { DiagramRequestData, TransitType } from "$lib/types";
import type { Location } from "hafas-client";
import type { Settings } from "$lib/stores/settingStore";

export function getDiagramUrlFromRequestData(requestData: DiagramRequestData): string {
	let url = "/diagram";
	url += `?stops=${encodeURIComponent(JSON.stringify(requestData.stops))}`;
	url += `&time=${encodeURIComponent(new Date(requestData.time).toJSON())}`;
	url += `&timeRole=${encodeURIComponent(requestData.timeRole)}`;
	url += `&options=${encodeURIComponent(JSON.stringify(requestData.options))}`;
	return url;
}

export function getDiagramUrlFromFormData(formData: DisplayedFormData | undefined): URL {
	let url = new URL("/diagram", location.origin);
	if (formData !== undefined) {
		url = setDiagramSearchParams(formData, url);
	}
	return url;
}

export function getApiJourneysUrl(formData: DisplayedFormData): URL {
	let url = new URL("/api/diagram", location.origin);
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

/**
 * returns diagram request data for a given api url for diagram endpoint
 * @param url should have `stops`, `options`, `timeRole` and `time` params having the request data
 */
export function parseApiJourneysUrl(url: URL): DiagramRequestData | undefined {
	try {
		return {
			stops: JSON.parse(url.searchParams.get("stops") ?? "") as (string | Location)[],
			options: JSON.parse(
				url.searchParams.get("options") ?? ""
			) as Settings["journeysOptions"],
			timeRole: url.searchParams.get("timeRole") as TransitType,
			time: new Date(url.searchParams.get("time") as string)
		};
	} catch {
		return undefined;
	}
}

export function getApiRefreshUrl(tokens: (string | null)[]): URL {
	const url = new URL("/api/journey", location.origin);
	url.searchParams.set("tokens", btoa(JSON.stringify(tokens)));
	return url;
}

export function getApiLocationsUrl(input: string, hafas: boolean): URL {
	const url = new URL("/api/locations", location.origin);
	url.searchParams.set("name", input);
	url.searchParams.set("hafas", String(hafas));
	return url;
}
