<script lang="ts">
	import type { SubJourneySvgData } from "$lib/server/svgData/svgData.server";

	type Props = { journey: SubJourneySvgData; minTime: number; columnIndex: number };

	const { journey, minTime, columnIndex }: Props = $props();
</script>

{#each journey.blocks as block}
	{#if block.type === "leg"}
		<polyline
			points="{block.start[0] + columnIndex},{block.start[1] - minTime} {block.end[0] +
				columnIndex},{block.end[1] - minTime}"
			class="stroke--product product--{block.product}"
			vector-effect="non-scaling-stroke"
		/>
	{:else if block.type === "transfer"}
		<polyline
			points="{block.start[0]},{block.start[1] - minTime} {block.end[0]},{block.end[1] -
				minTime}"
			stroke="var(--foreground-color)"
			stroke-dasharray="4 8"
			vector-effect="non-scaling-stroke"
		/>
	{/if}
{/each}
