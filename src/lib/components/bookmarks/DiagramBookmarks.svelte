<script lang="ts">
	import { type DiagramBookmark, getBookmarks, setBookmarks } from "$lib/bookmarks";
	import { dateToString, timeToString } from "$lib/util";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { type ComponentProps, onMount } from "svelte";
	import Options from "$lib/components/Options.svelte";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import { goto } from "$app/navigation";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";

	let bookmarks: DiagramBookmark[] = $state([]);

	onMount(() => {
		bookmarks = getBookmarks("diagram");
	});

	function getOptions(bookmarkIndex: number): ComponentProps<Options>["options"] {
		return [
			{
				name: "Diagramm anzeigen",
				onClick: () => goto(new URL(bookmarks[bookmarkIndex].link)),
				icon: iconRightArrow
			},
			{
				name: "Lesezeichen löschen",
				onClick: (): void => {
					bookmarks.splice(bookmarkIndex, 1);
					setBookmarks({ type: "diagram", bookmarks });
				},
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

{#if bookmarks.length > 0}
	<ol class="flex-column bookmarks">
		{#each bookmarks as bookmark, i (bookmark.link)}
			<li class="flex-row" transition:scale animate:flip={{ duration: 400 }}>
				<a href={bookmark.link} class="hoverable flex-column">
					<div class="time-data">
						{bookmark.transitType === "departure" ? "Abfahrt" : "Ankunft"}: {dateToString(
							bookmark.time
						)}, {timeToString(bookmark.time)}
					</div>
					<ol>
						{#each bookmark.stops as stop}
							<li class="flex-row padded-top-bottom stop">
								<div class="icon flex-column">
									<IconStationLocation
										color={"foreground"}
										iconType={stop.type}
									/>
								</div>
								<strong class="limit-lines">
									{stop.name}
								</strong>
							</li>
						{/each}
					</ol>
				</a>
				<div class="options-container">
					<Options id={`diagram-bookmark__${i}`} options={getOptions(i)} />
				</div>
			</li>
		{/each}
	</ol>
{/if}

<style>
	.bookmarks {
		gap: 0.5rem;
	}

	a {
		text-decoration: none;
		padding: 0 1rem;
		width: 100%;
		margin-right: calc(-24px - 1rem);
	}

	.options-container {
		height: fit-content;
	}

	.time-data {
		padding: 0.5rem 2rem 0.5rem 0;
	}

	strong {
		margin-left: 0.5rem;
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
