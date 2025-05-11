<script lang="ts">
	import StationInput from "../StationInput.svelte";
	import type { ParsedLocation } from "$lib/types";
	import { onMount } from "svelte";
	import { getBookmarks, setBookmarks } from "$lib/bookmarks";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import Warning from "$lib/components/Warning.svelte";

	let bookmarks: ParsedLocation[] = $state([]);

	onMount(() => {
		bookmarks = getBookmarks("station");
	});

	let toBeBookmarkedStation: ParsedLocation | undefined = $state(undefined);

	$effect(() => addStationBookmark(toBeBookmarkedStation));

	function addStationBookmark(newBookmark: ParsedLocation | undefined): void {
		toBeBookmarkedStation = undefined;
		if (
			newBookmark === undefined ||
			bookmarks.some((bookmark) => bookmark.name === newBookmark.name)
		) {
			return;
		}
		bookmarks.push(newBookmark);
		setBookmarks({ type: "station", bookmarks });
		bookmarks = getBookmarks("station");
	}

	function removeStationBookmark(toBeRemoved: ParsedLocation): void {
		bookmarks = bookmarks.filter((bookmark) => bookmark.name !== toBeRemoved.name);
		setBookmarks({ type: "station", bookmarks });
	}
</script>

<div>
	<div class="input-container">
		<StationInput
			bind:selectedLocation={toBeBookmarkedStation}
			inputPlaceholder="Station hinzufügen..."
			isSimpleInput={true}
		/>
	</div>
</div>

{#if bookmarks.length === 0}
	<Warning
		>Gemerkte Stationen werden in den Eingabefeldern auf der Startseite als erstes angezeigt.</Warning
	>
{:else}
	<ul class="flex-column">
		{#each bookmarks as bookmark (bookmark.name)}
			<div class="flex-row bookmark" transition:scale animate:flip={{ duration: 400 }}>
				<IconStationLocation color="foreground" iconType={bookmark.type} />
				<strong class="padded-top-bottom">
					{bookmark.name}
				</strong>
				<button
					class="hoverable hoverable--visible"
					onclick={() => void removeStationBookmark(bookmark)}
				>
					<IconClose />
				</button>
			</div>
		{/each}
	</ul>
{/if}

<style>
	ul {
		padding-top: 4px;
		gap: 4px;
	}
	.input-container {
		height: calc(8px + 1rem + 1lh);
	}
	.bookmark {
		padding-left: calc(0.5rem + 4px);
		gap: 0.5rem;
		align-items: center;
	}
	strong {
		margin-right: auto;
	}
</style>
