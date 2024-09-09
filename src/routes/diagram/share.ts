import type { DiagramRequestData, KeylessDatabaseEntry } from "$lib/types";
import type { DisplayedFormData } from "$lib/stores/journeyStores";
import { putApiData } from "$lib/util";
import { toast } from "$lib/stores/toastStore";
import { settings } from "$lib/stores/settingStore";
import { get } from "svelte/store";
import { getDiagramUrlFromFormData } from "$lib/urls";

/**
 * shares a diagram and shows the share dialog if supported.
 * Generates a short url if enabled in the settings.
 * @param formData
 */
export async function shareDiagram(formData: DisplayedFormData | undefined): Promise<void> {
	if (formData === undefined) {
		return;
	}

	const diagramUrl = get(settings).general.shortLinksDiagrams
		? ((await generateDiagramShortUrl(formData)) ?? getDiagramUrlFromFormData(formData))
		: getDiagramUrlFromFormData(formData);

	if (navigator.share) {
		void navigator.share({
			title: document.title,
			url: diagramUrl.href
		});
	} else {
		void navigator.clipboard
			.writeText(diagramUrl.href)
			.then(() => toast("Link in Zwischenablage kopiert.", "green"));
	}
}

/**
 * generates a short url for a diagram from the given form data
 * @param formData
 */
async function generateDiagramShortUrl(formData: DisplayedFormData): Promise<URL | undefined> {
	const diagramRequestData: DiagramRequestData = {
		stops: formData.locations.map((location) => location.value.requestParameter),
		options: formData.options,
		timeRole: formData.timeRole,
		time: formData.time
	};

	const keylessDatabaseEntry: KeylessDatabaseEntry<DiagramRequestData> = {
		type: "journeys",
		value: diagramRequestData,
		expirationDate: formData.time.getTime() + 604_800_000 // 7 days
	};

	const requestUrl = new URL("/api/diagram/shorturl", location.origin);
	const keyResponse = await putApiData<DiagramRequestData, string>(
		requestUrl,
		keylessDatabaseEntry,
		2
	);
	if (keyResponse.isError) {
		toast("Kurzlink konnte nicht generiert werden.", "red");
		return undefined;
	}

	const shortUrl = new URL(`/diagram`, location.origin);
	shortUrl.searchParams.set("d", keyResponse.content);
	return shortUrl;
}
