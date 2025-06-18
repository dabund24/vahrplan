<script lang="ts">
	import Tabs from "$lib/components/Tabs.svelte";
	import DiagramBookmarks from "./DiagramBookmarks.svelte";
	import JourneyBookmarks from "./JourneyBookmarks.svelte";
	import StationBookmarks from "./StationBookmarks.svelte";
	import type { ComponentProps } from "svelte";

	const tabContent: ComponentProps<typeof Tabs>["tabs"] = [
		{
			title: "Diagramme",
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
	<meta name="description" content="Gemerkte Diagramme, Reisen und Stationen in Vahrplan" />
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
	<Tabs tabs={tabContent} isBelowHeaderMobile={true} />
</div>
