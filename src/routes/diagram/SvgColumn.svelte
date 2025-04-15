<script lang="ts">
	import type { SvgData } from "$lib/server/svgData/svgData.server";
	import SvgSubJourney from "./SvgSubJourney.svelte";

	type Props = { columnData: SvgData["columns"][number]; minTime: number; columnIndex: number };

	const { columnData, minTime, columnIndex }: Props = $props();
</script>

{#each columnData.subJourneys as journey}
	<SvgSubJourney {journey} {minTime} {columnIndex} />
{/each}
