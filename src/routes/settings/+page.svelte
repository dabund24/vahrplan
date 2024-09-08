<script lang="ts">
	import Setting from "$lib/components/Setting.svelte";
	import { settings } from "$lib/stores/settingStore";
	import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Einstellungen</title>
	<meta name="description" content="Einstellungen für Vahrplan" />
</svelte:head>

<Header title={"Einstellungen"} mobileOnly={true} />
<div class="content-wrapper">
	<h1>Farbschema</h1>
	<Setting
		settingName={"Dunkelmodus"}
		bind:setting={$settings.general.darkTheme}
		settingInfo={{
			type: "boolean"
		}}
	/>
	<Setting
		settingName={"Akzentfarbe"}
		bind:setting={$settings.general.color}
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
	<h1><span class="mobile-only">Reisedetails</span><span class="desktop-only">Reisevorschau</span></h1>
	<Setting
		settingName="Standardansicht"
		bind:setting={$settings.general.journeyDetailsStandardView}
		settingInfo={{
			type: "options",
			options: [
				{ value: "classic", name: "Klassisch" },
				{ value: "map", name: "Karte" }
			]
		}}
	/>
	<h1>Karte</h1>
	<Setting
		settingName={"Live-Standort auf Karte anzeigen"}
		bind:setting={$settings.general.mapGeolocation}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={"Dunkelmodus auf Karte übertragen"}
		bind:setting={$settings.general.mapDarkFilter}
		settingInfo={{ type: "boolean" }}
	/>
	<h1>Generierung von Kurzlinks beim Teilen</h1>
	<Setting
		settingName={"Kurzlinks für Verbindungsdiagramme"}
		bind:setting={$settings.general.shortLinksDiagrams}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={"Kurzlinks für Reisen"}
		bind:setting={$settings.general.shortLinksJourneys}
		settingInfo={{ type: "boolean" }}
	/>
	<h1>Persistentes Speichern von Einstellungen</h1>
	<Setting
		settingName={"App-Einstellungen"}
		bind:setting={$settings.storage.general}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={"Verbindungsfilter"}
		bind:setting={$settings.storage.journeysOptions}
		settingInfo={{ type: "boolean" }}
	/>
</div>

<style>
	.content-wrapper {
		padding: 0 1rem;
	}
	h1 {
		font-size: 1.2rem;
		padding-top: 0.5rem;
	}

	@media screen and (min-width: 1000px) {
		:global(main) {
			overflow-y: auto;
		}
	}
</style>
