<script lang="ts">
	import type { SubJourneySvgData } from "$lib/server/svgData/svgData.server";
	import { toggleJourneySelection } from "$lib/state/selectedData.svelte";
	import { svgJourneyToPolylinePoints, formatSvgX, formatSvgY } from "./svgDiagramUtils";

	type Props = {
		journey: SubJourneySvgData;
		minTime: number;
		columnIndex: number;
		rowIndex: number;
	};

	const { journey, minTime, columnIndex, rowIndex }: Props = $props();

	const journeyCoords = $derived(svgJourneyToPolylinePoints(journey, minTime, columnIndex));

	const journeyId = $derived(`${columnIndex}-${rowIndex}`);

	function handleJourneyToggle(): void {
		toggleJourneySelection(columnIndex, rowIndex);
	}

	function handleJourneyButtonPress(e: KeyboardEvent): void {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleJourneyToggle();
		}
	}
</script>

<defs>
	<polyline
		id="svg-journey--{journeyId}"
		fill="none"
		points={journeyCoords}
		vector-effect="non-scaling-stroke"
	/>
</defs>
<mask id="svg-journey--{journeyId}__mask">
	<use href="#svg-journey--{journeyId}" stroke="white" stroke-width="calc(1rem + 4px)" />
	<use href="#svg-journey--{journeyId}" stroke="black" stroke-width="1rem" />
</mask>

<g
	class="svg-journey--hoverable"
	role="button"
	onclick={handleJourneyToggle}
	onkeydown={handleJourneyButtonPress}
	tabindex="0"
	stroke="transparent"
>
	<use href="#svg-journey--{journeyId}" stroke-width="calc(1rem + 4px)" />
	<use
		href="#svg-journey--{journeyId}"
		stroke-width="calc(1rem + 4px)"
		mask="url(#svg-journey--{journeyId}__mask)"
	/>
</g>

{#each journey.blocks as block}
	{#if block.type === "leg"}
		<polyline
			class="svg-line stroke--product product--{block.product}"
			points="{formatSvgX(block.start[0], columnIndex)},{formatSvgY(
				block.start[1],
				minTime
			)} {formatSvgX(block.end[0], columnIndex)},{formatSvgY(block.end[1], minTime)}"
			vector-effect="non-scaling-stroke"
		/>
	{:else if block.type === "transfer"}
		<polyline
			class="svg-line"
			points="{formatSvgX(block.start[0], columnIndex)},{formatSvgY(
				block.start[1],
				minTime
			)} {formatSvgX(block.end[0], columnIndex)},{formatSvgY(block.end[1], minTime)}"
			stroke="var(--foreground-color)"
			stroke-dasharray="2 4"
			vector-effect="non-scaling-stroke"
		/>
	{/if}
{/each}

<style>
	.svg-line {
		pointer-events: none;
	}
	.svg-journey--hoverable:hover {
		cursor: pointer;
	}
	.svg-journey--hoverable:where(:focus-visible, :focus, :active) {
		outline: none;
	}
	.svg-journey--hoverable:where(:hover, :focus-visible) {
		stroke: var(--foreground-color--transparent);
	}
</style>
