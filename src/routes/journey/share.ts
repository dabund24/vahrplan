import type { KeylessDatabaseEntry, ParsedTime } from "$lib/types";
import { getFirstAndLastTime, putApiData } from "$lib/util";
import { type SelectedJourney } from "$lib/stores/journeyStores";
import { toast } from "$lib/stores/toastStore";
import { get } from "svelte/store";
import { settings } from "$lib/stores/settingStore";
import { getJourneyUrl } from "$lib/urls";

/**
 * shares a journey if no sub-journey is unselected and shows the share dialog if supported.
 * Generates a short url if enabled in the settings.
 * @param selectedSubJourneys all selected sub-journeys
 */
export async function shareJourney(selectedSubJourneys: SelectedJourney[]): Promise<void> {
	if (selectedSubJourneys.length === 0 || selectedSubJourneys.some((j) => j.selectedBy === -1)) {
		return;
	}

	const urlHref: string = get(settings).general.shortLinksJourneys
		? ((await generateJourneyShortUrl(selectedSubJourneys)) ??
			getJourneyUrl(selectedSubJourneys).href)
		: getJourneyUrl(selectedSubJourneys).href;

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
 * generates a short url for a given journey
 * @param selectedSubJourneys
 */
async function generateJourneyShortUrl(
	selectedSubJourneys: SelectedJourney[]
): Promise<string | undefined> {
	const { departure }: ParsedTime = getFirstAndLastTime(selectedSubJourneys[0].blocks)[
		"departure"
	];

	if (departure === null || departure === undefined) {
		return undefined;
	}

	const keylessDatabaseEntry: KeylessDatabaseEntry<string[]> = {
		type: "journey",
		value: selectedSubJourneys.map((journey) => journey.refreshToken),
		expirationDate: new Date(departure.time).getTime() + 604_800_000 // 7 days
	};

	const requestUrl = new URL("/api/journey/shorturl", location.origin);
	const keyResponse = await putApiData<string[], string>(requestUrl, keylessDatabaseEntry, 2);
	if (keyResponse.isError) {
		toast("Kurzlink konnte nicht generiert werden.", "red");
		return;
	}
	const url = new URL(`/journey`, location.origin);
	url.searchParams.set("j", keyResponse.content);

	return url.href;
}
