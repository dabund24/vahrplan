<script lang="ts">
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import Header from "$lib/components/Header.svelte";
	import { page } from "$app/state";
	import { type Snippet } from "svelte";
	import IconJourneyInfo from "$lib/components/icons/IconJourneyInfo.svelte";
	import IconMap from "$lib/components/icons/IconMap.svelte";
	import MiniTabs from "$lib/components/MiniTabs.svelte";
	import TitlelessHeader from "$lib/components/TitlelessHeader.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import { dateToString, timeToString } from "$lib/util.js";
	import { settings } from "$lib/state/settingStore";
	import TicketModal from "$lib/components/TicketModal.svelte";
	import JourneyOptions from "./JourneyOptions.svelte";
	import {
		type DisplayedFormData,
		getDisplayedFormData,
		setDisplayedFormData
	} from "$lib/state/displayedFormData.svelte.js";
	import { getSelectedData, setSelectedData } from "$lib/state/selectedData.svelte";
	import { getDiagramData, setDiagramData } from "$lib/state/diagramData.svelte";
	import { browser } from "$app/environment";

	const displayedFormData = $derived(getDisplayedFormData());
	const selectedData = $derived(getSelectedData());

	$inspect(getDiagramData());

	const { formData, diagramData } = page.data;

	let { pageTitle, pageDescription } = $derived.by(() => {
		let formData1: DisplayedFormData;
		if (formData !== undefined) {
			formData1 = formData;
		} else if (displayedFormData !== undefined && selectedData.isFullJourneySelected) {
			formData1 = displayedFormData;
		} else {
			return {
				pageTitle: "",
				pageDescription: "Reisedetails in Vahrplan"
			};
		}
		return {
			pageTitle: `${formData1.locations[0].value.name} — ${formData1.locations.at(-1)?.value.name}`,
			pageDescription: `Details zur Reise von ${formData1.locations[0].value.name} nach ${formData1.locations.at(-1)?.value.name} am ${dateToString(formData1.timeData.time)} mit Abfahrt ${timeToString(formData1.timeData.time)} Uhr`
		};
	});

	if (browser && formData !== undefined && diagramData !== undefined) {
		setDisplayedFormData(formData);
		setSelectedData(Array.from({ length: diagramData.columns.length }, () => 0));
		setDiagramData(Promise.resolve(diagramData));
	}

	let clientWidth: number = $state(0);
</script>

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
	{#if formData === undefined && displayedFormData === undefined}
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
			<Header title={pageTitle.length === 0 ? "Reisedetails" : pageTitle} isMobileOnly={true}>
				{@render miniTabSelector()}
				<JourneyOptions />
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
				<div class="journey-options">
					<JourneyOptions />
				</div>
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
	.journey-options {
		padding: var(--line-width) 0.75rem 0;
	}
</style>
