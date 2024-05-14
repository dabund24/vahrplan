<script lang="ts">
	import type { LocationBlock } from "$lib/types";
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { getGeolocationString } from "$lib/util";
	import { displayedLocations } from "$lib/stores/journeyStores";

	export let block: LocationBlock

	let locationName = block.location.name
	let locationType = block.location.type

	if (block.location.type === "currentLocation") {
		locationName = getGeolocationString(block.location.asAt)
	} else if (block.location.name === "Standort") {
		locationName = getGeolocationString($displayedLocations.geolocationDate)
		locationType = "currentLocation"
	}
</script>

<div class="flex-row">
	<div class="time-container">
		<Time time={block.time} />
	</div>
	<IconStationLocation iconType={locationType} color={"foreground"} />
	<strong>{locationName}</strong>
</div>

<style>
	.flex-row {
		height: 3rem;
		gap: .5rem;
		align-items: center;
	}
</style>