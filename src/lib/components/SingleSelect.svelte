<script lang="ts">
	import SlidingLine from "$lib/components/SlidingLine.svelte";

	export let names: string[];
	export let selected: number;
</script>

<div class="flex-column">
	<ul>
		{#each names as name, i}
			<li>
				<button type="button" class="hoverable" on:click={() => void (selected = i)}>
					{name}
				</button>
			</li>
		{/each}
	</ul>
	<SlidingLine amountOfPositions={names.length} bind:newPosition={selected} />
</div>

<style>
	ul {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
	}
	li {
        width: 100%;
	}
	.hoverable {
        padding: .5rem;
	}
</style>