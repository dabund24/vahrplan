<script lang="ts">
	import type { JourneyBlock, LegBlock, ParsedTime } from "$lib/types";
	import Time from "$lib/components/journeys/Time.svelte";
	import { selectedJourneys, selectJourneyBlocks, unselectJourneyBlocks } from "$lib/stores";

	export let blocks: JourneyBlock[];
	export let depth: number;
	export let index: number;
	export let refreshToken: string;
	export let departure: ParsedTime;
	export let arrival: ParsedTime;

	$: displayedBlocks = blocks.filter<LegBlock>(
		((block) => block.type === "leg") as (block: JourneyBlock) => block is LegBlock
	);

	$: isSelected = index === $selectedJourneys.at(depth)?.selectedBy;

	function handleDiagramElementClick(): void {
		if (isSelected) {
			unselectJourneyBlocks(depth);
		} else {
			selectJourneyBlocks(
				{ selectedBy: index, blocks, arrival, departure, refreshToken },
				depth
			);
		}
	}
</script>

<button
	type="button"
	class="flex-row diagram-element hoverable"
	aria-current={isSelected}
	on:click={handleDiagramElementClick}
>
	<span class="time">
		<Time time={departure} />
	</span>
	<span class="flex-row legs">
		{#each displayedBlocks as block}
			<span class="leg product--{block.line.product}">
				<span class="leg__name--long">{block.line.name}</span>
				<span class="leg__name--short">{block.line.productName}</span>
			</span>
		{/each}
	</span>
	<span class="time">
		<Time time={arrival} />
	</span>
</button>

<style>
	.time {
		border: transparent solid 1px;
		padding: 0 8px;
	}

	.diagram-element {
		width: calc(var(--connection-width) + 2 * var(--line-width));
		margin: 0 calc(-1 * var(--line-width));
		height: fit-content;
		border-radius: 50vh;
		padding: 4px 0;
		text-align: center;
		align-items: stretch;
		transition: border-radius .4s, border .4s, background-color .4s;
		&[aria-current="true"] {
			border-color: var(--accent-color);
		}
	}

	:global(.diagram-box:has(> .diagram-column > :first-child > .diagram-element[aria-current="true"])) > .diagram-element[aria-current="true"] {
		border-top-right-radius: 0;
        border-bottom-right-radius: 0;
		border-right-color: transparent;
	}

    :global(.diagram-box:has(> .diagram-element[aria-current="true"]) > .diagram-column > :first-child) > .diagram-element[aria-current="true"] {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
		border-left-color: transparent;
    }

    :global(:root[data-theme="dark"]) .time {
		border: transparent solid 2px;
	}
    :global(:root[data-theme="dark"]) .leg {
		background-color: var(--background-color);
		border: var(--border-color) solid 2px;
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
		text-align: center;
		background-color: var(--product-color--opaque);
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
</style>
