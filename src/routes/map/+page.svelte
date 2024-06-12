<script lang="ts">
	import { browser } from "$app/environment";
	import Header from "$lib/components/Header.svelte";
	import { displayedLocations, refreshJourney } from "$lib/stores/journeyStores";
	import IconRefresh from "$lib/components/icons/IconRefresh.svelte";
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
		mobileOnly={true}
	>
		<button class="button--small hoverable" on:click={() => void refreshJourney()}>
			<IconRefresh />
		</button>
	</Header>
	{#if browser}
		{#await import("$lib/components/leaflet/Leaflet.svelte") then { default: Leaflet }}
			<Leaflet />
		{/await}
	{/if}
</div>

<style>
	div {
		position: absolute;
		width: 100vw;
		height: 100vh;
	}
	@media (display-mode: browser) {
		div {
			height: 100%;
		}
	}

	@media screen and (max-width: 999px) {
		div {
			top: 0;
		}
	}
</style>
