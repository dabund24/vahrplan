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
import { toast } from "$lib/stores/toastStore";

export const load: PageLoad = async ({ url, fetch }) => {
	if (browser && getDiagramUrlFromFormData(get(displayedFormData)).href === url.href) {
		// no need to refetch the tree, displayed tree is already correct
		return {
			formData: undefined
		};
	}

	const shortToken = url.searchParams.get("d");
	if (shortToken !== null) {
		// short token is used, redirect to proper page
		const requestDataResponse = (await fetch(`/api/diagram/shorturl?token=${shortToken}`)
			.then((res) => res.json())
			.catch(() => undefined)) as ZugResponse<DiagramRequestData> | undefined;
		if (requestDataResponse === undefined) {
			if (browser) {
				toast("Zum Server konnte keine Verbindung hergestellt werden.", "red");
				return;
			}
			error(500, "Server-Fehler.");
		}
		if (requestDataResponse.isError) {
			error(requestDataResponse.code, requestDataResponse.description);
		}

		const diagramURL = getDiagramUrlFromRequestData(requestDataResponse.content);
		redirect(303, diagramURL);
	}

	if (url.searchParams.size === 0) {
		redirect(303, "/");
	}
	const requestData = parseApiJourneysUrl(url) ?? error(404, "Fehlerhafte URL.");
	const stopObjects: KeyedItem<ParsedLocation, number>[] = await Promise.all(
		requestData.stops.map(async (stopQuery) => {
			const locationUrl = `/api/location?id=${encodeURIComponent(JSON.stringify(stopQuery))}`;
			const response = (await fetch(locationUrl)
				.then((res) => res.json())
				.catch(() => {
					return {
						isError: true,
						description: "Interner Fehler",
						code: browser ? 400 : 500
					};
				})) as ZugResponse<ParsedLocation>;
			if (!response.isError) {
				return {
					key: Math.random(),
					value: response.content
				};
			}
			error(response.code, response.description);
		})
	);

	if (stopObjects.length < 2) {
		error(400, "Weniger als 2 Stationen angegeben.");
	}

	const formData: DisplayedFormData = {
		locations: stopObjects,
		time: requestData.time,
		timeRole: requestData.timeRole as TransitType,
		options: requestData.options,
		geolocationDate: new Date()
	};
	return {
		formData
	};
};
