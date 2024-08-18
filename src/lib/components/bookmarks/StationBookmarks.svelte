<script lang="ts">
	import StationInput from "../../../routes/StationInput.svelte";
	import type { ParsedLocation } from "$lib/types";
	import { onMount } from "svelte";
	import { getBookmarks, setBookmarks } from "$lib/bookmarks";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import IconClose from "$lib/components/icons/IconClose.svelte";

	let bookmarks: ParsedLocation[] = [];

	onMount(() => {
		bookmarks = getBookmarks("station");
	});

	let toBeBookmarkedStation: ParsedLocation | undefined = undefined;

	$: addStationBookmark(toBeBookmarkedStation);

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
			simpleInput={true}
		/>
	</div>
</div>

<ul>
	{#each bookmarks as bookmark (bookmark.name)}
		<div class="flex-row bookmark" transition:scale animate:flip={{ duration: 400 }}>
			<IconStationLocation color="foreground" iconType={bookmark.type} />
			<strong class="padded-top-bottom">
				{bookmark.name}
			</strong>
			<button
				class="button--small hoverable"
				on:click={() => void removeStationBookmark(bookmark)}
			>
				<IconClose />
			</button>
		</div>
	{/each}
</ul>

<style>
	.input-container {
		height: 3rem;
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
