<script lang="ts">
	import SplitPane from "$lib/components/splitPane/SplitPane.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import Header from "$lib/components/Header.svelte";
	import { displayedLocations, refreshJourney } from "$lib/stores/journeyStores";
	import IconRefresh from "$lib/components/icons/IconRefresh.svelte";

	let windowWidth: number;

	$: showSplitPane = windowWidth > 1000;
</script>

<svelte:head>
	<title>Verbindungsdetails</title>
	<meta name="description" content="Verbindungsdetails" />
</svelte:head>

<div class="split-container" bind:clientWidth={windowWidth}>
	<SplitPane
		type={"horizontal"}
		min={showSplitPane ? "360px" : "0%"}
		max={showSplitPane ? "-360px" : "100%"}
		pos={showSplitPane ? "30rem" : "100%"}
		disabled={!showSplitPane}
	>
		<div slot="a">
			<Header
				title={$displayedLocations.locations.length > 1
					? `${$displayedLocations.locations[0].value.name} — ${$displayedLocations.locations.at(-1)?.value.name}`
					: "Verbindungsdetails"}
				mobileOnly={true}
			>
				<button class="button--small hoverable" on:click={() => void refreshJourney()}>
					<IconRefresh />
				</button>
			</Header>
			<Journeys />
		</div>
		<div slot="b" class="map">
			{#if showSplitPane}
				{#await import("$lib/components/leaflet/Leaflet.svelte") then { default: Leaflet }}
					<Leaflet />
				{/await}
			{/if}
		</div>
	</SplitPane>
</div>

<style>
	.split-container {
		height: 100%;
	}
	.map {
		width: 100%;
		position: relative;
	}
</style>
