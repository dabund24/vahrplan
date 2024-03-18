<script lang="ts">
	import type { FillerBlock } from "$lib/types";

	export let type: FillerBlock["type"];
</script>

<svg width="16" height="32" xmlns="http://www.w3.org/2000/svg">
	<g stroke="var(--foreground-color)" stroke-linecap="round" stroke-linejoin="round">
		{#if type === "transfer"}
			<circle
				r="3.5"
				cx="8"
				cy="16"
				stroke="var(--foreground-color)"
				fill="var(--background-color)"
				stroke-width="3"
			/>
		{:else if type === "walk"}
			<line x1="8" y1="2" x2="8" y2="30" stroke-width="4" stroke-dasharray="4 8" />
		{:else if type === "unselected"}
			<line x1="8" y1="2" x2="8" y2="6" stroke-width="4" />
			<polyline points="2,6 2,12 14,12 14,6" stroke-width="3" fill="none" />
			<polyline points="2,26 2,20 14,20 14,26" stroke-width="3" fill="none" />
			<line x1="8" y1="26" x2="8" y2="30" stroke-width="4" />
		{/if}
	</g>
</svg>
