import type { PageLoad } from "./$types";
import { displayedFormData, type DisplayedFormData } from "$lib/stores/journeyStores";
import type { KeyedItem, ParsedLocation, TransitType, ZugResponse } from "$lib/types";
import type { Settings } from "$lib/stores/settingStore";
import type { Location } from "hafas-client";
import { getDiagramUrl } from "$lib/urls";
import { browser } from "$app/environment";
import { get } from "svelte/store";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ url, fetch }) => {
	if (browser && getDiagramUrl(get(displayedFormData)).href === url.href) {
		// no need to refetch the tree, displayed tree is already correct
		return {
			formData: undefined
		};
	}

	const stops = url.searchParams.get("stops");
	const time = url.searchParams.get("time");
	const timeRole = url.searchParams.get("timeRole");
	const options = url.searchParams.get("options");
	if (stops === null || time === null || timeRole === null || options === null) {
		error(404, "Fehlerhafte URL");
	}

	try {
		const stopObjects: KeyedItem<ParsedLocation, number>[] = await Promise.all(
			(JSON.parse(stops) as (string | Location)[]).map(async (stopQuery) => {
				const locationUrl = `/api/location?id=${encodeURIComponent(JSON.stringify(stopQuery))}`;
				const response = await fetch(locationUrl).then(
					(res) => res.json() as Promise<ZugResponse<ParsedLocation>>
				);
				if (!response.isError) {
					return {
						key: Math.random(),
						value: response.content
					};
				}
				return {
					key: Math.random(),
					value: {
						name: response.type,
						requestParameter: "",
						type: "station",
						position: { lat: 0, lng: 0 }
					}
				};
			})
		);

		const formData: DisplayedFormData = {
			locations: stopObjects,
			time: new Date(time),
			timeRole: timeRole as TransitType,
			options: JSON.parse(options) as Settings["journeysOptions"],
			geolocationDate: new Date()
		};
		return {
			formData: formData
		};
	} catch (e) {
		error(404, "Fehlerhafte URL");
	}
};
