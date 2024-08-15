import type { ParsedLocation, TransitType } from "$lib/types";
import type { DisplayedFormData } from "$lib/stores/journeyStores";
import { getDiagramUrlFromFormData } from "$lib/urls";

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
					bookmarks: StationBookmark[];
				}
			: never;

export type DiagramBookmark = {
	stops: Pick<ParsedLocation, "name" | "type">[];
	transitType: TransitType;
	time: Date;
	link: string;
};

export type JourneyBookmark = {
	start: string;
	destination: string;
	arrival: Date;
	departure: Date;
	duration: number;
	link: string;
};

export type StationBookmark = {
	type: ParsedLocation["type"];
	name: string;
};

/**
 * read and return all bookmarks of a certain type from localStorage
 * @param type `"diagram"`, `"journey"` or `"station"` depending on the type of the bookmark
 */
export function getBookmarks<T extends BookmarkType>(type: T): Bookmarks<T>["bookmarks"] {
	const stringifiedBookmarks = localStorage.getItem(`${type}Bookmarks`);
	console.log(stringifiedBookmarks);
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
			sortedBookmarks = bookmarks.bookmarks;
	}
	localStorage.setItem("diagramBookmarks", JSON.stringify(sortedBookmarks));
}

/**
 * either removes or adds a diagram bookmark
 * @param formData form data of the diagram
 * @returns `true` if the data is bookmarked now; `false` otherwise
 */
export function toggleDiagramBookmark(formData: DisplayedFormData | undefined): boolean {
	if (formData === undefined) {
		return false;
	}
	const bookmarks = getBookmarks("diagram");
	const indexInOldData = bookmarks.findIndex(
		(bookmark) => bookmark.link === getDiagramUrlFromFormData(formData).href
	);
	if (indexInOldData !== -1) {
		// bookmark already exists => remove it
		bookmarks.splice(indexInOldData, 1);
		setBookmarks({ type: "diagram", bookmarks });
		return false;
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
		link: getDiagramUrlFromFormData(formData).href
	};
	bookmarks.push(bookmark);
	setBookmarks({ type: "diagram", bookmarks });
	return true;
}
