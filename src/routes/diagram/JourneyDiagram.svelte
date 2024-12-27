<script lang="ts">
	import type { TreeNode } from "$lib/types";
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import JourneyDiagramElement from "./JourneyDiagramElement.svelte";

	type Props = {
		nodes: TreeNode[];
	};

	let { nodes }: Props = $props();
</script>

<div class="flex-column diagram-column">
	{#each nodes as node}
		<div class="flex-row diagram-box">
			{#if node.type === "journeyNode"}
				<JourneyDiagramElement
					subJourney={node.subJourney}
					depth={node.depth}
					index={node.idInDepth}
				/>
			{:else}
				<div class="empty-node"></div>
			{/if}
			<JourneyDiagram nodes={node.children} />
		</div>
	{/each}
</div>

<style>
	.empty-node {
		width: var(--connection-width);
	}
	.empty-node + :global(.diagram-column .diagram-element) {
		opacity: 0.5;
	}
</style>
