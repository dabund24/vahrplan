<script lang="ts">
	import { browser } from "$app/environment";
	import Header from "$lib/components/Header.svelte";
	import { displayedLocations } from "$lib/stores";
</script>

<svelte:head>
	<title>Karte</title>
	<meta name="description" content="Karte" />
</svelte:head>

<div>
	<Header
		title={$displayedLocations.locations.length > 1
			? `${$displayedLocations.locations[0].value.name} — ${$displayedLocations.locations.at(-1)?.value.name}`
			: "Karte"}
		fullScreen={true}
	/>
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
