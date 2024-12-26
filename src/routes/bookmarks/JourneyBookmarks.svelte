<script lang="ts">
	import { dateDifference, dateToString } from "$lib/util.js";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { type JourneyBookmark, setBookmarks } from "$lib/bookmarks.js";
	import { type ComponentProps, onMount } from "svelte";
	import { getBookmarks } from "$lib/bookmarks.js";
	import Duration from "$lib/components/Duration.svelte";
	import Time from "$lib/components/Time.svelte";
	import Options from "$lib/components/Options.svelte";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import AccordionElement from "$lib/components/AccordionElement.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import IconOptions from "$lib/components/icons/IconOptions.svelte";

	let bookmarks: JourneyBookmark[] = $state([]);
	let { futureBookmarks, pastBookmarks } = $derived.by(() => {
		const futureBookmarks = bookmarks.filter(
			(bookmark) => new Date(bookmark.arrival).getTime() > Date.now()
		);
		const pastBookmarks = bookmarks.filter(
			(bookmark) => new Date(bookmark.arrival).getTime() < Date.now()
		);
		pastBookmarks.reverse();
		return { futureBookmarks, pastBookmarks };
	});

	onMount(() => {
		bookmarks = getBookmarks("journey");
	});

	function getOptions(bookmark: JourneyBookmark): ComponentProps<typeof Options>["options"] {
		return [
			{
				type: "link",
				name: "Verbindung anzeigen",
				url: bookmark.link,
				icon: iconRightArrow
			},
			{
				type: "function",
				name: "Lesezeichen löschen",
				onClick: (): void => {
					const bookmarkIndex = bookmarks.findIndex((b) => b.link === bookmark.link);
					bookmarks.splice(bookmarkIndex, 1);
					setBookmarks({ type: "journey", bookmarks });
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

{#snippet bookmarksSnippet(bookmarks: JourneyBookmark[], isPastBookmarks: boolean)}
	<ol class="flex-column">
		{#each bookmarks as bookmark, i (bookmark.link)}
			<li class="flex-row" transition:scale animate:flip={{ duration: 400 }}>
				<a href={bookmark.link} class="hoverable hoverable--visible flex-column">
					<div class="padded-top-bottom">{dateToString(bookmark.departure)}</div>

					<div class="journey-data">
						<Time time={{ departure: { time: bookmark.departure } }} />
						<div class="icon">
							<IconStationLocation
								color={"foreground"}
								iconType={bookmark.start.type}
							/>
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
				<div class="options-container">
					<Options
						id={`journey-bookmark__${isPastBookmarks ? -i - 1 : i}`}
						options={getOptions(bookmark)}
					/>
				</div>
			</li>
		{/each}
	</ol>
{/snippet}

{#if bookmarks.length === 0}
	<Warning
		>Merke dir eine Reise, indem du auf <span class="desktop-only"
			>das Lesezeichen-Symbol (<IconBookmark isBookmarked={false} />)</span
		><span class="mobile-only">"Merken" in den Optionen (<IconOptions />)</span> darüber klickst.
		Die Reise ist dann hier jederzeit verfügbar.</Warning
	>
{/if}
{#if futureBookmarks.length > 0}
	{@render bookmarksSnippet(futureBookmarks, false)}
{/if}
{#if pastBookmarks.length > 0}
	<AccordionElement title={"Vergangene Reisen"}>
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
