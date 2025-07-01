import type { ParsedLocation, RelativeTimeType } from "$lib/types";
import { type DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import { toast } from "$lib/state/toastStore";
import type { DisplayedJourney } from "$lib/state/displayedJourney.svelte";
import { apiClient } from "$lib/api-client/apiClientFactory";

export type BookmarkType = "diagram" | "journey" | "location";

type Bookmarks<T extends BookmarkType> = T extends "diagram"
	? {
			type: T;
			bookmarks: DiagramBookmark[];
		}
	: T extends "journey"
		? {
				type: T;
				bookmarks: JourneyBookmark[];
			}
		: T extends "location"
			? {
					type: T;
					bookmarks: ParsedLocation[];
				}
			: never;

export type DiagramBookmark = {
	stops: Pick<ParsedLocation, "name" | "type">[];
	scrollDirection: RelativeTimeType;
	time: string;
	link: string;
	type: "absolute";
};

export type JourneyBookmark = {
	start: Pick<ParsedLocation, "name" | "type">;
	destination: Pick<ParsedLocation, "name" | "type">;
	arrival: string;
	departure: string;
	link: string;
};

/**
 * read and return all bookmarks of a certain type from localStorage
 * @param type `"diagram"`, `"journey"` or `"station"` depending on the type of the bookmark
 */
export function getBookmarks<T extends BookmarkType>(type: T): Bookmarks<T>["bookmarks"] {
	const stringifiedBookmarks = localStorage.getItem(`${type}Bookmarks`);
	if (stringifiedBookmarks === null) {
		return [];
	}
	return JSON.parse(stringifiedBookmarks) as Bookmarks<T>["bookmarks"];
}

/**
 * save bookmarks of a certain type in localStorage.
 * sorts the bookmarks based on a type-specific metric beforehand.
 * @param bookmarks the bookmarks to be stored
 */
export function setBookmarks<T extends BookmarkType>(bookmarks: Bookmarks<T>): void {
	let sortedBookmarks: Bookmarks<T>["bookmarks"];
	// sort bookmarks based on type
	switch (bookmarks.type) {
		case "diagram":
			sortedBookmarks = bookmarks.bookmarks.sort(
				(a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
			);
			break;
		case "journey":
			sortedBookmarks = bookmarks.bookmarks.sort(
				(a, b) => new Date(a.departure).getTime() - new Date(b.departure).getTime()
			);
			break;
		default:
			sortedBookmarks = bookmarks.bookmarks.sort((a, b) => a.name.localeCompare(b.name));
	}
	localStorage.setItem(`${bookmarks.type}Bookmarks`, JSON.stringify(sortedBookmarks));
}

/**
 * either removes or adds a diagram bookmark
 * @param formData form data of the diagram
 * @returns all current bookmarks
 */
export function toggleDiagramBookmark(formData: DisplayedFormData | undefined): DiagramBookmark[] {
	if (formData === undefined) {
		return getBookmarks("diagram");
	}
	const bookmarks = getBookmarks("diagram");
	const diagramApiClient = apiClient("GET", "diagram");
	const diagramUrlHref = diagramApiClient.formatNonApiUrl(
		diagramApiClient.formDataToRequestData(formData)
	).href;
	const indexInOldData = bookmarks.findIndex((bookmark) => bookmark.link === diagramUrlHref);
	if (indexInOldData !== -1) {
		// bookmark already exists => remove it
		bookmarks.splice(indexInOldData, 1);
		setBookmarks({ type: "diagram", bookmarks });
		toast("Lesezeichen für Suchanfrage entfernt.", "green");
		return bookmarks;
	}
	// bookmark does not yet exist => add it
	const bookmark: DiagramBookmark = {
		stops: formData.locations.map((location) => {
			return {
				type: location.value.type,
				name: location.value.name
			};
		}),
		time: formData.timeData.time,
		scrollDirection: formData.timeData.scrollDirection,
		link: diagramUrlHref,
		type: "absolute"
	};
	bookmarks.push(bookmark);
	setBookmarks({ type: "diagram", bookmarks });
	toast("Lesezeichen für Suchanfrage hinzugefügt.", "green");
	return bookmarks;
}

/**
 * either removes or adds a diagram bookmark
 * @param journey all sub-journeys
 * @returns all current bookmarks
 */
export function toggleJourneyBookmark(journey: DisplayedJourney): JourneyBookmark[] {
	const bookmarks = getBookmarks("journey");
	if (journey.selectedSubJourneys.length === 0) {
		return bookmarks;
	}

	const tokens = journey.selectedSubJourneys.map((j) => j?.refreshToken ?? "");
	const journeyUrlHref = apiClient("GET", "journey").formatNonApiUrl(tokens).href;
	const indexInOldData = bookmarks.findIndex((bookmark) => bookmark.link === journeyUrlHref);
	if (indexInOldData !== -1) {
		// bookmark already exists => remove it
		bookmarks.splice(indexInOldData, 1);
		setBookmarks({ type: "journey", bookmarks });
		toast("Lesezeichen für Reise entfernt.", "green");
		return bookmarks;
	}
	// bookmark does not yet exist => add it
	const bookmark: JourneyBookmark = {
		start: {
			type: journey.locations.at(0)?.value.type ?? "station",
			name: journey.locations.at(0)?.value.name ?? ""
		},
		destination: {
			type: journey.locations.at(-1)?.value.type ?? "station",
			name: journey.locations.at(-1)?.value.name ?? ""
		},
		departure: journey.departure ?? new Date(0).toISOString(),
		arrival: journey.arrival ?? new Date(0).toISOString(),
		link: journeyUrlHref
	};
	bookmarks.push(bookmark);
	setBookmarks({ type: "journey", bookmarks });
	toast("Lesezeichen für Reise hinzugefügt.", "green");
	return bookmarks;
}
