<script lang="ts">
	import type { PopupDataStation, TransitData } from "$lib/types";
	import L from "leaflet";
	import { getContext, onDestroy, onMount, setContext, type Snippet } from "svelte";
	import Popup from "$lib/components/leaflet/Popup.svelte";
	import IconFlashLight from "$lib/components/icons/IconFlashLight.svelte";

	type Props = {
		data: TransitData;
		product1?: string;
		product2?: string;
		orientation?: number;
		children: Snippet;
	};

	let { data, product1, product2, orientation, children }: Props = $props();
	let marker: L.Marker | undefined = $state();
	let markerElement: HTMLElement;

	let popupData = $derived({
		type: "station",
		transitData: data,
		product1,
		product2
	} as PopupDataStation);

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
			marker = L.marker(data.location.position, {
				icon,
				zIndexOffset: data.location.name === "Live-Standort" ? -100000 : 0
			}).addTo(map);
		}
	});

	// update marker position
	$effect(() => void marker?.setLatLng(data.location.position));

	onDestroy(() => {
		marker?.remove();
		marker = undefined;
	});
</script>

<div bind:this={markerElement}>
	{#if marker !== undefined}
		{@render children()}
		{#if orientation !== undefined}
			<IconFlashLight {orientation} />
		{/if}
		<Popup {popupData}>
			{@render children()}
		</Popup>
	{/if}
</div>
