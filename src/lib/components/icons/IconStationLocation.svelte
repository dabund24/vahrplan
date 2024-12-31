<script lang="ts">
	import type { ParsedLocation } from "$lib/types";
	import { draw } from "svelte/transition";

	type Props = {
		color: "product" | "foreground" | "accent";
		iconType: ParsedLocation["type"];
		isSmallIcon?: boolean;
		secondaryProduct?: string;
		isCancelled?: boolean;
	};

	let {
		color,
		iconType,
		isSmallIcon = false,
		secondaryProduct = undefined,
		isCancelled = false
	}: Props = $props();
</script>

<svg width="16" height="16" class="skeleton-text station-icon">
	{#if iconType === "station" && !isSmallIcon && secondaryProduct === undefined}
		<circle
			cx="8"
			cy="8"
			r="6.5"
			stroke="var(--{color}-color)"
			stroke-width="3"
			fill="var(--background-color)"
			in:draw
		/>
		<circle cx="8" cy="8" r="2" fill="var(--{color}-color)" />
	{:else if iconType === "station" && !isSmallIcon && secondaryProduct !== undefined}
		<path d="M 0 8 A 8 8 0 0 1 16 8" fill="var(--product-color)" />
		<path
			d="M 0 8 A 8 8 0 0 0 16 8"
			fill="var(--product-color)"
			class="product--{secondaryProduct}"
		/>
		<circle
			cx="8"
			cy="8"
			r="3.5"
			fill="transparent"
			stroke="var(--background-color)"
			stroke-width="3"
		/>
	{:else if iconType === "station" && isSmallIcon}
		<circle
			cx="8"
			cy="8"
			r="4.5"
			stroke="var(--{color}-color)"
			stroke-width="3"
			fill="var(--background-color)"
			in:draw
		/>
	{:else if iconType === "poi"}
		<polyline
			points="8,2.25 14.5,13.5 1.5,13.5 8,2.25"
			stroke="var(--{color}-color)"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="var(--background-color)"
			in:draw
		/>
	{:else if iconType === "address"}
		<polyline
			points="2,2 14,2 14,14 2,14 2,2"
			stroke="var(--{color}-color)"
			stroke-width="3"
			stroke-linecap="round"
			stroke-linejoin="round"
			fill="var(--background-color)"
			in:draw
		/>
	{:else}
		<g stroke="var(--{color}-color)" stroke-width="4" stroke-linecap="round">
			<line x1="2" y1="2" x2="14" y2="14" />
			<line x1="2" y1="14" x2="14" y2="2" />
		</g>
		<circle
			r="4"
			cx="8"
			cy="8"
			stroke="var(--{color}-color)"
			stroke-width="3"
			fill="var(--background-color)"
			in:draw
		/>
	{/if}
	{#if isCancelled}
		<g stroke="var(--accent--red)" stroke-width="3" stroke-linecap="round">
			<line x1="2" y1="2" x2="14" y2="14" />
			<line x1="2" y1="14" x2="14" y2="2" />
		</g>
	{/if}
</svg>

<style>
	svg {
		flex-shrink: 0;
		z-index: 1;
	}
	:global(.skeleton) svg {
		--background-color: transparent;
		--foreground-color: transparent;
		--accent-color: transparent;
	}
</style>
