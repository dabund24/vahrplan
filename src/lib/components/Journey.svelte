<script lang="ts">
	import type { JourneyBlock } from "$lib/types.js";
	import LegRegular from '$lib/components/LegRegular.svelte';
	import Walk from '$lib/components/Walk.svelte';

	export let blocks: JourneyBlock[];
</script>

{#each blocks as block}
	{#if block.type === "leg"}
		<LegRegular {block} />
	{:else if block.type === "walk" || block.type === "transfer"}
		<Walk {block} />
	{/if}
{/each}