import type { ProfileConfig } from "../src/routes/[lang=lang]/[profile=profileId]/api/profile/profile.server";

export const exampleProfileConfig: ProfileConfig = {
	name: "Beispiel",
	id: "dbnav",
	lang: "de",
	supportedLanguages: ["de"],
	products: {
		longDistanceExpress: {
			name: "InterCityExpress"
		},
		bus: {
			name: "Bus"
		}
	},
	options: {
		minTransferTime: {
			name: "Mindest-Umsteigezeit",
			possibleValues: [0, 2, 5, 10, 15, 20, 30, 40, 50, 60],
			defaultValue: 0,
			optionNames: {
				"0": {
					de: "0min"
				},
				"2": {
					de: "2min"
				},
				"5": {
					de: "5min"
				},
				"10": {
					de: "10min"
				},
				"15": {
					de: "15min"
				},
				"20": {
					de: "20min"
				},
				"30": {
					de: "30min"
				},
				"40": {
					de: "40min"
				},
				"50": {
					de: "50min"
				},
				"60": {
					de: "1h"
				}
			}
		},
		bike: {
			name: "Fahrradmitnahme",
			defaultValue: false
		}
	}
};
