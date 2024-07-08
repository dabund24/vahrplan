<script lang="ts">
	import JourneyDiagram from "../JourneyDiagram.svelte";
	import {
		type DisplayedFormData,
		displayedFormData,
		displayedTree,
		setDisplayedFormData
	} from "$lib/stores/journeyStores";
	import Tabs from "$lib/components/Tabs.svelte";
	import MainForm from "../MainForm.svelte";
	import SplitPane from "$lib/components/splitPane/SplitPane.svelte";
	import JourneyDiagramSkeleton from "../JourneyDiagramSkeleton.svelte";
	import JourneySummary from "../JourneySummary.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import { getDiagramUrl } from "$lib/urls.js";

	let windowWidth: number;

	$: showSplitPane = windowWidth >= 1000;

	$: resetDiagram($page.data.formData as DisplayedFormData | undefined);

	function resetDiagram(initialFormData: DisplayedFormData | undefined): void {
		if (
			browser &&
			initialFormData !== undefined &&
			location.href !== getDiagramUrl($displayedFormData).href
		) {
			// this happens when the user navigates here without the app context
			setDisplayedFormData(initialFormData);
		}
	}
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
			style:--connection-count={($displayedFormData?.locations.length ?? 1) - 1}
			slot="a"
		>
			<section class="form">
				<MainForm initialFormData={$displayedFormData} />
			</section>
			<section class="diagram">
				{#if $displayedFormData !== undefined}
					<JourneySummary />
					{#await $displayedTree}
						<JourneyDiagramSkeleton depth={$displayedFormData.locations.length - 1} />
					{:then tree}
						<JourneyDiagram nodes={tree} />
					{:catch err}
						{err}
					{/await}
				{/if}
			</section>
		</div>
		<div slot="b" class="journey-preview">
			{#if showSplitPane}
				<Tabs tabs={["Übersicht", "Karte"]} let:activeTab>
					{#if activeTab === 0}
						<Journeys />
					{:else if activeTab === 1}
						{#await import("$lib/components/leaflet/Leaflet.svelte") then Leaflet}
							<Leaflet.default />
						{/await}
					{/if}
				</Tabs>
			{/if}
		</div>
	</SplitPane>
</div>

<style>
	.form {
		position: sticky;
		left: 0.75rem;
		z-index: 100;
		max-width: calc(100vw - 1.5rem);
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
		padding: calc(0.5rem + env(safe-area-inset-top)) 0.5rem;
		overscroll-behavior-x: none;
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
		min-width: fit-content;
		margin: auto;
	}

	@media screen and (min-width: 1000px) {
		.form {
			left: 0;
		}
		.main-application {
			padding: 0.5rem;
			container-type: inline-size;
			--display-width: calc(100cqw - 1.5rem);
			width: auto;
			min-width: 0;
		}
	}
</style>
