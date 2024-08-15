<script lang="ts">
	import { type DiagramBookmark, getBookmarks } from "$lib/bookmarks";
	import { dateToString, timeToString } from "$lib/util";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { onMount } from "svelte";

	let bookmarks: DiagramBookmark[] = [];

	onMount(() => {
		bookmarks = getBookmarks("diagram")
	})
</script>

<ol>
	{#each bookmarks as bookmark}
		<li class="padded-top-bottom">
			<a href={bookmark.link} class="hoverable button--small flex-column">
				<div class="padded-top-bottom">{bookmark.transitType === "departure" ? "Abfahrt" : "Ankunft"}: {dateToString(bookmark.time)}, {timeToString(bookmark.time)}</div>
				<ol>
					{#each bookmark.stops as stop}
						<li class="flex-row padded-top-bottom stop">
							<div class="icon flex-column">
								<IconStationLocation color={"foreground"} iconType={stop.type} />
							</div>
							<strong class="limit-lines">
								{stop.name}
							</strong>
						</li>
					{/each}
				</ol>
			</a>
		</li>
	{/each}
</ol>

<style>
	a {
		text-decoration: none;
		padding: .5rem 1rem;
	}

	strong {
		margin-left: .5rem;
		-webkit-line-clamp: 3;
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