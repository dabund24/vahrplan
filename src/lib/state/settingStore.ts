import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { GetDiagramApiClient } from "../../routes/api/diagram/getClient";
import type { JourneysOptions, Product } from "$lib/types";

export const products: Record<Product, string> = {
	longDistanceExpress: "Intercity-Express",
	longDistance: "Intercity/Eurocity",
	regionalExpress: "sonst. Fernzug",
	regional: "Regionalexpress/-bahn",
	suburban: "S-Bahn",
	subway: "U-Bahn",
	tram: "Straßenbahn",
	bus: "Bus",
	taxi: "Ruftaxi",
	ferry: "Fähre"
} as const;

export type Settings = {
	journeysOptions: ReturnType<GetDiagramApiClient["parse"]>["options"];
	general: {
		colorScheme: "system" | "light" | "dark";
		color: "red" | "yellow" | "green" | "blue" | "purple";
		isLineIcons: boolean;
		journeyDetailsStandardView: "classic" | "map";
		shortLinksDiagrams: boolean;
		shortLinksJourneys: boolean;
		mapGeolocation: boolean;
		isMapAlwaysLight: boolean;
	};
	storage: Record<Exclude<keyof Settings, "storage">, boolean>;
};

export const defaultJourneysOptions: JourneysOptions = {
	products: {
		longDistanceExpress: true,
		longDistance: true,
		regionalExpress: true,
		regional: true,
		suburban: true,
		subway: true,
		tram: true,
		bus: true,
		taxi: true,
		ferry: true
	},
	bike: false,
	accessible: false,
	maxTransfers: -1,
	minTransferTime: 0
};

export const settings = writable<Settings>({
	journeysOptions: defaultJourneysOptions,
	general: {
		colorScheme: "system",
		color: "green",
		isLineIcons: true,
		journeyDetailsStandardView: "classic",
		shortLinksDiagrams: false,
		shortLinksJourneys: false,
		mapGeolocation: false,
		isMapAlwaysLight: false
	},
	storage: {
		journeysOptions: false,
		general: false
	}
});

if (browser) {
	settings.update((settings) => {
		let key: keyof Settings;
		for (key in settings) {
			if (key === "storage") {
				continue;
			}
			settings = applyLocalStorageSettingGroupToAppSettings(key, settings);
		}
		document.documentElement.setAttribute("data-theme", settings.general.colorScheme);
		document.documentElement.setAttribute("data-color", settings.general.color);
		return settings;
	});

	settings.subscribe((settings) => {
		let k: keyof Settings;
		for (k in settings) {
			if (k === "storage") continue;
			if (settings.storage[k]) {
				window.localStorage.setItem(k, JSON.stringify(settings[k]));
			} else {
				window.localStorage.removeItem(k);
			}
		}
		document.documentElement.setAttribute("data-theme", settings.general.colorScheme);
		document.documentElement.setAttribute("data-color", settings.general.color);

		let isDarkTheme: boolean;
		if (settings.general.colorScheme === "system") {
			isDarkTheme =
				window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		} else {
			isDarkTheme = settings.general.colorScheme === "dark";
		}
		const themeColorElement = document.getElementById("theme-color")!;
		themeColorElement.setAttribute("content", isDarkTheme ? "#121212" : "#ffffff");

		return settings;
	});
}

/**
 * find settings of setting group stored in local storage of user and apply them safely to passed app settings
 * @param type the group of settings to be updated
 * @param settings all app settings
 * @returns the updated settings. The object reference remains unchanged
 */
function applyLocalStorageSettingGroupToAppSettings<K extends Exclude<keyof Settings, "storage">>(
	type: K,
	settings: Settings
): Settings {
	const storageSettingsStringified = window.localStorage.getItem(type);
	if (storageSettingsStringified === null) {
		// the setting group does not exist in local storage of user => keep default settings
		return settings;
	}
	settings.storage[type] = true; // the group is in fact stored
	const storageSettings = JSON.parse(storageSettingsStringified) as Partial<Settings[K]>; // assume that some settings could be not existing in storage settings

	let key: keyof Settings[K];
	for (key in settings[type]) {
		// loop through all settings in setting group and apply settings from local storage
		const storedSetting = storageSettings[key];
		if (storedSetting !== undefined) {
			// the setting is set in local storage
			settings[type][key] = storedSetting;
		}
	}
	return settings;
}
