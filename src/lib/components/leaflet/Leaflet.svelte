<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import { L, selectedJourneys } from "$lib/stores";
	import { onDestroy, onMount, setContext } from "svelte";
	import type { DefiningBlock } from "$lib/types";
	import { isTimeDefined } from "$lib/util";

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	onMount(() => {
		map = $L.map(mapElement, { zoomControl: false });
		const osmLayer = $L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https:///www.openstreetmap.org/copyright">OpenStreetMap</a>',
			className: "osm-tiles"
		});
		osmLayer.addTo(map);
		const southWest = $L.latLng(40.712, -74.227),
			northEast = $L.latLng(40.774, -74.125);

		map.fitBounds($L.latLngBounds(southWest, northEast));
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext("map", {
		getMap: () => map
	});

	$: if (map !== undefined) {
		const coordinates = $selectedJourneys
			.flatMap((j) => j.blocks)
			.filter<DefiningBlock>(isTimeDefined)
			.flatMap((block) =>
				block.type === "leg"
					? [
							block.departureData.location.position,
							...block.stopovers.map((s) => s.location.position),
							block.arrivalData.location.position
						]
					: block.location.position
			);
		if (coordinates.length > 0) {
			map.fitBounds($L.latLngBounds(coordinates));
		}
	}
</script>

<div class="map" bind:this={mapElement}>
	{#if map !== undefined}
		<slot />
	{/if}
</div>

<style>
	.map {
		width: 100%;
		height: 100%;
	}
</style>
