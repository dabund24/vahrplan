<script lang="ts">
	import { dateToString, timeToString } from "$lib/util.js";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { type Bookmarks } from "$lib/bookmarks.svelte";
	import BookmarkShell from "$lib/components/bookmarks/BookmarkShell.svelte";

	type Props = {
		bookmark: Bookmarks["diagram"][number];
		bookmarkIndex: number;
	};

	const { bookmark, bookmarkIndex }: Props = $props();
</script>

<BookmarkShell bookmarkType="diagram" bookmarkId={bookmark.link ?? bookmark.id} {bookmarkIndex}>
	<div class="time-data">
		{bookmark.scrollDirection === "later" ? "Abfahrt" : "Ankunft"}: {dateToString(
			bookmark.time
		)}, {timeToString(bookmark.time)}
	</div>
	<ol>
		{#each bookmark.stops as stop, i (i)}
			<li class="flex-row padded-top-bottom stop">
				<div class="icon flex-column">
					<IconStationLocation color="foreground" iconType={stop.type} />
				</div>
				<strong class="limit-lines">
					{stop.name}
				</strong>
			</li>
		{/each}
	</ol>
</BookmarkShell>

<style>
	.time-data {
		padding: 0.5rem 2rem 0.5rem 0;
	}

	strong {
		margin-left: 0.5rem;
		-webkit-line-clamp: 3;
		line-clamp: 3;
	}

	.stop {
		align-items: center;
	}

	.icon::before,
	.icon::after {
		content: "";
		width: 4px;
		height: 2.5rem;
		background-color: var(--foreground-color);
	}

	.stop:first-child .icon::before {
		background-color: transparent;
	}

	.stop:last-child .icon::after {
		background-color: transparent;
	}

	.icon::before {
		margin: -2rem auto -8px;
	}
	.icon::after {
		margin: -8px auto -2rem;
	}
</style>
