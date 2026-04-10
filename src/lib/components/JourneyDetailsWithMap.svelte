<script lang="ts">
	import type { Snippet } from "svelte";
	import IconJourneyInfo from "$lib/components/icons/IconJourneyInfo.svelte";
	import JourneyOptions from "../../routes/[lang=lang]/[profile=profileId]/journey/JourneyOptions.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import MiniTabs from "$lib/components/MiniTabs.svelte";
	import TicketModal from "$lib/components/TicketModal.svelte";
	import IconMap from "$lib/components/icons/IconMap.svelte";
	import { settings } from "$lib/state/settingStore";
	import type { DisplayedJourney } from "$lib/state/displayedJourney.svelte";
	import type { SelectedData } from "$lib/state/selectedData.svelte";
	import type { DisplayedFormData } from "$lib/state/displayedFormData.svelte";

	type Props = {
		header: Snippet;
		backButton: Snippet;
		displayedFormData: DisplayedFormData | undefined;
		displayedJourney: DisplayedJourney;
		selectedData: SelectedData;
	};

	const { header, backButton, displayedFormData, displayedJourney, selectedData }: Props =
		$props();

	let clientWidth: number = $state(0);
</script>

<svelte:window bind:outerWidth={clientWidth} />

{#snippet iconJourneyInfo()}
	<IconJourneyInfo />
{/snippet}
{#snippet iconMap()}
	<IconMap />
{/snippet}
{#snippet journeyOverview()}
	{@render header()}
	<Journeys {displayedJourney} {selectedData} />
{/snippet}
{#snippet map()}
	{#await import("$lib/components/leaflet/Leaflet.svelte") then { default: Leaflet }}
		<Leaflet {displayedFormData} {displayedJourney} {selectedData} />
	{/await}
{/snippet}
<TicketModal />

{#if clientWidth < 1000}
	<MiniTabs
		tabs={[
			{ title: "Klassische Ansicht", icon: iconJourneyInfo, content: journeyOverview },
			{ title: "Karte", icon: iconMap, content: map, isFullHeight: true },
		]}
		startingTab={$settings.general.journeyDetailsStandardView === "classic" ? 0 : 1}
	>
		{#snippet tabEnvironment(miniTabSelector: Snippet, tabContent: Snippet)}
			<div class="actions--mobile flex-row">
				{@render backButton()}
				<div class="mini-tab-container">
					{@render miniTabSelector()}
				</div>
				<JourneyOptions />
			</div>
			<div class="content-wrapper">
				{@render tabContent()}
			</div>
		{/snippet}
	</MiniTabs>
{:else}
	<div class="columns">
		<section class="journeys content-wrapper">
			<div class="actions--desktop">
				<JourneyOptions />
			</div>
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

	.actions--mobile {
		gap: var(--line-width);
		> :global(:first-child) {
			gap: 0.5rem;
			text-decoration: none;
			height: 1rem;
			align-items: center;
		}
		.mini-tab-container {
			margin-left: auto;
		}
	}
</style>
