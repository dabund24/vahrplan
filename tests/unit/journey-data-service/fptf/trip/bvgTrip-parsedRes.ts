export const bvgTripParsedRes = {
	leg: {
		type: "leg",
		tripId: "1|73342|0|86|11042026",
		blockKey: "Berliner_Verkehrsbetriebe13382U2Pankow",
		departureData: {
			location: {
				name: "U Theodor-Heuss-Platz (Berlin)",
				id: "900026201",
				type: "station",
				position: {
					lat: 52.509795,
					lng: 13.272977,
				},
			},
			time: {
				departure: {
					time: new Date("2026-04-11T11:34:00.000Z"),
					delay: 0,
					status: "on-time",
				},
			},
			platformData: {
				platform: "2",
				platformChanged: false,
			},
		},
		arrivalData: {
			location: {
				name: "S+U Pankow (Berlin)",
				id: "900130002",
				type: "station",
				position: {
					lat: 52.567281,
					lng: 13.412283,
				},
			},
			time: {
				arrival: {
					time: new Date("2026-04-11T12:17:00.000Z"),
					delay: 1,
					status: "on-time",
				},
			},
			platformData: {
				platform: "2",
				platformChanged: false,
			},
		},
		attribute: undefined,
		duration: 43,
		direction: "Pankow",
		name: "U2",
		productName: "U",
		product: "subway",
		operator: "Berliner Verkehrsbetriebe",
		tripNumber: "13382",
		info: {
			statuses: [],
			hints: ["Fahrradmitnahme möglich"],
		},
		currentLocation: {
			type: "currentLocation",
			name: "U2 → Pankow",
			id: '{"type":"location"}',
			position: {
				lat: 52.498316,
				lng: 13.359562,
			},
			asAt: new Date("1970-01-01T00:00:00.042Z"),
		},
		cycle: undefined,
		lineShape: undefined,
		loadFactor: undefined,
		stopovers: [
			{
				location: {
					name: "U Kaiserdamm (Berlin)",
					id: "900026202",
					type: "station",
					position: {
						lat: 52.509984,
						lng: 13.281697,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:35:00.000Z"),
						delay: 0,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:35:00.000Z"),
						delay: 0,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Sophie-Charlotte-Platz (Berlin)",
					id: "900022101",
					type: "station",
					position: {
						lat: 52.510973,
						lng: 13.297464,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:38:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:38:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Bismarckstr. (Berlin)",
					id: "900024201",
					type: "station",
					position: {
						lat: 52.511539,
						lng: 13.305339,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:39:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:39:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2 (U2)",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Deutsche Oper (Berlin)",
					id: "900022201",
					type: "station",
					position: {
						lat: 52.511827,
						lng: 13.30942,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:40:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:40:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Ernst-Reuter-Platz (Berlin)",
					id: "900023101",
					type: "station",
					position: {
						lat: 52.511584,
						lng: 13.32258,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:42:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:42:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "S+U Zoologischer Garten Bhf (Berlin)",
					id: "900023201",
					type: "station",
					position: {
						lat: 52.506919,
						lng: 13.332711,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:44:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:44:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2 (U2)",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Wittenbergplatz (Berlin)",
					id: "900056101",
					type: "station",
					position: {
						lat: 52.502109,
						lng: 13.342563,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:46:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:46:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Nollendorfplatz (Berlin)",
					id: "900056102",
					type: "station",
					position: {
						lat: 52.499646,
						lng: 13.353826,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:48:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:48:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Bülowstr. (Berlin)",
					id: "900056104",
					type: "station",
					position: {
						lat: 52.497624,
						lng: 13.362456,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:49:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:49:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Gleisdreieck (Berlin)",
					id: "900017103",
					type: "station",
					position: {
						lat: 52.499583,
						lng: 13.374295,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:51:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:51:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2 (U2)",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Mendelssohn-Bartholdy-Park (Berlin)",
					id: "900005252",
					type: "station",
					position: {
						lat: 52.503188,
						lng: 13.374681,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:53:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:53:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "S+U Potsdamer Platz Bhf (Berlin)",
					id: "900100020",
					type: "station",
					position: {
						lat: 52.509355,
						lng: 13.376551,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:54:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:54:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2 (U2)",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Anton-Wilhelm-Amo-Str. (Berlin)",
					id: "900100010",
					type: "station",
					position: {
						lat: 52.511521,
						lng: 13.383796,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:56:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:56:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Stadtmitte (Berlin)",
					id: "900100011",
					type: "station",
					position: {
						lat: 52.511494,
						lng: 13.38972,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:57:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:57:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2 (U2)",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Hausvogteiplatz (Berlin)",
					id: "900100012",
					type: "station",
					position: {
						lat: 52.513364,
						lng: 13.395348,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T11:58:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T11:58:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Spittelmarkt (Berlin)",
					id: "900100013",
					type: "station",
					position: {
						lat: 52.511413,
						lng: 13.402027,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T12:00:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T12:00:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Märkisches Museum (Berlin)",
					id: "900100014",
					type: "station",
					position: {
						lat: 52.512007,
						lng: 13.408768,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T12:01:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T12:01:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Klosterstr. (Berlin)",
					id: "900100015",
					type: "station",
					position: {
						lat: 52.517229,
						lng: 13.412454,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T12:02:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T12:02:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "S+U Alexanderplatz Bhf (Berlin)",
					id: "900100003",
					type: "station",
					position: {
						lat: 52.521508,
						lng: 13.411267,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T12:04:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T12:04:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2 (U2)",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Rosa-Luxemburg-Platz (Berlin)",
					id: "900100016",
					type: "station",
					position: {
						lat: 52.528529,
						lng: 13.41009,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T12:07:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T12:07:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Eberswalder Str. (Berlin)",
					id: "900110006",
					type: "station",
					position: {
						lat: 52.541024,
						lng: 13.412157,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T12:11:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T12:11:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "S+U Schönhauser Allee (Berlin)",
					id: "900110001",
					type: "station",
					position: {
						lat: 52.549339,
						lng: 13.415142,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T12:13:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T12:13:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
			{
				location: {
					name: "U Vinetastr. (Berlin)",
					id: "900130011",
					type: "station",
					position: {
						lat: 52.559515,
						lng: 13.413766,
					},
				},
				time: {
					arrival: {
						time: new Date("2026-04-11T12:15:00.000Z"),
						delay: 1,
						status: "on-time",
					},
					departure: {
						time: new Date("2026-04-11T12:15:00.000Z"),
						delay: 1,
						status: "on-time",
					},
				},
				platformData: {
					platform: "2",
					platformChanged: false,
				},
			},
		],
		polyline: [
			[52.50986, 13.27259],
			[52.50956, 13.27499],
			[52.50957, 13.27576],
			[52.51006, 13.2831],
			[52.51087, 13.29584],
			[52.51148, 13.30514],
			[52.51177, 13.31073],
			[52.51229, 13.31763],
			[52.51258, 13.32014],
			[52.51246, 13.32109],
			[52.51178, 13.32208],
			[52.50911, 13.32583],
			[52.50589, 13.33297],
			[52.50528, 13.3343],
			[52.50504, 13.3358],
			[52.50488, 13.3361],
			[52.50438, 13.33647],
			[52.50404, 13.33693],
			[52.50225, 13.34147],
			[52.5018, 13.34297],
			[52.49936, 13.35457],
			[52.49757, 13.36314],
			[52.4972, 13.36519],
			[52.49719, 13.36628],
			[52.49693, 13.36793],
			[52.49699, 13.37205],
			[52.49706, 13.37261],
			[52.49719, 13.37299],
			[52.49768, 13.37359],
			[52.49949, 13.37429],
			[52.50053, 13.37415],
			[52.50117, 13.37418],
			[52.50381, 13.37492],
			[52.50602, 13.37618],
			[52.50671, 13.37642],
			[52.5083, 13.37727],
			[52.50899, 13.37799],
			[52.50948, 13.37887],
			[52.51068, 13.38012],
			[52.51099, 13.38073],
			[52.51113, 13.38191],
			[52.51171, 13.38503],
			[52.51213, 13.39058],
			[52.51231, 13.39258],
			[52.51243, 13.3929],
			[52.51306, 13.39358],
			[52.51323, 13.39394],
			[52.51332, 13.39546],
			[52.5131, 13.39747],
			[52.51143, 13.40163],
			[52.51128, 13.40371],
			[52.51124, 13.4056],
			[52.51134, 13.40682],
			[52.51231, 13.41019],
			[52.51289, 13.41161],
			[52.51342, 13.41201],
			[52.5172, 13.41254],
			[52.51751, 13.41245],
			[52.5186, 13.41151],
			[52.51889, 13.41142],
			[52.51941, 13.41192],
			[52.5205, 13.41457],
			[52.5209, 13.41474],
			[52.52112, 13.41468],
			[52.52176, 13.41422],
			[52.52297, 13.41178],
			[52.52391, 13.41017],
			[52.52415, 13.41001],
			[52.52454, 13.41006],
			[52.52605, 13.41116],
			[52.5266, 13.41109],
			[52.52769, 13.4105],
			[52.52895, 13.4099],
			[52.52938, 13.40993],
			[52.53045, 13.41104],
			[52.53118, 13.41214],
			[52.53181, 13.41261],
			[52.53242, 13.41277],
			[52.53345, 13.4129],
			[52.53557, 13.41249],
			[52.5381, 13.41224],
			[52.54198, 13.41227],
			[52.54395, 13.41244],
			[52.54914, 13.41373],
			[52.55456, 13.41469],
			[52.55679, 13.41439],
			[52.55765, 13.41406],
			[52.55841, 13.41352],
			[52.55914, 13.41332],
			[52.56504, 13.41264],
			[52.56603, 13.41227],
			[52.56683, 13.41177],
		],
	},
};
