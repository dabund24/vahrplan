export const transitiousTripParsedRes = {
	leg: {
		type: "leg",
		tripId: "20260608_14:46_de-DELFI_3211624697",
		blockKey: "ExpressBusde_DELFI_3211624697X660Garching__Forschungszentrum__U_",
		departureData: {
			location: {
				name: "Freising,Weihenstephaner Berg",
				id: "de-DELFI_de:09178:2617:0:1",
				type: "station",
				position: {
					lat: 48.39568,
					lng: 11.725835,
				},
			},
			time: {
				departure: {
					time: new Date("2026-06-08T12:46:00.000Z"),
				},
			},
			platformData: null,
		},
		arrivalData: {
			location: {
				name: "Garching, Forschungszentrum",
				id: "de-DELFI_de:09184:460:30:1",
				type: "station",
				position: {
					lat: 48.26478,
					lng: 11.671226999999998,
				},
			},
			time: {
				arrival: {
					time: new Date("2026-06-08T13:17:00.000Z"),
				},
			},
			platformData: {
				platform: "1",
				platformChanged: false,
			},
		},
		duration: 31,
		direction: "Garching, Forschungszentrum (U)",
		name: "X660",
		productName: "X",
		product: "bus",
		operator: "ExpressBus",
		tripNumber: "de-DELFI_3211624697",
		info: {
			statuses: [],
			hints: [],
		},
		stopovers: [
			{
				location: {
					name: "Freising, Weihenstephan",
					id: "de-DELFI_de:09178:2911:0:1",
					type: "station",
					position: {
						lat: 48.39785,
						lng: 11.723930999999999,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-06-08T12:48:00.000Z"),
					},
					departure: {
						time: new Date("2026-06-08T12:48:00.000Z"),
					},
				},
				platformData: null,
			},
			{
				location: {
					name: "Freising, Weihenstephaner Str",
					id: "de-DELFI_de:09178:2918:0:1",
					type: "station",
					position: {
						lat: 48.39813600000001,
						lng: 11.737395999999999,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-06-08T12:50:00.000Z"),
					},
					departure: {
						time: new Date("2026-06-08T12:50:00.000Z"),
					},
				},
				platformData: null,
			},
			{
				location: {
					name: "Freising",
					id: "de-DELFI_de:09178:2680:2:12",
					type: "station",
					position: {
						lat: 48.39444399999999,
						lng: 11.742939,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-06-08T12:54:00.000Z"),
					},
					departure: {
						time: new Date("2026-06-08T12:54:00.000Z"),
					},
				},
				platformData: {
					platform: "12",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "Freising, Schlüterstraße",
					id: "de-DELFI_de:09178:2859:2:2",
					type: "station",
					position: {
						lat: 48.38639,
						lng: 11.736856999999999,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-06-08T12:58:00.000Z"),
					},
					departure: {
						time: new Date("2026-06-08T12:58:00.000Z"),
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "Achering, Acheringer Hauptstr.",
					id: "de-DELFI_de:09178:2871:0:2",
					type: "station",
					position: {
						lat: 48.343796,
						lng: 11.709396,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-06-08T13:04:00.000Z"),
					},
					departure: {
						time: new Date("2026-06-08T13:04:00.000Z"),
					},
				},
				platformData: null,
			},
			{
				location: {
					name: "Mintraching, Münchner Straße",
					id: "de-DELFI_de:09178:9617:0:2",
					type: "station",
					position: {
						lat: 48.317077999999995,
						lng: 11.690702,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-06-08T13:08:00.000Z"),
					},
					departure: {
						time: new Date("2026-06-08T13:08:00.000Z"),
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "Dietersheim, Auweg",
					id: "de-DELFI_de:09178:9616:0:2",
					type: "station",
					position: {
						lat: 48.281628,
						lng: 11.676679,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-06-08T13:12:00.000Z"),
					},
					departure: {
						time: new Date("2026-06-08T13:12:00.000Z"),
					},
				},
				platformData: null,
			},
			{
				location: {
					name: "Dietersheim, Am Isardamm",
					id: "de-DELFI_de:09178:9458:0:1",
					type: "station",
					position: {
						lat: 48.27801500000001,
						lng: 11.672933,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-06-08T13:13:00.000Z"),
					},
					departure: {
						time: new Date("2026-06-08T13:13:00.000Z"),
					},
				},
				platformData: null,
			},
		],
		polyline: [
			[48.39568, 11.725835],
			[48.39785, 11.723930999999999],
			[48.39813600000001, 11.737395999999999],
			[48.39444399999999, 11.742939],
			[48.38639, 11.736856999999999],
			[48.343796, 11.709396],
			[48.317077999999995, 11.690702],
			[48.281628, 11.676679],
			[48.27801500000001, 11.672933],
			[48.26478, 11.671226999999998],
		],
	},
};
