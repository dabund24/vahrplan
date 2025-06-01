<script lang="ts">
	import SvgTimeMarks from "./SvgTimeMarks.svelte";
	import SvgNowLine from "./SvgNowLine.svelte";
	import { onDestroy, onMount, type Snippet } from "svelte";
	import { type TimeMark } from "./svgDiagramUtils";

	type Props = {
		children: Snippet<[number, number]>;
		columnCount: number;
		minTime: number;
		maxTime: number;
		timeMarks: TimeMark[];
		minutesPerHeight: number;
	};

	const { children, columnCount, maxTime, minTime, timeMarks, minutesPerHeight }: Props =
		$props();

	let svgElement: SVGSVGElement;

	onMount(() => document.addEventListener("visibilitychange", resetSvg));
	onDestroy(() => document.removeEventListener("visibilitychange", resetSvg));

	/**
	 * resets all animations
	 */
	function resetSvg(): void {
		if (document.visibilityState === "visible") {
			svgElement.setCurrentTime(0);
		}
	}

	const diagramBaseHeightRem = 22;
	const diagramTopBottomOffsetRem = 3.5;
	const diagramHeightOffsetRatio = diagramTopBottomOffsetRem / diagramBaseHeightRem;

	const diagramCoordinateRangeY = $derived(maxTime - minTime);
	const diagramScaleY = $derived(diagramCoordinateRangeY / minutesPerHeight);
	const yMin = $derived(-2 * diagramHeightOffsetRatio * minutesPerHeight);
	const ySize = $derived(
		diagramCoordinateRangeY + 3 * diagramHeightOffsetRatio * minutesPerHeight
	);
</script>

<div
	class="svg-container"
	style:--diagram--top-bottom-offset--rem={diagramTopBottomOffsetRem}
	style:--diagram-height="calc((1rem * var(--diagram--top-bottom-offset--rem) /
	{diagramHeightOffsetRatio}) * {diagramScaleY})"
>
	<SvgTimeMarks {timeMarks} {minTime} {maxTime} />
	<svg
		class="main-svg"
		viewBox="-0.05 {yMin} {columnCount + 0.1} {ySize}"
		preserveAspectRatio="none"
		bind:this={svgElement}
	>
		<SvgNowLine {minTime} {maxTime} {columnCount} />
		{#each timeMarks as { yCoordinate }}
			<line
				x1="0"
				x2={columnCount}
				y1={yCoordinate}
				y2={yCoordinate}
				stroke="var(--foreground-color--transparent)"
				stroke-width="1"
			/>
		{/each}

		<g
			class="svg__inner-wrapper"
			stroke-linecap="round"
			fill="none"
			stroke-linejoin="round"
			stroke-width="2"
		>
			{@render children(yMin, ySize)}
		</g>
	</svg>
	<SvgTimeMarks {timeMarks} {minTime} {maxTime} />
</div>

<style>
	.svg-container {
		display: grid;
		width: calc(var(--diagram-width) + 2 * var(--diagram--beginning-end-offset));
		grid-template-columns: var(--diagram--beginning-end-offset) var(--diagram-width) var(
				--diagram--beginning-end-offset
			);
		overflow-x: visible;
		margin-top: 0.5rem;
		> :global(:first-child) {
			translate: calc(-1 * var(--line-width));
		}
		> :global(:last-child) {
			translate: var(--line-width);
		}
	}

	.main-svg {
		display: block;
		width: calc(var(--diagram-width) + 0.1 * var(--diagram-width) / var(--connection-count));
		height: calc(var(--diagram-height) + (3rem * var(--diagram--top-bottom-offset--rem)));
		margin: calc(-2rem * var(--diagram--top-bottom-offset--rem))
			calc(-0.05 * var(--diagram-width) / var(--connection-count))
			calc(-1rem * var(--diagram--top-bottom-offset--rem));
	}
</style>
