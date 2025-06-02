<script lang="ts">
	import { flip } from "svelte/animate";
	import { scale } from "svelte/transition";
	import LegRegular from "$lib/components/journeys/LegRegular.svelte";
	import Filler from "$lib/components/journeys/Filler.svelte";
	import Location from "$lib/components/journeys/Location.svelte";
	import DateDuration from "$lib/components/DateDuration.svelte";
	import { dateDifference } from "$lib/util";
	import Warning from "$lib/components/Warning.svelte";
	import { getDisplayedJourney } from "$lib/state/displayedJourney.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte";

	const displayedJourney = $derived(getDisplayedJourney());
	const selectedData = $derived(getSelectedData());

	let warningMessage = $derived.by(() => {
		const statuses = displayedJourney.statuses;
		if (statuses.has("cancelled") && statuses.has("impossibleTransfer")) {
			return "Reise nicht möglich: Nicht erreichbarer Umstieg und Fahrt entfällt";
		} else if (statuses.has("impossibleTransfer")) {
			return "Reise nicht möglich: Nicht erreichbarer Umstieg";
		} else if (statuses.has("cancelled")) {
			return "Reise nicht möglich: Fahrt entfällt";
		}
	});
</script>

<div class="journeys-wrapper">
	{#if warningMessage !== undefined}
		<Warning color="red">{warningMessage}</Warning>
	{/if}
	{#if selectedData.selectedJourneys.length !== 0 && !selectedData.isFullJourneySelected}
		<Warning>Wähle im Verbindungsdiagramm für jeden Reiseabschnitt eine Verbindung aus.</Warning
		>
	{/if}
	<DateDuration
		date={displayedJourney.departure}
		duration={dateDifference(displayedJourney.departure, displayedJourney.arrival)}
	/>
	{#each displayedJourney.blocks as subJourney (subJourney.key)}
		<div in:scale animate:flip={{ duration: 400 }}>
			{#each subJourney.value as block, i (i)}
				{#if block.type === "leg"}
					<LegRegular {block} />
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
