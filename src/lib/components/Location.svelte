<script lang="ts">
	import type { LocationBlock } from "$lib/types";
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/IconStationLocation.svelte";

	export let block: LocationBlock
	console.log(block.time);
</script>

<div class="flex-row padded-top-bottom">
	<div class="time-container">
		<Time time={block.time} />
	</div>
	<IconStationLocation iconType={block.location.type} color={"foreground"} />
	<strong>{block.location.name}</strong>
</div>

<style>
	.flex-row {
		height: 3rem;
		gap: .5rem;
		align-items: center;
	}
</style>