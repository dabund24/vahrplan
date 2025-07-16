<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import Options from "$lib/components/Options.svelte";
	import { type BookmarkType, removeBookmark } from "$lib/bookmarks.svelte";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import IconClose from "$lib/components/icons/IconClose.svelte";

	type Props = {
		bookmarkType: BookmarkType;
		bookmarkId: string;
		bookmarkIndex: number;
		children: Snippet;
	};

	const { bookmarkType, bookmarkId, children, bookmarkIndex }: Props = $props();

	function getOptions(): ComponentProps<typeof Options>["options"] {
		return [
			{
				type: "link",
				name: "Verbindung anzeigen",
				url: bookmarkId,
				icon: iconRightArrow
			},
			{
				type: "function",
				name: "Lesezeichen löschen",
				onClick: (): void => removeBookmark(bookmarkType, bookmarkId),
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

<a href={bookmarkId} class="hoverable hoverable--visible flex-column">
	{@render children()}
</a>

<div class="options-container">
	<Options id={`journey-bookmark__${bookmarkIndex}`} options={getOptions()} />
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
