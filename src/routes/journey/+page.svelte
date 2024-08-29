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
	import SingleSelect from "$lib/components/SingleSelect.svelte";
	import { type ComponentProps, onMount } from "svelte";
	import { getBookmarks, toggleJourneyBookmark } from "$lib/bookmarks";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import { getJourneyUrl } from "$lib/urls";
	import Options from "$lib/components/Options.svelte";
	import IconJourneyInfo from "$lib/components/icons/IconJourneyInfo.svelte";
	import IconMap from "$lib/components/icons/IconMap.svelte";

	const { formData, treeNodes } = $page.data;

	if (browser && formData !== undefined && treeNodes !== undefined) {
		initializeSharedData(formData, treeNodes);
	}

	let displayedContent: 0 | 1 = $state(0);

	let clientWidth: number = $state(0);

	let isBookmarked = $state(false);

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
			onClick: handleBookmarkClick
		}
	];

	onMount(() => {
		const bookmarkedJourneys = getBookmarks("journey");
		isBookmarked = bookmarkedJourneys.some(
			(bookmark) => bookmark.link === getJourneyUrl($selectedJourneys).href
		);
	});

	function handleBookmarkClick(): void {
		isBookmarked = toggleJourneyBookmark($selectedJourneys, $displayedFormData);
	}

	let allSelected = $derived($selectedJourneys.every((journey) => journey.selectedBy !== -1));
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

<div class="content display-{displayedContent}">
	<Header
		title={$displayedFormData !== undefined
			? `${$displayedFormData.locations[0].value.name} — ${$displayedFormData.locations.at(-1)?.value.name}`
			: "Verbindungsdetails"}
		mobileOnly={true}
	>
		<SingleSelect
			titles={[
				{ type: "icon", title: "Klassische Ansicht", icon: iconJourneyInfo },
				{ type: "icon", title: "Karte", icon: iconMap }
			]}
			bind:selected={displayedContent}
		/>
		{#if allSelected && $selectedJourneys.length > 0}
			<Options id={"journey"} {options} />
		{/if}
	</Header>
	<div class="columns">
		<section class="journeys">
			{#if clientWidth >= 1000 || displayedContent === 0}
				<Journeys />
			{/if}
		</section>
		<section class="map">
			{#if clientWidth >= 1000 || displayedContent === 1}
				{#await import("$lib/components/leaflet/Leaflet.svelte") then { default: Leaflet }}
					<Leaflet />
				{/await}
			{/if}
		</section>
	</div>
</div>

<style>
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

	@media screen and (min-width: 1000px) {
		.content {
			height: 100%;
		}
		section {
			max-height: 100%;
			overflow: auto;
		}
	}

	@media screen and (max-width: 999px) {
		.display-0 .columns {
			grid-template-columns: auto 0;
		}
		.display-1 {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
		}
		.display-1 .columns {
			grid-template-columns: 0 auto;
			position: absolute;
			bottom: 0;
			height: 100%;
			width: 100%;
		}
	}
</style>
