<script lang="ts">
	import type { FillerBlock } from "$lib/types";
	import IconFiller from "$lib/components/IconFiller.svelte";

	export let block: FillerBlock;
	let osmLink: string;
	if (block.type === "walk") {
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
</script>

<div class="flex-row">
	<div>
		{#if block.type === "walk" || block.type === "transfer"}
			<i class="duration">{block.transferTime}</i>
		{/if}
		<div class="width-setter">00:00</div>
	</div>
	<div class="icon-container flex-row">
		<IconFiller type={block.type} />
	</div>
	{#if block.type === "walk"}
		<a href={osmLink} target="_blank">
			{#if block.distance !== undefined && block.walkingTime !== undefined}
				{block.distance}m Fußweg (ca. {block.walkingTime})
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
	.duration {
		margin: auto 0 auto auto;
		width: 0;
		display: block;
		direction: rtl;
	}
	.width-setter {
		visibility: hidden;
		height: 0;
	}
	.height-setter {
		visibility: hidden;
	}
	.icon-container {
		height: 0;
		align-items: center;
	}
</style>
