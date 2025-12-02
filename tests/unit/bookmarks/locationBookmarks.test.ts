/**
 * @vitest-environment jsdom
 */

import { expect, test, vi } from "vitest";
import { type BookmarkData, type Bookmarks, toggleBookmark } from "$lib/bookmarks.svelte";
import { getProfileConfig } from "../apiClient/utils";

const bookmarkData: BookmarkData<"location"> = {
	id: "sun",
	type: "poi",
	name: "Sonne",
	position: { lat: -1, lng: -1 }
};

const bookmark: Bookmarks["location"][number] = { ...bookmarkData, profile: "dbnav" };

test("format location bookmark", () => {
	vi.mock("$app/server", () => ({ read: (): object => ({ text: () => "" }) }));
	const spy = vi.spyOn(Storage.prototype, "setItem");
	toggleBookmark("location", bookmarkData, { profileConfig: getProfileConfig() });
	expect(spy).toHaveBeenCalledExactlyOnceWith("locationBookmarks", JSON.stringify([bookmark]));
});
