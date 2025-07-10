import type { ParsedLocation, RelativeTimeType } from "$lib/types";
import { type DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import { toast } from "$lib/state/toastStore";
import type { DisplayedJourney } from "$lib/state/displayedJourney.svelte";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { browser } from "$app/environment";

export type BookmarkType = "diagram" | "journey" | "location";

export type Bookmarks = {
	diagram: DiagramBookmark[];
	journey: JourneyBookmark[];
	location: ParsedLocation[];
};

type DiagramBookmark = {
	/** the link of the bookmark */
	id: string;
	stops: Pick<ParsedLocation, "name" | "type">[];
	scrollDirection: RelativeTimeType;
	time: string;
	type: "absolute";
	/** @deprecated use id instead */
	link?: string;
};

type JourneyBookmark = {
	id: string;
	start: Pick<ParsedLocation, "name" | "type">;
	destination: Pick<ParsedLocation, "name" | "type">;
	arrival: string;
	departure: string;
	/** @deprecated use id instead */
	link?: string;
};

export type BookmarkData<T extends BookmarkType> = T extends "diagram"
	? DisplayedFormData
	: T extends "journey"
		? DisplayedJourney
		: T extends "location"
			? ParsedLocation
			: never;

const bookmarks: Bookmarks = $state({
	location: [],
	diagram: [],
	journey: []
});

if (browser) {
	let bookmarkType: BookmarkType;
	for (bookmarkType in bookmarks) {
		initBookmarks(bookmarkType);
	}
}

/**
 * read and return all bookmarks of a certain type from localStorage
 * @param type `"diagram"`, `"journey"` or `"station"` depending on the type of the bookmark
 */
export function initBookmarks<T extends BookmarkType>(type: T): void {
	const stringifiedBookmarks = localStorage.getItem(`${type}Bookmarks`);
	if (stringifiedBookmarks === null) {
		bookmarks[type] = [];
		return;
	}
	bookmarks[type] = JSON.parse(stringifiedBookmarks) as Bookmarks[T];
}

const sortBookmarks: { [K in BookmarkType]: (b: Bookmarks[K]) => Bookmarks[K] } = {
	diagram: (b) => {
		return b.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
	},
	journey: (b) => {
		return b.sort((a, b) => new Date(a.departure).getTime() - new Date(b.departure).getTime());
	},
	location: (b) => {
		return b.sort((a, b) => a.name.localeCompare(b.name));
	}
};

const formatBookmarkId: { [K in BookmarkType]: (bookmarkData: BookmarkData<K>) => string } = {
	diagram: (bookmarkData) => {
		const diagramApiClient = apiClient("GET", "diagram");
		return diagramApiClient.formatNonApiUrl(
			diagramApiClient.formDataToRequestData(bookmarkData)
		).href;
	},
	journey: (bookmarkData) => {
		const tokens = bookmarkData.selectedSubJourneys.map((j) => j?.refreshToken ?? "");
		return apiClient("GET", "journey").formatNonApiUrl(tokens).href;
	},
	location: (bookmarkData) => bookmarkData.id
};

const addBookmark: {
	[K in BookmarkType]: (id: string, bookmarkData: BookmarkData<K>) => void;
} = {
	diagram: (id, bookmarkData) =>
		void bookmarks.diagram.push({
			id,
			stops: bookmarkData.locations.map((location) => {
				return {
					type: location.value.type,
					name: location.value.name
				};
			}),
			time: bookmarkData.timeData.time,
			scrollDirection: bookmarkData.timeData.scrollDirection,
			type: "absolute"
		}),
	journey: (id, bookmarkData) =>
		void bookmarks.journey.push({
			id,
			start: {
				type: bookmarkData.locations.at(0)?.value.type ?? "station",
				name: bookmarkData.locations.at(0)?.value.name ?? ""
			},
			destination: {
				type: bookmarkData.locations.at(-1)?.value.type ?? "station",
				name: bookmarkData.locations.at(-1)?.value.name ?? ""
			},
			departure: bookmarkData.departure ?? new Date(0).toISOString(),
			arrival: bookmarkData.arrival ?? new Date(0).toISOString()
		}),
	location: (_id, bookmarkData) => void bookmarks.location.push(bookmarkData)
};

export function toggleBookmark<T extends BookmarkType>(
	type: T,
	bookmarkData: BookmarkData<T>
): void {
	const id = formatBookmarkId[type](bookmarkData);
	const indexInOldData = bookmarks[type].findIndex((bookmark) => bookmark.id === id);
	const toastMessage = `Lesezeichen für ${bookmarkToString[type](bookmarkData)}`;
	if (indexInOldData !== -1) {
		// remove bookmark
		bookmarks[type].splice(indexInOldData, 1);
		toast(`${toastMessage} entfernt.`, "green");
	} else {
		addBookmark[type](id, bookmarkData);
		bookmarks[type] = sortBookmarks[type](bookmarks[type]);
		toast(`${toastMessage} hinzugefügt.`, "green");
	}

	if (bookmarks[type].length === 0) {
		localStorage.removeItem(`${type}Bookmarks`);
		return;
	}
	localStorage.setItem(`${type}Bookmarks`, JSON.stringify(bookmarks[type]));
}

export function getIsBookmarked<T extends BookmarkType>(
	type: T,
	bookmarkData: BookmarkData<T>
): boolean {
	const bookmarkId = formatBookmarkId[type](bookmarkData);
	return bookmarks[type].some(({ id }) => id === bookmarkId);
}

export const bookmarkToString: { [T in BookmarkType]: (bookmarkData: BookmarkData<T>) => string } =
	{
		diagram: (_) => "Suchanfrage",
		journey: (_) => "Reise",
		location: (bookmarkData) => bookmarkData.name
	};

export const getBookmarks: { [T in BookmarkType]: () => Bookmarks[T] } = {
	diagram: () => bookmarks.diagram,
	journey: () => bookmarks.journey,
	location: () => bookmarks.location
};
