<script lang="ts">
	import { flip } from "svelte/animate";
	import { scale } from "svelte/transition";
	import LegRegular from "$lib/components/journeys/LegRegular.svelte";
	import Filler from "$lib/components/journeys/Filler.svelte";
	import Location from "$lib/components/journeys/Location.svelte";
	import { displayedJourneys } from "$lib/stores";
</script>

<div class="journeys-container">
	{#each $displayedJourneys as journey (journey.key)}
		<div transition:scale animate:flip={{ duration: 400 }}>
			{#each journey.value as block}
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
</div>

<style>
	.journeys-container {
		padding: 0.5rem 1rem;
		max-width: 30rem;
		margin: auto;
	}
</style>
