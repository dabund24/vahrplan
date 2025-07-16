<script lang="ts" generics="T extends 'journey' | 'diagram'">
	import type { ComponentProps, Snippet } from "svelte";
	import Options from "$lib/components/Options.svelte";
	import { type Bookmarks, removeBookmark } from "$lib/bookmarks.svelte";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import IconClose from "$lib/components/icons/IconClose.svelte";

	type Props = {
		bookmarkType: T;
		bookmark: Bookmarks[T][number];
		bookmarkIndex: number;
		children: Snippet;
	};

	const { bookmarkType, bookmark, children, bookmarkIndex }: Props = $props();

	const url = bookmark.link ?? bookmark.id;

	const isCurrentBookmark = $derived.by(() => {
		const now = Date.now();
		return (
			new Date(bookmark.departure ?? 0).getTime() <= now &&
			new Date(bookmark.arrival ?? 0).getTime() >= now
		);
	});

	function getOptions(): ComponentProps<typeof Options>["options"] {
		return [
			{
				type: "link",
				name: `${bookmarkType === "diagram" ? "Suchanfrage" : "Reise"} anzeigen`,
				url,
				icon: iconRightArrow
			},
			{
				type: "function",
				name: "Lesezeichen löschen",
				onClick: () => removeBookmark(bookmarkType, url),
				icon: iconClose
			}
		];
	}
</script>

{#snippet iconClose()}
	<IconClose />
{/snippet}
{#snippet iconRightArrow()}
	<IconRightArrow />
{/snippet}

<a
	href={url}
	class="hoverable hoverable--visible flex-column"
	class:hoverable--accent={isCurrentBookmark}
>
	{@render children()}
</a>

<div class="options-container">
	<Options
		id={`journey-bookmark__${bookmarkIndex}`}
		options={getOptions()}
		isAccent={isCurrentBookmark}
	/>
</div>

<style>
	a {
		text-decoration: none;
		padding: 0 1rem;
		width: 100%;
		margin-right: calc(-24px - 1rem);
		border-radius: var(--border-radius--large);
	}

	.options-container {
		height: fit-content;
	}
</style>
