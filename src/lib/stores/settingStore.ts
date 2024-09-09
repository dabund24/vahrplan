import { writable } from "svelte/store";
import type { JourneysOptions } from "hafas-client";
import { browser } from "$app/environment";

export const products = {
	nationalExpress: "Intercity-Express",
	national: "Intercity/Eurocity",
	regionalExpress: "sonst. Fernzug",
	regional: "Regionalexpress/-bahn",
	suburban: "S-Bahn",
	subway: "U-Bahn",
	tram: "Straßenbahn",
	bus: "Bus",
	ferry: "Fähre",
	taxi: "Ruftaxi"
} as const;
export type Product = keyof typeof products;

export type Settings = {
	journeysOptions: JourneysOptions & {
		accessibility: "none" | "partial" | "complete";
		bike: boolean;
		products: {
			[product in Product]: boolean;
		};
		transfers: -1 | 0 | 1 | 2 | 3 | 4 | 5;
		transferTime: number;
	};
	general: {
		colorScheme: "system" | "light" | "dark";
		color: "red" | "yellow" | "green" | "blue" | "purple";
		journeyDetailsStandardView: "classic" | "map";
		shortLinksDiagrams: boolean;
		shortLinksJourneys: boolean;
		mapGeolocation: boolean;
		mapDarkFilter: boolean;
	};
	storage: { [Key in Exclude<keyof Settings, "storage">]: boolean };
};

export const settings = writable<Settings>({
	journeysOptions: {
		accessibility: "none",
		bike: false,
		products: {
			bus: true,
			ferry: true,
			national: true,
			nationalExpress: true,
			regional: true,
			regionalExpress: true,
			suburban: true,
			subway: true,
			taxi: true,
			tram: true
		},
		transfers: -1,
		transferTime: 0
	},
	general: {
		colorScheme: "system",
		color: "green",
		journeyDetailsStandardView: "classic",
		shortLinksDiagrams: false,
		shortLinksJourneys: false,
		mapGeolocation: false,
		mapDarkFilter: true
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
function applyLocalStorageSettingGroupToAppSettings<K extends keyof Settings>(
	type: K,
	settings: Settings
): Settings {
	const storageSettingsStringified = window.localStorage.getItem(type);
	if (storageSettingsStringified === null) {
		// the setting group does not exist in local storage of user => keep default settings
		return settings;
	}
	const storageSettings = JSON.parse(storageSettingsStringified) as Partial<Settings[K]>;

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
