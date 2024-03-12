<script lang="ts">
	import type { LegBlock } from "$lib/types";
	import { L } from "$lib/stores";
	import { getContext, onDestroy, onMount, setContext } from 'svelte';

	export let block: LegBlock;
	let polyline: L.GeoJSON | undefined;
	let polylineElement: HTMLElement;

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
		<slot />
	{/if}
</div>