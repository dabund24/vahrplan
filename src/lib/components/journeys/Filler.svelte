<script lang="ts">
	import type { FillerBlock } from "$lib/types";
	import IconFiller from "$lib/components/icons/IconFiller.svelte";
	import Duration from "$lib/components/Duration.svelte";
	import Time from "$lib/components/Time.svelte";
	import NameDelayPlatform from "$lib/components/journeys/NameDelayPlatform.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import TrainProgressIndicator from "$lib/components/TrainProgressIndicator.svelte";

	type Props = {
		block: FillerBlock;
	};

	let { block }: Props = $props();
	let osmLink: string | undefined = $derived(
		block.type !== "walk"
			? undefined
			: "https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&from=" +
					block.originLocation.position.lat +
					"%2C" +
					block.originLocation.position.lng +
					"&to=" +
					block.destinationLocation.position.lat +
					"%2C" +
					block.destinationLocation.position.lng
	);

	let duration = $derived(
		block.type === "walk" || block.type === "onward-journey" || block.type === "transfer"
			? block.transferTime
			: undefined
	);
</script>

<div
	class="flex-row product--{block.type === 'transfer' ? block.arrivalProduct : ''}"
	class:compact={block.type === "transfer" && block.isStopover}
>
	<div class="duration-container">
		{#if block.type === "transfer" && block.isStopover}
			<Time time={block.transitData.time} />
		{:else}
			<Duration {duration} isAlignedRight={true} />
		{/if}
	</div>
	<div
		class="icon-container flex-row"
		class:stopover={block.type === "transfer" && block.isStopover}
	>
		{#if block.type === "transfer" && block.isStopover}
			{@const arrivalTime = new Date(block.transitData.time.arrival?.time ?? 0).getTime()}
			{@const departureTime = new Date(block.transitData.time.departure?.time ?? 0).getTime()}
			<IconStationLocation color="product" isSmallIcon={true} iconType="station" />
			<TrainProgressIndicator
				departureTime={arrivalTime}
				arrivalTime={departureTime}
				orientation="vertical"
				product={block.arrivalProduct}
			/>
		{:else}
			<IconFiller type={block.type} isSmallIcon={false} />
		{/if}
	</div>
	{#if block.type === "walk"}
		<a href={osmLink} target="_blank">
			{#if block.distance !== undefined && block.travelTime !== undefined}
				{block.distance}m Fußweg (ca. <i>{block.travelTime}min</i>)
			{:else}
				Fußweg
			{/if}
		</a>
	{:else if block.type === "onward-journey"}
		<span>
			Anreise zur nächsten Station{#if block.recommendedAction !== undefined},
				{block.recommendedAction}
			{/if}
			({(block.distance - (block.distance % 100)) / 1000}km, ca. <i>{block.travelTime}min</i>)
		</span>
	{:else if block.type === "transfer" && block.isStopover}
		<NameDelayPlatform transitData={block.transitData} hasStrongName={true} />
	{:else}
		<div class="height-setter">-</div>
	{/if}
</div>

<style>
	.flex-row {
		gap: 0.5rem;
		align-items: center;
	}
	.compact {
		height: 3rem;
		margin: -3rem 0;
		position: relative;
		z-index: 1;
	}
	.height-setter {
		visibility: hidden;
	}
	.duration-container {
		max-width: min-content;
		display: inline-block;
		:global(.time) {
			font-weight: bold;
		}
	}
	.icon-container {
		align-items: center;
		position: relative;
		&.stopover {
			height: 0;
		}
	}
</style>
