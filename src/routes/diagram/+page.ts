import type { PageLoad } from "./$types";
import { displayedFormData, type DisplayedFormData } from "$lib/stores/journeyStores";
import type { KeyedItem, ParsedLocation, TransitType, ZugResponse } from "$lib/types";
import {
	getDiagramUrlFromFormData,
	getDiagramUrlFromRequestData,
	parseApiJourneysUrl
} from "$lib/urls";
import { browser } from "$app/environment";
import { get } from "svelte/store";
import { error, redirect } from "@sveltejs/kit";
import type { DiagramRequestData } from "$lib/types";

export const load: PageLoad = async ({ url, fetch }) => {
	if (browser && getDiagramUrlFromFormData(get(displayedFormData)).href === url.href) {
		// no need to refetch the tree, displayed tree is already correct
		return {
			formData: undefined
		};
	}

	const shortToken = url.searchParams.get("d");
	let requestData: DiagramRequestData;
	if (shortToken !== null) {
		// short token is used, redirect to proper page
		requestData = (await fetch(`/api/diagram/shorturl?token=${shortToken}`)
			.then((res) => res.json())
			.catch(() => error(404))) as DiagramRequestData;
		const diagramURL = getDiagramUrlFromRequestData(requestData);
		redirect(303, diagramURL);
	}

	requestData = parseApiJourneysUrl(url) ?? error(404);
	const stopObjects: KeyedItem<ParsedLocation, number>[] = await Promise.all(
		requestData.stops.map(async (stopQuery) => {
			const locationUrl = `/api/location?id=${encodeURIComponent(JSON.stringify(stopQuery))}`;
			const response = (await fetch(locationUrl)
				.then((res) => res.json())
				.catch(() => {
					return {
						isError: true
					};
				})) as ZugResponse<ParsedLocation>;
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
		time: requestData.time,
		timeRole: requestData.timeRole as TransitType,
		options: requestData.options,
		geolocationDate: new Date()
	};
	return {
		formData: formData
	};
};
