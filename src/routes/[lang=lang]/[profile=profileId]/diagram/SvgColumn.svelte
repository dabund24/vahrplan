<script lang="ts">
	import type { BlockSvgData, SvgData } from "$lib/server/svgData/svgData.server";
	import SvgSubJourney from "./SvgSubJourney.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte.js";
	import type { DiagramData } from "$lib/state/diagramData.svelte.js";

	type Props = {
		columnData: SvgData["columns"][number];
		minTime: number;
		yMin: number;
		ySize: number;
		columnIndex: number;
		isNewColumn: DiagramData["isNew"][number];
	};

	const { columnData, minTime, yMin, ySize, columnIndex, isNewColumn }: Props = $props();

	const { selectedJourneys } = $derived(getSelectedData());

	const selectedJourneyTransfers: BlockSvgData[] = $derived.by(() => {
		const rowIndex = selectedJourneys[columnIndex];
		if ((rowIndex ?? -1) === -1) {
			return [];
		}
		return columnData.subJourneys[rowIndex].blocks.filter(
			(block) => block.type === "transfer" && block.transferPosition === "middle"
		);
	});
</script>

{#each selectedJourneyTransfers as { start: [x, _] }, i (i)}
	<polyline
		stroke="var(--foreground-color--transparent)"
		stroke-width="1"
		points="{x + columnIndex},{yMin} {x + columnIndex},{ySize}"
	/>
{/each}
{#each columnData.subJourneys as journey, rowIndex (rowIndex)}
	<SvgSubJourney {journey} {minTime} {columnIndex} {rowIndex} isNew={isNewColumn[rowIndex]} />
{/each}
