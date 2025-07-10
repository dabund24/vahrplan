/**
 * @vitest-environment jsdom
 */

import { expect, test, vi } from "vitest";
import { type BookmarkData, type Bookmarks, toggleBookmark } from "$lib/bookmarks.svelte";

const bookmarkData: BookmarkData<"location"> = {
	id: "sun",
	type: "poi",
	name: "Sonne",
	position: { lat: -1, lng: -1 }
};

const bookmark: Bookmarks["location"][number] = bookmarkData;

test("format location bookmark", () => {
	const spy = vi.spyOn(Storage.prototype, "setItem");
	toggleBookmark("location", bookmarkData);
	expect(spy).toHaveBeenCalledExactlyOnceWith("locationBookmarks", JSON.stringify([bookmark]));
});
