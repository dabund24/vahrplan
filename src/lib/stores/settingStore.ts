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
	view: {
		general: {
			darkTheme: boolean;
			color: "red" | "yellow" | "green" | "blue" | "purple";
			blur: boolean;
		};
		diagram: {
			legWidth: "equal" | "logarithmic" | "linear";
		};
		map: {
			geolocation: boolean;
			layers: "osm" | "orm" | "oepnvk";
			darkFilter: boolean;
		};
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
	view: {
		general: {
			darkTheme: false,
			color: "green",
			blur: false
		},
		diagram: {
			legWidth: "logarithmic"
		},
		map: {
			geolocation: false,
			layers: "osm",
			darkFilter: true
		}
	},
	storage: {
		journeysOptions: false,
		view: false
	}
});

if (browser) {
	settings.update((settings) => {
		const systemDarkTheme =
			window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (systemDarkTheme) {
			settings.view.general.darkTheme = true;
		}

		let k: keyof Settings;
		for (k in settings) {
			if (k === "storage") continue;
			const storedSetting = window.localStorage.getItem(k);
			if (storedSetting === null) continue;
			if (k === "view") {
				settings.view = JSON.parse(storedSetting) as Settings["view"];
				settings.storage.view = true;
			} else if (k === "journeysOptions") {
				settings.journeysOptions = JSON.parse(storedSetting) as Settings["journeysOptions"];
				settings.storage.journeysOptions = true;
			}
		}
		document.documentElement.setAttribute(
			"data-theme",
			settings.view.general.darkTheme ? "dark" : "light"
		);
		document.documentElement.setAttribute("data-color", settings.view.general.color);
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
		document.documentElement.setAttribute(
			"data-theme",
			settings.view.general.darkTheme ? "dark" : "light"
		);
		document.documentElement.setAttribute("data-color", settings.view.general.color);
		document
			.getElementById("theme-color")!
			.setAttribute("content", settings.view.general.darkTheme ? "#121212" : "#ffffff");

		return settings;
	});
}
