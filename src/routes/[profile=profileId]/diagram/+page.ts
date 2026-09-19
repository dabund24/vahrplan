import type { PageLoad } from "./$types";
import type { Ctx, KeyedItem, ParsedLocation } from "$lib/types";
import { browser } from "$app/environment";
import { error, redirect } from "@sveltejs/kit";
import { apiClient } from "$lib/api-client/apiClientFactory";
import {
	getDisplayedFormData,
	type DisplayedFormData,
} from "$lib/state/displayedFormData.svelte.js";
import type { GetDiagramApiClient } from "../api/diagram/getClient";
import { VahrplanError } from "$lib/VahrplanError";
import type { ServerRequestData } from "$lib/api-client/ApiClient";

const diagramApiClient = apiClient("GET", "diagram");

export const load: PageLoad = async ({ url, fetch, parent }) => {
	if (url.searchParams.size === 0) {
		redirect(303, "/");
	}
	const { profileConfig, lang } = await parent();

	if (browser && formDataMatchesUrl(url, getDisplayedFormData(), { profileConfig })) {
		// no need to re-fetch the diagram, displayed diagram is already correct
		return { formData: undefined };
	}

	const { reqContent } = diagramApiClient.parseNonApiUrl(url, { profileConfig });
	const formData = await diagramRequestDataToFormData(reqContent, {
		fetchFn: fetch,
		lang,
		profileConfig,
	});
	return {
		formData,
	};
};

/**
 * checks if the passed form data matches the passed url
 * @param url
 * @param formData
 * @param ctx
 */
function formDataMatchesUrl(
	url: URL,
	formData: DisplayedFormData | undefined,
	ctx: Pick<Ctx, "profileConfig">,
): boolean {
	if (formData === undefined) {
		return false;
	}

	const currentDiagramData: Parameters<(typeof diagramApiClient)["formatNonApiUrl"]>[0] = {
		stops: formData.locations.map((l) => l.value.id),
		timeData: formData.timeData,
		filters: formData.filters,
	};

	return diagramApiClient.formatNonApiUrl(currentDiagramData, ctx).href === url.href;
}

async function diagramRequestDataToFormData(
	diagramRequestData: Parameters<GetDiagramApiClient["formatNonApiUrl"]>[0],
	serverRequestData: ServerRequestData,
): Promise<DisplayedFormData> {
	const locationApiClient = apiClient("GET", "location/[locationId]");
	const stopObjects: KeyedItem<ParsedLocation, number>[] = await Promise.all(
		diagramRequestData.stops.map(async (stopQuery) => {
			const location = (
				await locationApiClient.request(stopQuery, serverRequestData)
			).throwIfError();
			return {
				key: Math.random(),
				value: location.content,
			};
		}),
	);

	if (stopObjects.length < 2) {
		error(
			400,
			VahrplanError.withMessage("HAFAS_INVALID_REQUEST", "Weniger als 2 Stationen angegeben"),
		);
	}

	return {
		locations: stopObjects,
		timeData: diagramRequestData.timeData,
		filters: diagramRequestData.filters,
		geolocationDate: new Date(),
		profileConfig: serverRequestData.profileConfig,
	};
}
