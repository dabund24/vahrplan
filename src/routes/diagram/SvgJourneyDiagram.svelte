<script lang="ts">
	import type { SvgData } from "$lib/server/svgData/svgData.server";
	import SvgColumn from "./SvgColumn.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte";
	import { svgJourneyToPolylinePoints, timeMarkIt } from "./svgDiagramUtils";
	import SvgTimeMarks from "./SvgTimeMarks.svelte";

	type Props = {
		svgData: SvgData;
	};

	const { svgData }: Props = $props();
	const { columns, minTime, maxTime, timeMarksData, minutesPerHeight } = $derived(svgData);

	const diagramCoordinateRangeY = $derived(maxTime - minTime);
	const diagramScaleY = $derived(diagramCoordinateRangeY / minutesPerHeight);
	const yMin = $derived(-0.2 * diagramCoordinateRangeY);
	const ySize = $derived(1.3 * diagramCoordinateRangeY);

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

	const timeMarks = $derived([...timeMarkIt(timeMarksData, minTime, maxTime)]);
</script>

<div class="svg-container" style:--diagram-height="calc(25rem * {diagramScaleY})">
	<SvgTimeMarks {timeMarks} />
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
			{#each timeMarks as { yCoordinate }}
				<line
					x1="0"
					x2={columns.length}
					y1={yCoordinate}
					y2={yCoordinate}
					stroke="var(--foreground-color--transparent)"
					stroke-width="1"
					vector-effect="non-scaling-stroke"
				/>
			{/each}
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
	<SvgTimeMarks {timeMarks} />
</div>

<style>
	.svg-container {
		display: grid;
		width: calc(var(--diagram-width) + 2 * var(--diagram--beginning-end-offset));
		grid-template-columns: var(--diagram--beginning-end-offset) var(--diagram-width) var(
				--diagram--beginning-end-offset
			);
		overflow-x: visible;
		margin-top: 0.5rem;
	}

	.main-svg {
		display: block;
		width: calc(var(--diagram-width) + 0.1 * var(--diagram-width) / var(--connection-count));
		height: calc(1.3 * var(--diagram-height));
		margin: calc(-0.2 * var(--diagram-height))
			calc(-0.05 * var(--diagram-width) / var(--connection-count))
			calc(-0.1 * var(--diagram-height));
	}
</style>
