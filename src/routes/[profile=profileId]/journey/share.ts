import type { Ctx, KeylessDatabaseEntry } from "$lib/types";
import { toast } from "$lib/state/toastStore";
import { get } from "svelte/store";
import { settings } from "$lib/state/settingStore";
import type { DisplayedJourney } from "$lib/state/displayedJourney.svelte.js";
import type { SelectedData } from "$lib/state/selectedData.svelte.js";
import { apiClient } from "$lib/api-client/apiClientFactory";

/**
 * shares a journey if no sub-journey is unselected and shows the share dialog if supported.
 * Generates a short url if enabled in the settings.
 * @param displayedJourney
 * @param selectedData
 * @param ctx
 */
export async function shareJourney(
	displayedJourney: DisplayedJourney,
	selectedData: SelectedData,
	ctx: Pick<Ctx, "profileConfig">,
): Promise<void> {
	const selectedSubJourneys = displayedJourney.selectedSubJourneys;
	if (selectedSubJourneys.length === 0 || !selectedData.isFullJourneySelected) {
		return;
	}

	const tokens = selectedSubJourneys.map((subJourney) => subJourney?.refreshToken ?? "");
	const journeyDeparture = displayedJourney?.departure ?? new Date(0).toISOString();

	let urlHref: string | undefined;
	if (get(settings).general.shortLinksJourneys) {
		urlHref = (await generateJourneyShortUrl(tokens, journeyDeparture, ctx))?.href;
	}

	urlHref ??= apiClient("GET", "journey").formatNonApiUrl(tokens, ctx).href;

	if (navigator.share) {
		void navigator.share({
			title: document.title,
			url: urlHref,
		});
	} else {
		void navigator.clipboard
			.writeText(urlHref)
			.then(() => toast("Link in Zwischenablage kopiert.", "green"));
	}
}

/**
 * generates a short url for a given journey
 * @param tokens
 * @param departure
 * @param ctx
 */
async function generateJourneyShortUrl(
	tokens: string[],
	departure: string,
	ctx: Pick<Ctx, "profileConfig">,
): Promise<URL | undefined> {
	const keylessDatabaseEntry: KeylessDatabaseEntry<string[]> = {
		type: "journey",
		value: tokens,
		expirationDate: new Date(departure).getTime() + 604_800_000, // 7 days
	};

	const response = await apiClient("PUT", "journey/shorturl").request(keylessDatabaseEntry);
	if (response.isError) {
		toast("Kurzlink konnte nicht generiert werden.", "red");
		return;
	}
	return apiClient("GET", "journey/shorturl/[shortJourneyId]").formatNonApiUrl(
		response.content,
		ctx,
	);
}
