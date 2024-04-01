<script lang="ts">
	import type { JourneyBlock, DefiningBlock, LegBlock, ParsedTime } from "$lib/types";
	import Time from "$lib/components/journeys/Time.svelte";
	import { selectedJourneys, selectJourneyBlocks, unselectJourneyBlocks } from "$lib/stores";
	import { isTimeDefined } from "$lib/util";

	export let blocks: JourneyBlock[];
	export let depth: number;
	export let index: number;
	export let refreshToken: string;

	$: displayedBlocks = blocks.filter<LegBlock>(
		((block) => block.type === "leg") as (block: JourneyBlock) => block is LegBlock
	);

	$: isSelected = index === $selectedJourneys.at(depth)?.selectedBy;

	function getTimeFromTimeDefinedBlock(
		block: DefiningBlock | undefined,
		timeType: "arrival" | "departure"
	): ParsedTime {
		if (block === undefined) {
			return { a: { time: "n/a" } };
		}
		if (block.type === "leg") {
			return {
				a: block[`${timeType}Data`].time[timeType === "arrival" ? "a" : "b"]
			};
		} else {
			return {
				a: block.time[timeType === "arrival" ? "a" : "b"] ?? { time: "n/a" }
			};
		}
	}

	$: departureTime = getTimeFromTimeDefinedBlock(
		blocks.find<DefiningBlock>(isTimeDefined),
		"departure"
	);

	$: arrivalTime = getTimeFromTimeDefinedBlock(
		blocks.findLast<DefiningBlock>(isTimeDefined),
		"arrival"
	);

	function handleDiagramElementClick(): void {
		if (isSelected) {
			unselectJourneyBlocks(depth);
		} else {
			selectJourneyBlocks(depth, index, blocks, refreshToken);
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
		<Time time={departureTime} />
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
		<Time time={arrivalTime} />
	</span>
</button>

<style>
	.time {
		border: transparent solid 1px;
		padding: 0 8px;
	}

	.diagram-element {
		width: var(--connection-width);
		height: fit-content;
		border-radius: 50vh;
		padding: 4px 0;
		text-align: center;
		&[aria-current="true"] {
			border-color: var(--accent-color);
		}
	}

	/*
	TODO style based on theme

    [data-theme="dark"] .time {
		border: transparent solid 2px;
	}
    [data-theme="dark"] .leg {
		background-color: var(--background-color);
		border: var(--border-color) solid 2px;
	}
*/
	.legs {
		width: 100%;
		gap: var(--line-width);
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

	
	@container leg (max-width: 4.5rem) {
		.leg__name--long {
            display: none;
		}
		.leg__name--short {
            display: block;
		}
    }
	
	@container leg (max-width: 2.5rem) {
		.leg__name--short {
            display: none;
		}
	}
</style>
