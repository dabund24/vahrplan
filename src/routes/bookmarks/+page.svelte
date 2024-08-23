<script lang="ts">
	import Tabs from "$lib/components/Tabs.svelte";
	import Header from "$lib/components/Header.svelte";
	import DiagramBookmarks from "$lib/components/bookmarks/DiagramBookmarks.svelte";
	import JourneyBookmarks from "$lib/components/bookmarks/JourneyBookmarks.svelte";
	import StationBookmarks from "$lib/components/bookmarks/StationBookmarks.svelte";
	import type { ComponentProps } from "svelte";

	const tabContent: ComponentProps<Tabs>["tabs"] = [
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

{#snippet diagramBookmarks()}
	<DiagramBookmarks />
{/snippet}
{#snippet journeyBookmarks()}
	<JourneyBookmarks />
{/snippet}
{#snippet stationBookmarks()}
	<StationBookmarks />
{/snippet}

<Header title="Favoriten" mobileOnly={true} />
<div id="bookmarks" data-sveltekit-preload-data="off">
	<Tabs tabs={tabContent} isBelowHeaderMobile={true} padContent={true} />
</div>

<style>
	#bookmarks {
		max-width: 30rem;
		margin: auto;
	}
</style>
