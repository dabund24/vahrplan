<script lang="ts">
	import type { SubJourneySvgData } from "$lib/server/svgData/svgData.server";
	import { toggleJourneySelection } from "$lib/state/selectedData.svelte";

	type Props = {
		journey: SubJourneySvgData;
		minTime: number;
		columnIndex: number;
		rowIndex: number;
	};

	const { journey, minTime, columnIndex, rowIndex }: Props = $props();

	const journeyCoords = $derived(
		journey.blocks.reduce(
			(acc, block) => `${acc} ${formatX(block.end[0])},${formatY(block.end[1])}`,
			`${formatX(journey.blocks[0].start[0])},${formatY(journey.blocks[0].start[1])}`
		)
	);

	const journeyId = $derived(`${columnIndex}-${rowIndex}`);

	function formatX(x: number): number {
		return x + columnIndex;
	}

	function formatY(y: number): number {
		return y - minTime;
	}

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
		stroke-linejoin="round"
		vector-effect="non-scaling-stroke"
	/>
</defs>
<mask id="svg-journey--{journeyId}__mask">
	<use href="#svg-journey--{journeyId}" stroke="white" stroke-width="calc(1rem + 4px)" />
	<use href="#svg-journey--{journeyId}" stroke="black" stroke-width="1rem" />
</mask>

<g class="svg-journey--hoverable hoverable" stroke="transparent">
	<use href="#svg-journey--{journeyId}" stroke-width="calc(1rem + 4px)" />
	<use
		role="button"
		onclick={handleJourneyToggle}
		onkeydown={handleJourneyButtonPress}
		tabindex="0"
		href="#svg-journey--{journeyId}"
		stroke-width="calc(1rem + 4px)"
		mask="url(#svg-journey--{journeyId}__mask)"
	/>
</g>

{#each journey.blocks as block}
	{#if block.type === "leg"}
		<polyline
			class="svg-line stroke--product product--{block.product}"
			points="{formatX(block.start[0])},{formatY(block.start[1])} {formatX(
				block.end[0]
			)},{formatY(block.end[1])}"
			vector-effect="non-scaling-stroke"
		/>
	{:else if block.type === "transfer"}
		<polyline
			class="svg-line"
			points="{formatX(block.start[0])},{formatY(block.start[1])} {formatX(
				block.end[0]
			)},{formatY(block.end[1])}"
			stroke="var(--foreground-color)"
			stroke-dasharray="4 8"
			vector-effect="non-scaling-stroke"
		/>
	{/if}
{/each}

<style>
	.svg-line {
		pointer-events: none;
	}
	.svg-journey--hoverable:where(:hover, :focus-within) {
		stroke: var(--foreground-color--transparent);
	}
</style>
