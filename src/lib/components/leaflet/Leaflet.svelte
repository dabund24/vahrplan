<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import { L, selectedJourneys } from "$lib/stores";
	import { onDestroy, onMount, setContext } from "svelte";
	import type { JourneyBlock } from "$lib/types";

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	onMount(() => {
		map = $L.map(mapElement, { zoomControl: false });
		const osmLayer = $L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
			className: "osm-tiles"
		});
		osmLayer.addTo(map);
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext("map", {
		getMap: () => map
	});

	$: if (map !== undefined) {
		map.fitBounds(getBoundsFromBlocks($selectedJourneys.flatMap((j) => j.blocks)));
	}

	function getBoundsFromBlocks(blocks: JourneyBlock[]): L.LatLngBounds {
		const coordinates: [number, number][] = [];

		blocks.forEach((block) => {
			switch (block.type) {
				case "leg":
					coordinates.push(
						[
							block.departureData.location.longitude,
							block.departureData.location.longitude
						],
						[block.arrivalData.location.longitude, block.arrivalData.location.latitude]
					);
					break;
				case "location":
					coordinates.push([block.location.longitude, block.location.latitude]);
			}
		});

		return $L.featureGroup(coordinates.map(c => new $L.Layer(c))).getBounds()
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
