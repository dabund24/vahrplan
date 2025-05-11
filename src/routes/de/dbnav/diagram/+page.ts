import type { PageLoad } from "./$types";
import type { KeyedItem, ParsedLocation } from "$lib/types";
import { browser } from "$app/environment";
import { error, redirect } from "@sveltejs/kit";
import { apiClient } from "$lib/api-client/apiClientFactory";
import {
	getDisplayedFormData,
	type DisplayedFormData
} from "$lib/state/displayedFormData.svelte.js";
import type { GetDiagramApiClient } from "../api/diagram/getClient";
import { VahrplanError } from "$lib/VahrplanError";

const diagramApiClient = apiClient("GET", "/de/dbnav/api/diagram");

export const load: PageLoad = async ({ url, fetch }) => {
	if (url.searchParams.size === 0) {
		redirect(303, "/");
	}

	if (browser && formDataMatchesUrl(url, getDisplayedFormData())) {
		// no need to re-fetch the diagram, displayed diagram is already correct
		return {
			formData: undefined
		};
	}

	const requestData = await diagramApiClient.parseNonApiUrl(url);
	const formData = await diagramRequestDataToFormData(requestData, fetch);
	return {
		formData
	};
};

/**
 * checks if the passed form data matches the passed url
 * @param url
 * @param formData
 */
function formDataMatchesUrl(url: URL, formData: DisplayedFormData | undefined): boolean {
	if (formData === undefined) {
		return false;
	}

	const currentDiagramData: Parameters<(typeof diagramApiClient)["formatNonApiUrl"]>[0] = {
		stops: formData.locations.map((l) => l.value.id),
		timeData: formData.timeData,
		options: formData.options
	};
	return diagramApiClient.formatNonApiUrl(currentDiagramData).href === url.href;
}

async function diagramRequestDataToFormData(
	diagramRequestData: Parameters<GetDiagramApiClient["formatNonApiUrl"]>[0],
	fetchFn: typeof fetch
): Promise<DisplayedFormData> {
	const locationApiClient = apiClient("GET", "/de/dbnav/api/location/[locationId]");
	const stopObjects: KeyedItem<ParsedLocation, number>[] = await Promise.all(
		diagramRequestData.stops.map(async (stopQuery) => {
			const location = (await locationApiClient.request(stopQuery, fetchFn)).throwIfError();
			return {
				key: Math.random(),
				value: location.content
			};
		})
	);

	if (stopObjects.length < 2) {
		error(
			400,
			VahrplanError.withMessage("HAFAS_INVALID_REQUEST", "Weniger als 2 Stationen angegeben")
		);
	}

	return {
		locations: stopObjects,
		timeData: diagramRequestData.timeData,
		options: diagramRequestData.options,
		geolocationDate: new Date()
	};
}
