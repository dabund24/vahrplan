<script lang="ts">
	import type { PageProps } from "./$types";
	import LineNameDirection from "$lib/components/LineNameDirection.svelte";
	import JourneyDetailsWithMap from "$lib/components/JourneyDetailsWithMap.svelte";
	import type { SelectedData } from "$lib/state/selectedData.svelte";
	import TripInfo from "$lib/components/journeys/TripInfo.svelte";
	import { getDisplayedFormData } from "$lib/state/displayedFormData.svelte";
	import IconLeftArrow from "$lib/components/icons/IconLeftArrow.svelte";

	const { data }: PageProps = $props();

	const {
		displayedJourney,
		trip: { leg },
	} = $derived(data);

	const selectedData: SelectedData = {
		selectedJourneys: [0],
		isFullJourneySelected: true,
		isNoneSelected: false,
	};
</script>

<JourneyDetailsWithMap {displayedJourney} {selectedData} isCompact={true}>
	{#snippet header()}
		<div class="flex-row">
			<h1>
				<LineNameDirection
					lineName={leg.name}
					lineShape={leg.lineShape}
					product={leg.product}
					productName={leg.productName}
				/>
			</h1>
			<TripInfo block={leg} />
		</div>
	{/snippet}
	{#snippet backButton()}
		{#if getDisplayedFormData() !== undefined}
			<button class="hoverable hoverable--visible" onclick={() => void history.back()}>
				<IconLeftArrow />
				Zurück
			</button>
		{/if}
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
