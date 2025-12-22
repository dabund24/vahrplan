export const bvgRefreshParsedRes = {
	refreshToken:
		"¶HKI¶T$A=1@O=S+U Alexanderplatz Bhf (Berlin)@L=900100003@a=128@$A=1@O=U Hermannplatz (Berlin)@L=900078101@a=128@$202512072200$202512072210$      U8$$1$$$$$$§T$A=1@O=U Hermannplatz (Berlin)@L=900078101@a=128@$A=1@O=U Rudow (Berlin)@L=900083201@a=128@$202512072215$202512072233$      U7$$1$$$$$$§T$A=1@O=U Rudow (Berlin)@L=900083201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512072237$202512072250$      X7$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#0#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
	blocks: [
		{
			type: "leg",
			tripId: "1|86329|1|86|7122025",
			blockKey: "Berliner_Verkehrsbetriebe21817U8Hermannstra_e",
			attribute: "cancelled",
			departureData: {
				location: {
					name: "S+U Alexanderplatz Bhf (Berlin)",
					id: "900100003",
					type: "station",
					position: {
						lat: 52.521508,
						lng: 13.411267,
					},
				},
				attribute: "cancelled",
				time: {
					departure: {
						time: new Date("2025-12-07T21:00:00.000Z"),
						status: "cancelled",
					},
				},
				platformData: null,
			},
			arrivalData: {
				location: {
					name: "U Hermannplatz (Berlin)",
					id: "900078101",
					type: "station",
					position: {
						lat: 52.486954,
						lng: 13.424724,
					},
				},
				attribute: "cancelled",
				time: {
					arrival: {
						time: new Date("2025-12-07T21:10:00.000Z"),
						status: "cancelled",
					},
				},
				platformData: null,
			},
			duration: 10,
			direction: "Hermannstraße",
			name: "U8",
			productName: "U",
			product: "subway",
			operator: "Berliner Verkehrsbetriebe",
			cycle: {
				min: 10,
				max: 10,
			},
			tripNumber: "21817",
			info: {
				statuses: [
					"U 8: Derzeit fährt die Linie aufgrund einer Betriebsstörung unregelmäßig.",
					"U 8: Die Linie fährt aufgrund eines Polizei-Einsatzes nicht zwischen U Bernauer Straße und U Hermannplatz. Bitte nutzen Sie die umliegenden Bus und U-Bahnlinien.",
					"U8: Fällt aus",
					"Halt entfällt",
					"Halt entfällt",
				],
				hints: [
					"Fahrradmitnahme möglich (S+U Alexanderplatz Bhf (Berlin))",
					"Fahrradmitnahme möglich (U Hermannplatz (Berlin))",
				],
			},
			currentLocation: {
				type: "currentLocation",
				name: "U8 → Hermannstraße",
				id: '{"type":"location"}',
				position: {
					lat: 52.564602,
					lng: 13.363813,
				},
				asAt: new Date(69),
			},
			stopovers: [
				{
					location: {
						name: "S+U Jannowitzbrücke (Berlin)",
						id: "900100004",
						type: "station",
						position: {
							lat: 52.515503,
							lng: 13.418027,
						},
					},
					attribute: "cancelled",
					time: {
						arrival: {
							time: new Date("2025-12-07T21:02:00.000Z"),
							status: "cancelled",
						},
						departure: {
							time: new Date("2025-12-07T21:02:00.000Z"),
							status: "cancelled",
						},
					},
					platformData: null,
				},
				{
					location: {
						name: "U Heinrich-Heine-Str. (Berlin)",
						id: "900100008",
						type: "station",
						position: {
							lat: 52.510559,
							lng: 13.416122,
						},
					},
					attribute: "cancelled",
					time: {
						arrival: {
							time: new Date("2025-12-07T21:03:00.000Z"),
							status: "cancelled",
						},
						departure: {
							time: new Date("2025-12-07T21:03:00.000Z"),
							status: "cancelled",
						},
					},
					platformData: null,
				},
				{
					location: {
						name: "U Moritzplatz (Berlin)",
						id: "900013101",
						type: "station",
						position: {
							lat: 52.503737,
							lng: 13.410944,
						},
					},
					attribute: "cancelled",
					time: {
						arrival: {
							time: new Date("2025-12-07T21:05:00.000Z"),
							status: "cancelled",
						},
						departure: {
							time: new Date("2025-12-07T21:05:00.000Z"),
							status: "cancelled",
						},
					},
					platformData: null,
				},
				{
					location: {
						name: "U Kottbusser Tor (Berlin)",
						id: "900013102",
						type: "station",
						position: {
							lat: 52.499044,
							lng: 13.417749,
						},
					},
					attribute: "cancelled",
					time: {
						arrival: {
							time: new Date("2025-12-07T21:07:00.000Z"),
							status: "cancelled",
						},
						departure: {
							time: new Date("2025-12-07T21:07:00.000Z"),
							status: "cancelled",
						},
					},
					platformData: null,
				},
				{
					location: {
						name: "U Schönleinstr. (Berlin)",
						id: "900016201",
						type: "station",
						position: {
							lat: 52.493345,
							lng: 13.421911,
						},
					},
					attribute: "cancelled",
					time: {
						arrival: {
							time: new Date("2025-12-07T21:08:00.000Z"),
							status: "cancelled",
						},
						departure: {
							time: new Date("2025-12-07T21:08:00.000Z"),
							status: "cancelled",
						},
					},
					platformData: null,
				},
			],
			polyline: [
				[52.52151, 13.41127],
				[52.52095, 13.41263],
				[52.51936, 13.41475],
				[52.51759, 13.41591],
				[52.51729, 13.41632],
				[52.51658, 13.41786],
				[52.51631, 13.41807],
				[52.5156, 13.41814],
				[52.51501, 13.41806],
				[52.51304, 13.41743],
				[52.51108, 13.4165],
				[52.51013, 13.41574],
				[52.50365, 13.41063],
				[52.50231, 13.40969],
				[52.50186, 13.40975],
				[52.5016, 13.40997],
				[52.50132, 13.41048],
				[52.49947, 13.41697],
				[52.49891, 13.41789],
				[52.49844, 13.41846],
				[52.49676, 13.41949],
				[52.49601, 13.42043],
				[52.49497, 13.42079],
				[52.49349, 13.42171],
				[52.48822, 13.42499],
				[52.48777, 13.42501],
				[52.48648, 13.42433],
				[52.48696, 13.42472],
			],
			succeededBy: "transfer",
		},
		{
			type: "transfer",
			transferTime: 6,
			transitData: {
				location: {
					name: "U Hermannplatz (Berlin)",
					id: "900078101",
					type: "station",
					position: {
						lat: 52.486954,
						lng: 13.424724,
					},
				},
				time: {
					arrival: {
						time: new Date("2025-12-07T21:10:00.000Z"),
						status: "cancelled",
					},
					departure: {
						time: new Date("2025-12-07T21:16:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				attribute: "cancelled",
				platformData: null,
				platformData2: {
					platform: "1 (U7)",
					platformChanged: false,
				},
			},
			arrivalProduct: "subway",
			departureProduct: "subway",
			isStopover: false,
		},
		{
			type: "leg",
			tripId: "1|85936|1|86|7122025",
			blockKey: "Berliner_Verkehrsbetriebe20374U7Rudow",
			departureData: {
				location: {
					name: "U Hermannplatz (Berlin)",
					id: "900078101",
					type: "station",
					position: {
						lat: 52.486954,
						lng: 13.424724,
					},
				},
				time: {
					departure: {
						time: new Date("2025-12-07T21:16:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "1 (U7)",
					platformChanged: false,
				},
			},
			arrivalData: {
				location: {
					name: "U Rudow (Berlin)",
					id: "900083201",
					type: "station",
					position: {
						lat: 52.415714,
						lng: 13.49653,
					},
				},
				time: {
					arrival: {
						time: new Date("2025-12-07T21:34:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			duration: 18,
			direction: "Rudow",
			name: "U7",
			productName: "U",
			product: "subway",
			operator: "Berliner Verkehrsbetriebe",
			cycle: {
				min: 10,
				max: 10,
			},
			tripNumber: "20374",
			info: {
				statuses: [],
				hints: [
					"Fahrradmitnahme möglich (U Hermannplatz (Berlin))",
					"Fahrradmitnahme möglich (U Rudow (Berlin))",
				],
			},
			currentLocation: {
				type: "currentLocation",
				name: "U7 → Rudow",
				id: '{"type":"location"}',
				position: {
					lat: 52.526263,
					lng: 13.304808,
				},
				asAt: new Date(69),
			},
			stopovers: [
				{
					location: {
						name: "U Rathaus Neukölln (Berlin)",
						id: "900078102",
						type: "station",
						position: {
							lat: 52.481147,
							lng: 13.43481,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:18:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:18:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Karl-Marx-Str. (Berlin)",
						id: "900078103",
						type: "station",
						position: {
							lat: 52.476427,
							lng: 13.439808,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:19:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:19:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "S+U Neukölln (Berlin)",
						id: "900078201",
						type: "station",
						position: {
							lat: 52.469137,
							lng: 13.442011,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:21:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:21:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Grenzallee (Berlin)",
						id: "900080202",
						type: "station",
						position: {
							lat: 52.463519,
							lng: 13.444824,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:22:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:22:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Blaschkoallee (Berlin)",
						id: "900080201",
						type: "station",
						position: {
							lat: 52.452741,
							lng: 13.448977,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:24:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:24:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Parchimer Allee (Berlin)",
						id: "900080401",
						type: "station",
						position: {
							lat: 52.445298,
							lng: 13.449966,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:25:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:25:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Britz-Süd (Berlin)",
						id: "900080402",
						type: "station",
						position: {
							lat: 52.437073,
							lng: 13.447665,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:27:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:27:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Johannisthaler Chaussee (Berlin)",
						id: "900082202",
						type: "station",
						position: {
							lat: 52.429252,
							lng: 13.453849,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:28:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:28:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Lipschitzallee (Berlin)",
						id: "900082201",
						type: "station",
						position: {
							lat: 52.424649,
							lng: 13.463108,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:30:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:30:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Wutzkyallee (Berlin)",
						id: "900083102",
						type: "station",
						position: {
							lat: 52.423148,
							lng: 13.474821,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:31:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:31:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
				{
					location: {
						name: "U Zwickauer Damm (Berlin)",
						id: "900083101",
						type: "station",
						position: {
							lat: 52.423031,
							lng: 13.484368,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:32:00.000Z"),
							delay: 1,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:32:00.000Z"),
							delay: 1,
							status: "on-time",
						},
					},
					platformData: {
						platform: "1",
						platformChanged: false,
					},
				},
			],
			polyline: [
				[52.48696, 13.42472],
				[52.48633, 13.42414],
				[52.48257, 13.43264],
				[52.48169, 13.43402],
				[52.47982, 13.43678],
				[52.47936, 13.43726],
				[52.47744, 13.43866],
				[52.47652, 13.43916],
				[52.47258, 13.44112],
				[52.46867, 13.44176],
				[52.46557, 13.44234],
				[52.46402, 13.44379],
				[52.46278, 13.44474],
				[52.45804, 13.44826],
				[52.45753, 13.44851],
				[52.45695, 13.44856],
				[52.45518, 13.44823],
				[52.45217, 13.4491],
				[52.44972, 13.44985],
				[52.44864, 13.44999],
				[52.44659, 13.44992],
				[52.44474, 13.44952],
				[52.44394, 13.44909],
				[52.44232, 13.44756],
				[52.44143, 13.44713],
				[52.44029, 13.44711],
				[52.43783, 13.44805],
				[52.4329, 13.45006],
				[52.43101, 13.45149],
				[52.42917, 13.45348],
				[52.42825, 13.45471],
				[52.42731, 13.45621],
				[52.42659, 13.45759],
				[52.42538, 13.46041],
				[52.42475, 13.4623],
				[52.42427, 13.46385],
				[52.42409, 13.46484],
				[52.42329, 13.47208],
				[52.42328, 13.47473],
				[52.42352, 13.4815],
				[52.4235, 13.48231],
				[52.42328, 13.48371],
				[52.41637, 13.49509],
				[52.41572, 13.49653],
			],
			precededBy: "transfer",
			succeededBy: "transfer",
		},
		{
			type: "transfer",
			transferTime: 3,
			transitData: {
				location: {
					name: "U Rudow (Berlin)",
					id: "900083201",
					type: "station",
					position: {
						lat: 52.415714,
						lng: 13.49653,
					},
				},
				time: {
					arrival: {
						time: new Date("2025-12-07T21:34:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2025-12-07T21:37:00.000Z"),
						delay: 0,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
				platformData2: {
					platform: "Pos. 1",
					platformChanged: false,
				},
			},
			arrivalProduct: "subway",
			departureProduct: "bus",
			isStopover: false,
		},
		{
			type: "leg",
			tripId: "1|68816|4|86|7122025",
			blockKey: "Berliner_Verkehrsbetriebe170757X7Flughafen_BER",
			departureData: {
				location: {
					name: "U Rudow (Berlin)",
					id: "900083201",
					type: "station",
					position: {
						lat: 52.415714,
						lng: 13.49653,
					},
				},
				time: {
					departure: {
						time: new Date("2025-12-07T21:37:00.000Z"),
						delay: 0,
						status: "on-time",
					},
				},
				platformData: {
					platform: "Pos. 1",
					platformChanged: false,
				},
			},
			arrivalData: {
				location: {
					name: "Flughafen BER",
					id: "900260009",
					type: "station",
					position: {
						lat: 52.36461,
						lng: 13.50987,
					},
				},
				time: {
					arrival: {
						time: new Date("2025-12-07T21:50:00.000Z"),
						delay: 0,
						status: "on-time",
					},
				},
				platformData: {
					platform: "Pos. A6",
					platformChanged: false,
				},
			},
			duration: 13,
			direction: "Flughafen BER",
			lineShape: {
				background: {
					type: "preset",
					value: "background",
				},
				border: {
					type: "preset",
					value: "product",
				},
				lineName: "X7",
				shape: "pill",
				text: {
					type: "preset",
					value: "product",
				},
			},
			name: "X7",
			productName: "Bus",
			product: "bus",
			operator: "Berliner Verkehrsbetriebe",
			cycle: {
				min: 10,
				max: 31,
			},
			tripNumber: "170757",
			info: {
				statuses: [],
				hints: [],
			},
			stopovers: [
				{
					location: {
						name: "Lieselotte-Berger-Str. (Berlin)",
						id: "900083351",
						type: "station",
						position: {
							lat: 52.404235,
							lng: 13.51085,
						},
					},
					time: {
						arrival: {
							time: new Date("2025-12-07T21:40:00.000Z"),
							delay: 0,
							status: "on-time",
						},
						departure: {
							time: new Date("2025-12-07T21:40:00.000Z"),
							delay: 0,
							status: "on-time",
						},
					},
					platformData: null,
				},
			],
			polyline: [
				[52.41572, 13.49653],
				[52.41582, 13.49597],
				[52.4144, 13.49973],
				[52.4137, 13.50103],
				[52.41315, 13.50177],
				[52.40952, 13.50561],
				[52.40469, 13.51026],
				[52.39865, 13.51645],
				[52.39688, 13.51789],
				[52.39683, 13.51804],
				[52.39695, 13.51858],
				[52.39687, 13.5187],
				[52.39561, 13.51978],
				[52.39452, 13.52101],
				[52.39414, 13.52165],
				[52.38943, 13.5268],
				[52.3865, 13.53098],
				[52.38241, 13.53778],
				[52.37972, 13.5412],
				[52.37835, 13.54265],
				[52.37509, 13.5452],
				[52.37402, 13.54541],
				[52.37338, 13.54515],
				[52.37279, 13.54456],
				[52.37212, 13.54322],
				[52.37182, 13.54231],
				[52.37126, 13.54025],
				[52.36608, 13.51848],
				[52.36602, 13.51765],
				[52.36627, 13.51672],
				[52.36776, 13.51571],
				[52.36796, 13.51543],
				[52.36802, 13.51507],
				[52.36793, 13.51394],
				[52.36675, 13.50888],
				[52.36651, 13.5087],
				[52.36635, 13.50875],
				[52.3643, 13.51004],
				[52.36461, 13.50987],
			],
			precededBy: "transfer",
		},
	],
	arrivalTime: {
		time: new Date("2025-12-07T21:50:00.000Z"),
		delay: 0,
		status: "on-time",
	},
	departureTime: {
		time: new Date("2025-12-07T21:00:00.000Z"),
		status: "cancelled",
	},
	ticketData: {
		currency: "EUR",
	},
};
