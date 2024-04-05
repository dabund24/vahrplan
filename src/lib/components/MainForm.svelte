<script lang="ts">
	import StationInput from "../../routes/StationInput.svelte";
	import { type KeyedItem, type ParsedLocation, products } from "$lib/types.js";
	import { valueIsDefined } from "$lib/util.js";
	import { setDisplayedLocations } from "$lib/stores.js";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";
	import Modal from "$lib/components/Modal.svelte";
	import Tabs from "$lib/components/Tabs.svelte";
	import Setting from "$lib/components/Setting.svelte";
	import { journeysOptions } from "$lib/settings";

	let stops: KeyedItem<ParsedLocation | undefined, number>[] = [
		{ value: undefined, key: Math.random() },
		{ value: undefined, key: Math.random() }
	];

	function removeVia(index: number): void {
		stops = [...stops.slice(0, index), ...stops.slice(index + 1, stops.length)];
	}
	function addVia(index: number): void {
		stops = [
			...stops.slice(0, index),
			{ value: undefined, key: Math.random() },
			...stops.slice(index, stops.length)
		];
	}
	function handleFormSubmit(): void {
		const stopsToBeDisplayed = stops.filter<KeyedItem<ParsedLocation, number>>(
			valueIsDefined<ParsedLocation, number>
		);
		if (stopsToBeDisplayed.length >= 2) {
			setDisplayedLocations(stopsToBeDisplayed);
		}
	}

	let showModal = false;
</script>

<form class="flex-column" on:submit|preventDefault={handleFormSubmit}>
	<div class="location-inputs--outer flex-row">
		<div class="location-inputs">
			{#each stops as stop, i (stop.key)}
				<div
					class="flex-row input-container"
					transition:scale
					animate:flip={{ duration: 400 }}
				>
					<button
						class="button--small add-button hoverable"
						type="button"
						tabindex="-1"
						on:click={() => void addVia(i + 1)}
					>
						<svg width="16px" height="16px">
							<g
								stroke="var(--foreground-color)"
								stroke-width="3"
								stroke-linecap="round"
							>
								<line x1="8" y1="2" x2="8" y2="14" />
								<line x1="2" y1="8" x2="14" y2="8" />
							</g>
						</svg>
					</button>
					<StationInput bind:selectedLocation={stop.value} />
					<button
						class="button--small remove-button hoverable"
						type="button"
						tabindex="-1"
						on:click={() => void removeVia(i)}
					>
						<svg width="16px" height="16px">
							<g
								stroke="var(--foreground-color)"
								stroke-width="3"
								stroke-linecap="round"
							>
								<line x1="3" y1="3" x2="13" y2="13" />
								<line x1="3" y1="13" x2="13" y2="3" />
							</g>
						</svg>
					</button>
				</div>
			{/each}
		</div>
	</div>
	<div class="flex-row">
		<button
			class="hoverable padded-top-bottom"
			on:click={() => void (showModal = true)}
			type="button">Filter</button
		>
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
	</div>
</form>

<style>
	form {
        width: 100%;
		align-items: center;
	}
	.location-inputs--outer {
        width: 30rem;
        max-width: 100%;
	}
	.location-inputs--outer::before {
		content: "";
		background-color: var(--foreground-color);
		width: 4px;
		margin: calc(1rem) 0;
		position: relative;
		left: calc(38px + 1.5rem);
		flex-shrink: 0;
	}
	.location-inputs {
        width: 100%;
	}
	.input-container {
		width: min(100%, 30rem);
	}
	.input-container:last-child .add-button {
		visibility: hidden;
	}
	.input-container:first-child .remove-button,
	.input-container:last-child .remove-button {
		visibility: hidden;
	}

	.add-button {
		translate: 0 50%;
		align-self: center;
	}
	.remove-button {
		align-self: center;
	}

	.settings {
		padding: 0.5rem 1rem;
	}
</style>
