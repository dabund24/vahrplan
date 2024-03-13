<script lang="ts">
	import { fade, slide } from "svelte/transition";
	import { flip } from "svelte/animate";
	import StationInput from "./StationInput.svelte";
	import type { ParsedLocation } from "$lib/types";
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import { displayedTree, selectedJourneys, setDisplayedLocations } from "$lib/stores";
	import { isDefined } from "$lib/util";
	import Leaflet from "$lib/components/leaflet/Leaflet.svelte";
	import Polyline from "$lib/components/leaflet/Polyline.svelte";
	import Marker from "$lib/components/leaflet/Marker.svelte";
	import IconStationLocation from "$lib/components/IconStationLocation.svelte";

	type keyedArrayItem = { key: number; location?: ParsedLocation };

	let from: ParsedLocation;
	let vias: keyedArrayItem[] = [{ key: Math.random() }, { key: Math.random() }];
	let to: ParsedLocation;

	function removeVia(index: number) {
		//vias = vias.toSpliced(index, 1);
		vias = [...vias.slice(0, index), ...vias.slice(index + 1, vias.length)];
	}
	function addVia(index: number) {
		vias = [...vias.slice(0, index), { key: Math.random() }, ...vias.slice(index, vias.length)];
	}
	function handleFormSubmit() {
		setDisplayedLocations([from, ...vias.map((via) => via.location).filter(isDefined), to]);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid">
	<div class="main-application">
		<section>
			<h1>Hallo</h1>
			<form class="flex-column" on:submit|preventDefault={handleFormSubmit}>
				<div class="flex-column location-inputs">
					<div class="flex-row">
						<StationInput bind:selectedLocation={from} />
						<button type="button" tabindex="-1" on:click={() => addVia(0)}>Add</button>
					</div>
					{#each vias as via, i (via.key)}
						<div class="flex-row" in:slide out:fade animate:flip={{ duration: 200 }}>
							<StationInput bind:selectedLocation={via.location} />
							<button type="button" tabindex="-1" on:click={() => removeVia(i)}
								>Remove</button
							>
							<button type="button" tabindex="-1" on:click={() => addVia(i + 1)}
								>Add</button
							>
						</div>
					{/each}
					<StationInput bind:selectedLocation={to} />
				</div>
				<button class="hoverable padded-top-bottom" type="submit">Submit</button>
			</form>
		</section>
		<section>
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
		<!--
		{#each $selectedJourneys as journey (journey.refreshToken)}
			<div transition:scale animate:flip={{ duration: (p) => 200 + p / 2 }}>
				<Journey blocks={journey.blocks} />
			</div>
		{/each}
		-->
		{#if $selectedJourneys.length !== 0}
			<Leaflet>
				{#each $selectedJourneys as journey (journey.refreshToken)}
					{#each journey.blocks as block}
						{#if block.type === "leg"}
							<Polyline {block} />
							<Marker data={block.departureData} product={block.line.product ?? ""}>
								<IconStationLocation color="product" iconType="station" />
							</Marker>
							{#each block.stopovers as stopover}
								<Marker data={stopover} product={block.line.product ?? ""}>
									<IconStationLocation color="product" iconType="station" smallIcon={true} />
								</Marker>
							{/each}
							<Marker data={block.arrivalData} product={block.line.product ?? ""}>
								<IconStationLocation color="product" iconType="station" />
							</Marker>
						{/if}
					{/each}
				{/each}
			</Leaflet>
		{/if}
	</div>
</div>

<style>
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
