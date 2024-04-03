<script lang="ts">
	import type { JourneyNode } from "$lib/types";
	import JourneyDiagramElement from "./JourneyDiagramElement.svelte";

	export let nodes: JourneyNode[];
</script>

<div class="flex-column">
	{#each nodes as node}
		<div class="flex-row">
			<JourneyDiagramElement
				blocks={node.blocks}
				depth={node.depth}
				index={node.idInDepth}
				refreshToken={node.refreshToken}
				departure={node.departure}
				arrival={node.arrival}
			/>
			<svelte:self nodes={node.children} />
		</div>
	{/each}
</div>

<style>
	
</style>
