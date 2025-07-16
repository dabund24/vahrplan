/**
 * @vitest-environment jsdom
 */

import { expect, test, vi } from "vitest";
import { type BookmarkData, type Bookmarks, toggleBookmark } from "$lib/bookmarks.svelte";
import type { SubJourney } from "$lib/types";
import type { DiagramData } from "$lib/state/diagramData.svelte";

const bookmarkData: BookmarkData<"diagram"> = {
	formData: {
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
	},
	diagramData: {
		columns: [
			{
				journeys: [
					{ departureTime: { time: new Date(95).toISOString() } } as SubJourney,
					{ departureTime: { time: new Date(100).toISOString() } } as SubJourney
				],
				earlierRef: "",
				laterRef: ""
			},
			{
				journeys: [
					{ arrivalTime: { time: new Date(196).toISOString() } } as SubJourney,
					{ arrivalTime: { time: new Date(420).toISOString() } } as SubJourney
				],
				earlierRef: "",
				laterRef: ""
			}
		]
	} as DiagramData
};

const bookmark: Bookmarks["diagram"][number] = {
	id: "http://localhost/de/dbnav/diagram?stops%5B%5D=bodacious&stops%5B%5D=serendipitous&time=1970-01-01T00%3A00%3A00.069Z&time-role=departure&regional-express=&max-transfers=0&min-transfer-time=0",
	profile: "dbnav",
	stops: [
		{ type: "station", name: "Waaa" },
		{ type: "poi", name: "Weee" }
	],
	time: new Date(69).toISOString(),
	departure: new Date(69).toISOString(),
	arrival: new Date(420).toISOString(),
	scrollDirection: "later",
	type: "absolute"
};

test("format diagram bookmark", () => {
	const spy = vi.spyOn(Storage.prototype, "setItem");
	toggleBookmark("diagram", bookmarkData);
	expect(spy).toHaveBeenCalledExactlyOnceWith("diagramBookmarks", JSON.stringify([bookmark]));
});
