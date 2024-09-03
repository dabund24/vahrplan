<script lang="ts">
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import Header from "$lib/components/Header.svelte";
	import {
		displayedFormData,
		initializeSharedData,
		refreshJourney,
		selectedJourneys
	} from "$lib/stores/journeyStores";
	import IconRefresh from "$lib/components/icons/IconRefresh.svelte";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import { shareJourney } from "./share";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import { type ComponentProps, onMount, type Snippet } from "svelte";
	import { getBookmarks, type JourneyBookmark, toggleJourneyBookmark } from "$lib/bookmarks";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import { getJourneyUrl } from "$lib/urls";
	import Options from "$lib/components/Options.svelte";
	import IconJourneyInfo from "$lib/components/icons/IconJourneyInfo.svelte";
	import IconMap from "$lib/components/icons/IconMap.svelte";
	import MiniTabs from "$lib/components/MiniTabs.svelte";
	import TitlelessHeader from "$lib/components/TitlelessHeader.svelte";
	import Warning from "$lib/components/Warning.svelte";

	const { formData, treeNodes } = $page.data;

	if (browser && formData !== undefined && treeNodes !== undefined) {
		initializeSharedData(formData, treeNodes);
	}

	let clientWidth: number = $state(0);

	let allSelected = $derived($selectedJourneys.every((journey) => journey.selectedBy !== -1));

	let journeyBookmarks: JourneyBookmark[] = $state([]);

	onMount(() => (journeyBookmarks = getBookmarks("journey")));

	let isBookmarked = $derived(
		browser &&
			journeyBookmarks.some(
				(bookmark) => bookmark.link === getJourneyUrl($selectedJourneys).href
			)
	);

	function handleJourneyBookmarkClick(): void {
		journeyBookmarks = toggleJourneyBookmark($selectedJourneys, $displayedFormData);
	}

	const options: ComponentProps<Options>["options"] = [
		{
			name: "Aktualisieren",
			icon: iconRefresh,
			onClick: refreshJourney
		},
		{
			name: "Teilen",
			icon: iconShare,
			onClick: () => shareJourney($selectedJourneys)
		},
		{
			name: "Merken",
			icon: iconBookmark,
			onClick: handleJourneyBookmarkClick
		}
	];
</script>

{#snippet iconRefresh()}
	<IconRefresh />
{/snippet}
{#snippet iconBookmark()}
	<IconBookmark {isBookmarked} />
{/snippet}
{#snippet iconShare()}
	<IconShare />
{/snippet}

<svelte:head>
	<title>Verbindungsdetails</title>
	<meta name="description" content="Verbindungsdetails" />
</svelte:head>

<svelte:window bind:outerWidth={clientWidth} />

{#snippet iconJourneyInfo()}
	<IconJourneyInfo />
{/snippet}
{#snippet iconMap()}
	<IconMap />
{/snippet}
{#snippet journeyOverview()}
	{#if $displayedFormData === undefined}
		<div class="content-wrapper">
			<Warning
			>Suche auf der Startseite nach Verbindungen und wähle anschließend im generierten
				Diagramm für jeden Reiseabschnitt eine Verbindung aus. Die ausgewählte Reise wird dann
				hier angezeigt.
			</Warning>
		</div>
	{/if}
	<Journeys />
{/snippet}
{#snippet map()}
	{#await import("$lib/components/leaflet/Leaflet.svelte") then { default: Leaflet }}
		<Leaflet />
	{/await}
{/snippet}
{#snippet header(miniTabSelector: Snippet, tabContent: Snippet)}
	<Header
		title={$displayedFormData !== undefined
			? `${$displayedFormData.locations[0].value.name} — ${$displayedFormData.locations.at(-1)?.value.name}`
			: "Verbindungsdetails"}
		mobileOnly={true}
	>
		{@render miniTabSelector()}
		{#if allSelected && $selectedJourneys.length > 0}
			<Options id={"journey"} {options} />
		{/if}
	</Header>
	{@render tabContent()}
{/snippet}

{#if clientWidth < 1000}
	<MiniTabs
		tabs={[
			{ title: "Klassische Ansicht", icon: iconJourneyInfo, content: journeyOverview },
			{ title: "Karte", icon: iconMap, content: map }
		]}
		tabEnvironment={header}
	/>
{:else}
	<div class="columns">
		<section class="journeys">
			<TitlelessHeader>
				{#if allSelected && $selectedJourneys.length > 0}
					<div class="flex-row journey-actions--buttons">
						<button
							class="hoverable hoverable--visible"
							onclick={() => void shareJourney($selectedJourneys)}
						>
							<IconShare />
						</button>
						<button
							class="hoverable hoverable--visible"
							onclick={handleJourneyBookmarkClick}
						>
							<IconBookmark {isBookmarked} />
						</button>
						<button class="hoverable hoverable--visible" onclick={refreshJourney}>
							<IconRefresh />
						</button>
					</div>
				{/if}
			</TitlelessHeader>
			{@render journeyOverview()}
		</section>
		<section class="map">
			{@render map()}
		</section>
	</div>
{/if}

<style>
	.content-wrapper {
		padding: .5rem 1rem;
	}
	.columns {
		display: grid;
		grid-template-columns: 30rem 1fr;
		height: 100%;
	}
	.map {
		height: 100%;
		width: 100%;
		position: relative;
	}
	section {
		max-height: 100%;
		overflow: auto;
	}
	.journey-actions--buttons {
		padding: var(--line-width) 0.75rem 0;
		gap: var(--line-width);
		justify-content: end;
	}
</style>
