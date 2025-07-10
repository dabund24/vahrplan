/**
 * @vitest-environment jsdom
 */

import { expect, test, vi } from "vitest";
import { type BookmarkData, type Bookmarks, toggleBookmark } from "$lib/bookmarks.svelte";

const bookmarkData: BookmarkData<"diagram"> = {
	locations: [
		{
			key: 0,
			value: {
				id: "bodacious",
				type: "station",
				position: { lat: 99, lng: 101 },
				name: "Waaa"
			}
		},
		{
			key: 1,
			value: {
				id: "serendipitous",
				type: "poi",
				position: { lat: 99, lng: 101 },
				name: "Weee"
			}
		}
	],
	options: {
		products: {
			longDistanceExpress: false,
			longDistance: false,
			regionalExpress: true,
			regional: false,
			suburban: false,
			subway: false,
			tram: false,
			bus: false,
			taxi: false,
			ferry: false
		},
		bike: false,
		maxTransfers: 0,
		minTransferTime: 0,
		accessible: false
	},
	timeData: { time: new Date(69).toISOString(), type: "absolute", scrollDirection: "later" },
	geolocationDate: new Date(68)
};

const bookmark: Bookmarks["diagram"][number] = {
	id: "http://localhost/de/dbnav/diagram?stops%5B%5D=bodacious&stops%5B%5D=serendipitous&time=1970-01-01T00%3A00%3A00.069Z&time-role=departure&regional-express=&max-transfers=0&min-transfer-time=0",
	stops: [
		{ type: "station", name: "Waaa" },
		{ type: "poi", name: "Weee" }
	],
	time: new Date(69).toISOString(),
	scrollDirection: "later",
	type: "absolute"
};

test("format diagram bookmark", () => {
	const spy = vi.spyOn(Storage.prototype, "setItem");
	toggleBookmark("diagram", bookmarkData);
	expect(spy).toHaveBeenCalledExactlyOnceWith("diagramBookmarks", JSON.stringify([bookmark]));
});
