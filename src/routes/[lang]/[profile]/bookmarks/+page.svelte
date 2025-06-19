<script lang="ts">
	import Tabs from "$lib/components/Tabs.svelte";
	import DiagramBookmarks from "./DiagramBookmarks.svelte";
	import JourneyBookmarks from "./JourneyBookmarks.svelte";
	import StationBookmarks from "./StationBookmarks.svelte";
	import type { ComponentProps } from "svelte";

	const tabContent: ComponentProps<typeof Tabs>["tabs"] = [
		{
			title: "Suchen",
			content: diagramBookmarks
		},
		{
			title: "Reisen",
			content: journeyBookmarks
		},
		{
			title: "Stationen",
			content: stationBookmarks
		}
	];
</script>

<svelte:head>
	<title>Vahrplan - Lesezeichen</title>
	<meta name="title" content="Vahrplan - Lesezeichen" />
	<meta name="description" content="Gemerkte Suchen, Reisen und Stationen in Vahrplan" />
</svelte:head>

{#snippet diagramBookmarks()}
	<DiagramBookmarks />
{/snippet}
{#snippet journeyBookmarks()}
	<JourneyBookmarks />
{/snippet}
{#snippet stationBookmarks()}
	<StationBookmarks />
{/snippet}

<div class="content-wrapper" data-sveltekit-preload-data="off">
	<h1>Lesezeichen</h1>
	<Tabs tabs={tabContent} />
</div>

<style>
	h1 {
		position: relative;
		z-index: 450;
	}
</style>
