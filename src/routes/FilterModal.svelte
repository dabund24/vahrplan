<script lang="ts">
	import Tabs from "$lib/components/Tabs.svelte";
	import ModalToggle from "$lib/components/ModalToggle.svelte";
	import { products, settings } from "$lib/stores/settingStore";
	import type { ComponentProps } from "svelte";
	import Setting from "$lib/components/Setting.svelte";
	import Modal from "$lib/components/Modal.svelte";

	function setQuickMeansPreset(preset: "all" | "regional" | "longDistance"): void {
		settings.update((settings) => {
			settings.journeysOptions.products = {
				nationalExpress: preset === "all" || preset === "longDistance",
				national: preset === "all" || preset === "longDistance",
				regionalExpress: preset === "all" || preset === "longDistance",
				regional: preset === "all" || preset === "regional",
				subway: preset === "all" || preset === "regional",
				suburban: preset === "all" || preset === "regional",
				tram: preset === "all" || preset === "regional",
				bus: preset === "all" || preset === "regional",
				taxi: preset === "all" || preset === "regional",
				ferry: preset === "all" || preset === "regional"
			};
			return settings;
		});
	}

	const modalTabContent: ComponentProps<typeof Tabs>["tabs"] = [
		{
			title: "Verkehrsmittel",
			content: meansFilter
		},
		{
			title: "Sonstiges",
			content: generalFilter
		}
	];
</script>

<ModalToggle showModalKey="showFilterModal">
	<div class="button-content">Filter</div>
</ModalToggle>
<Modal showModalKey="showFilterModal" title="Verbindungsfilter" height="35rem">
	<Tabs tabs={modalTabContent} isBelowHeaderMobile={true} isBelowHeaderDesktop={true} />
</Modal>

{#snippet generalFilter()}
	<Setting
		settingName="Fahrradmitnahme"
		bind:setting={$settings.journeysOptions.bike}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName="Barrierefreiheit"
		bind:setting={$settings.journeysOptions.accessibility}
		settingInfo={{
			type: "options",
			options: [
				{ value: "none", name: "ignorieren" },
				{ value: "partial", name: "bevorzugen" },
				{ value: "complete", name: "strikt" }
			]
		}}
	/>
	<Setting
		settingName="Maximale Umstiegsanzahl"
		bind:setting={$settings.journeysOptions.transfers}
		settingInfo={{
			type: "options",
			options: [
				{ value: 0, name: "0" },
				{ value: 1, name: "1" },
				{ value: 2, name: "2" },
				{ value: 3, name: "3" },
				{ value: 4, name: "4" },
				{ value: 5, name: "5" },
				{ value: -1, name: "beliebig" }
			]
		}}
	/>
	<Setting
		settingName="Mindestumsteigezeit"
		bind:setting={$settings.journeysOptions.transferTime}
		settingInfo={{
			type: "options",
			options: [
				{ value: 0, name: "0min" },
				{ value: 2, name: "2min" },
				{ value: 5, name: "5min" },
				{ value: 10, name: "10min" },
				{ value: 15, name: "15min" },
				{ value: 20, name: "20min" },
				{ value: 30, name: "30min" },
				{ value: 40, name: "40min" },
				{ value: 50, name: "50min" },
				{ value: 60, name: "1h" }
			]
		}}
	/>
{/snippet}
{#snippet meansFilter()}
	<div class="quick-means-presets flex-row padded-top-bottom">
		<button
			onclick={() => void setQuickMeansPreset("all")}
			type="button"
			class="hoverable hoverable--visible"
		>
			Alle
		</button>
		<button
			onclick={() => void setQuickMeansPreset("regional")}
			type="button"
			class="hoverable hoverable--visible"
		>
			Nur Regional-/Nahverkehr
		</button>
		<button
			onclick={() => void setQuickMeansPreset("longDistance")}
			type="button"
			class="hoverable hoverable--visible"
		>
			Nur Fernverkehr
		</button>
	</div>
	{#each Object.entries(products) as [product, productName]}
		<Setting
			settingName={productName}
			bind:setting={$settings.journeysOptions.products[product]}
			settingInfo={{ type: "boolean" }}
		/>
	{/each}
{/snippet}

<style>
	.quick-means-presets {
		gap: 0.5rem;
		flex-wrap: wrap;
		& > * {
			padding: 0.5rem 0.75rem;
			text-wrap: nowrap;
		}
	}

	.button-content {
		padding: 0.5rem;
	}
</style>
