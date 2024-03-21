<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import { displayedJourneys, displayedLocations, L, selectedJourneys } from "$lib/stores";
	import { onDestroy, onMount, setContext } from "svelte";
	import type { DefiningBlock } from "$lib/types";
	import { isTimeDefined } from "$lib/util";
	import Polyline from "$lib/components/leaflet/Polyline.svelte";
	import Marker from "$lib/components/leaflet/Marker.svelte";
	import IconStationLocation from "$lib/components/IconStationLocation.svelte";

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

	$: if (map !== undefined) {
		const coordinates = $displayedLocations.map((location) => location.position);
		if (coordinates.length > 0) {
			map.fitBounds($L.latLngBounds(coordinates));
		}
	}

</script>

<div class="map" bind:this={mapElement}>
	{#if map !== undefined}
		{#each $displayedJourneys as journey (journey.key)}
			{#each journey.blocks as block}
				{#if block.type === "leg"}
					<Polyline {block} />
					{#if !block.precededByTransferBlock}
						<Marker data={block.departureData} product2={block.line.product ?? ""}>
							<IconStationLocation color="product" iconType="station" />
						</Marker>
					{/if}
					{#each block.stopovers as stopover}
						<Marker
							data={stopover}
							product1={block.line.product ?? ""}
							product2={block.line.product ?? ""}
						>
							<IconStationLocation
								color="product"
								iconType="station"
								smallIcon={true}
							/>
						</Marker>
					{/each}
					{#if !block.succeededByTransferBlock}
						<Marker data={block.arrivalData} product1={block.line.product ?? ""}>
							<IconStationLocation color="product" iconType="station" />
						</Marker>
					{/if}
				{:else if block.type === "transfer"}
					<Marker
						data={block.transitData}
						product1={block.arrivalProduct ?? ""}
						product2={block.departureProduct ?? ""}
					>
						<IconStationLocation
							color="product"
							iconType="station"
							secondaryProduct={block.departureProduct}
						/>
					</Marker>
				{:else if block.type === "location"}
					<Marker
						data={{
							location: block.location,
							time: block.time,
							platformChanged: false
						}}
					>
						<IconStationLocation color="foreground" iconType={block.location.type} />
					</Marker>
				{:else if block.type === "walk"}
					<Polyline {block} />
				{/if}
			{/each}
		{/each}
	{/if}
</div>

<style>
	.map {
		width: 100%;
		height: 100%;
	}
</style>
