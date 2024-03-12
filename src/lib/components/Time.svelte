<script lang="ts">
	import type { ParsedTime } from "$lib/types";

	export let time: ParsedTime;
	export let variableWidth = true;
</script>

<div class="time flex-column" style="--time-width: {variableWidth ? 'auto' : '4rem'}">
	<div class="text--{time.a.color}">
		{time.a.time}
	</div>
	{#if time.b !== undefined}
		<div class="text--{time.b.color}">
			{time.b.time}
		</div>
	{/if}
</div>

<style>
	.time {
		margin: auto 0;
		width: var(--time-width);
		font-variant-numeric: tabular-nums;
	}
</style>
