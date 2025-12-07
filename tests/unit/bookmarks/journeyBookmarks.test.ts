/**
 * @vitest-environment jsdom
 */

import { expect, test, vi } from "vitest";
import { type BookmarkData, type Bookmarks, toggleBookmark } from "$lib/bookmarks.svelte";
import type { SubJourney } from "$lib/types";
import { exampleProfileConfig } from "../../testUtils";

const bookmarkData: BookmarkData<"journey"> = {
	blocks: [],
	locations: [
		{
			key: 0,
			value: {
				name: "start",
				type: "address",
				id: "startId",
				position: { lat: 1, lng: 0 }
			}
		},
		{
			key: 1,
			value: {
				name: "dest",
				type: "address",
				id: "destId",
				position: { lat: 0, lng: 1 }
			}
		}
	],
	selectedSubJourneys: [{ refreshToken: "a" } as SubJourney],
	departure: new Date(1).toISOString(),
	arrival: new Date(2).toISOString(),
	statuses: new Set()
};

const bookmark: Bookmarks["journey"][number] = {
	id: "http://localhost/de/dbnav/journey?tokens%5B%5D=a",
	profile: "dbnav",
	start: { type: "address", name: "start" },
	destination: { type: "address", name: "dest" },
	departure: new Date(1).toISOString(),
	arrival: new Date(2).toISOString()
};

test("format journey bookmark", () => {
	const spy = vi.spyOn(Storage.prototype, "setItem");
	toggleBookmark("journey", bookmarkData, { profileConfig: exampleProfileConfig });
	expect(spy).toHaveBeenCalledExactlyOnceWith("journeyBookmarks", JSON.stringify([bookmark]));
});
