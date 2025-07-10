/**
 * @vitest-environment jsdom
 */

import { beforeAll, describe, expect, test } from "vitest";
import {
	type BookmarkData,
	type Bookmarks,
	getIsBookmarked,
	toggleBookmark,
	getBookmarks,
	initBookmarks
} from "$lib/bookmarks.svelte";

const sunBookmarkData: BookmarkData<"location"> = {
	id: "sun",
	type: "poi",
	name: "Sonne",
	position: { lat: -1, lng: -1 }
};

const moonBookmarkData: BookmarkData<"location"> = {
	id: "moon",
	type: "station",
	name: "Mond",
	position: { lat: 42, lng: 69 }
};

const sunBookmark: Bookmarks["location"][number] = sunBookmarkData;

const moonBookmark: Bookmarks["location"][number] = moonBookmarkData;

describe("load initial bookmarks", () => {
	test("both sun and moon stored", () => {
		localStorage.setItem("locationBookmarks", JSON.stringify([moonBookmark, sunBookmark]));
		initBookmarks("location");
		expect(getBookmarks.location()).toEqual([moonBookmark, sunBookmark]);
	});

	test("no bookmarks stored", () => {
		localStorage.removeItem("locationBookmarks");
		initBookmarks("location");
		expect(getBookmarks.location()).toEqual([]);
	});
});

describe.sequential("add and remove bookmarks", () => {
	let storedBookmarks: Bookmarks["location"];
	describe.sequential("add first bookmark", () => {
		beforeAll(() => toggleBookmark("location", sunBookmarkData));
		test("localStorage is set correctly", () => {
			const storedBookmarksStr = localStorage.getItem("locationBookmarks");
			expect(storedBookmarksStr).not.toBeNull();
			storedBookmarks = JSON.parse(storedBookmarksStr!) as Bookmarks["location"];

			expect(storedBookmarks).toHaveLength(1);
			expect(storedBookmarks[0]).toHaveProperty("id", "sun");
		});

		test("variable is synced with localStorage", () => {
			expect(getBookmarks.location()).toEqual(storedBookmarks);
		});

		test("isBookmarked gives correct values", () => {
			expect(getIsBookmarked("location", sunBookmark)).toBe(true);
			expect(getIsBookmarked("location", moonBookmark)).toBe(false);
		});
	});

	describe("add second bookmark", () => {
		beforeAll(() => toggleBookmark("location", moonBookmarkData));
		test("localStorage is set correctly", () => {
			const storedBookmarksStr = localStorage.getItem("locationBookmarks");
			expect(storedBookmarksStr).not.toBeNull();
			storedBookmarks = JSON.parse(storedBookmarksStr!) as Bookmarks["location"];

			expect(storedBookmarks).toHaveLength(2);
			expect(storedBookmarks[0]).toHaveProperty("id", "moon");
			expect(storedBookmarks[1]).toHaveProperty("id", "sun");
		});

		test("variable is synced with localStorage", () => {
			expect(getBookmarks.location()).toEqual(storedBookmarks);
		});

		test("isBookmarked gives correct values", () => {
			expect(getIsBookmarked("location", sunBookmark)).toBe(true);
			expect(getIsBookmarked("location", moonBookmark)).toBe(true);
		});
	});

	describe("remove second bookmark", () => {
		beforeAll(() => toggleBookmark("location", sunBookmarkData));

		test("localStorage is set correctly", () => {
			const storedBookmarksStr = localStorage.getItem("locationBookmarks");
			expect(storedBookmarksStr).not.toBeNull();
			storedBookmarks = JSON.parse(storedBookmarksStr!) as Bookmarks["location"];

			expect(storedBookmarks).toHaveLength(1);
			expect(storedBookmarks[0]).toHaveProperty("id", "moon");
		});

		test("variable is synced with localStorage", () => {
			expect(getBookmarks.location()).toEqual(storedBookmarks);
		});

		test("isBookmarked gives correct values", () => {
			expect(getIsBookmarked("location", sunBookmark)).toBe(false);
			expect(getIsBookmarked("location", moonBookmark)).toBe(true);
		});
	});

	describe("remove last remaining bookmark", () => {
		beforeAll(() => toggleBookmark("location", moonBookmarkData));

		test("localStorage is set correctly", () => {
			const storedBookmarksStr = localStorage.getItem("locationBookmarks");
			expect(storedBookmarksStr).toBeNull();
		});

		test("variable is synced with localStorage", () => {
			expect(getBookmarks.location()).toEqual([]);
		});

		test("isBookmarked gives correct values", () => {
			expect(getIsBookmarked("location", sunBookmark)).toBe(false);
			expect(getIsBookmarked("location", moonBookmark)).toBe(false);
		});
	});
});
