<script lang="ts">
	import type { TransferBlock, WalkingBlock } from "$lib/types";

	export let block: WalkingBlock | TransferBlock;
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

<div class="flex-row padded-top-bottom">
	<div class="duration-container">
		<i class="duration">{block.transferTime}</i>
		<div class="width-setter">00:00</div>
	</div>
	<div class="line-container line--vertical {block.type}"/>
	{#if block.type === "walk"}
		<a href={osmLink} target="_blank">
			{block.distance} m Fußweg (ca. {block.walkingTime})
		</a>
	{/if}
</div>

<style>
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
	.line--vertical {
		background-color: transparent;
		margin: 0 calc(0.5rem + (var(--height--icon--small) - var(--line-width)) / 2);
		box-shadow: var(--foreground-color) 0 0 0 var(--line-width--small);
		height: auto;
		min-height: 4px;
		flex-shrink: 0;
		&.transfer {
			align-self: center;
		}
	}
</style>
