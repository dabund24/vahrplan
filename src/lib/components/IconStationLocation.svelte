<script lang="ts">
	import type { ParsedLocation } from "$lib/types";
	import { draw } from 'svelte/transition';

	export let color: "product" | "foreground" | "accent";
	export let iconType: ParsedLocation["type"];
	export let smallIcon = false;
</script>

{#if iconType === "station" && !smallIcon}
	<svg
		width="16"
		height="16"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="8"
			cy="8"
			r="6.5"
			stroke="var(--{color}-color)"
			stroke-width="3"
			fill="var(--background-color)"
			transition:draw
		/>
		<circle cx="8" cy="8" r="2" fill="var(--{color}-color)" />
	</svg>
{:else if iconType === "station"}
	<svg
		width="16"
		height="16"
		viewBox="-2 -2 16 16"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="6"
			cy="6"
			r="4.5"
			stroke="var(--{color}-color)"
			stroke-width="3"
			fill="var(--background-color)"
		/>
	</svg>
{:else if iconType === "poi"}
	<svg
		width="16"
		height="16"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polyline
			points="1.5,13.5 14.5,13.5 8,2.25 1.5,13.5"
			stroke="var(--{color}-color)"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="var(--background-color)"
		/>
	</svg>
{:else}
	<svg
		width="16"
		height="16"
		xmlns="http://www.w3.org/2000/svg"
	>
		<polyline
			points="2,2 2,14 14,14 14,2 2,2"
			stroke="var(--{color}-color)"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="var(--background-color)"
		/>
	</svg>
{/if}

<style>
	svg {
		flex-shrink: 0;
        z-index: 1;
	}
</style>
