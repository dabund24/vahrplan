<script lang="ts">
	import type { PopupDataStation, TransitData } from "$lib/types";
	import L from "leaflet";
	import { getContext, onDestroy, onMount, setContext } from "svelte";
	import Popup from "$lib/components/leaflet/Popup.svelte";

	export let data: TransitData;
	export let product1: string | undefined = undefined;
	export let product2: string | undefined = undefined;
	let marker: L.Marker | undefined;
	let markerElement: HTMLElement;

	$: popupData = {
		type: "station",
		transitData: data,
		product1,
		product2,
	} as PopupDataStation;

	const { getMap }: { getMap: () => L.Map | undefined } = getContext("map");
	const map = getMap();

	setContext("layer", {
		getLayer: () => marker
	});

	onMount(() => {
		if (map !== undefined) {
			let icon = L.divIcon({
				html: markerElement,
				className: `product--${product1 ?? product2}`,
				iconSize: L.point(16, 16)
			});
			marker = L.marker(data.location.position, { icon }).addTo(map);
		}
	});

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<div bind:this={markerElement}>
	{#if marker !== undefined}
		<slot />
		<Popup {popupData}>
			<slot />
		</Popup>
	{/if}
</div>
