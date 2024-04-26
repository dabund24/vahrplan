<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import "./map.css";
	import { displayedJourneys, displayedLocations, selectedJourneys } from "$lib/stores";
	import { onDestroy, onMount, setContext } from "svelte";
	import type { DefiningBlock } from "$lib/types";
	import { isTimeDefined } from "$lib/util";
	import Polyline from "$lib/components/leaflet/Polyline.svelte";
	import Marker from "$lib/components/leaflet/Marker.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { settings } from "$lib/settings";
	import L from "leaflet";

	let map: L.Map | undefined;
	let mapElement: HTMLElement;

	const resizeObserver = new ResizeObserver(() => {
		map?.invalidateSize();
	});

	$: if (map !== undefined) addLayersToMap(map, $settings.view.map.layers);

	onMount(() => {
		map = L.map(mapElement, { zoomControl: false });
		resizeObserver.observe(mapElement);
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
		resizeObserver.disconnect();
	});

	setContext("map", {
		getMap: () => map
	});

	function addLayersToMap(map: L.Map, layer: typeof $settings.view.map.layers): void {
		if (layer === "osm" || layer === "orm") {
			L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 19,
				attribution:
					'&copy; <a href="https:///www.openstreetmap.org/copyright">OpenStreetMap</a>',
				className: "osm-tiles"
			}).addTo(map);
		}
		if (layer === "orm") {
			L.tileLayer("https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png", {
				maxZoom: 19,
				attribution:
					'<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>, Style: <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a> <a href="http://www.openrailwaymap.org/">OpenRailwayMap</a> and OpenStreetMap',
				className: "orm-tiles"
			}).addTo(map);
		}
		if (layer === "oepnvk") {
			L.tileLayer("https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png", {
				maxZoom: 17,
				attribution:
					'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/"> CC-BY-SA</a>, map data <a href="http://openstreetmap.org/"> Openstreetmap</a> <a href="http://opendatacommons.org/licenses/odbl/1.0/">ODbL</a>',
				className: "oepnvk-tiles"
			}).addTo(map);
		}
	}

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
		} else if ($displayedLocations.locations.length !== 0) {
			coordinates = $displayedLocations.locations.map((location) => location.value.position);
		} else {
			// fit germany
			coordinates = [
				{ lat: 55.0, lng: 6.332 },
				{ lat: 47.5, lng: 14.635 }
			];
		}
		map.fitBounds(L.latLngBounds(coordinates), {
			paddingTopLeft: [20, 50],
			paddingBottomRight: [20, 100]
		});
	}
</script>

<div
	class="map"
	bind:this={mapElement}
	data-theme={$settings.view.map.darkFilter && $settings.view.general.darkTheme
		? "dark"
		: "light"}
>
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
							platformData: null
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
