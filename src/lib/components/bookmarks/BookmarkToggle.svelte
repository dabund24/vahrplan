<script lang="ts" generics="T extends BookmarkType">
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import {
		type BookmarkData,
		bookmarkToString,
		type BookmarkType,
		getIsBookmarked,
		toggleBookmark
	} from "$lib/bookmarks.svelte";
	import { page } from "$app/state";

	type Props = {
		type: T;
		value: BookmarkData<T>;
		preCallback?: () => void;
		postCallback?: () => void;
		isVisuallyHidden?: boolean;
		hasBorder?: boolean;
		hasText?: boolean;
		tabindex?: 0 | -1;
		iconType?: "bookmark" | "star";
	};

	const {
		type,
		value,
		preCallback = () => void {},
		postCallback = () => void {},
		isVisuallyHidden = false,
		hasBorder = false,
		hasText = false,
		tabindex = 0,
		iconType = "bookmark"
	}: Props = $props();

	const isBookmarked = $derived(
		getIsBookmarked(type, value, { profileConfig: page.data.profile })
	);

	function handleClick(): void {
		preCallback();
		toggleBookmark(type, value, { profileConfig: page.data.profile });
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
	{tabindex}
>
	{#if hasText && type === "diagram"}
		Suchanfrage merken
	{:else if hasText}
		Merken
	{/if}
	<IconBookmark {isBookmarked} type={iconType} />
</button>
