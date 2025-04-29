<script lang="ts">
	import type { SvgData } from "$lib/server/svgData/svgData.server";
	import SvgColumn from "./SvgColumn.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte";
	import { svgJourneyToPolylinePoints, timeMarkIt } from "./svgDiagramUtils";
	import SvgNowLine from "./SvgNowLine.svelte";
	import SvgDiagramWrapper from "./SvgDiagramWrapper.svelte";

	type Props = {
		svgData: SvgData;
	};

	const { svgData }: Props = $props();
	const { columns, minTime, maxTime, minutesPerHeight, timeMarksData } = $derived(svgData);

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

<SvgDiagramWrapper columnCount={columns.length} {minTime} {maxTime} {timeMarks} {minutesPerHeight}>
	{#snippet children(yMin: number, ySize: number)}
		<SvgNowLine {minTime} {maxTime} columnCount={columns.length} />
		<g stroke-linecap="round" fill="none" stroke-linejoin="round" stroke-width="2">
			{#each selectedJourneyCoords as subJourneyCoords}
				<polyline
					points={subJourneyCoords}
					stroke="var(--accent-color)"
					stroke-width="1rem"
					opacity="0.3"
				/>
			{/each}

			{#each columns as column, columnIndex}
				<SvgColumn columnData={column} {minTime} {yMin} {ySize} {columnIndex} />
			{/each}
		</g>
	{/snippet}
</SvgDiagramWrapper>
