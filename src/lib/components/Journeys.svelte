<script lang="ts">
	import { flip } from "svelte/animate";
	import { scale } from "svelte/transition";
	import { selectedJourneys, displayedLocations, mergingBlocks } from "$lib/stores";
	import type { JourneyBlock } from "$lib/types";
	import LegRegular from "$lib/components/LegRegular.svelte";
	import Filler from "$lib/components/Filler.svelte";
	import Location from "$lib/components/Location.svelte";

	type DisplayedJourney = {
		blocks: JourneyBlock[];
		key: string;
	};

	$: journeys = Array.from({ length: 2 * $displayedLocations.length - 1 }, (_v, i) => {
		return i % 2 === 0
			? {
					blocks:
						$mergingBlocks[i / 2] !== undefined
							? [$mergingBlocks[i / 2]]
							: [],
					key: `${i / 2}-${i / 2 + 1}`
				}
			: {
					blocks: $selectedJourneys[~~(i / 2)].blocks,
					key: $selectedJourneys[~~(i / 2)].refreshToken
				};
	}) as DisplayedJourney[];
	$: console.log(journeys);
</script>

{#each journeys as journey (journey.key)}
	<div transition:scale animate:flip={{ duration: 200}}>
		{#each journey.blocks as block}
			{#if block.type === "leg"}
				<LegRegular {block} />
			{:else if block.type === "walk" || block.type === "transfer" || block.type === "unselected"}
				<Filler {block} />
			{:else if block.type === "location" && !block.hidden}
				<Location {block} />
			{/if}
		{/each}
	</div>
{/each}
