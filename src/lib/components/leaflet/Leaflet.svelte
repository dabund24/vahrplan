<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import "./map.css";
	import { displayedJourneys, displayedLocations, L, selectedJourneys } from "$lib/stores";
	import { onDestroy, onMount, setContext } from "svelte";
	import type { DefiningBlock } from "$lib/types";
	import { isTimeDefined } from "$lib/util";
	import Polyline from "$lib/components/leaflet/Polyline.svelte";
	import Marker from "$lib/components/leaflet/Marker.svelte";
	import IconStationLocation from "$lib/components/journeys/IconStationLocation.svelte";

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	const resizeObserver = new ResizeObserver(() => {
		map?.invalidateSize();
	});

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
		resizeObserver.observe(mapElement);
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
		resizeObserver.disconnect()
	});

	setContext("map", {
		getMap: () => map
	});

	$: if (map !== undefined) {
		let coordinates: L.LatLngLiteral[];
		if ($selectedJourneys.filter((j) => j.selectedBy !== -1).length !== 0) {
			coordinates = $selectedJourneys
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
		} else {
			coordinates = $displayedLocations.map((location) => location.value.position);
		}
		if (coordinates.length > 0) {
			map.fitBounds($L.latLngBounds(coordinates), {
				paddingTopLeft: [20, 50],
				paddingBottomRight: [20, 100]
			});
		}
	}
</script>

<div class="map" bind:this={mapElement}>
	{#if map !== undefined}
		{#each $displayedJourneys as journey (journey.key)}
			{#each journey.value as block}
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
		position: absolute;
		bottom: 0;
	}
</style>
