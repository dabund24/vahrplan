<script lang="ts">
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import { displayedLocations, displayedTree } from "$lib/stores";
	import Tabs from "$lib/components/Tabs.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import MainForm from "$lib/components/MainForm.svelte";
	import JourneySummary from "./JourneySummary.svelte";
	import SplitPane from "$lib/components/splitPane/SplitPane.svelte";
	import JourneyDiagramSkeleton from "./JourneyDiagramSkeleton.svelte";
	import { browser } from "$app/environment";

	let Leaflet: typeof import("$lib/components/leaflet/Leaflet.svelte").default;
	if (browser) {
		import("$lib/components/leaflet/Leaflet.svelte").then(l => Leaflet = l.default)
	}

	let windowWidth: number;

	$: showSplitPane = $displayedLocations.locations.length > 0 && windowWidth > 1000;

	$: treePromise = $displayedTree;
</script>

<svelte:head>
	<title>Start</title>
	<meta name="description" content="Verbindungszusammenstellung für Fortgeschrittene" />
</svelte:head>

<div class="split-container" bind:clientWidth={windowWidth}>
	<SplitPane
		type={"horizontal"}
		min="360px"
		max={showSplitPane ? "-360px" : "100%"}
		pos={showSplitPane ? "-30rem" : "100%"}
		disabled={!showSplitPane}
	>
		<div
			class="main-application flex-column"
			style:--connection-count={$displayedLocations.locations.length - 1}
			slot="a"
		>
			<section class="form">
				<MainForm />
			</section>
			<section class="diagram">
				<JourneySummary />
				{#await treePromise}
					<JourneyDiagramSkeleton depth={$displayedLocations.locations.length - 1} />
				{:then tree}
					<JourneyDiagram nodes={tree} />
				{:catch err}
					{err}
				{/await}
			</section>
		</div>
		<div slot="b" class="journey-preview">
			{#if showSplitPane}
				<Tabs tabs={["Übersicht", "Karte"]} let:activeTab>
					{#if activeTab === 0}
						<Journeys />
					{:else if activeTab === 1 && Leaflet}
						<Leaflet />
					{/if}
				</Tabs>
			{/if}
		</div>
	</SplitPane>
</div>

<style>
	.form {
		position: sticky;
		left: 1rem;
		z-index: 100;
		max-width: calc(100vw - 2rem);
	}
	.diagram {
		margin: 0 auto;
	}
	.split-container {
		height: 100%;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.journey-preview {
		position: relative;
	}

	/*
		TODO automatic font sizing: font-size: min(1rem, .09 * var(--display-width) / var(--connection-count));
	*/

	.main-application {
		padding: 1rem 0.5rem;
		box-sizing: border-box;
		--connection-width--min-threshold: 11em;
		--connection-width--max-threshold: 40em;
		--display-width: calc(100vw - 2rem - 8px);
		--connection-width: clamp(
			var(--connection-width--min-threshold),
			calc(var(--display-width) / var(--connection-count)),
			var(--connection-width--max-threshold)
		);
		--diagram-width: clamp(
			calc(var(--connection-width--min-threshold) * (var(--connection-count))),
			var(--display-width),
			calc(var(--connection-width--max-threshold) * (var(--connection-count)))
		);
		width: fit-content;
		min-width: 100vw;
	}

	@media screen and (min-width: 1000px) {
		.form {
			left: 0;
		}
		.main-application {
			container-type: inline-size;
			--display-width: calc(100cqw - 1.5rem);
			width: auto;
			min-width: 0;
		}
	}
</style>
