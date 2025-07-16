<script lang="ts">
	import { type Bookmarks, getBookmarks } from "$lib/bookmarks.svelte";
	import { dateDifference } from "$lib/util";
	import DiagramBookmark from "$lib/components/bookmarks/DiagramBookmark.svelte";
	import JourneyBookmark from "$lib/components/bookmarks/JourneyBookmark.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";

	const diagramBookmarks = $derived(getBookmarks("diagram"));
	const journeyBookmarks = $derived(getBookmarks("journey"));

	type BookmarkList = (
		| { type: "journey"; bookmark: Bookmarks["journey"][number] }
		| { type: "diagram"; bookmark: Bookmarks["diagram"][number] }
	)[];

	const bookmarks: BookmarkList = $derived.by(() => {
		let journeyBookmarkIndex = 0;
		return [
			...diagramBookmarks.reduce((acc, diagramBookmark) => {
				while (
					journeyBookmarkIndex < journeyBookmarks.length &&
					(dateDifference(
						diagramBookmark?.departure ?? diagramBookmark.time,
						journeyBookmarks[journeyBookmarkIndex].departure
					) ?? 0) < 0
				) {
					acc.push({
						type: "journey",
						bookmark: journeyBookmarks[journeyBookmarkIndex++]
					});
				}
				acc.push({ type: "diagram", bookmark: diagramBookmark });
				return acc;
			}, [] as BookmarkList),
			...journeyBookmarks
				.slice(journeyBookmarkIndex)
				.map((bookmark) => ({ type: "journey", bookmark }) as const)
		];
	});
</script>

{#if bookmarks.length === 0}
	Keine Lesezeichen. Merke dir Suchanfragen und Reisen mit einem Klick auf das Lesezeichen-Symbol.
{/if}
<ol class="flex-column">
	{#each bookmarks as bookmark, i (bookmark.bookmark.link ?? bookmark.bookmark.id)}
		<li class="flex-row" transition:scale animate:flip={{ duration: 400 }}>
			{#if bookmark.type === "diagram"}
				<DiagramBookmark bookmark={bookmark.bookmark} bookmarkIndex={i} />
			{:else}
				<JourneyBookmark bookmark={bookmark.bookmark} bookmarkIndex={i} />
			{/if}
		</li>
	{/each}
</ol>

<style>
	ol {
		gap: 0.5rem;
	}
</style>
