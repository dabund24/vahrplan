<script lang="ts">
	import { dateDifference, dateToString } from "$lib/util.js";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import type { JourneyBookmark } from "$lib/bookmarks.js";
	import { onMount } from "svelte";
	import { getBookmarks } from "$lib/bookmarks.js";
	import Duration from "$lib/components/Duration.svelte";
	import Time from "$lib/components/Time.svelte";

	let bookmarks: JourneyBookmark[] = [];

	onMount(() => {
		bookmarks = getBookmarks("journey");
	});
</script>

<ol>
	{#each bookmarks as bookmark}
		<li class="padded-top-bottom">
			<a href={bookmark.link} class="hoverable button--small flex-column">
				<div class="padded-top-bottom">{dateToString(bookmark.departure)}</div>

				<div class="journey-data">
					<Time time={{ departure: { time: bookmark.departure } }} />
					<div class="icon">
						<IconStationLocation color={"foreground"} iconType={bookmark.start.type} />
					</div>
					<div>
						<strong class="limit-lines">{bookmark.start.name}</strong>
					</div>
					<div>
						<Duration
							duration={dateDifference(bookmark.departure, bookmark.arrival)}
							alignRight={true}
						/>
					</div>
					<div>
						<div class="line--neutral"></div>
					</div>
					<div></div>
					<Time time={{ arrival: { time: bookmark.arrival } }} />
					<div class="icon">
						<IconStationLocation
							color={"foreground"}
							iconType={bookmark.destination.type}
						/>
					</div>
					<div>
						<strong class="limit-lines">{bookmark.destination.name}</strong>
					</div>
				</div>
			</a>
		</li>
	{/each}
</ol>

<style>
	a {
		text-decoration: none;
        padding: .5rem 1rem;
	}
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
	}
</style>
