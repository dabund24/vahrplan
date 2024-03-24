<script lang="ts">
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import StationInput from "./StationInput.svelte";
	import type { ParsedLocation } from "$lib/types";
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import { displayedTree, setDisplayedLocations } from "$lib/stores";
	import { isDefined } from "$lib/util";
	import Leaflet from "$lib/components/leaflet/Leaflet.svelte";
	import Tabs from "$lib/components/Tabs.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";

	type KeyedArrayItem = { key: number; location?: ParsedLocation };

	let stops: KeyedArrayItem[] = [{ key: Math.random() }, { key: Math.random() }];

	function removeVia(index: number): void {
		stops = [...stops.slice(0, index), ...stops.slice(index + 1, stops.length)];
	}
	function addVia(index: number): void {
		stops = [
			...stops.slice(0, index),
			{ key: Math.random() },
			...stops.slice(index, stops.length)
		];
	}
	function handleFormSubmit(): void {
		const stopsToBeDisplayed = stops.map((via) => via.location).filter(isDefined);
		if (stopsToBeDisplayed.length >= 2) {
			setDisplayedLocations(stopsToBeDisplayed);
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid">
	<div class="main-application flex-column">
		<section>
			<h1>Hallo</h1>
			<form class="flex-column" on:submit|preventDefault={handleFormSubmit}>
				<div class="location-inputs">
					{#each stops as stop, i (stop.key)}
						<div class="flex-row" transition:scale animate:flip={{ duration: 200 }}>
							<StationInput bind:selectedLocation={stop.location} />
							{#if i !== 0 && i !== stops.length - 1}
								<button
									type="button"
									tabindex="-1"
									on:click={() => void removeVia(i)}>Remove</button
								>
							{/if}
							{#if i !== stops.length - 1}
								<button
									type="button"
									tabindex="-1"
									on:click={() => void addVia(i + 1)}>Add</button
								>
							{/if}
						</div>
					{/each}
				</div>
				<button class="hoverable padded-top-bottom" type="submit">Submit</button>
			</form>
		</section>
		<section class="diagram">
			{#await $displayedTree}
				loading...
			{:then tree}
				<JourneyDiagram nodes={tree} />
			{:catch err}
				{err}
			{/await}
		</section>
	</div>
	<div class="journey-preview">
		<Tabs tabs={["Übersicht", "Karte"]} let:activeTab>
			{#if activeTab === 0}
				<Journeys />
			{:else if activeTab === 1}
				<Leaflet />
			{/if}
		</Tabs>
	</div>
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
		flex: 0.6;
	}

	.grid {
		max-height: 100vh;
		display: grid;
		grid-template-columns: 1fr 50rem;
		min-height: 100vh;
	}
	.journey-preview {
		border-left: var(--border);
	}
</style>
