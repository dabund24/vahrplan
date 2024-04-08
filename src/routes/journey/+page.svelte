<script lang="ts">
	import SplitPane from "$lib/components/splitPane/SplitPane.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import Leaflet from "$lib/components/leaflet/Leaflet.svelte";

	let windowWidth: number;

	$: showSplitPane = windowWidth > 1000;
</script>

<div class="split-container" bind:clientWidth={windowWidth}>
	<SplitPane
		type={"horizontal"}
		min={showSplitPane ? "360px" : "0%"}
		max={showSplitPane ? "-360px" : "100%"}
		pos={showSplitPane ? "30rem" : "100%"}
		disabled={!showSplitPane}
	>
		<div slot="a">
			<Journeys />
		</div>
		<div slot="b" class="map">
			{#if showSplitPane}
				<Leaflet />
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
