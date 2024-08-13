import type { ParsedLocation, TransitType } from "$lib/types";

type BookmarkType = "diagram" | "journey" | "station";

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

type DiagramBookmark = {
	stops: Pick<ParsedLocation, "name" | "type">[];
	transitType: TransitType;
	time: Date;
	link: string;
};

type JourneyBookmark = {
	start: string;
	destination: string;
	arrival: Date;
	departure: Date;
	duration: number;
	link: string;
};

type StationBookmark = {
	type: ParsedLocation["type"];
	name: string;
};

/**
 * read and return all bookmarks of a certain type from localStorage
 * @param type `"diagram"`, `"journey"` or `"station"` depending on the type of the bookmark
 */
function getBookmarks<T extends BookmarkType>(type: T): Bookmarks<T>["bookmarks"] {
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
function setDiagramBookmarks<T extends BookmarkType>(bookmarks: Bookmarks<T>): void {
	let sortedBookmarks: Bookmarks<T>["bookmarks"];
	// sort bookmarks based on type
	switch (bookmarks.type) {
		case "diagram":
			sortedBookmarks = bookmarks.bookmarks.sort(
				(a, b) => b.time.getTime() - a.time.getTime()
			);
			break;
		case "journey":
			sortedBookmarks = bookmarks.bookmarks.sort(
				(a, b) => b.departure.getTime() - a.departure.getTime()
			);
			break;
		default:
			sortedBookmarks = bookmarks.bookmarks;
	}
	localStorage.setItem("diagramBookmarks", JSON.stringify(sortedBookmarks));
}
