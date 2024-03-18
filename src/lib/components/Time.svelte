<script lang="ts">
	import type { ParsedTime } from "$lib/types";
	import { timeToString } from "$lib/util.js";

	export let time: ParsedTime;
	export let variableWidth = true;
</script>

<div class="time flex-column" style="--time-width: {variableWidth ? 'auto' : '4rem'}">
	{#if time.a !== undefined}
		<div class="text--{time.a.color}">
			{timeToString(time.a.time)}
		</div>
	{/if}
	{#if time.b !== undefined}
		<div class="text--{time.b.color}">
			{timeToString(time.b.time)}
		</div>
	{/if}
	<div class="width-setter">00:00</div>
</div>

<style>
	.time {
		margin: auto 0;
		width: var(--time-width);
		font-variant-numeric: tabular-nums;
	}
    .width-setter {
        visibility: hidden;
        height: 0;
    }
</style>
