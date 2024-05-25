<script lang="ts">
	import type { TreeNode } from "$lib/types";
	import JourneyDiagramElement from "./JourneyDiagramElement.svelte";

	export let nodes: TreeNode[];
</script>

<div class="flex-column diagram-column">
	{#each nodes as node}
		<div class="flex-row diagram-box">
			{#if node.type === "treeNode"}
				<JourneyDiagramElement
					blocks={node.blocks}
					depth={node.depth}
					index={node.idInDepth}
					refreshToken={node.refreshToken}
					departure={node.departure}
					arrival={node.arrival}
				/>
			{:else}
				<div class="empty-node"></div>
			{/if}
			<svelte:self nodes={node.children} />
		</div>
	{/each}
</div>

<style>
	.empty-node {
		width: var(--connection-width);
	}
	.empty-node + :global(.diagram-column .diagram-element) {
        opacity: .5;
	}
</style>
