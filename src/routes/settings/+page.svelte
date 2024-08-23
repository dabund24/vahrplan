<script lang="ts">
	import Tabs from "$lib/components/Tabs.svelte";
	import Setting from "$lib/components/Setting.svelte";
	import { settings } from "$lib/stores/settingStore";
	import Header from "$lib/components/Header.svelte";
	import type { ComponentProps } from "svelte";

	const tabContent: ComponentProps<Tabs>["tabs"] = [
		{
			title: "Darstellung",
			content: viewSettings
		},
		{
			title: "Speicher",
			content: storageSettings
		}
	];
</script>

{#snippet viewSettings()}
	<h1>Allgemein</h1>
	<Setting
		settingName={"Dunkelmodus"}
		bind:setting={$settings.view.general.darkTheme}
		settingInfo={{
			type: "boolean"
		}}
	/>
	<Setting
		settingName={"Akzentfarbe"}
		bind:setting={$settings.view.general.color}
		settingInfo={{
			type: "options",
			options: [
				{ value: "red", name: "Rot" },
				{ value: "yellow", name: "Gelb" },
				{ value: "green", name: "Grün" },
				{ value: "blue", name: "Blau" },
				{ value: "purple", name: "Violett" }
			]
		}}
	/>
	<Setting
		settingName={"Verwischungseffekte"}
		bind:setting={$settings.view.general.blur}
		settingInfo={{
			type: "boolean"
		}}
	/>
	<h1>Verbindungsdiagramm</h1>
	<Setting
		settingName={"Verhältnis Breite Verbindungsabschnitt zu Reisedauer"}
		bind:setting={$settings.view.diagram.legWidth}
		settingInfo={{
			type: "options",
			options: [
				{ value: "linear", name: "Linear" },
				{ value: "logarithmic", name: "Logarithmisch" },
				{ value: "equal", name: "Konstant" }
			]
		}}
	/>
	<h1>Karte</h1>
	<Setting
		settingName={"Live-Standort auf Karte anzeigen"}
		bind:setting={$settings.view.map.geolocation}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={"Kartenebene"}
		bind:setting={$settings.view.map.layers}
		settingInfo={{
			type: "options",
			options: [
				{ value: "osm", name: "OpenStreetMap" },
				{ value: "orm", name: "OpenRailwayMap" },
				{ value: "oepnvk", name: "ÖPNV-Karte" }
			]
		}}
	/>
	<Setting
		settingName={"Dunkelmodus auf Karte übertragen"}
		bind:setting={$settings.view.map.darkFilter}
		settingInfo={{ type: "boolean" }}
	/>
{/snippet}

{#snippet storageSettings()}
	<h1>Persistentes Speichern von Einstellungen</h1>
	<Setting
		settingName={"Verbindungsfilter"}
		bind:setting={$settings.storage.journeysOptions}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={"Darstellung"}
		bind:setting={$settings.storage.view}
		settingInfo={{ type: "boolean" }}
	/>
{/snippet}

<svelte:head>
	<title>Einstellungen</title>
	<meta name="description" content="Einstellungen" />
</svelte:head>

<Header title={"Einstellungen"} mobileOnly={true} />
<div id="settings">
	<Tabs tabs={tabContent} isBelowHeaderMobile={true} padContent={true} />
</div>

<style>
	#settings {
		max-width: 30rem;
		margin: auto;
		text-wrap: balance;
	}

	h1 {
		font-size: 1.2rem;
	}
	h1:not(:first-of-type) {
		padding-top: 0.5rem;
	}

	@media screen and (min-width: 1000px) {
		:global(main) {
			overflow-y: auto;
		}
	}
</style>
