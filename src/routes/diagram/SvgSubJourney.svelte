<script lang="ts">
	import type { SubJourneySvgData, SvgPosition } from "$lib/server/svgData/svgData.server";
	import { toggleJourneySelection } from "$lib/state/selectedData.svelte";
	import { svgJourneyToPolylinePoints, svgBlockToPolylinePoints } from "./svgDiagramUtils";

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

{#each journey.blocks as block}
	{@const points = `${svgBlockToPolylinePoints(block, columnIndex, minTime)}`}
	{#if block.type === "leg"}
		<polyline
			class="svg-line stroke--product product--{block.product}"
			class:cancelled={block.isCancelled}
			{points}
		/>
	{:else if block.type === "transfer"}
		<polyline
			class="svg-line"
			{points}
			stroke="var(--foreground-color)"
			stroke-dasharray="0 4"
		/>
	{/if}
{/each}

{#each journey.blocks as block, blockIndex}
	{#if block.type === "leg"}
		{#snippet locationCircle(position: SvgPosition, idComponent: string)}
			{@const id = `svg-journey--${journeyId}-${blockIndex}__location-circle__${idComponent}`}
			<defs>
				<line
					{id}
					x1={position[0] + columnIndex}
					x2={position[0] + columnIndex}
					y1={position[1] - minTime}
					y2={position[1] - minTime + 0.01}
					vector-effect="non-scaling-stroke"
				/>
			</defs>
			<use href="#{id}" class="stroke--product product--{block.product}" stroke-width="6" />
			<use href="#{id}" stroke="var(--background-color)" stroke-width="4" />
			<use href="#{id}" class="stroke--product product--{block.product}" stroke-width="2" />
		{/snippet}
		{@render locationCircle(block.start, "0")}
		{@render locationCircle(block.end, "1")}
	{/if}
{/each}

<defs>
	<polyline
		id="svg-journey--{journeyId}"
		class="svg-journey-polyline-def"
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

<style>
	.svg-line {
		pointer-events: none;
	}
	.cancelled {
		stroke-dasharray: 6 9;
		opacity: 0.5;
	}
	.svg-journey-polyline-def {
		transition: none;
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
