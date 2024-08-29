import type { KeylessDatabaseEntry, ParsedTime } from "$lib/types";
import { getFirstAndLastTime, putApiData } from "$lib/util";
import { type SelectedJourney } from "$lib/stores/journeyStores";

/**
 * if no sub-journey is unselected, generates a short link for a journey and shows the share dialog if supported.
 * @param selectedSubJourneys all selected sub-journeys
 */
export async function shareJourney(selectedSubJourneys: SelectedJourney[]): Promise<void> {
	if (selectedSubJourneys.length === 0 || selectedSubJourneys.some((j) => j.selectedBy === -1)) {
		return;
	}

	const { departure }: ParsedTime = getFirstAndLastTime(selectedSubJourneys[0].blocks)[
		"departure"
	];

	if (departure === null || departure === undefined) {
		return;
	}

	const keylessDatabaseEntry: KeylessDatabaseEntry<string[]> = {
		type: "journey",
		value: selectedSubJourneys.map((journey) => journey.refreshToken),
		expirationDate: new Date(departure.time).getTime() + 604_800_000 // 7 days
	};

	const requestUrl = new URL("/api/journey/shorturl", location.origin);
	const keyResponse = await putApiData<string[], string>(requestUrl, keylessDatabaseEntry, 2);
	if (keyResponse.isError) {
		console.error("something went wrong generating short url!");
		return;
	}

	const shortUrl = new URL(`/journey`, location.origin);
	shortUrl.searchParams.set("j", keyResponse.content);
	if (navigator.share) {
		void navigator.share({
			title: `Vahrplan`,
			url: shortUrl.href
		});
	} else {
		void navigator.clipboard.writeText(shortUrl.href);
	}
}
