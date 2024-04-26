<script lang="ts">
	import type { FillerBlock } from "$lib/types";
	import IconFiller from "$lib/components/icons/IconFiller.svelte";
	import Duration from "$lib/components/Duration.svelte";

	export let block: FillerBlock;
	let osmLink: string;
	$: if (block.type === "walk") {
		osmLink =
			"https://www.openstreetmap.org/directions?engine=fossgis_osrm_foot&from=" +
			block.originLocation.position.lat +
			"%2C" +
			block.originLocation.position.lng +
			"&to=" +
			block.destinationLocation.position.lat +
			"%2C" +
			block.destinationLocation.position.lng;
	}
	$: duration = block.type === "walk" || block.type === "transfer" ? block.transferTime : undefined
</script>

<div class="flex-row">
	<div class="duration-container">
		<Duration {duration} alignRight={true} />
	</div>
	<div class="icon-container flex-row">
		<IconFiller type={block.type} />
	</div>
	{#if block.type === "walk"}
		<a href={osmLink} target="_blank">
			{#if block.distance !== undefined && block.walkingTime !== undefined}
				{block.distance}m Fußweg (ca. {block.walkingTime}min)
			{:else}
				Fußweg
			{/if}
		</a>
	{:else}
		<div class="height-setter">-</div>
	{/if}
</div>

<style>
	.flex-row {
		gap: 0.5rem;
		align-items: center;
	}
	.height-setter {
		visibility: hidden;
	}
	.duration-container {
        max-width: min-content;
        display: inline-block;
    }
	.icon-container {
		align-items: center;
	}
</style>
