<script lang="ts">
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import { displayedTree } from "$lib/stores";
	import Leaflet from "$lib/components/leaflet/Leaflet.svelte";
	import Tabs from "$lib/components/Tabs.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import MainForm from "$lib/components/MainForm.svelte";
	import JourneySummary from "./JourneySummary.svelte";
	import { browser } from "$app/environment";

	let show = browser && window.innerWidth > 1000

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid">
	<div class="main-application flex-column">
		<section>
			<MainForm />
		</section>
		<section class="diagram">
			<JourneySummary />
			{#await $displayedTree}
				loading...
			{:then tree}
				<JourneyDiagram nodes={tree} />
			{:catch err}
				{err}
			{/await}
		</section>
	</div>
	{#if show}
		<div class="journey-preview">
			<Tabs tabs={["Übersicht", "Karte"]} let:activeTab>
				{#if activeTab === 0}
					<Journeys />
				{:else if activeTab === 1}
					<Leaflet />
				{/if}
			</Tabs>
		</div>
	{/if}
</div>

<style>
	.diagram {
		margin: 0 auto;
	}
	.grid > * {
		max-height: 100vh;
		overflow-y: scroll;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr 50rem;
		height: 100vh;
	}
	.journey-preview {
		border-left: var(--border);
		position: relative;
	}

	@media screen and (max-width: 1000px) {
		.grid {
			grid-template-columns: 1fr;
		}
		.journey-preview {
			display: none;
		}
	}
</style>
