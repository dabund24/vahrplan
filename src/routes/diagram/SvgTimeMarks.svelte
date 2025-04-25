<script lang="ts">
	import type { TimeMark } from "./svgDiagramUtils";

	type Props = { timeMarks: TimeMark[] };

	const { timeMarks }: Props = $props();
</script>

<div class="time-marks">
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
		font-size: 0.8rem;
		border-radius: 50vh;
		background-color: var(--background-color--transparent);
	}
</style>
