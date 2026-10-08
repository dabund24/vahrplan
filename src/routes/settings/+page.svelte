<script lang="ts">
	import Setting from "$lib/components/Setting.svelte";
	import { settings } from "$lib/state/settingStore";
	import ButtonModal from "$lib/components/ModalToggle.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
	<title>Vahrplan - {m.settings()}</title>
	<meta name="description" content={m.settings_subtitle()} />
</svelte:head>

<div class="content-wrapper">
	<h1>{m.settings()}</h1>
	<h2>{m.settings_general()}</h2>
	<Setting
		settingName={m.settings_theme()}
		bind:setting={$settings.general.colorScheme}
		settingInfo={{
			type: "options",
			options: [
				{ value: "system", name: m.settings_theme_system() },
				{ value: "light", name: m.settings_theme_light() },
				{ value: "dark", name: m.settings_theme_dark() },
				{ value: "midnight", name: m.settings_theme_midnight() },
			],
		}}
	/>
	<Setting
		settingName={m.settings_accent_color()}
		bind:setting={$settings.general.color}
		settingInfo={{
			type: "options",
			options: [
				{ value: "red", name: m.settings_accent_color_red() },
				{ value: "yellow", name: m.settings_accent_color_yellow() },
				{ value: "green", name: m.settings_accent_color_green() },
				{ value: "blue", name: m.settings_accent_color_blue() },
				{ value: "purple", name: m.settings_accent_color_purple() },
			],
		}}
	/>
	<Setting
		settingName={m.settings_use_line_icons()}
		bind:setting={$settings.general.isLineIcons}
		settingInfo={{ type: "boolean" }}
	/>
	<h2>
		<span class="mobile-only">{m.settings_journey_details()}</span><span class="desktop-only"
			>{m.settings_journey_preview()}</span
		>
	</h2>
	<Setting
		settingName={m.diagram_standard_view()}
		bind:setting={$settings.general.journeyDetailsStandardView}
		settingInfo={{
			type: "options",
			options: [
				{ value: "classic", name: m.settings_default_view_classic() },
				{ value: "map", name: m.settings_map() },
			],
		}}
	/>
	<h2>Karte</h2>
	<Setting
		settingName={m.settings_map_show_live_location()}
		bind:setting={$settings.general.mapGeolocation}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={m.settings_map_always_light()}
		bind:setting={$settings.general.isMapAlwaysLight}
		settingInfo={{ type: "boolean" }}
	/>
	<h2>{m.settings_short_links()}</h2>
	<div class="button-modal-container">
		<Modal title={m.settings_short_links_how_it_works()} showModalKey="showPrivacyLinkModal">
			<div class="inline-icons">
				<p>
					{m.settings_short_links_text_a()}
				</p>
				<p>
					{m.settings_short_links_text_b()}
				</p>
			</div>
		</Modal>
		<ButtonModal showModalKey="showPrivacyLinkModal">
			<Warning>{m.settings_short_links_how_it_works()}</Warning>
		</ButtonModal>
	</div>
	<Setting
		settingName={m.settings_short_links_for_search_queries()}
		bind:setting={$settings.general.shortLinksDiagrams}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={m.settings_short_links_for_journeys()}
		bind:setting={$settings.general.shortLinksJourneys}
		settingInfo={{ type: "boolean" }}
	/>
	<h2>{m.settings_remember_choices()}</h2>
	<Setting
		settingName={m.settings_remember_choices_app_settings()}
		bind:setting={$settings.storage.general}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={m.settings_remember_choices_means_of_transport()}
		bind:setting={$settings.storage.products}
		settingInfo={{ type: "boolean" }}
	/>
	<Setting
		settingName={m.settings_remember_choices_miscellaneous_filters()}
		bind:setting={$settings.storage.options}
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
