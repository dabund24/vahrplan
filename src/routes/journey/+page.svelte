<script lang="ts">
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import Header from "$lib/components/Header.svelte";
	import {
		type DisplayedFormData,
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
	import { dateToString, timeToString } from "$lib/util.js";
	import { settings } from "$lib/stores/settingStore";
	import TicketModal from "$lib/components/TicketModal.svelte";
	import IconTickets from "$lib/components/icons/IconTickets.svelte";

	const { formData, treeNodes } = $page.data;

	let { pageTitle, pageDescription } = $derived.by(() => {
		let formData1: DisplayedFormData;
		if (formData !== undefined) {
			formData1 = formData;
		} else if ($displayedFormData !== undefined && allSelected) {
			formData1 = $displayedFormData;
		} else {
			return {
				pageTitle: "",
				pageDescription: "Reisedetails in Vahrplan"
			};
		}
		return {
			pageTitle: `${formData1.locations[0].value.name} — ${formData1.locations.at(-1)?.value.name}`,
			pageDescription: `Details zur Reise von ${formData1.locations[0].value.name} nach ${formData1.locations.at(-1)?.value.name} am ${dateToString(formData1.time)} mit Abfahrt ${timeToString(formData1.time)} Uhr`
		};
	});

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

	const options: ComponentProps<typeof Options>["options"] = [
		{
			type: "function",
			name: "Aktualisieren",
			icon: iconRefresh,
			onClick: refreshJourney
		},
		{
			type: "function",
			name: "Teilen",
			icon: iconShare,
			onClick: () => shareJourney($selectedJourneys)
		},
		{
			type: "function",
			name: "Merken",
			icon: iconBookmark,
			onClick: handleJourneyBookmarkClick
		},
		{
			type: "modal",
			name: "Tickets",
			icon: iconTickets,
			showModalKey: "showTicketModal"
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
{#snippet iconTickets()}
	<IconTickets />
{/snippet}

<svelte:head>
	<title>Vahrplan - Reisedetails{pageTitle.length > 0 ? ": " : ""}{pageTitle}</title>
	<meta
		name="title"
		content="Vahrplan - Reisedetails{pageTitle.length > 0 ? ': ' : ''}{pageTitle}"
	/>
	<meta
		name="description"
		content={pageDescription.length > 0 ? "Reisedetails" : pageDescription}
	/>
</svelte:head>

<svelte:window bind:outerWidth={clientWidth} />

{#snippet iconJourneyInfo()}
	<IconJourneyInfo />
{/snippet}
{#snippet iconMap()}
	<IconMap />
{/snippet}
{#snippet journeyOverview()}
	{#if formData === undefined && $displayedFormData === undefined}
		<Warning>
			Suche auf der Startseite nach Verbindungen und wähle anschließend im generierten
			Diagramm für jeden Reiseabschnitt eine Verbindung aus. Die ausgewählte Reise wird dann
			hier angezeigt.
		</Warning>
	{/if}
	<Journeys />
{/snippet}
{#snippet map()}
	{#await import("$lib/components/leaflet/Leaflet.svelte") then { default: Leaflet }}
		<Leaflet />
	{/await}
{/snippet}
<TicketModal />

{#if clientWidth < 1000}
	<MiniTabs
		tabs={[
			{ title: "Klassische Ansicht", icon: iconJourneyInfo, content: journeyOverview },
			{ title: "Karte", icon: iconMap, content: map, isFullHeight: true }
		]}
		startingTab={$settings.general.journeyDetailsStandardView === "classic" ? 0 : 1}
	>
		{#snippet tabEnvironment(miniTabSelector: Snippet, tabContent: Snippet)}
			<Header title={pageTitle.length === 0 ? "Reisedetails" : pageTitle} mobileOnly={true}>
				{@render miniTabSelector()}
				{#if allSelected && $selectedJourneys.length > 0}
					<Options id={"journey"} {options} />
				{/if}
			</Header>
			<div class="content-wrapper padded-top-bottom">
				{@render tabContent()}
			</div>
		{/snippet}
	</MiniTabs>
{:else}
	<div class="columns">
		<section class="journeys content-wrapper">
			<TitlelessHeader>
				{#if allSelected && $selectedJourneys.length > 0}
					<div class="flex-row journey-actions--buttons">
						<TicketModal />
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
	.columns {
		display: grid;
		grid-template-columns: max-content 1fr;
		height: 100%;
	}
	.journeys {
		border-right: var(--border);
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
