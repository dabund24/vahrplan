<script lang="ts">
	import type { BlockSvgData, SvgData } from "$lib/server/svgData/svgData.server";
	import SvgSubJourney from "./SvgSubJourney.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte";

	type Props = {
		columnData: SvgData["columns"][number];
		minTime: number;
		yMin: number;
		ySize: number;
		columnIndex: number;
	};

	const { columnData, minTime, yMin, ySize, columnIndex }: Props = $props();

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

{#each selectedJourneyTransfers as { start: [x, _] }}
	<polyline
		stroke="var(--foreground-color--transparent)"
		stroke-width="1"
		vector-effect="non-scaling-stroke"
		points="{x + columnIndex},{yMin} {x + columnIndex},{ySize}"
	/>
{/each}
{#each columnData.subJourneys as journey, rowIndex}
	<SvgSubJourney {journey} {minTime} {columnIndex} {rowIndex} />
{/each}
