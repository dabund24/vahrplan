<script lang="ts">
	import SvgDiagramWrapper from "./SvgDiagramWrapper.svelte";
	import type { TimeMark } from "./svgDiagramUtils";

	type Props = {
		columnCount: number;
	};

	const { columnCount }: Props = $props();

	const maxTime = $derived(1 + 0.5 * (columnCount - 1)); // maxTime and diagramHeight are the same
	const minutesPerHeight = $derived(1);
	const timeMarks: TimeMark[] = $derived(
		Array.from({ length: maxTime * 8 }, (_, i) => ({
			topInsetPercent: (100 * i) / (8 * maxTime),
			yCoordinate: i / 8,
			content: "00:00"
		}))
	);
</script>

<div class="skeleton">
	<SvgDiagramWrapper {columnCount} minTime={0} {maxTime} {timeMarks} {minutesPerHeight}>
		{#each { length: columnCount } as _, columnIndex}
			{#each { length: 6 } as _}
				{@const y1 = Math.random() * 0.7 + 0.5 * columnIndex}
				{@const y2 = y1 + 0.1 + Math.random() * (1 + 0.5 * columnIndex - y1)}
				<g class="skeleton-stroke" stroke-width="2">
					<line x1={columnIndex} x2={columnIndex + 1} {y1} {y2} />
				</g>
			{/each}
		{/each}
	</SvgDiagramWrapper>
</div>
