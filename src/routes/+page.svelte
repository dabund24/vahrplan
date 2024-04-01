<script lang="ts">
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import { displayedLocations, displayedTree } from "$lib/stores";
	import Leaflet from "$lib/components/leaflet/Leaflet.svelte";
	import Tabs from "$lib/components/Tabs.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import MainForm from "$lib/components/MainForm.svelte";
	import JourneySummary from "./JourneySummary.svelte";
	import { browser } from "$app/environment";
	import SplitPane from "$lib/components/splitPane/SplitPane.svelte";

	let windowWidth: number

	$: show = browser && $displayedLocations.length > 0 && windowWidth > 1000;

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="split-container" bind:clientWidth={windowWidth}>
	<SplitPane type={"horizontal"} min="360px" max="-360px" pos={show ? "-30rem" : "100%"} disabled={!show}>
		<div
			class="main-application flex-column"
			style:--connection-count={$displayedLocations.length - 1}
			slot="a"
		>
			<section class="form">
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
		<div slot="b" class="journey-preview">
			{#if show}
				<Tabs tabs={["Übersicht", "Karte"]} let:activeTab>
					{#if activeTab === 0}
						<Journeys />
					{:else if activeTab === 1}
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
		left: 0;
		z-index: 100;
	}
	.diagram {
		margin: 0 auto;
	}
	.split-container {
		height: 100vh;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.journey-preview {
		position: relative;
		overflow-y: scroll;
	}

	.main-application {
		padding: 1rem;
		box-sizing: border-box;
		container-type: size;
		--connection-width: clamp(10rem, calc(100cqw / var(--connection-count)), 40rem);
		overflow: scroll;
	}


</style>
