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

	$inspect(selectedJourneyCoords);
</script>

<svg class="main-svg" viewBox="0 0 {columns.length} {maxTime - minTime}" preserveAspectRatio="none">
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
			<SvgColumn columnData={column} {minTime} {columnIndex} />
		{/each}
	</g>
</svg>

<style>
	.main-svg {
		width: var(--diagram-width);
		height: 50rem;
	}
</style>
