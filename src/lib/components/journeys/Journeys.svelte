<script lang="ts">
	import { flip } from "svelte/animate";
	import { scale } from "svelte/transition";
	import LegRegular from "$lib/components/journeys/LegRegular.svelte";
	import Filler from "$lib/components/journeys/Filler.svelte";
	import Location from "$lib/components/journeys/Location.svelte";
	import { displayedJourneys, selectedJourneys } from "$lib/stores/journeyStores";
	import DateDuration from "$lib/components/DateDuration.svelte";
	import { dateDifference } from "$lib/util";
	import type { JourneyBlock, LegBlock, TransferBlock, WalkingBlock } from "$lib/types";
	import Warning from "$lib/components/Warning.svelte";

	$: selectedDeparture = $selectedJourneys.at(0)?.departure.departure?.time;
	$: selectedArrival = $selectedJourneys.at(-1)?.arrival.arrival?.time;

	$: flatBlocks = $displayedJourneys.flatMap((journey) => journey.value);

	$: hasImpossibleTransfer = flatBlocks
		.filter(isTransferOrWalkingBlock)
		.some((transfer) => transfer.transferTime < 0);

	function isTransferOrWalkingBlock(block: JourneyBlock): block is (TransferBlock | WalkingBlock) {
		return block.type === "transfer" || block.type === "walk";
	}

	$: hasCancelledLeg = flatBlocks.filter(isLegBlock).some((leg) => leg.attribute === "cancelled");

	function isLegBlock(block: JourneyBlock): block is LegBlock {
		return block.type === "leg";
	}

	$: warningMessage = getWarningMessage(hasImpossibleTransfer, hasCancelledLeg);

	function getWarningMessage(
		hasImpossibleTransfer: boolean,
		hasCancelledLeg: boolean
	): string | undefined {
		if (hasImpossibleTransfer && hasCancelledLeg) {
			return "Reise nicht möglich: Negative Umstiegszeit und Fahrt entfällt";
		} else if (hasImpossibleTransfer) {
			return "Reise nicht möglich: Negative Umstiegszeit";
		} else if (hasCancelledLeg) {
			return "Reise nicht möglich: Fahrt entfällt";
		}
	}
</script>

<div class="journeys-container">
	{#if warningMessage !== undefined}
		<Warning message={warningMessage} color="red" />
	{/if}
	<DateDuration
		date={selectedDeparture}
		duration={dateDifference(selectedDeparture, selectedArrival)}
	/>
	{#each $displayedJourneys as journey (journey.key)}
		<div transition:scale animate:flip={{ duration: 400 }}>
			{#each journey.value as block}
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
	.journeys-container {
		padding: 0.5rem 1rem;
		max-width: 30rem;
		margin: auto;
		box-sizing: border-box;
	}
</style>
