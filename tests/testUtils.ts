import type { ProfileConfig } from "$lib/server/profiles/profile";

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
					name: "0min"
				},
				"2": {
					name: "2min"
				},
				"5": {
					name: "5min"
				},
				"10": {
					name: "10min"
				},
				"15": {
					name: "15min"
				},
				"20": {
					name: "20min"
				},
				"30": {
					name: "30min"
				},
				"40": {
					name: "40min"
				},
				"50": {
					name: "50min"
				},
				"60": {
					name: "1h"
				}
			}
		},
		bike: {
			name: "Fahrradmitnahme",
			defaultValue: false
		}
	}
};
