<script lang="ts">
	import { flip } from "svelte/animate";
	import { scale } from "svelte/transition";
	import LegRegular from "$lib/components/LegRegular.svelte";
	import Filler from "$lib/components/Filler.svelte";
	import Location from "$lib/components/Location.svelte";
	import { displayedJourneys } from "$lib/stores";

</script>

{#each $displayedJourneys as journey (journey.key)}
	<div transition:scale animate:flip={{ duration: 200}}>
		{#each journey.blocks as block}
			{#if block.type === "leg"}
				<LegRegular {block} />
			{:else if block.type === "walk" || block.type === "transfer" || block.type === "unselected"}
				<Filler {block} />
			{:else if block.type === "location" && !block.hidden}
				<Location {block} />
			{/if}
		{/each}
	</div>
{/each}
