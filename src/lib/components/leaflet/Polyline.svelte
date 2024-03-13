<script lang="ts">
	import type { LegBlock, PopupDataLine } from "$lib/types";
	import { L } from "$lib/stores";
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import Popup from "$lib/components/leaflet/Popup.svelte";

	export let block: LegBlock;
	let polyline: L.GeoJSON | undefined;
	let polylineElement: HTMLElement;

	$: popupData = {
		type: "line",
		duration: block.duration,
		line: block.line,
		direction: block.direction
	} as PopupDataLine

	const { getMap }: { getMap: () => L.Map | undefined } = getContext("map");
	const map = getMap();

	setContext("layer", {
		getLayer: () => polyline
	})

	onMount(() => {
		if (map !== undefined) {
			polyline = $L.geoJSON(block.polyline, {
				style: {
					className: `product--${block.line.product} stroke--product`,
					weight: 4
				}
			}).addTo(map);
		}
	});

	onDestroy(() => {
		polyline?.remove();
		polyline = undefined;
	});
</script>

<div bind:this={polylineElement}>
	{#if polyline !== undefined}
		<Popup {popupData} />
	{/if}
</div>