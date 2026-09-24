<script lang="ts">
	import type { TimeMark } from "./svgDiagramUtils";
	import ProgressIndicator from "$lib/components/ProgressIndicator.svelte";
	import { MINUTE_IN_MS } from "$lib/constants";

	type Props = { timeMarks: TimeMark[]; minTime: number; maxTime: number };

	const { timeMarks, minTime, maxTime }: Props = $props();
</script>

<div class="time-marks">
	<ProgressIndicator
		departureTime={minTime * MINUTE_IN_MS}
		arrivalTime={maxTime * MINUTE_IN_MS}
		orientation="vertical"
	>
		<div class="now-mark">jetzt</div>
	</ProgressIndicator>
	{#each timeMarks as { content, newDateContent, topInsetPercent } (topInsetPercent)}
		<div class="skeleton-text time-mark" style:top="{topInsetPercent}%">
			{#if newDateContent !== undefined}
				<span class="new-date"><span class="centering-dot">.</span>{newDateContent}</span>
			{/if}
			<div class="time-mark-content">
				{content}
			</div>
		</div>
	{/each}
</div>

<style>
	.time-marks {
		position: sticky;
		pointer-events: none;
		left: 0;
		font-variant-numeric: tabular-nums;
	}

	.time-mark {
		position: absolute;
		left: 50%;
		translate: -50% -50%;
	}

	.time-mark-content {
		background-color: var(--background-color--transparent);
		border-radius: 50vh;
		margin: auto;
	}

	.time-mark,
	.now-mark {
		white-space: nowrap;
		font-size: 0.8rem;
		margin: auto;
		text-align: center;
		pointer-events: auto;
	}

	.now-mark {
		padding: 0 var(--line-width);
		border-radius: 50vh;
		font-weight: bold;
		background-color: var(--accent-color);
		color: var(--background-color);
	}

	.new-date {
		padding: 0 calc(0.5 * var(--line-width));
		background-color: var(--background-color--transparent);
		background-image: linear-gradient(
			var(--foreground-color--transparent),
			var(--foreground-color--transparent)
		);
		border-radius: 50vh;
	}

	.centering-dot {
		visibility: hidden;
	}
</style>
