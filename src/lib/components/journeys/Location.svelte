<script lang="ts">
	import type { LocationBlock } from "$lib/types";
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { getGeolocationString } from "$lib/geolocation.svelte";
	import { displayedFormData } from "$lib/stores/journeyStores";

	type Props = {
		block: LocationBlock;
	};

	let { block }: Props = $props();

	let { locationName, locationType } = $derived.by(() => {
		let locationName = block.location.name;
		let locationType = block.location.type;
		if (block.location.type === "currentLocation") {
			locationName = getGeolocationString(block.location.asAt);
		} else if (block.location.name === "Standort") {
			locationName = getGeolocationString($displayedFormData?.geolocationDate ?? new Date());
			locationType = "currentLocation";
		}
		return { locationName, locationType };
	});
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
		gap: 0.5rem;
		align-items: center;
	}
</style>
