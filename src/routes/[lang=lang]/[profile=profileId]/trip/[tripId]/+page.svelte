<script lang="ts">
	import type { PageProps } from "./$types";
	import LineNameDirection from "$lib/components/LineNameDirection.svelte";
	import JourneyDetailsWithMap from "$lib/components/JourneyDetailsWithMap.svelte";
	import type { SelectedData } from "$lib/state/selectedData.svelte";
	import TripInfo from "$lib/components/journeys/TripInfo.svelte";
	import IconLeftArrow from "$lib/components/icons/IconLeftArrow.svelte";
	import IconRefresh from "$lib/components/icons/IconRefresh.svelte";
	import { refreshTrip } from "./tripUtils";
	import IconHome from "$lib/components/icons/IconHome.svelte";
	import { browser } from "$app/environment";
	import { page } from "$app/state";

	const { data }: PageProps = $props();

	let { displayedJourney, trip, highlightData } = $derived(data);

	const selectedData: SelectedData = {
		selectedJourneys: [0],
		isFullJourneySelected: true,
		isNoneSelected: false,
	};

	const isShowBackButton = $derived(
		// @ts-expect-error new navigation api
		!browser || !("navigation" in window) || navigation.canGoBack,
	);
</script>

<svelte:head>
	<title>Vahrplan - {trip.leg.name}</title>
	<meta name="title" content="Vahrplan - {trip.leg.name}" />
	<meta name="description" content="Fahrtdetails zu {trip.leg.name}" />
</svelte:head>

<JourneyDetailsWithMap {displayedJourney} {selectedData} isCompact={true}>
	{#snippet header()}
		<div class="flex-row">
			<h1>
				<LineNameDirection
					lineName={trip.leg.name}
					lineShape={trip.leg.lineShape}
					product={trip.leg.product}
					productName={trip.leg.productName}
				/>
			</h1>
			<TripInfo block={trip.leg} />
		</div>
	{/snippet}
	{#snippet backButton()}
		{#if isShowBackButton}
			<button class="hoverable hoverable--visible" onclick={() => void history.back()}>
				<IconLeftArrow />
				Zurück
			</button>
		{:else}
			<a
				class="hoverable hoverable--visible"
				href="/{page.data.lang}/{page.data.profileConfig.id}"
			>
				<IconHome />
				Startseite
			</a>
		{/if}
	{/snippet}
	{#snippet options()}
		<button
			class="hoverable hoverable--visible"
			onclick={async () =>
				void ({ displayedJourney, trip } = (await refreshTrip(
					trip.leg.tripId,
					highlightData,
				)) ?? { displayedJourney, trip })}
		>
			<IconRefresh />
		</button>
	{/snippet}
</JourneyDetailsWithMap>

<style>
	.flex-row {
		align-items: center;
		justify-content: space-between;
		> :global(:last-child) {
			translate: 0 0.25rem;
		}
	}
</style>
