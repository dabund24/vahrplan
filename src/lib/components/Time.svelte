<script lang="ts">
	import type { ParsedTime } from "$lib/types";
	import { timeToString } from "$lib/util.js";

	export let time: ParsedTime;
	export let variableWidth = true;

	const arrivalTag = time.arrival?.status === "cancelled" ? "s" : "div"
	const departureTag = time.departure?.status === "cancelled" ? "s" : "div"
</script>

<div class="time flex-column" style="--time-width: {variableWidth ? 'auto' : '4rem'}">
	{#if time.arrival !== undefined}
		<svelte:element this={arrivalTag} class="text--{time.arrival?.status} skeleton-text">
			{time.arrival === null ? "−−:−−" : timeToString(time.arrival?.time)}
		</svelte:element>
	{/if}
	{#if time.departure !== undefined}
		<svelte:element this={departureTag} class="text--{time.departure?.status} skeleton-text">
			{time.departure === null ? "−−:−−" : timeToString(time.departure.time)}
		</svelte:element>
	{/if}
	<div class="width-setter" aria-hidden="true">00:00</div>
</div>

<style>
	.time {
		margin: auto 0;
		width: var(--time-width);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
    .width-setter {
        visibility: hidden;
        height: 0;
    }
</style>
