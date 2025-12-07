/**
 * @vitest-environment jsdom
 */

import { expect, test, vi } from "vitest";
import { type BookmarkData, type Bookmarks, toggleBookmark } from "$lib/bookmarks.svelte";
import { exampleProfileConfig } from "../../testUtils";

const bookmarkData: BookmarkData<"location"> = {
	id: "sun",
	type: "poi",
	name: "Sonne",
	position: { lat: -1, lng: -1 }
};

const bookmark: Bookmarks["location"][number] = { ...bookmarkData, profile: "dbnav" };

test("format location bookmark", () => {
	const spy = vi.spyOn(Storage.prototype, "setItem");
	toggleBookmark("location", bookmarkData, { profileConfig: exampleProfileConfig });
	expect(spy).toHaveBeenCalledExactlyOnceWith("locationBookmarks", JSON.stringify([bookmark]));
});
