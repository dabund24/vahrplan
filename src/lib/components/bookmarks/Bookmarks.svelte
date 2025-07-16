<script lang="ts">
	import { type Bookmarks, getBookmarks } from "$lib/bookmarks.svelte";
	import { dateDifference } from "$lib/util";
	import DiagramBookmark from "$lib/components/bookmarks/DiagramBookmark.svelte";
	import JourneyBookmark from "$lib/components/bookmarks/JourneyBookmark.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import AccordionElement from "$lib/components/AccordionElement.svelte";

	function splitBookmarksByDate<T extends "diagram" | "journey">(
		bookmarks: Bookmarks[T]
	): { future: Bookmarks[T]; past: Bookmarks[T] } {
		const now = new Date().getTime();
		return {
			past: bookmarks.filter((b) => new Date(b.arrival ?? 0).getTime() < now) as Bookmarks[T],
			future: bookmarks.filter(
				(b) => new Date(b.arrival ?? 0).getTime() >= now
			) as Bookmarks[T]
		};
	}

	type BookmarkList = (
		| { type: "journey"; bookmark: Bookmarks["journey"][number] }
		| { type: "diagram"; bookmark: Bookmarks["diagram"][number] }
	)[];
	function mergeBookmarksByType(
		diagramBookmarks: Bookmarks["diagram"],
		journeyBookmarks: Bookmarks["journey"]
	): BookmarkList {
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
	}

	const splitDiagramBookmarks = $derived(
		splitBookmarksByDate<"diagram">(getBookmarks("diagram"))
	);
	const splitJourneyBookmarks = $derived(
		splitBookmarksByDate<"journey">(getBookmarks("journey"))
	);

	const pastBookmarks = $derived(
		mergeBookmarksByType(splitDiagramBookmarks.past, splitJourneyBookmarks.past).reverse()
	);
	const futureBookmarks = $derived(
		mergeBookmarksByType(splitDiagramBookmarks.future, splitJourneyBookmarks.future)
	);
</script>

{#if futureBookmarks.length === 0 && pastBookmarks.length === 0}
	Keine Lesezeichen. Merke dir Suchanfragen und Reisen mit einem Klick auf das Lesezeichen-Symbol.
{/if}

{#snippet bookmarks(bookmarkList: BookmarkList)}
	<ol class="flex-column">
		{#each bookmarkList as bookmark, i (bookmark.bookmark.link ?? bookmark.bookmark.id)}
			<li class="flex-row" transition:scale animate:flip={{ duration: 400 }}>
				{#if bookmark.type === "diagram"}
					<DiagramBookmark bookmark={bookmark.bookmark} bookmarkIndex={i} />
				{:else}
					<JourneyBookmark bookmark={bookmark.bookmark} bookmarkIndex={i} />
				{/if}
			</li>
		{/each}
	</ol>
{/snippet}

{@render bookmarks(futureBookmarks)}
<AccordionElement title="Alte Lesezeichen">
	{@render bookmarks(pastBookmarks)}
</AccordionElement>

<style>
	ol {
		gap: 0.5rem;
		margin-bottom: 1rem;
	}
</style>
