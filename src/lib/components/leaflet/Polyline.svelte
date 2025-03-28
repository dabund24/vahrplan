<script lang="ts">
	import type { LegBlock, OnwardJourneyBlock, PopupData, WalkingBlock } from "$lib/types";
	import L from "leaflet";
	import { getContext, onDestroy, onMount, setContext } from "svelte";
	import Popup from "$lib/components/leaflet/Popup.svelte";

	type Props = { block: LegBlock | WalkingBlock | OnwardJourneyBlock };

	let { block }: Props = $props();
	let polyline: L.GeoJSON | L.Polyline | undefined;
	let polylinePadding: L.GeoJSON | L.Polyline | undefined = $state(undefined); // improves clickability of line

	let popupData = $derived(getPopupData(block));

	const { getMap }: { getMap: () => L.Map | undefined } = getContext("map");
	const map = getMap();

	function getPopupData(block: LegBlock | WalkingBlock | OnwardJourneyBlock): PopupData {
		if (block.type === "leg") {
			return {
				type: "line",
				duration: block.duration,
				direction: block.direction,
				product: block.product,
				name: block.name
			};
		}
		if (block.type === "walk") {
			return {
				type: "walk",
				duration: block.transferTime,
				walkingTime: block.travelTime,
				distance: block.distance
			};
		}
		return {
			type: "onward-journey",
			duration: block.transferTime,
			travelTime: block.travelTime,
			distance: block.distance,
			recommendedAction: block.recommendedAction
		};
	}

	setContext("layer", {
		getLayer: () => polylinePadding
	});

	onMount(() => {
		if (map === undefined) {
			return;
		}
		if (block.type === "leg") {
			polyline = L.polyline(block.polyline, {
				className: `product--${block.product} stroke--product`,
				weight: 4,
				smoothFactor: 2
			});
			polylinePadding = L.polyline(block.polyline, {
				color: "transparent",
				weight: 16,
				smoothFactor: 2
			});
		} else {
			polyline = L.polyline(
				[block.originLocation.position, block.destinationLocation.position],
				{
					dashArray: "4 8",
					weight: 4,
					color: "var(--foreground-color)"
				}
			);
			polylinePadding = L.polyline(
				[block.originLocation.position, block.destinationLocation.position],
				{
					color: "transparent",
					weight: 16
				}
			);
		}
		polyline.addTo(map);
		polylinePadding.addTo(map);
	});

	onDestroy(() => {
		polyline?.remove();
		polylinePadding?.remove();
		polyline = undefined;
		polylinePadding = undefined;
	});
</script>

<div>
	{#if polylinePadding !== undefined}
		<Popup {popupData} />
	{/if}
</div>
