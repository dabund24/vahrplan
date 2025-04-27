<script lang="ts">
	import { MINUTE_IN_MS, MINUTE_IN_SECONDS } from "$lib/constants";
	import { onDestroy, onMount } from "svelte";

	type Props = { minTime: number; maxTime: number; columnCount: number };

	let { minTime, maxTime, columnCount }: Props = $props();

	let animationOffset = $derived(minTime * MINUTE_IN_MS - new Date().getTime());
	let animationDuration = $derived((maxTime - minTime) * MINUTE_IN_SECONDS);

	onMount(() => document.addEventListener("visibilitychange", synchronizeAnimation));
	onDestroy(() => document.removeEventListener("visibilitychange", synchronizeAnimation));

	/**
	 * synchronizes the progress animation
	 */
	function synchronizeAnimation(): void {
		if (document.visibilityState === "visible") {
			minTime = minTime + 1;
			minTime = minTime - 1;
		}
	}
</script>

<line
	x1="-{columnCount + 1}.05"
	x2="-0.95"
	y1="0"
	y2="0"
	stroke="var(--accent-color)"
	stroke-width="1"
	vector-effect="non-scaling-stroke"
>
	<animateMotion
		begin="{animationOffset}ms"
		dur="{animationDuration}s"
		path="M {columnCount + 1},0 v {maxTime - minTime}"
	/>
</line>
