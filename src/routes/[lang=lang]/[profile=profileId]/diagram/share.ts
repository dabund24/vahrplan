import type { KeylessDatabaseEntry } from "$lib/types";
import type { DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import { toast } from "$lib/state/toastStore";
import { settings } from "$lib/state/settingStore";
import { get } from "svelte/store";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { page } from "$app/state";

/**
 * shares a diagram and shows the share dialog if supported.
 * Generates a short url if enabled in the settings.
 * @param formData
 */
export async function shareDiagram(formData: DisplayedFormData | undefined): Promise<void> {
	if (formData === undefined) {
		return;
	}

	let urlHref: string | undefined;
	if (get(settings).general.shortLinksDiagrams) {
		urlHref = (await generateDiagramShortUrl(formData))?.href;
	}

	const diagramApiClient = apiClient("GET", "diagram");
	urlHref ??= diagramApiClient.formatNonApiUrl(diagramApiClient.formDataToRequestData(formData), {
		profileConfig: page.data.profile
	}).href;

	if (navigator.share) {
		void navigator.share({
			title: document.title,
			url: urlHref
		});
	} else {
		void navigator.clipboard
			.writeText(urlHref)
			.then(() => toast("Link in Zwischenablage kopiert.", "green"));
	}
}

/**
 * generates a short url for a diagram from the given form data
 * @param formData
 */
async function generateDiagramShortUrl(formData: DisplayedFormData): Promise<URL | undefined> {
	const profileConfig = page.data.profile;
	const diagramRequestData = apiClient("GET", "diagram").formDataToRequestData(formData);

	const keylessDatabaseEntry: KeylessDatabaseEntry<typeof diagramRequestData> = {
		type: "journeys",
		value: diagramRequestData,
		expirationDate: new Date(formData.timeData.time).getTime() + 604_800_000 // 7 days
	};

	const response = await apiClient("PUT", "diagram/shorturl").request(keylessDatabaseEntry);
	if (response.isError) {
		toast("Kurzlink konnte nicht generiert werden.", "red");
		return undefined;
	}

	return apiClient("GET", "diagram/shorturl/[shortDiagramId]").formatNonApiUrl(response.content, {
		profileConfig
	});
}
