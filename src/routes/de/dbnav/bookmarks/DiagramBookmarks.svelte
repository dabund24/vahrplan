<script lang="ts">
	import { type DiagramBookmark, getBookmarks, setBookmarks } from "$lib/bookmarks";
	import { dateToString, timeToString } from "$lib/util";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { type ComponentProps, onMount } from "svelte";
	import Options from "$lib/components/Options.svelte";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import AccordionElement from "$lib/components/AccordionElement.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";

	let bookmarks: DiagramBookmark[] = $state([]);
	let { futureBookmarks, pastBookmarks } = $derived.by(() => {
		const futureBookmarks = bookmarks.filter(
			(bookmark) => new Date(bookmark.time).getTime() > Date.now()
		);
		const pastBookmarks = bookmarks.filter(
			(bookmark) => new Date(bookmark.time).getTime() < Date.now()
		);
		pastBookmarks.reverse();
		return { futureBookmarks, pastBookmarks };
	});

	onMount(() => {
		bookmarks = getBookmarks("diagram");
	});

	function getOptions(bookmark: DiagramBookmark): ComponentProps<typeof Options>["options"] {
		return [
			{
				type: "link",
				name: "Diagramm anzeigen",
				url: bookmark.link,
				icon: iconRightArrow
			},
			{
				type: "function",
				name: "Lesezeichen löschen",
				onClick: (): void => {
					const bookmarkIndex = bookmarks.findIndex((b) => b.link === bookmark.link);
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

{#snippet bookmarksSnippet(bookmarks: DiagramBookmark[], isPastBookmarks: boolean)}
	<ol class="flex-column bookmarks">
		{#each bookmarks as bookmark, i (bookmark.link)}
			<li class="flex-row" transition:scale animate:flip={{ duration: 400 }}>
				<a href={bookmark.link} class="hoverable hoverable--visible flex-column">
					<div class="time-data">
						{bookmark.scrollDirection === "later" ? "Abfahrt" : "Ankunft"}: {dateToString(
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
					<Options
						id={`diagram-bookmark__${isPastBookmarks ? -i - 1 : i}`}
						options={getOptions(bookmark)}
					/>
				</div>
			</li>
		{/each}
	</ol>
{/snippet}

{#if bookmarks.length === 0}
	<Warning
		>Merke dir ein Verbindungs-Diagramm, indem du auf das Lesezeichen-Symbol (<IconBookmark
			isBookmarked={false}
		/>) darüber klickst. Das Diagramm ist dann jederzeit hier verfügbar.</Warning
	>
{/if}

{#if futureBookmarks.length > 0}
	{@render bookmarksSnippet(futureBookmarks, false)}
{/if}

{#if pastBookmarks.length > 0}
	<AccordionElement title={"Alte Diagramme"}>
		{@render bookmarksSnippet(pastBookmarks, true)}
	</AccordionElement>
{/if}

<style>
	ol {
		gap: 0.5rem;
	}

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
