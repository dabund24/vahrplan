<script lang="ts">
	import type { SubJourney } from "$lib/types";
	import Time from "$lib/components/Time.svelte";
	import { getSelectedData, toggleJourneySelection } from "$lib/state/selectedData.svelte.js";

	type Props = {
		subJourney: SubJourney;
		isNew: boolean;
		columnIndex: number;
		rowIndex: number;
	};

	let { subJourney, isNew, columnIndex, rowIndex }: Props = $props();

	const selectedData = $derived(getSelectedData());

	let displayedBlocks = $derived(subJourney.blocks.filter((block) => block.type === "leg"));

	let isSelected = $derived(rowIndex === selectedData.selectedJourneys[columnIndex]);

	function handleDiagramElementClick(): void {
		toggleJourneySelection(columnIndex, rowIndex);
	}

	function getLegWidth(duration: number): number {
		return Math.log2(duration + 2);
	}
</script>

<button
	type="button"
	class="flex-row diagram-element hoverable"
	class:is-new={isNew}
	aria-current={isSelected}
	onclick={handleDiagramElementClick}
	title="Verbindung aus-/abwählen"
>
	<span class="time">
		<Time time={{ departure: subJourney.departureTime }} />
	</span>
	<span class="flex-row legs">
		{#each displayedBlocks as block (block.blockKey)}
			<svelte:element
				this={block.attribute === "cancelled" ? "s" : "span"}
				class="leg product--{block.product}"
				class:cancelled={block.attribute === "cancelled"}
				style="--duration: {getLegWidth(block.duration)}"
			>
				<span class="leg__name--long">{block.name}</span>
				<span class="leg__name--short">{block.productName}</span>
			</svelte:element>
		{/each}
	</span>
	<span class="time">
		<Time time={{ arrival: subJourney.arrivalTime }} />
	</span>
</button>

<style>
	.time {
		border-width: 1px calc(var(--line-width) / 2);
		border-color: transparent;
		border-style: solid;
		padding: 0 8px;
	}

	.diagram-element {
		width: calc(var(--connection-width) + 2 * var(--line-width));
		margin: 0 calc(-1 * var(--line-width));
		position: relative;
		height: fit-content;
		border-radius: 50vh;
		padding: var(--line-width) 0;
		text-align: center;
		align-items: stretch;
		transition: border-radius 0.4s;
		&[aria-current="true"] {
			border-color: var(--accent-color);
		}
		&.is-new {
			animation: 10s highlight-new-journey;
		}
	}

	@keyframes highlight-new-journey {
		0% {
			background-color: var(--foreground-color--transparent);
		}
		60% {
			background-color: var(--foreground-color--transparent);
		}
		100% {
			background-color: transparent;
		}
	}

	:global(
			.diagram-box:has(
				> .diagram-column > :first-child > .diagram-element[aria-current="true"]
			)
		)
		> .diagram-element[aria-current="true"] {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right-color: transparent;
	}

	:global(
			.diagram-box:has(> .diagram-element[aria-current="true"])
				> .diagram-column
				> :first-child
		)
		> .diagram-element[aria-current="true"] {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		border-left-color: transparent;
	}

	.legs {
		width: 100%;
		gap: var(--line-width);
		margin: 0;
	}

	.leg {
		container-type: inline-size;
		container-name: leg;
		width: 100%;
		flex: var(--duration);
		text-align: center;
		background-color: var(--product-color--alt);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		--border-color: var(--product-color);
		border: var(--border-color) solid 1px;
		&:first-child {
			border-top-left-radius: 50vh;
			border-bottom-left-radius: 50vh;
		}
		&:last-child {
			border-top-right-radius: 50vh;
			border-bottom-right-radius: 50vh;
		}
		&.cancelled {
			color: var(--accent--red);
			border-style: dashed;
			background-color: var(--background-color);
		}
	}

	.leg__name--short {
		display: none;
	}

	@container leg (max-width: 4.5em) {
		.leg__name--long {
			display: none;
		}
		.leg__name--short {
			display: block;
		}
	}

	@container leg (max-width: 2.5em) {
		.leg__name--short {
			display: none;
		}
	}

	:global(:root[data-theme="dark"]),
	:global(:root[data-theme="midnight"]) {
		.time {
			border-width: calc(var(--line-width) / 2);
		}
		.leg {
			background-color: var(--background-color);
			border-width: calc(var(--line-width) / 2);
		}
	}

	@media (prefers-color-scheme: dark) {
		:global(:root[data-theme="system"]) {
			.time {
				border-width: calc(var(--line-width) / 2);
			}
			.leg {
				background-color: var(--background-color);
				border-width: calc(var(--line-width) / 2);
			}
		}
	}
</style>
