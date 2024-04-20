<script lang="ts">
	import { browser } from "$app/environment";
	import Header from "$lib/components/Header.svelte";

	//let Leaflet: typeof import("$lib/components/leaflet/Leaflet.svelte").default;
	//if (browser) {
	//	void import("$lib/components/leaflet/Leaflet.svelte").then(l => Leaflet = l.default)
	//}
</script>

<svelte:head>
	<title>Karte</title>
	<meta name="description" content="Karte" />
</svelte:head>

<div>
	<Header title={"Karte"} fullScreen={true} />
	{#if browser}
		{#await import("$lib/components/leaflet/Leaflet.svelte") then { default: Leaflet }}
			<Leaflet />
		{/await}
	{/if}
</div>

<style>
	div {
		position: absolute;
		height: 100%;
		width: 100vw;
	}
</style>
