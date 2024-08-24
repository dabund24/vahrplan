<script lang="ts">
	import SlidingLine from "$lib/components/SlidingLine.svelte";

	export let names: string[];
	export let selected: number;
</script>

<div class="flex-column">
	<ul class="hoverable--visible--group">
		{#each names as name, i}
			<li>
				<button type="button" on:click={() => void (selected = i)}>
					{name}
				</button>
			</li>
		{/each}
	</ul>
	<div class="line-container">
		<SlidingLine amountOfPositions={names.length} bind:newPosition={selected} />
	</div>
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
	button {
		width: 100%;
	}
	.line-container {
		margin: 0 0.25rem;
	}
</style>
