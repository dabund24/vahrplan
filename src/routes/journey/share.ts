import type { KeylessDatabaseEntry, ParsedTime } from "$lib/types";
import { putApiData } from "$lib/util";

/**
 * if no sub-journey is unselected, generates a short link for a journey and shows the share dialog if supported.
 * @param tokens refresh tokens of sub-journeys
 * @param departure departure time of journey
 */
export async function shareJourney(tokens: string[], { departure }: ParsedTime): Promise<void> {
	if (
		tokens.length === 0 ||
		tokens.some((t) => t.length < 5) ||
		departure === undefined ||
		departure === null
	) {
		return;
	}

	const keylessDatabaseEntry: KeylessDatabaseEntry<string[]> = {
		type: "journey",
		value: tokens,
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
