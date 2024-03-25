<script lang="ts">
	import StationInput from "../../routes/StationInput.svelte";
	import { type ParsedLocation, products } from "$lib/types.js";
	import { isDefined } from "$lib/util.js";
	import { setDisplayedLocations } from "$lib/stores.js";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Modal from "$lib/components/Modal.svelte";
	import Tabs from "$lib/components/Tabs.svelte";
	import Setting from "$lib/components/Setting.svelte";
	import { journeysOptions } from "$lib/settings";

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

	let showModal = false;
</script>

<form class="flex-column" on:submit|preventDefault={handleFormSubmit}>
	<div class="location-inputs">
		{#each stops as stop, i (stop.key)}
			<div class="flex-row" transition:scale animate:flip={{ duration: 200 }}>
				<StationInput bind:selectedLocation={stop.location} />
				{#if i !== 0 && i !== stops.length - 1}
					<button type="button" tabindex="-1" on:click={() => void removeVia(i)}
						>Remove</button
					>
				{/if}
				{#if i !== stops.length - 1}
					<button type="button" tabindex="-1" on:click={() => void addVia(i + 1)}
						>Add</button
					>
				{/if}
			</div>
		{/each}
	</div>
	<button on:click={() => void (showModal = true)} type="button">Filter</button>
	<Modal title="Filter" bind:showModal>
		<Tabs tabs={["Allgemein", "Verkehrsmittel"]} let:activeTab>
			{#if activeTab === 0}
				<div class="settings">
					<Setting
						settingName="Fahrradmitnahme"
						bind:setting={$journeysOptions.bike}
						settingInfo={{ type: "boolean" }}
					/>
					<Setting
						settingName="Barrierefreiheit"
						bind:setting={$journeysOptions.accessibility}
						settingInfo={{
							type: "stringOptions",
							options: [
								{ value: "none", name: "ignorieren" },
								{ value: "partial", name: "bevorzugen" },
								{ value: "complete", name: "strikt" }
							]
						}}
					/>
					<Setting
						settingName="Maximale Umstiegsanzahl"
						bind:setting={$journeysOptions.transfers}
						settingInfo={{
							type: "numberOptions",
							options: [
								{ value: 0, name: "0 (nur Direktfahrten)" },
								{ value: 1, name: "1" },
								{ value: 2, name: "2" },
								{ value: 3, name: "3" },
								{ value: 4, name: "4" },
								{ value: 5, name: "5" },
								{ value: -1, name: "beliebig viele" }
							]
						}}
					/>
					<Setting
						settingName="Mindestumsteigezeit [min]"
						bind:setting={$journeysOptions.transferTime}
						settingInfo={{ type: "numberRange", min: 0, max: 60, step: 5 }}
					/>
				</div>
			{:else if activeTab === 1}
				<div class="settings">
					{#each Object.entries(products) as [product, productName]}
						<Setting
							settingName={productName}
							bind:setting={$journeysOptions.products[product]}
							settingInfo={{ type: "boolean" }}
						/>
					{/each}
				</div>
			{/if}
		</Tabs>
	</Modal>
	<button class="hoverable padded-top-bottom" type="submit">Submit</button>
</form>

<style>
	.settings {
		padding: 0.5rem 1rem;
	}
</style>
