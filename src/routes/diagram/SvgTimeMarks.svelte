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
	{#each timeMarks as { content, topInsetPercent }}
		<div class="time-mark" style:top="{topInsetPercent}%">
			{content}
		</div>
	{/each}
</div>

<style>
	.time-marks {
		position: sticky;
		pointer-events: none;
		left: 0;
	}

	.time-mark {
		position: absolute;
		left: 50%;
		translate: -50% -50%;
		background-color: var(--background-color--transparent);
	}

	.time-mark,
	.now-mark {
		white-space: nowrap;
		font-size: 0.8rem;
		border-radius: 50vh;
		margin: auto;
		text-align: center;
		pointer-events: auto;
	}

	.now-mark {
		padding: 0 var(--line-width);
		font-weight: bold;
		background-color: var(--accent-color);
		color: var(--background-color);
	}
</style>
