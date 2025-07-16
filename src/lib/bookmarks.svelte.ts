import type { ParsedLocation, RelativeTimeType } from "$lib/types";
import { type DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import { toast } from "$lib/state/toastStore";
import type { DisplayedJourney } from "$lib/state/displayedJourney.svelte";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { browser } from "$app/environment";
import type { DiagramData } from "$lib/state/diagramData.svelte";

export type BookmarkType = "diagram" | "journey" | "location";

export type Bookmarks = {
	diagram: DiagramBookmark[];
	journey: JourneyBookmark[];
	location: (ParsedLocation & { profile: "dbnav" })[];
};

type DiagramBookmark = {
	/** the link of the bookmark */
	id: string;
	profile: "dbnav";
	stops: Pick<ParsedLocation, "name" | "type">[];
	scrollDirection: RelativeTimeType;
	/** time entered by user */
	time: string;
	/** same as time if user has defined departure time, otherwise estimated departure time; TODO turn into mandatory property */
	departure?: string;
	/** same as time if user has defined arrival time, otherwise estimated arrival time; TODO turn into mandatory property */
	arrival?: string;
	type: "absolute";
	/** @deprecated use id instead */
	link?: string;
};

type JourneyBookmark = {
	id: string;
	profile: "dbnav";
	start: Pick<ParsedLocation, "name" | "type">;
	destination: Pick<ParsedLocation, "name" | "type">;
	arrival: string;
	departure: string;
	/** @deprecated use id instead */
	link?: string;
};

export type BookmarkData<T extends BookmarkType> = T extends "diagram"
	? { formData: DisplayedFormData; diagramData: DiagramData }
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
	diagram: ({ formData }) => {
		const diagramApiClient = apiClient("GET", "diagram");
		return diagramApiClient.formatNonApiUrl(diagramApiClient.formDataToRequestData(formData))
			.href;
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
	diagram: (id, { formData, diagramData }) => {
		const time = formData.timeData.time;
		const scrollDirection = formData.timeData.scrollDirection;
		const departure =
			scrollDirection === "later"
				? time
				: new Date(
						diagramData.columns[0].journeys[0].departureTime?.time ?? 0
					).toISOString();
		const arrival =
			scrollDirection === "earlier"
				? time
				: new Date(
						diagramData.columns.at(-1)?.journeys.at(-1)?.arrivalTime?.time ?? 0
					).toISOString();

		bookmarks.diagram.push({
			id,
			profile: "dbnav",
			stops: formData.locations.map((location) => {
				return {
					type: location.value.type,
					name: location.value.name
				};
			}),
			time,
			departure,
			arrival,
			scrollDirection,
			type: "absolute"
		});
	},
	journey: (id, bookmarkData) =>
		void bookmarks.journey.push({
			id,
			profile: "dbnav",
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
	location: (_id, bookmarkData) =>
		void bookmarks.location.push({ ...bookmarkData, profile: "dbnav" })
};

function syncLocalStorage(type: BookmarkType): void {
	if (bookmarks[type].length === 0) {
		localStorage.removeItem(`${type}Bookmarks`);
		return;
	}
	localStorage.setItem(`${type}Bookmarks`, JSON.stringify(bookmarks[type]));
}

/**
 * turns passed bookmark data into bookmark and adds it if the bookmark does not yet exist. otherwise, removes the bookmark
 * @param type bookmark type
 * @param bookmarkData
 */
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

	syncLocalStorage(type);
}

/**
 * check if something is bookmarked
 * @param type bookmark type
 * @param bookmarkData
 */
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

/**
 * get all bookmarks of a type
 * @param type
 */
export function getBookmarks<T extends BookmarkType>(type: T): Bookmarks[T] {
	return bookmarks[type];
}

/**
 * remove a bookmark
 * @param type
 * @param id id of the bookmark to be removed
 */
export function removeBookmark<T extends BookmarkType>(type: T, id: string): void {
	bookmarks[type] = remove[type](id);
	toast("Lesezeichen gelöscht", "green");
	syncLocalStorage(type);
}

const remove: { [T in BookmarkType]: (id: string) => Bookmarks[T] } = {
	diagram: (id) => bookmarks.diagram.filter((b) => (b.link ?? b.id) !== id),
	journey: (id) => bookmarks.journey.filter((b) => (b.link ?? b.id) !== id),
	location: (id) => bookmarks.location.filter((b) => b.id !== id)
};
