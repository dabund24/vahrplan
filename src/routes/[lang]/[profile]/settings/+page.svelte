<script lang="ts">
	import Setting from "$lib/components/Setting.svelte";
	import { settings } from "$lib/state/settingStore";
	import ButtonModal from "$lib/components/ModalToggle.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import Modal from "$lib/components/Modal.svelte";
</script>

<svelte:head>
	<title>Vahrplan - Einstellungen</title>
	<meta name="description" content="Einstellungen für Vahrplan" />
</svelte:head>

<div class="content-wrapper">
	<h1>Einstellungen</h1>
	<h2>Allgemein</h2>
	<Setting
		settingName="Schema"
		bind:setting={$settings.general.colorScheme}
		settingInfo={{
			type: "options",
			options: [
				{ value: "system", name: "System" },
				{ value: "light", name: "Hell" },
				{ value: "dark", name: "Dunkel" },
				{ value: "midnight", name: "Mitternacht" }
			]
		}}
	/>
	<Setting
		settingName="Akzentfarbe"
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
	<Setting
		settingName="Linien-Icons verwenden"
		bind:setting={$settings.general.isLineIcons}
		settingInfo={{ type: "boolean" }}
	/>
	<h2>
		<span class="mobile-only">Reisedetails</span><span class="desktop-only">Reisevorschau</span>
	</h2>
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
	<h2>Karte</h2>
	<Setting
		settingName="Live-Standort auf Karte anzeigen"
		bind:setting={$settings.general.mapGeolocation}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName="Karte vom Farbschema unabhängig immer hell lassen"
		bind:setting={$settings.general.isMapAlwaysLight}
		settingInfo={{ type: "boolean" }}
	/>
	<h2>Generierung von Kurzlinks beim Teilen</h2>
	<div class="button-modal-container">
		<Modal title="Datenschutzhinweis Kurzlinks" showModalKey="showPrivacyLinkModal">
			<div class="inline-icons">
				<p>
					Wird eine der folgenden beiden Einstellungen aktiviert, generiert Vahrplan beim
					Klick auf das
					<q>Teilen</q>-Symbol (<IconShare />) über einem Verbindungsdiagramm bzw. einer
					Reise einen Kurzlink.
				</p>
				<p>
					Der Server speichert für einen Kurzlink bis 7 Tage nach dem Zeitpunkt des
					Diagramms/des Endes der Reise, welches Diagramm/welche Reise ihm zugeordnet ist.
					Dies ist technisch notwendig, damit beim Aufrufen des Links das richtige
					Diagramm/die richtige Verbindung angezeigt werden kann. Zusätzliche Daten werden
					nicht gespeichert.
				</p>
			</div>
		</Modal>
		<ButtonModal showModalKey="showPrivacyLinkModal">
			<Warning>Datenschutzhinweis</Warning>
		</ButtonModal>
	</div>
	<Setting
		settingName="Kurzlinks für Verbindungsdiagramme"
		bind:setting={$settings.general.shortLinksDiagrams}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName="Kurzlinks für Reisen"
		bind:setting={$settings.general.shortLinksJourneys}
		settingInfo={{ type: "boolean" }}
	/>
	<h2>Dauerhaftes Speichern von Einstellungen</h2>
	<div class="button-modal-container">
		<Modal title="Datenschutzhinweis Local Storage" showModalKey="showPrivacyStoreModal">
			<div class="inline-icons">
				<p>
					Wird eine der folgenden beiden Einstellungen aktiviert, werden die
					App-Einstellungen bzw. die gesetzten Verbindungsfilter im Browser mit der
					Web-Technologie <a
						target="_blank"
						href="https://de.wikipedia.org/wiki/Web_Storage"><q>Local Storage</q></a
					> sessionübergreifend gespeichert. Dies ist für die Funktionalität technisch notwendig.
				</p>
				<p> Wird eine Einstellung wieder deaktiviert, werden die Daten wieder gelöscht.</p>
				<p
					>Mehr Informationen zu Local Storage befinden sich <a
						href="/de/dbnav/about/privacy#web-storage">in der Datenschutzerklärung</a
					>.
				</p>
			</div>
		</Modal>
		<ButtonModal showModalKey="showPrivacyStoreModal">
			<Warning>Datenschutzhinweis</Warning>
		</ButtonModal>
	</div>
	<Setting
		settingName="App-Einstellungen"
		bind:setting={$settings.storage.general}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName="Verbindungsfilter"
		bind:setting={$settings.storage.journeysOptions}
		settingInfo={{ type: "boolean" }}
	/>
</div>

<style>
	.button-modal-container {
		margin: 0.5rem 0;
	}

	@media screen and (min-width: 1000px) {
		:global(main) {
			overflow-y: auto;
		}
	}
</style>
