<script lang="ts">
	import SlidingLine from "$lib/components/SlidingLine.svelte";
	import type { Snippet } from "svelte";

	type Props = { selected: number } & (
		| {
				type: "text";
				titles: { title: string }[];
		  }
		| {
				type: "icon";
				titles: { title: string; icon: Snippet }[];
		  }
	);

	let { type, titles, selected = $bindable() }: Props = $props();
</script>

<div class="flex-column">
	<ul class="hoverable--visible--group">
		{#each titles as title, i}
			<li>
				<button type="button" title={title.title} onclick={() => void (selected = i)}>
					{#if type === "icon"}
						{@render title.icon()}
					{:else}
						{title.title}
					{/if}
				</button>
			</li>
		{/each}
	</ul>
	<div class="line-container">
		<SlidingLine
			amountOfPositions={titles.length}
			bind:newPosition={selected}
			isShort={type === "icon"}
		/>
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
