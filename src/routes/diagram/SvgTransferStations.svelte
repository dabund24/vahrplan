<script lang="ts">
	import type { SvgData } from "$lib/server/svgData/svgData.server";
	import { getSelectedData } from "$lib/state/selectedData.svelte";
	import type { LocationEquivalenceSystem } from "../api/diagram/locationRepresentativesUtils";
	import { getLocationRepresentative } from "../api/diagram/locationRepresentativesUtils.js";

	type Props = {
		columns: SvgData["columns"];
		transferLocations: LocationEquivalenceSystem;
	};
	type TransfersStationData = {
		xTop: number;
		xBottom: number;
		name: string;
		id: string;
	};

	const { columns, transferLocations }: Props = $props();

	const { selectedJourneys } = $derived(getSelectedData());

	const transferStationsData: TransfersStationData[] = $derived(
		selectedJourneys.flatMap((rowIndex, columnIndex) => {
			if (rowIndex === -1) {
				return [];
			}
			const subJourneyBlocks = columns[columnIndex].subJourneys[rowIndex].blocks;
			const transfers = subJourneyBlocks
				.filter((block) => block.type === "transfer")
				.filter((transferBlock) => transferBlock.transferPosition === "middle");
			return transfers.map((transfer, i) => {
				const location = getLocationRepresentative(transferLocations, transfer.locationId);
				return {
					name: location.name,
					id: location.requestParameter,
					xTop: (i + 1) / (transfers.length + 1) + columnIndex,
					xBottom: transfer.start[0] + columnIndex
				};
			});
		})
	);
</script>

<div class="transfer-stations-container">
	{#each transferStationsData as { name, xTop, id } (id)}
		<span
			class="location-name limit-lines"
			style:left="{(100 * xTop) / selectedJourneys.length}%"
		>
			{name}
		</span>
	{/each}

	<svg
		class="transfer-stations"
		viewBox="-0.05 0 {selectedJourneys.length + 0.1} 1"
		preserveAspectRatio="none"
	>
		<g stroke="var(--foreground-color--transparent)" stroke-linejoin="round" fill="none">
			{#each Array.from({ length: columns.length + 1 }) as _, i}
				<g stroke-width="2">
					<line
						x1={i}
						y1="0"
						x2={i}
						y2="1"
						stroke="var(--background-color--transparent)"
						vector-effect="non-scaling-stroke"
					/>
					<line
						x1={i}
						y1="0"
						x2={i}
						y2="1"
						stroke="var(--foreground-color--very-transparent)"
						vector-effect="non-scaling-stroke"
					/>
				</g>
			{/each}
			{#each transferStationsData as { xTop, xBottom }}
				<g stroke-width="1">
					<polyline
						stroke="var(--background-color--transparent)"
						vector-effect="non-scaling-stroke"
						points="{xBottom},0.9 {xBottom},1"
					/>
					<polyline
						vector-effect="non-scaling-stroke"
						points="{xTop},0 {xTop},0.8 {xTop},9 {xTop},0.8 {xBottom},0.9 {xBottom},1"
					/>
				</g>
			{/each}
		</g>
	</svg>
</div>

<style>
	.transfer-stations-container {
		position: relative;
		pointer-events: none;
		height: calc(var(--line-width) + 1lh + 1rem);
		margin: calc(-1 * var(--line-width) - 1lh - 0.5rem) auto -0.5rem;
	}

	.location-name {
		position: absolute;
		transition: left 0.4s var(--cubic-bezier);
		bottom: -0.5rem;
		width: 8rem;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		transform: rotate(90deg) translateY(50%);
		font-size: 0.8rem;
		transform-origin: 0 100%;
		text-wrap: balance;
	}

	.transfer-stations {
        width: calc(var(--diagram-width) + 0.1 * var(--diagram-width) / var(--connection-count));
        margin: 0 calc(-0.05 * var(--diagram-width) / var(--connection-count));
		height: 100%;
	}
</style>
