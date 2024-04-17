<script lang="ts">
	import type { LegBlock, PopupDataLine, PopupDataWalk, WalkingBlock } from "$lib/types";
	import L from "leaflet";
	import { getContext, onDestroy, onMount, setContext } from "svelte";
	import Popup from "$lib/components/leaflet/Popup.svelte";

	export let block: LegBlock | WalkingBlock;
	let polyline: L.GeoJSON | L.Polyline | undefined;
	let polylineElement: HTMLElement;

	$: popupData =
		block.type === "leg"
			? ({
					type: "line",
					duration: block.duration,
					line: block.line,
					direction: block.direction
				} as PopupDataLine)
			: ({
					type: "walk",
					duration: block.transferTime,
					walkingTime: block.walkingTime,
					distance: block.distance
				} as PopupDataWalk);

	const { getMap }: { getMap: () => L.Map | undefined } = getContext("map");
	const map = getMap();

	setContext("layer", {
		getLayer: () => polyline
	});

	onMount(() => {
		if (map !== undefined) {
			polyline = (
				block.type === "leg"
					? L.polyline(block.polyline, {
						className: `product--${block.line.product} stroke--product`,
						weight: 4,
					smoothFactor: 2
					})
					: L.polyline(
							[block.originLocation.position, block.destinationLocation.position],
							{
								dashArray: "4 8",
								weight: 4,
								color: "var(--foreground-color)"
							}
						)
			).addTo(map);
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
