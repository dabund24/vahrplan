<script lang="ts">
	import type { FillerBlock } from "$lib/types";

	export let type: FillerBlock["type"];
	export let smallIcon: boolean = false;
</script>

<svg width="16" height={smallIcon ? 20 : 32} xmlns="http://www.w3.org/2000/svg">
	<g stroke="var(--foreground-color)" stroke-linecap="round" stroke-linejoin="round">
		{#if type === "transfer"}
			<line x1="8" y1="2" x2="8" y2="30" stroke-width="4" />
		{:else if type === "walk"}
			<line
				x1="8"
				y1="2"
				x2="8"
				y2={smallIcon ? 18 : 30}
				stroke-width="4"
				stroke-dasharray="4 8"
			/>
		{:else if type === "onward-journey" && !smallIcon}
			<polyline points="8,2 8,8 4,12 12,20 8,24 8,30" stroke-width="3" fill="none" />
		{:else if type === "onward-journey"}
			<polyline points="8,2 8,5 6,7 10,13 8,15 8,18" stroke-width="3" fill="none" />
		{:else if type === "unselected"}
			<line x1="8" y1="2" x2="8" y2="6" stroke-width="4" />
			<polyline points="2,6 2,12 14,12 14,6" stroke-width="3" fill="none" />
			<polyline points="2,26 2,20 14,20 14,26" stroke-width="3" fill="none" />
			<line x1="8" y1="26" x2="8" y2="30" stroke-width="4" />
		{/if}
	</g>
</svg>
