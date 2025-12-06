import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { JourneysFilters, Product } from "$lib/types";
import type { Profile } from "../server/profiles/profile";

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
	options: JourneysFilters["options"];
	products: JourneysFilters["products"];
	general: {
		colorScheme: "system" | "light" | "dark" | "midnight";
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

const defaultProducts: Record<Product, true> = {
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
};

const defaultOptions: {
	[K in keyof typeof Profile.availableOptions]: (typeof Profile.availableOptions)[K]["defaultValue"];
} = {
	bike: false,
	accessible: false,
	maxTransfers: -1,
	minTransferTime: 0
};

export const defaultJourneysFilters: JourneysFilters = {
	products: defaultProducts,
	options: defaultOptions
};

export const settings = writable<Settings>({
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
	...defaultJourneysFilters,
	storage: {
		general: false,
		options: false,
		products: false
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

		const themeColorElement = document.getElementById("theme-color")!;
		themeColorElement.setAttribute(
			"content",
			themeColorFromColorScheme(settings.general.colorScheme, settings.general.color)
		);

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

function themeColorFromColorScheme(
	colorScheme: Settings["general"]["colorScheme"],
	accentColor: Settings["general"]["color"]
): string {
	if (colorScheme === "midnight") {
		return "#000";
	}

	let isDarkTheme: boolean;
	if (colorScheme === "system") {
		isDarkTheme =
			window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
	} else {
		isDarkTheme = colorScheme === "dark";
	}

	let colorHue: number;
	switch (accentColor) {
		case "red":
			colorHue = 25;
			break;
		case "yellow":
			colorHue = 70;
			break;
		case "green":
			colorHue = 170;
			break;
		case "blue":
			colorHue = 252;
			break;
		case "purple":
			colorHue = 300;
	}

	if (isDarkTheme) {
		return `oklch(0.15 0.015 ${colorHue})`;
	} else {
		return `oklch(0.99 0.002 ${colorHue})`;
	}
}
