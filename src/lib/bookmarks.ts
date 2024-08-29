import type { ParsedLocation, TransitType } from "$lib/types";
import { type DisplayedFormData, type SelectedJourney } from "$lib/stores/journeyStores";
import { getDiagramUrlFromFormData, getJourneyUrl } from "$lib/urls";

export type BookmarkType = "diagram" | "journey" | "station";

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
		: T extends "station"
			? {
					type: T;
					bookmarks: ParsedLocation[];
				}
			: never;

export type DiagramBookmark = {
	stops: Pick<ParsedLocation, "name" | "type">[];
	transitType: TransitType;
	time: Date;
	link: string;
};

export type JourneyBookmark = {
	start: Pick<ParsedLocation, "name" | "type">;
	destination: Pick<ParsedLocation, "name" | "type">;
	arrival: Date;
	departure: Date;
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
				(a, b) => new Date(b.departure).getTime() - new Date(a.departure).getTime()
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
	const diagramUrlHref = getDiagramUrlFromFormData(formData).href;
	const indexInOldData = bookmarks.findIndex((bookmark) => bookmark.link === diagramUrlHref);
	if (indexInOldData !== -1) {
		// bookmark already exists => remove it
		bookmarks.splice(indexInOldData, 1);
		setBookmarks({ type: "diagram", bookmarks });
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
		time: formData.time,
		transitType: formData.timeRole,
		link: diagramUrlHref
	};
	bookmarks.push(bookmark);
	setBookmarks({ type: "diagram", bookmarks });
	return bookmarks;
}

/**
 * either removes or adds a diagram bookmark
 * @param journey all sub-journeys
 * @param formData displayed form data
 * @returns all current bookmarks
 */
export function toggleJourneyBookmark(
	journey: SelectedJourney[],
	formData: DisplayedFormData | undefined
): JourneyBookmark[] {
	const bookmarks = getBookmarks("journey");
	if (journey.length === 0 || formData === undefined) {
		return bookmarks;
	}
	const journeyUrlHref = getJourneyUrl(journey).href;
	const indexInOldData = bookmarks.findIndex((bookmark) => bookmark.link === journeyUrlHref);
	if (indexInOldData !== -1) {
		// bookmark already exists => remove it
		bookmarks.splice(indexInOldData, 1);
		setBookmarks({ type: "journey", bookmarks });
		return bookmarks;
	}
	// bookmark does not yet exist => add it
	const bookmark: JourneyBookmark = {
		start: {
			type: formData.locations.at(0)?.value.type ?? "station",
			name: formData.locations.at(0)?.value.name ?? ""
		},
		destination: {
			type: formData.locations.at(-1)?.value.type ?? "station",
			name: formData.locations.at(-1)?.value.name ?? ""
		},
		departure: journey.at(0)?.departure.departure?.time ?? new Date(0),
		arrival: journey.at(-1)?.arrival.arrival?.time ?? new Date(0),
		link: journeyUrlHref
	};
	bookmarks.push(bookmark);
	setBookmarks({ type: "journey", bookmarks });
	return bookmarks;
}
