<script lang="ts">
	import type { SvgData } from "$lib/server/svgData/svgData.server";
	import SvgColumn from "./SvgColumn.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte";
	import { svgJourneyToPolylinePoints } from "./svgDiagramUtils";

	type Props = {
		svgData: SvgData;
	};

	const { svgData }: Props = $props();
	const { columns, minTime, maxTime, timeMarkInterval, firstTimeMark } = $derived(svgData);

	const diagramCoordinateRangeY = $derived(maxTime - minTime);
	const yMin = $derived(-0.05 * diagramCoordinateRangeY);
	const ySize = $derived(1.1 * diagramCoordinateRangeY);

	const { selectedJourneys } = $derived(getSelectedData());
	const selectedJourneyCoords = $derived.by(() => {
		const coords = selectedJourneys.reduce(
			(acc, rowIndex, columnIndex) => {
				if (rowIndex !== -1) {
					// journey keeps going
					const subJourneyData = columns[columnIndex].subJourneys[rowIndex];
					acc[acc.length - 1] +=
						` ${svgJourneyToPolylinePoints(subJourneyData, minTime, columnIndex)}`;
				} else if (acc.at(-1) !== "") {
					// journey is interrupted
					acc.push("");
				}
				return acc;
			},
			[""]
		);
		if (coords.at(-1) === "") {
			coords.pop();
		}
		return coords;
	});
</script>

<div class="svg-container">
	<div></div>
	<svg
		class="main-svg"
		viewBox="-0.05 {yMin} {columns.length + 0.1} {ySize}"
		preserveAspectRatio="none"
	>
		<g
			class="svg__inner-wrapper"
			stroke-linecap="round"
			fill="none"
			stroke-linejoin="round"
			stroke-width="2"
		>
			{#each selectedJourneyCoords as subJourneyCoords}
				<polyline
					points={subJourneyCoords}
					vector-effect="non-scaling-stroke"
					stroke="var(--accent-color)"
					stroke-width="1rem"
					opacity="0.3"
				/>
			{/each}

			{#each columns as column, columnIndex}
				<SvgColumn columnData={column} {minTime} {yMin} {ySize} {columnIndex} />
			{/each}
		</g>
	</svg>
	<div></div>
</div>

<style>
	.svg-container {
		display: grid;
		width: calc(var(--diagram-width) + 2 * var(--diagram--beginning-end-offset));
		grid-template-columns: var(--diagram--beginning-end-offset) var(--diagram-width) var(
				--diagram--beginning-end-offset
			);
		overflow: visible;
	}

	.main-svg {
		display: block;
		width: calc(var(--diagram-width) + 0.1 * var(--diagram-width) / var(--connection-count));
		height: 50rem; /* TODO add 3.5rem here */
		margin: 0 calc(-0.05 * var(--diagram-width) / var(--connection-count));
	}
</style>
