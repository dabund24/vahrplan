<script lang="ts">
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import StationInput from "./StationInput.svelte";
	import type { ParsedLocation } from "$lib/types";
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import { displayedTree, setDisplayedLocations } from "$lib/stores";
	import { isDefined } from "$lib/util";
	import Journeys from "$lib/components/Journeys.svelte";

	type KeyedArrayItem = { key: number; location?: ParsedLocation };

	let stops: KeyedArrayItem[] = [{ key: Math.random() }, { key: Math.random() }];

	function removeVia(index: number) {
		stops = [...stops.slice(0, index), ...stops.slice(index + 1, stops.length)];
	}
	function addVia(index: number) {
		stops = [...stops.slice(0, index), { key: Math.random() }, ...stops.slice(index, stops.length)];
	}
	function handleFormSubmit() {
		const stopsToBeDisplayed = stops.map((via) => via.location).filter(isDefined)
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
								<button type="button" tabindex="-1" on:click={() => removeVia(i)}
									>Remove</button
								>
							{/if}
							{#if i !== stops.length - 1}
								<button type="button" tabindex="-1" on:click={() => addVia(i + 1)}
									>Add</button
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

		<Journeys />
		<!--
		{#if $selectedJourneys.length !== 0}
			<Leaflet>
				{#each $selectedJourneys as journey (journey.refreshToken)}
					{#each journey.blocks as block}
						{#if block.type === "leg"}
							<Polyline {block} />
							{#if !block.precededByTransferBlock}
								<Marker
									data={block.departureData}
									product2={block.line.product ?? ""}
								>
									<IconStationLocation color="product" iconType="station" />
								</Marker>
							{/if}
							{#each block.stopovers as stopover}
								<Marker
									data={stopover}
									product1={block.line.product ?? ""}
									product2={block.line.product ?? ""}
								>
									<IconStationLocation
										color="product"
										iconType="station"
										smallIcon={true}
									/>
								</Marker>
							{/each}
							{#if !block.succeededByTransferBlock}
								<Marker
									data={block.arrivalData}
									product1={block.line.product ?? ""}
								>
									<IconStationLocation color="product" iconType="station" />
								</Marker>
							{/if}
						{:else if block.type === "transfer"}
							<Marker
								data={block.transitData}
								product1={block.arrivalProduct ?? ""}
								product2={block.departureProduct ?? ""}
							>
								<IconStationLocation
									color="product"
									iconType="station"
									secondaryProduct={block.departureProduct}
								/>
							</Marker>
						{:else if block.type === "walk"}
							<Polyline {block} />
						{/if}
					{/each}
				{/each}
			</Leaflet>
		{/if}
		-->
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
		grid-template-columns: 1fr 70rem;
		min-height: 100vh;
	}

	.journey-preview {
		padding: 1rem;
	}
</style>
