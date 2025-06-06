<script lang="ts">
	import "leaflet/dist/leaflet.css";
	import "./map.css";
	import { onDestroy, onMount, setContext } from "svelte";
	import { isTimeDefined } from "$lib/util";
	import Polyline from "$lib/components/leaflet/Polyline.svelte";
	import Marker from "$lib/components/leaflet/Marker.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { settings } from "$lib/state/settingStore";
	import L from "leaflet";
	import {
		cleanupCurrentPositionData,
		currentPositionData,
		setupCurrentPositionData
	} from "$lib/geolocation.svelte.js";
	import IconTrainLocation from "$lib/components/IconTrainLocation.svelte";
	import { getDisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
	import { type DisplayedJourney, getDisplayedJourney } from "$lib/state/displayedJourney.svelte";
	import { getSelectedData, type SelectedData } from "$lib/state/selectedData.svelte";

	const displayedFormData = $derived(getDisplayedFormData());
	const displayedJourney = $derived(getDisplayedJourney());
	const selectedData = $derived(getSelectedData());

	let map: L.Map | undefined = $state();
	let mapElement: HTMLElement;

	const resizeObserver = new ResizeObserver(() => {
		map?.invalidateSize();
	});

	onMount(() => {
		map = L.map(mapElement, { zoomControl: false });
		resizeObserver.observe(mapElement);
		addLayersToMap(map);
		void setupCurrentPositionData();
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
		resizeObserver.disconnect();
		cleanupCurrentPositionData();
	});

	setContext("map", {
		getMap: () => map
	});

	function addLayersToMap(map: L.Map): void {
		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
			attribution:
				'&copy; <a href="https:///www.openstreetmap.org/copyright">OpenStreetMap</a>',
			className: "osm-tiles"
		}).addTo(map);
	}

	$effect(() =>
		setMapContent(map, {
			selectedData,
			displayedJourney
		})
	);

	function setMapContent(
		map: L.Map | undefined,
		{
			selectedData,
			displayedJourney
		}: { selectedData: SelectedData; displayedJourney: DisplayedJourney }
	): void {
		if (map === undefined) return;
		let coordinates: L.LatLngLiteral[];
		if (!selectedData.isNoneSelected) {
			coordinates = displayedJourney.blocks
				.flatMap((j) => j.value)
				.filter(isTimeDefined)
				.flatMap((block) =>
					block.type === "leg"
						? [
								block.departureData.location.position,
								...block.stopovers.map((s) => s.location.position),
								block.arrivalData.location.position
							]
						: block.location.position
				);
		} else if (displayedFormData !== undefined) {
			coordinates = displayedJourney.locations.map((location) => location.value.position);
		} else {
			// fit germany
			coordinates = [
				{ lat: 55.0, lng: 6.332 },
				{ lat: 47.5, lng: 14.635 }
			];
		}
		map.fitBounds(L.latLngBounds(coordinates), {
			padding: [10, 100]
		});
	}
</script>

<div
	class="map"
	bind:this={mapElement}
	data-theme={$settings.general.isMapAlwaysLight ? "light" : $settings.general.colorScheme}
>
	{#if map !== undefined}
		{#each displayedJourney.blocks as subJourneyBlocks (subJourneyBlocks.key)}
			{#each subJourneyBlocks.value as block, i (i)}
				{#if block.type === "leg"}
					<Polyline {block} />
					{#if block.precededBy === undefined}
						<Marker data={block.departureData} product2={block.product ?? ""}>
							<IconStationLocation
								color="product"
								iconType="station"
								isCancelled={block.departureData.attribute === "cancelled"}
							/>
						</Marker>
					{/if}
					{#each block.stopovers as stopover, j (j)}
						<Marker
							data={stopover}
							product1={block.product ?? ""}
							product2={block.product ?? ""}
						>
							<IconStationLocation
								color="product"
								iconType="station"
								isSmallIcon={true}
								isCancelled={stopover.attribute === "cancelled"}
							/>
						</Marker>
					{/each}
					{#if block.succeededBy === undefined}
						<Marker data={block.arrivalData} product1={block.product ?? ""}>
							<IconStationLocation
								color="product"
								iconType="station"
								isCancelled={block.arrivalData.attribute === "cancelled"}
							/>
						</Marker>
					{/if}
					{#if block.currentLocation !== undefined}
						<Marker
							data={{
								location: block.currentLocation,
								time: {},
								platformData: null
							}}
						>
							<IconTrainLocation product={block.product} />
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
							isSmallIcon={block.isStopover}
							isCancelled={block.transitData.attribute === "cancelled" &&
								block.transitData.attribute2 === "cancelled"}
						/>
					</Marker>
				{:else if block.type === "location" && !block.hidden}
					<Marker
						data={{
							location: block.location,
							time: block.time,
							platformData: null
						}}
					>
						<IconStationLocation
							color="foreground"
							iconType={block.location.name === "Standort"
								? "currentLocation"
								: block.location.type}
						/>
					</Marker>
				{:else if block.type === "walk" || block.type === "onward-journey"}
					<Polyline {block} />
				{/if}
			{/each}
		{/each}
		{#if currentPositionData.position !== undefined}
			<Marker
				data={{
					location: {
						position: currentPositionData.position,
						type: "address", // this is important since it does not behave like "currentLocation" (it is never outdated)
						name: "Live-Standort",
						id: JSON.stringify({ type: "location" })
					},
					time: {},
					platformData: null
				}}
				orientation={currentPositionData.orientation}
			>
				<IconStationLocation iconType="currentLocation" color="accent" />
			</Marker>
		{/if}
	{/if}
</div>

<style>
	.map {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
