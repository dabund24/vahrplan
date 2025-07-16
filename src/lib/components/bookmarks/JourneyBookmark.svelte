<script lang="ts">
	import { dateDifference, dateToString } from "$lib/util.js";
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import Duration from "$lib/components/Duration.svelte";
	import { type Bookmarks } from "$lib/bookmarks.svelte";
	import BookmarkShell from "$lib/components/bookmarks/BookmarkShell.svelte";

	type Props = {
		bookmark: Bookmarks["journey"][number];
		bookmarkIndex: number;
	};

	const { bookmark, bookmarkIndex }: Props = $props();
</script>

<BookmarkShell bookmarkType="journey" {bookmark} {bookmarkIndex}>
	<div class="padded-top-bottom">{dateToString(bookmark.departure)}</div>

	<div class="journey-data flex-row">
		<div class="time">
			<Time time={{ departure: { time: bookmark.departure } }} />
		</div>
		<div class="icon">
			<IconStationLocation color="foreground" iconType={bookmark.start.type} />
		</div>
		<div>
			<strong class="limit-lines">{bookmark.start.name}</strong>
		</div>
		<div>
			<Duration
				duration={dateDifference(bookmark.departure, bookmark.arrival)}
				isAlignedRight={true}
			/>
		</div>
		<div>
			<div class="line--neutral"></div>
		</div>
		<div></div>
		<div class="time">
			<Time time={{ arrival: { time: bookmark.arrival } }} />
		</div>
		<div class="icon">
			<IconStationLocation color="foreground" iconType={bookmark.destination.type} />
		</div>
		<div>
			<strong class="limit-lines">{bookmark.destination.name}</strong>
		</div>
	</div>
</BookmarkShell>

<style>
	.journey-data {
		display: grid;
		grid-template-columns: repeat(1, min-content min-content 1fr);
		grid-auto-rows: 3rem auto 3rem;
		grid-auto-flow: row;
	}
	.journey-data > * {
		align-content: center;
	}
	.journey-data > :nth-child(3n + 2) {
		padding: 0 0.5rem;
	}
	.time {
		font-weight: bolder;
	}
	.icon {
		position: relative;
	}
	.line--neutral {
		margin: -1.5rem auto;
		width: var(--line-width);
		height: calc(100% + 3rem);
	}
	.limit-lines {
		-webkit-line-clamp: 2;
		line-clamp: 2;
	}
</style>
