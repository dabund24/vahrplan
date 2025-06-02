<script lang="ts">
	import type { TreeNode } from "$lib/types";
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import JourneyDiagramElement from "./JourneyDiagramElement.svelte";
	import type { JourneyNodesWithRefs } from "$lib/server/journey-data/JourneyDataService";
	import type { DiagramData } from "$lib/state/diagramData.svelte.js";

	type Props = {
		columns: JourneyNodesWithRefs[];
		nodes: TreeNode[];
		isNew: DiagramData["isNew"];
	};

	let { columns, nodes, isNew }: Props = $props();
</script>

<div class="flex-column diagram-column">
	{#each nodes as node, i (i)}
		<div class="flex-row diagram-box">
			{#if node.type === "journeyNode"}
				{@const subJourney = columns[node.columnIndex].journeys[node.rowIndex]}
				{@const isNewElement = isNew[node.columnIndex][node.rowIndex]}
				<JourneyDiagramElement
					{subJourney}
					columnIndex={node.columnIndex}
					rowIndex={node.rowIndex}
					isNew={isNewElement}
				/>
			{:else}
				<div class="empty-node"></div>
			{/if}
			<JourneyDiagram {columns} nodes={node.children} {isNew} />
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
