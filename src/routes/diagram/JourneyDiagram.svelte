<script lang="ts">
	import type { TreeNode } from "$lib/types";
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import JourneyDiagramElement from "./JourneyDiagramElement.svelte";
	import type { JourneyNodesWithRefs } from "$lib/server/journeyData/JourneyDataService";

	type Props = {
		columns: JourneyNodesWithRefs[];
		nodes: TreeNode[];
	};

	let { columns, nodes }: Props = $props();
</script>

<div class="flex-column diagram-column">
	{#each nodes as node}
		<div class="flex-row diagram-box">
			{#if node.type === "journeyNode"}
				{@const subJourney = columns[node.columnIndex].journeys[node.rowIndex]}
				<JourneyDiagramElement
					{subJourney}
					columnIndex={node.columnIndex}
					rowIndex={node.rowIndex}
				/>
			{:else}
				<div class="empty-node"></div>
			{/if}
			<JourneyDiagram {columns} nodes={node.children} />
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
