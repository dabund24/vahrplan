import type { DiagramRequestData, KeylessDatabaseEntry } from "$lib/types";
import type { DisplayedFormData } from "$lib/stores/journeyStores";
import { putApiData } from "$lib/util";

export async function shareDiagram(formData: DisplayedFormData | undefined): Promise<void> {
	if (formData === undefined) {
		return;
	}
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
		console.error("something went wrong generating short url!");
		return;
	}

	const shortUrl = new URL(`/diagram`, location.origin);
	shortUrl.searchParams.set("d", keyResponse.content);
	if (navigator.share) {
		void navigator.share({
			title: `Vahrplan: ${formData.locations[0].value.name} → ${formData.locations.at(-1)?.value.name}`,
			url: shortUrl.href
		});
	} else {
		void navigator.clipboard.writeText(shortUrl.href);
	}
}
