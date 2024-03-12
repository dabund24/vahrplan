<script lang="ts">
	import LegRegular from "$lib/components/LegRegular.svelte";
	import Walk from "$lib/components/Walk.svelte";
	import { selectedJourneys } from '$lib/stores';
	//export let data: PageData;
</script>

{#each $selectedJourneys.flatMap(journey => journey.blocks) as block}
	{#if block.type === "leg"}
		<LegRegular {block} />
	{:else if block.type === "walk" || block.type === "transfer"}
		<Walk {block} />
	{/if}
{/each}

<style>
</style>
