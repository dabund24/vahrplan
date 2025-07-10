<script lang="ts" generics="T extends BookmarkType">
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import {
		type BookmarkData,
		bookmarkToString,
		type BookmarkType,
		getIsBookmarked,
		toggleBookmark
	} from "$lib/bookmarks.svelte";

	type Props = {
		type: T;
		value: BookmarkData<T>;
		preCallback?: () => void;
		postCallback?: () => void;
		isVisuallyHidden?: boolean;
		hasBorder?: boolean;
		hasText?: boolean;
	};

	const {
		type,
		value,
		preCallback = () => void {},
		postCallback = () => void {},
		isVisuallyHidden = false,
		hasBorder = false,
		hasText = false
	}: Props = $props();

	const isBookmarked = $derived(getIsBookmarked(type, value));

	function handleClick(): void {
		preCallback();
		toggleBookmark(type, value);
		postCallback();
	}
</script>

<button
	type="button"
	role="checkbox"
	aria-checked={isBookmarked}
	aria-label="{bookmarkToString[type](value)} favorisieren"
	class="hoverable"
	class:hoverable--visible={hasBorder}
	class:visually-hidden={isVisuallyHidden}
	class:visually-hidden--focusable={isVisuallyHidden}
	onclick={handleClick}
>
	{#if hasText && type === "diagram"}
		Suchanfrage merken
	{:else if hasText}
		Merken
	{/if}
	<IconBookmark {isBookmarked} />
</button>
