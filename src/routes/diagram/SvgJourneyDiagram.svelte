<script lang="ts">
	import type { SvgData } from "$lib/server/svgData/svgData.server";
	import SvgColumn from "./SvgColumn.svelte";

	type Props = {
		svgData: SvgData;
	};

	const { svgData }: Props = $props();
	const { columns, minTime, maxTime, timeMarkInterval, firstTimeMark } = $derived(svgData);
</script>

<svg class="main-svg" viewBox="0 0 {columns.length} {maxTime - minTime}" preserveAspectRatio="none">
	<g class="svg__inner-wrapper" stroke-linecap="round" stroke-width="2">
		{#each columns as column, columnIndex}
			<SvgColumn columnData={column} {minTime} {columnIndex} />
		{/each}
	</g>
</svg>

<style>
	.main-svg {
		width: var(--diagram-width);
		height: 20rem;
	}
</style>
