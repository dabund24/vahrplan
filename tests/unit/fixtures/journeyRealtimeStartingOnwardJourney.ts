import type { Journey } from "hafas-client";

export const lindauInselToAugsburgJourney: Journey = {
	type: "journey",
	legs: [
		{
			origin: {
				id: "8000230",
				name: "Lindau-Insel",
				type: "station",
				location: {
					type: "location",
					id: "8000230",
					latitude: 47.544308,
					longitude: 9.68078
				},
				products: {
					nationalExpress: false,
					national: false,
					regionalExpress: true,
					regional: true,
					suburban: true,
					subway: false,
					tram: false,
					bus: false,
					taxi: false,
					ferry: false
				},
				weight: 46268.3,
				ril100Ids: ["MLI"],
				ifoptId: "de:09776:1546",
				priceCategory: 3,
				transitAuthority: "BEG",
				stadaId: "3727"
			},
			destination: {
				id: "8003693",
				name: "Lindau-Reutin",
				type: "station",
				location: {
					type: "location",
					id: "8003693",
					latitude: 47.552406,
					longitude: 9.70284
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: true,
					regional: true,
					suburban: true,
					subway: false,
					tram: false,
					bus: false,
					taxi: false,
					ferry: false
				},
				weight: 68417.9,
				ril100Ids: ["MLIR"],
				ifoptId: "de:09776:1592",
				priceCategory: 3,
				transitAuthority: "BEG",
				stadaId: "3729"
			},
			departure: "2025-05-30T16:50:00+02:00",
			plannedDeparture: "2025-05-30T16:50:00+02:00",
			departureDelay: undefined,
			arrival: "2025-05-30T17:10:00+02:00",
			plannedArrival: "2025-05-30T17:10:00+02:00",
			arrivalDelay: null,
			public: true,
			walking: true,
			distance: 1886,
			transfer: true
		},
		{
			origin: {
				id: "8003693",
				name: "Lindau-Reutin",
				type: "station",
				location: {
					type: "location",
					id: "8003693",
					latitude: 47.552406,
					longitude: 9.70284
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: true,
					regional: true,
					suburban: true,
					subway: false,
					tram: false,
					bus: false,
					taxi: false,
					ferry: false
				},
				weight: 68417.9,
				ril100Ids: ["MLIR"],
				ifoptId: "de:09776:1592",
				priceCategory: 3,
				transitAuthority: "BEG",
				stadaId: "3729"
			},
			destination: {
				id: "8000057",
				name: "Buchloe",
				type: "station",
				location: {
					type: "location",
					id: "8000057",
					latitude: 48.033733,
					longitude: 10.71623
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: false,
					regional: true,
					suburban: false,
					subway: false,
					tram: false,
					bus: false,
					taxi: false,
					ferry: false
				},
				weight: 59776.5,
				ril100Ids: ["MBU"],
				ifoptId: "de:09777:1000",
				priceCategory: 3,
				transitAuthority: "BEG",
				stadaId: "944"
			},
			departure: "2025-05-30T17:10:00+02:00",
			plannedDeparture: "2025-05-30T17:10:00+02:00",
			departureDelay: 0,
			arrival: "2025-05-30T18:29:00+02:00",
			plannedArrival: "2025-05-30T18:23:00+02:00",
			arrivalDelay: 360,
			polyline: undefined,
			tripId: "2|#VN#1#ST#1748297855#PI#0#ZI#350825#TA#0#DA#300525#1S#8503000#1T#1533#LS#8098261#LT#1904#PU#80#RT#1#CA#EC#ZE#195#ZB#EC   195#PC#1#FR#8503000#FT#1533#TO#8098261#TT#1904#",
			line: {
				type: "line",
				id: "ece-195",
				fahrtNr: "195",
				name: "ECE 195",
				public: true,
				adminCode: "80____",
				productName: "ECE",
				mode: "train",
				product: "nationalExpress",
				operator: {
					type: "operator",
					id: "db-fernverkehr-ag",
					name: "DB Fernverkehr AG"
				}
			},
			direction: "München Hbf Gl.27-36",
			arrivalPlatform: "2",
			plannedArrivalPlatform: "2",
			departurePlatform: "22",
			plannedDeparturePlatform: "22",
			stopovers: [
				{
					stop: {
						id: "8003693",
						name: "Lindau-Reutin",
						type: "station",
						location: {
							type: "location",
							id: "8003693",
							latitude: 47.552406,
							longitude: 9.70284
						},
						products: {
							nationalExpress: true,
							national: true,
							regionalExpress: true,
							regional: true,
							suburban: true,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 68417.9,
						ril100Ids: ["MLIR"],
						ifoptId: "de:09776:1592",
						priceCategory: 3,
						transitAuthority: "BEG",
						stadaId: "3729"
					},
					arrival: null,
					plannedArrival: null,
					arrivalDelay: null,
					arrivalPlatform: "22",
					arrivalPrognosisType: null,
					plannedArrivalPlatform: "22",
					departure: "2025-05-30T17:10:00+02:00",
					plannedDeparture: "2025-05-30T17:10:00+02:00",
					departureDelay: 0,
					departurePlatform: "22",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "22",
					loadFactor: "very-high",
					remarks: []
				},
				{
					stop: {
						id: "8000249",
						name: "Memmingen",
						type: "station",
						location: {
							type: "location",
							id: "8000249",
							latitude: 47.985847,
							longitude: 10.186954
						},
						products: {
							nationalExpress: true,
							national: true,
							regionalExpress: false,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 57066.6,
						ril100Ids: ["MM"],
						ifoptId: "de:09764:3100",
						priceCategory: 3,
						transitAuthority: "BEG",
						stadaId: "4051"
					},
					arrival: "2025-05-30T18:04:00+02:00",
					plannedArrival: "2025-05-30T17:58:00+02:00",
					arrivalDelay: 360,
					arrivalPlatform: "1",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "1",
					departure: "2025-05-30T18:06:00+02:00",
					plannedDeparture: "2025-05-30T18:01:00+02:00",
					departureDelay: 300,
					departurePlatform: "1",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "1",
					loadFactor: "very-high",
					remarks: []
				},
				{
					stop: {
						id: "8000057",
						name: "Buchloe",
						type: "station",
						location: {
							type: "location",
							id: "8000057",
							latitude: 48.033733,
							longitude: 10.71623
						},
						products: {
							nationalExpress: true,
							national: true,
							regionalExpress: false,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 59776.5,
						ril100Ids: ["MBU"],
						ifoptId: "de:09777:1000",
						priceCategory: 3,
						transitAuthority: "BEG",
						stadaId: "944"
					},
					arrival: "2025-05-30T18:29:00+02:00",
					plannedArrival: "2025-05-30T18:23:00+02:00",
					arrivalDelay: 360,
					arrivalPlatform: "2",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "2",
					departure: undefined,
					plannedDeparture: undefined,
					departureDelay: undefined,
					departurePlatform: "2",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "2",
					remarks: []
				}
			],
			remarks: [
				{
					text: "Fahrradmitnahme reservierungspflichtig",
					type: "hint",
					code: "bicycle-conveyance-reservation",
					summary: "bicycles conveyed, subject to reservation"
				},
				{
					text: "Fahrradmitnahme begrenzt möglich",
					type: "hint",
					code: "bicycle-conveyance",
					summary: "bicycles conveyed"
				},
				{
					text: "Bordrestaurant",
					type: "hint",
					code: "on-board-restaurant",
					summary: "Bordrestaurant available"
				}
			],
			loadFactor: "very-high"
		},
		{
			origin: {
				id: "8000057",
				name: "Buchloe",
				type: "station",
				location: {
					type: "location",
					id: "8000057",
					latitude: 48.033733,
					longitude: 10.71623
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: false,
					regional: true,
					suburban: false,
					subway: false,
					tram: false,
					bus: false,
					taxi: false,
					ferry: false
				},
				weight: 59776.5,
				ril100Ids: ["MBU"],
				ifoptId: "de:09777:1000",
				priceCategory: 3,
				transitAuthority: "BEG",
				stadaId: "944"
			},
			destination: {
				id: "8000057",
				name: "Buchloe",
				type: "station",
				location: {
					type: "location",
					id: "8000057",
					latitude: 48.033733,
					longitude: 10.71623
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: false,
					regional: true,
					suburban: false,
					subway: false,
					tram: false,
					bus: false,
					taxi: false,
					ferry: false
				},
				weight: 59776.5,
				ril100Ids: ["MBU"],
				ifoptId: "de:09777:1000",
				priceCategory: 3,
				transitAuthority: "BEG",
				stadaId: "944"
			},
			departure: "2025-05-30T18:29:00+02:00",
			plannedDeparture: "2025-05-30T18:23:00+02:00",
			departureDelay: 360,
			arrival: "2025-05-30T18:29:00+02:00",
			plannedArrival: "2025-05-30T18:23:00+02:00",
			arrivalDelay: 360,
			public: true,
			walking: true,
			distance: null
		},
		{
			origin: {
				id: "8000057",
				name: "Buchloe",
				type: "station",
				location: {
					type: "location",
					id: "8000057",
					latitude: 48.033733,
					longitude: 10.71623
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: false,
					regional: true,
					suburban: false,
					subway: false,
					tram: false,
					bus: false,
					taxi: false,
					ferry: false
				},
				transitAuthority: "BEG"
			},
			destination: {
				id: "8000013",
				name: "Augsburg Hbf",
				type: "station",
				location: {
					type: "location",
					id: "8000013",
					latitude: 48.365246,
					longitude: 10.885595
				},
				products: {
					nationalExpress: true,
					national: true,
					regionalExpress: true,
					regional: true,
					suburban: false,
					subway: false,
					tram: false,
					bus: false,
					taxi: false,
					ferry: false
				},
				transitAuthority: "BEG"
			},
			departure: "2025-05-30T18:38:00+02:00",
			plannedDeparture: "2025-05-30T18:38:00+02:00",
			departureDelay: 0,
			arrival: "2025-05-30T19:09:00+02:00",
			plannedArrival: "2025-05-30T19:09:00+02:00",
			arrivalDelay: 0,
			polyline: undefined,
			tripId: "2|#VN#1#ST#1748297855#PI#0#ZI#1379717#TA#2#DA#300525#1S#8000057#1T#1838#LS#8000013#LT#1909#PU#80#RT#1#CA#DPN#ZE#62785#ZB#BRB62785#PC#3#FR#8000057#FT#1838#TO#8000013#TT#1909#",
			line: {
				type: "line",
				id: "brb-62785",
				fahrtNr: "62785",
				name: "BRB RB77",
				public: true,
				adminCode: "Y8____",
				productName: "BRB",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "bayerische-regiobahn",
					name: "Bayerische Regiobahn"
				}
			},
			direction: "Augsburg Hbf",
			arrivalPlatform: "10 C-E",
			plannedArrivalPlatform: "10 C-E",
			departurePlatform: "1",
			plannedDeparturePlatform: "1",
			stopovers: [
				{
					stop: {
						id: "8000057",
						name: "Buchloe",
						type: "station",
						location: {
							type: "location",
							id: "8000057",
							latitude: 48.033733,
							longitude: 10.71623
						},
						products: {
							nationalExpress: true,
							national: true,
							regionalExpress: false,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 59776.5,
						ril100Ids: ["MBU"],
						ifoptId: "de:09777:1000",
						priceCategory: 3,
						transitAuthority: "BEG",
						stadaId: "944"
					},
					arrival: null,
					plannedArrival: null,
					arrivalDelay: null,
					arrivalPlatform: "1",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "1",
					departure: "2025-05-30T18:38:00+02:00",
					plannedDeparture: "2025-05-30T18:38:00+02:00",
					departureDelay: 0,
					departurePlatform: "1",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "1",
					remarks: []
				},
				{
					stop: {
						id: "8005444",
						name: "Schwabmünchen",
						type: "station",
						location: {
							type: "location",
							id: "8005444",
							latitude: 48.17845,
							longitude: 10.768106
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExpress: false,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 857.4,
						ril100Ids: ["MSMN"],
						ifoptId: "de:09772:7200",
						priceCategory: 5,
						transitAuthority: "BEG",
						stadaId: "5702"
					},
					arrival: "2025-05-30T18:47:00+02:00",
					plannedArrival: "2025-05-30T18:47:00+02:00",
					arrivalDelay: 0,
					arrivalPlatform: "3",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "3",
					departure: "2025-05-30T18:48:00+02:00",
					plannedDeparture: "2025-05-30T18:48:00+02:00",
					departureDelay: 0,
					departurePlatform: "3",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "3",
					remarks: []
				},
				{
					stop: {
						id: "8001033",
						name: "Bobingen",
						type: "station",
						location: {
							type: "location",
							id: "8001033",
							latitude: 48.266373,
							longitude: 10.83789
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExpress: false,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 5545.2,
						ril100Ids: ["MBOB"],
						ifoptId: "de:09772:7100",
						priceCategory: 4,
						transitAuthority: "BEG",
						stadaId: "717"
					},
					arrival: "2025-05-30T18:55:00+02:00",
					plannedArrival: "2025-05-30T18:55:00+02:00",
					arrivalDelay: 0,
					arrivalPlatform: "2",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "2",
					departure: "2025-05-30T18:55:00+02:00",
					plannedDeparture: "2025-05-30T18:55:00+02:00",
					departureDelay: 0,
					departurePlatform: "2",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "2",
					remarks: []
				},
				{
					stop: {
						id: "8003079",
						name: "Inningen",
						type: "station",
						location: {
							type: "location",
							id: "8003079",
							latitude: 48.311356,
							longitude: 10.868911
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExpress: false,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 166.4,
						ril100Ids: ["MINI"],
						ifoptId: "de:09761:700",
						priceCategory: 6,
						transitAuthority: "BEG",
						stadaId: "2997"
					},
					arrival: "2025-05-30T18:59:00+02:00",
					plannedArrival: "2025-05-30T18:59:00+02:00",
					arrivalDelay: 0,
					arrivalPlatform: "2",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "2",
					departure: "2025-05-30T19:00:00+02:00",
					plannedDeparture: "2025-05-30T19:00:00+02:00",
					departureDelay: 0,
					departurePlatform: "2",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "2",
					remarks: []
				},
				{
					stop: {
						id: "8000659",
						name: "Augsburg Messe",
						type: "station",
						location: {
							type: "location",
							id: "8000659",
							latitude: 48.338684,
							longitude: 10.886081
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExpress: false,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 857.4,
						ril100Ids: ["MAGM"],
						ifoptId: "de:09761:600",
						priceCategory: 5,
						transitAuthority: "BEG",
						stadaId: "7996"
					},
					arrival: "2025-05-30T19:03:00+02:00",
					plannedArrival: "2025-05-30T19:03:00+02:00",
					arrivalDelay: 0,
					arrivalPlatform: "1",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "1",
					departure: "2025-05-30T19:03:00+02:00",
					plannedDeparture: "2025-05-30T19:03:00+02:00",
					departureDelay: 0,
					departurePlatform: "1",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "1",
					remarks: []
				},
				{
					stop: {
						id: "8000660",
						name: "Augsburg Morellstr.",
						type: "station",
						location: {
							type: "location",
							id: "8000660",
							latitude: 48.35508,
							longitude: 10.893074
						},
						products: {
							nationalExpress: false,
							national: false,
							regionalExpress: false,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						weight: 166.4,
						ril100Ids: ["MAMS"],
						ifoptId: "de:09761:120",
						priceCategory: 6,
						transitAuthority: "BEG",
						stadaId: "222"
					},
					arrival: "2025-05-30T19:05:00+02:00",
					plannedArrival: "2025-05-30T19:05:00+02:00",
					arrivalDelay: 0,
					arrivalPlatform: "1",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "1",
					departure: "2025-05-30T19:06:00+02:00",
					plannedDeparture: "2025-05-30T19:06:00+02:00",
					departureDelay: 0,
					departurePlatform: "1",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "1",
					remarks: []
				},
				{
					stop: {
						id: "8000013",
						name: "Augsburg Hbf",
						type: "station",
						location: {
							type: "location",
							id: "8000013",
							latitude: 48.365246,
							longitude: 10.885595
						},
						products: {
							nationalExpress: true,
							national: true,
							regionalExpress: true,
							regional: true,
							suburban: false,
							subway: false,
							tram: false,
							bus: false,
							taxi: false,
							ferry: false
						},
						transitAuthority: "BEG"
					},
					arrival: "2025-05-30T19:09:00+02:00",
					plannedArrival: "2025-05-30T19:09:00+02:00",
					arrivalDelay: 0,
					arrivalPlatform: "10 C-E",
					arrivalPrognosisType: undefined,
					plannedArrivalPlatform: "10 C-E",
					departure: undefined,
					plannedDeparture: undefined,
					departureDelay: undefined,
					departurePlatform: "10 C-E",
					departurePrognosisType: undefined,
					plannedDeparturePlatform: "10 C-E",
					remarks: []
				}
			],
			remarks: [
				{
					text: "Fahrradmitnahme begrenzt möglich",
					type: "hint",
					code: "bicycle-conveyance",
					summary: "bicycles conveyed"
				},
				{
					code: "FZ",
					summary: "Fahrkarten im Zug erhältlich",
					text: "Fahrkarten im Zug erhältlich",
					type: "hint",
					priority: 350
				},
				{
					code: "ER",
					summary: "Rampe im Zug",
					text: "Rampe im Zug",
					type: "hint",
					priority: 560
				},
				{
					code: "EA",
					summary: "Behindertengerechte Ausstattung",
					text: "Behindertengerechte Ausstattung",
					type: "hint",
					priority: 560
				},
				{
					text: "Klimaanlage",
					type: "hint",
					code: "air-conditioned",
					summary: "air-conditioned vehicle"
				}
			]
		}
	],
	refreshToken:
		"¶HKI¶TF$A=1@O=Lindau-Insel@X=9680465@Y=47544343@L=8000230@a=128@$A=1@O=Lindau-Reutin@X=9703289@Y=47552388@L=8003693@a=128@$202505301650$202505301710$$$1$$$$$$§T$A=1@O=Lindau-Reutin@X=9703289@Y=47552388@L=8003693@a=128@$A=1@O=Buchloe@X=10716221@Y=48033725@L=8000057@a=128@$202505301710$202505301823$ECE  195$$1$$$$$$§T$A=1@O=Buchloe@X=10716221@Y=48033725@L=8000057@a=128@$A=1@O=Augsburg Hbf@X=10885568@Y=48365444@L=8000013@a=128@$202505301838$202505301909$BRB62785$$1$$$$$$",
	remarks: []
} as Journey;
