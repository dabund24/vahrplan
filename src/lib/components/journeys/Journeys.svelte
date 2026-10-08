<script lang="ts">
	import { flip } from "svelte/animate";
	import { scale } from "svelte/transition";
	import LegRegular from "$lib/components/journeys/LegRegular.svelte";
	import Filler from "$lib/components/journeys/Filler.svelte";
	import Location from "$lib/components/journeys/Location.svelte";
	import DateDuration from "$lib/components/DateDuration.svelte";
	import { dateDifference } from "$lib/util";
	import Warning from "$lib/components/Warning.svelte";
	import { type DisplayedJourney } from "$lib/state/displayedJourney.svelte";
	import { type SelectedData } from "$lib/state/selectedData.svelte";
	import { m } from "$lib/paraglide/messages";

	type Props = {
		displayedJourney: DisplayedJourney;
		selectedData: SelectedData;
		isCompact?: boolean;
	};

	const { displayedJourney, selectedData, isCompact }: Props = $props();

	let warningMessage = $derived.by(() => {
		const statuses = displayedJourney.statuses;
		if (statuses.has("cancelled") && statuses.has("impossibleTransfer")) {
			return m.journey_impossible_transfer_and_cancellation();
		} else if (statuses.has("impossibleTransfer")) {
			return m.journey_impossible_transfer();
		} else if (statuses.has("cancelled")) {
			return m.journey_impossible_cancellation();
		}
	});
</script>

<div class="journeys-wrapper">
	<DateDuration
		date={displayedJourney.departure}
		duration={dateDifference(displayedJourney.departure, displayedJourney.arrival)}
	/>
	{#if warningMessage !== undefined}
		<Warning color="red">{warningMessage}</Warning>
	{/if}
	{#if selectedData.selectedJourneys.length !== 0 && !selectedData.isFullJourneySelected}
		<Warning>{m.journey_none_selected_split_view()}</Warning>
	{/if}
	{#each displayedJourney.blocks as subJourney (subJourney.key)}
		<div in:scale animate:flip={{ duration: 400 }}>
			{#each subJourney.value as block, i (i)}
				{#if block.type === "leg"}
					<LegRegular {block} {isCompact} />
				{:else if block.type === "walk" || block.type === "onward-journey" || block.type === "transfer" || block.type === "unselected"}
					<Filler {block} />
				{:else if block.type === "location" && !block.hidden}
					<Location {block} />
				{/if}
			{/each}
		</div>
	{/each}
</div>

<style>
	.journeys-wrapper {
		max-width: 30rem;
		margin: auto;
	}
</style>
