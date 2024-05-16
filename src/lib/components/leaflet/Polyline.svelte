<script lang="ts">
	import type { LegBlock, PopupDataLine, PopupDataWalk, WalkingBlock } from "$lib/types";
	import L from "leaflet";
	import { getContext, onDestroy, onMount, setContext } from "svelte";
	import Popup from "$lib/components/leaflet/Popup.svelte";

	export let block: LegBlock | WalkingBlock;
	let polyline: L.GeoJSON | L.Polyline | undefined;
	let polylinePadding: L.GeoJSON | L.Polyline | undefined; // improves clickability of line
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
		getLayer: () => polylinePadding
	});

	onMount(() => {
		if (map === undefined) {
			return;
		}
		if (block.type === "leg") {
			polyline = L.polyline(block.polyline, {
				className: `product--${block.line.product} stroke--product`,
				weight: 4,
				smoothFactor: 2
			})
			polylinePadding = L.polyline(block.polyline, {
				color: "transparent",
				weight: 16,
				smoothFactor: 2
			});
		} else {
			polyline = L.polyline([block.originLocation.position, block.destinationLocation.position], {
				dashArray: "4 8",
				weight: 4,
				color: "var(--foreground-color)"
			})
			polylinePadding = L.polyline(
				[block.originLocation.position, block.destinationLocation.position],
				{
					color: "transparent",
					weight: 16
				}
			)
		}
		polyline.addTo(map);
		polylinePadding.addTo(map)
	});

	onDestroy(() => {
		polyline?.remove();
		polylinePadding?.remove()
		polyline = undefined;
		polylinePadding = undefined
	});
</script>

<div bind:this={polylineElement}>
	{#if polylinePadding !== undefined}
		<Popup {popupData} />
	{/if}
</div>
