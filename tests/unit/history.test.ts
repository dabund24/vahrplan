/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, test } from "vitest";
import {
	addToStationHistory,
	getStationHistory,
	initStationHistory,
	MAX_ENTRIES_PER_PROFILE,
	removeFromStationHistory,
} from "$lib/history.svelte";
import { settings } from "$lib/state/settingStore";
import type { ParsedLocation } from "$lib/types";

function station(id: string): ParsedLocation {
	return { id, type: "station", name: `Station ${id}`, position: { lat: 0, lng: 0 } };
}

const currentLocation: ParsedLocation = {
	id: "current",
	type: "currentLocation",
	name: "Current location",
	asAt: new Date(0),
	position: { lat: 0, lng: 0 },
};

function setHistoryEnabled(isEnabled: boolean): void {
	settings.update((s) => ({ ...s, storage: { ...s.storage, stationHistory: isEnabled } }));
}

beforeEach(() => {
	localStorage.clear();
	setHistoryEnabled(true);
	initStationHistory();
});

describe("load initial history", () => {
	test("stored history is loaded", () => {
		localStorage.setItem(
			"stationHistory",
			JSON.stringify([{ ...station("a"), profile: "transitous" }]),
		);
		initStationHistory();
		expect(getStationHistory("transitous")).toEqual([
			{ ...station("a"), profile: "transitous" },
		]);
	});

	test("invalid stored history is ignored", () => {
		localStorage.setItem("stationHistory", "{not json");
		initStationHistory();
		expect(getStationHistory("transitous")).toEqual([]);
	});
});

describe("add to history", () => {
	test("stations are stored most recently used first", () => {
		addToStationHistory([station("a"), station("b")], "transitous");
		addToStationHistory([station("c"), station("a")], "transitous");
		expect(getStationHistory("transitous").map((e) => e.id)).toEqual(["c", "a", "b"]);
		expect(
			(JSON.parse(localStorage.getItem("stationHistory")!) as { id: string }[]).map(
				(e) => e.id,
			),
		).toEqual(["c", "a", "b"]);
	});

	test("current location and duplicates within a search are skipped", () => {
		addToStationHistory(
			[currentLocation, station("a"), station("b"), station("a")],
			"transitous",
		);
		expect(getStationHistory("transitous").map((e) => e.id)).toEqual(["a", "b"]);
	});

	test("history is separated by profile", () => {
		addToStationHistory([station("a")], "transitous");
		addToStationHistory([station("b")], "oebb");
		expect(getStationHistory("transitous").map((e) => e.id)).toEqual(["a"]);
		expect(getStationHistory("oebb").map((e) => e.id)).toEqual(["b"]);
	});

	test("history is limited per profile", () => {
		addToStationHistory([station("other")], "oebb");
		for (let i = 0; i < MAX_ENTRIES_PER_PROFILE + 3; i++) {
			addToStationHistory([station(`${i}`)], "transitous");
		}
		const history = getStationHistory("transitous");
		expect(history).toHaveLength(MAX_ENTRIES_PER_PROFILE);
		expect(history[0].id).toBe(`${MAX_ENTRIES_PER_PROFILE + 2}`);
		expect(getStationHistory("oebb").map((e) => e.id)).toEqual(["other"]);
	});

	test("nothing is stored if history is disabled", () => {
		setHistoryEnabled(false);
		addToStationHistory([station("a")], "transitous");
		expect(getStationHistory("transitous")).toEqual([]);
		expect(localStorage.getItem("stationHistory")).toBeNull();
	});
});

describe("remove from history", () => {
	test("only the entry of the given profile is removed", () => {
		addToStationHistory([station("a"), station("b")], "transitous");
		addToStationHistory([station("a")], "oebb");
		removeFromStationHistory("a", "transitous");
		expect(getStationHistory("transitous").map((e) => e.id)).toEqual(["b"]);
		expect(getStationHistory("oebb").map((e) => e.id)).toEqual(["a"]);
	});
});
