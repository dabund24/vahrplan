import type { Journeys } from "hafas-client";

export const bvgScrollRawRes = {
	earlierRef:
		"3|OB|MT#14#14706#14706#14756#14756#0#0#325#14687#7#0#10#0#0#-2147483648#1#2|PDH#b3f919b4bde6cc72b8616dd2a3c3215e|RD#7122025|RT#193857|US#1|RS#INIT",
	laterRef:
		"3|OF|MT#14#14806#14806#14856#14856#0#0#325#14787#12#0#10#0#0#-2147483648#1#2|PDH#b3f919b4bde6cc72b8616dd2a3c3215e|RD#7122025|RT#193857|US#1|RS#INIT",
	journeys: [
		{
			type: "journey",
			legs: [
				{
					origin: {
						type: "stop",
						id: "900003201",
						name: "S+U Berlin Hauptbahnhof",
						location: {
							type: "location",
							id: "900003201",
							latitude: 52.525607,
							longitude: 13.369072
						},
						products: {
							suburban: true,
							subway: true,
							tram: true,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:11000:900003201"
						}
					},
					destination: {
						type: "stop",
						id: "900260009",
						name: "Flughafen BER",
						location: {
							type: "location",
							id: "900260009",
							latitude: 52.36461,
							longitude: 13.50987
						},
						products: {
							suburban: true,
							subway: false,
							tram: false,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:12061:900260009"
						}
					},
					departure: "2025-12-08T05:06:00+01:00",
					plannedDeparture: "2025-12-08T05:06:00+01:00",
					departureDelay: 0,
					arrival: "2025-12-08T05:56:00+01:00",
					plannedArrival: "2025-12-08T05:56:00+01:00",
					arrivalDelay: 0,
					reachable: true,
					tripId: "1|4490|0|86|8122025",
					line: {
						type: "line",
						id: "de-vbb-11000000-s-bahn-s9",
						fahrtNr: "19464",
						name: "S9",
						public: true,
						adminCode: "DBS---",
						productName: "S",
						mode: "train",
						product: "suburban",
						operator: {
							type: "operator",
							id: "s-bahn-berlin-gmbh",
							name: "S-Bahn Berlin GmbH"
						}
					},
					direction: "Flughafen BER",
					arrivalPlatform: "5",
					plannedArrivalPlatform: "5",
					arrivalPrognosisType: "prognosed",
					departurePlatform: "15",
					plannedDeparturePlatform: "15",
					departurePrognosisType: "prognosed",
					stopovers: [
						{
							stop: {
								type: "stop",
								id: "900003201",
								name: "S+U Berlin Hauptbahnhof",
								location: {
									type: "location",
									id: "900003201",
									latitude: 52.525607,
									longitude: 13.369072
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900003201"
								}
							},
							arrival: null,
							plannedArrival: null,
							arrivalDelay: null,
							arrivalPlatform: null,
							arrivalPrognosisType: null,
							plannedArrivalPlatform: null,
							departure: "2025-12-08T05:06:00+01:00",
							plannedDeparture: "2025-12-08T05:06:00+01:00",
							departureDelay: 0,
							departurePlatform: "15",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "15",
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)"
								}
							]
						},
						{
							stop: {
								type: "stop",
								id: "900100001",
								name: "S+U Friedrichstr. Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100001",
									latitude: 52.520304,
									longitude: 13.387257
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100001"
								}
							},
							arrival: "2025-12-08T05:08:00+01:00",
							plannedArrival: "2025-12-08T05:08:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: "2025-12-08T05:08:00+01:00",
							plannedDeparture: "2025-12-08T05:08:00+01:00",
							departureDelay: 0,
							departurePlatform: "5",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "5"
						},
						{
							stop: {
								type: "stop",
								id: "900100002",
								name: "S Hackescher Markt (Berlin)",
								location: {
									type: "location",
									id: "900100002",
									latitude: 52.522605,
									longitude: 13.402359
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100002"
								}
							},
							arrival: "2025-12-08T05:10:00+01:00",
							plannedArrival: "2025-12-08T05:10:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:10:00+01:00",
							plannedDeparture: "2025-12-08T05:10:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100003",
								name: "S+U Alexanderplatz Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100003",
									latitude: 52.521508,
									longitude: 13.411267
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100003"
								}
							},
							arrival: "2025-12-08T05:12:00+01:00",
							plannedArrival: "2025-12-08T05:12:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:12:00+01:00",
							plannedDeparture: "2025-12-08T05:12:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100004",
								name: "S+U Jannowitzbrücke (Berlin)",
								location: {
									type: "location",
									id: "900100004",
									latitude: 52.515503,
									longitude: 13.418027
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100004"
								}
							},
							arrival: "2025-12-08T05:14:00+01:00",
							plannedArrival: "2025-12-08T05:14:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:14:00+01:00",
							plannedDeparture: "2025-12-08T05:14:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900120005",
								name: "S Ostbahnhof (Berlin)",
								location: {
									type: "location",
									id: "900120005",
									latitude: 52.510335,
									longitude: 13.435089
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900120005"
								}
							},
							arrival: "2025-12-08T05:16:00+01:00",
							plannedArrival: "2025-12-08T05:16:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "9",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "9",
							departure: "2025-12-08T05:17:00+01:00",
							plannedDeparture: "2025-12-08T05:17:00+01:00",
							departureDelay: 0,
							departurePlatform: "9",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "9"
						},
						{
							stop: {
								type: "stop",
								id: "900120004",
								name: "S+U Warschauer Str. (Berlin)",
								location: {
									type: "location",
									id: "900120004",
									latitude: 52.505768,
									longitude: 13.449157
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900120004"
								}
							},
							arrival: "2025-12-08T05:19:00+01:00",
							plannedArrival: "2025-12-08T05:19:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "2",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "2",
							departure: "2025-12-08T05:19:00+01:00",
							plannedDeparture: "2025-12-08T05:19:00+01:00",
							departureDelay: 0,
							departurePlatform: "2",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "2"
						},
						{
							stop: {
								type: "stop",
								id: "900190001",
								name: "S Treptower Park (Berlin)",
								location: {
									type: "location",
									id: "900190001",
									latitude: 52.493426,
									longitude: 13.461283
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900190001"
								}
							},
							arrival: "2025-12-08T05:22:00+01:00",
							plannedArrival: "2025-12-08T05:22:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:23:00+01:00",
							plannedDeparture: "2025-12-08T05:23:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191002",
								name: "S Plänterwald (Berlin)",
								location: {
									type: "location",
									id: "900191002",
									latitude: 52.47872,
									longitude: 13.47403
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191002"
								}
							},
							arrival: "2025-12-08T05:25:00+01:00",
							plannedArrival: "2025-12-08T05:25:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:25:00+01:00",
							plannedDeparture: "2025-12-08T05:25:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191001",
								name: "S Baumschulenweg (Berlin)",
								location: {
									type: "location",
									id: "900191001",
									latitude: 52.467582,
									longitude: 13.489501
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191001"
								}
							},
							arrival: "2025-12-08T05:27:00+01:00",
							plannedArrival: "2025-12-08T05:27:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:30:00+01:00",
							plannedDeparture: "2025-12-08T05:30:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900192001",
								name: "S Schöneweide Bhf (Berlin)",
								location: {
									type: "location",
									id: "900192001",
									latitude: 52.45461,
									longitude: 13.510149
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900192001"
								}
							},
							arrival: "2025-12-08T05:33:00+01:00",
							plannedArrival: "2025-12-08T05:33:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:33:00+01:00",
							plannedDeparture: "2025-12-08T05:33:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193001",
								name: "S Johannisthal (Berlin)",
								location: {
									type: "location",
									id: "900193001",
									latitude: 52.446691,
									longitude: 13.524028
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193001"
								}
							},
							arrival: "2025-12-08T05:35:00+01:00",
							plannedArrival: "2025-12-08T05:35:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:36:00+01:00",
							plannedDeparture: "2025-12-08T05:36:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193002",
								name: "S Adlershof (Berlin)",
								location: {
									type: "location",
									id: "900193002",
									latitude: 52.435104,
									longitude: 13.54055
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193002"
								}
							},
							arrival: "2025-12-08T05:38:00+01:00",
							plannedArrival: "2025-12-08T05:38:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:38:00+01:00",
							plannedDeparture: "2025-12-08T05:38:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900195510",
								name: "S Altglienicke (Berlin)",
								location: {
									type: "location",
									id: "900195510",
									latitude: 52.407795,
									longitude: 13.559598
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900195510"
								}
							},
							arrival: "2025-12-08T05:42:00+01:00",
							plannedArrival: "2025-12-08T05:42:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T05:43:00+01:00",
							plannedDeparture: "2025-12-08T05:43:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900196001",
								name: "S Grünbergallee (Berlin)",
								location: {
									type: "location",
									id: "900196001",
									latitude: 52.399543,
									longitude: 13.54322
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900196001"
								}
							},
							arrival: "2025-12-08T05:45:00+01:00",
							plannedArrival: "2025-12-08T05:45:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T05:45:00+01:00",
							plannedDeparture: "2025-12-08T05:45:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260005",
								name: "S Schönefeld (bei Berlin) Bhf",
								location: {
									type: "location",
									id: "900260005",
									latitude: 52.390904,
									longitude: 13.513043
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260005"
								}
							},
							arrival: "2025-12-08T05:48:00+01:00",
							plannedArrival: "2025-12-08T05:48:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T05:48:00+01:00",
							plannedDeparture: "2025-12-08T05:48:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260080",
								name: "S Waßmannsdorf",
								location: {
									type: "location",
									id: "900260080",
									latitude: 52.368287,
									longitude: 13.463432
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:12061:900260080"
								}
							},
							arrival: "2025-12-08T05:52:00+01:00",
							plannedArrival: "2025-12-08T05:52:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T05:52:00+01:00",
							plannedDeparture: "2025-12-08T05:52:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260009",
								name: "Flughafen BER",
								location: {
									type: "location",
									id: "900260009",
									latitude: 52.36461,
									longitude: 13.50987
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260009"
								}
							},
							arrival: "2025-12-08T05:56:00+01:00",
							plannedArrival: "2025-12-08T05:56:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: null,
							plannedDeparture: null,
							departureDelay: null,
							departurePlatform: null,
							departurePrognosisType: null,
							plannedDeparturePlatform: null,
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (Flughafen BER)"
								}
							]
						}
					],
					cycle: {
						min: 1200,
						max: 1200,
						nr: 7
					}
				}
			],
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080506$202512080556$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			cycle: {
				min: 1200
			}
		},
		{
			type: "journey",
			legs: [
				{
					origin: {
						type: "stop",
						id: "900003201",
						name: "S+U Berlin Hauptbahnhof",
						location: {
							type: "location",
							id: "900003201",
							latitude: 52.525607,
							longitude: 13.369072
						},
						products: {
							suburban: true,
							subway: true,
							tram: true,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:11000:900003201"
						}
					},
					destination: {
						type: "stop",
						id: "900260009",
						name: "Flughafen BER",
						location: {
							type: "location",
							id: "900260009",
							latitude: 52.36461,
							longitude: 13.50987
						},
						products: {
							suburban: true,
							subway: false,
							tram: false,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:12061:900260009"
						}
					},
					departure: "2025-12-08T05:26:00+01:00",
					plannedDeparture: "2025-12-08T05:26:00+01:00",
					departureDelay: 0,
					arrival: "2025-12-08T06:16:00+01:00",
					plannedArrival: "2025-12-08T06:16:00+01:00",
					arrivalDelay: 0,
					reachable: true,
					tripId: "1|4490|1|86|8122025",
					line: {
						type: "line",
						id: "de-vbb-11000000-s-bahn-s9",
						fahrtNr: "19463",
						name: "S9",
						public: true,
						adminCode: "DBS---",
						productName: "S",
						mode: "train",
						product: "suburban",
						operator: {
							type: "operator",
							id: "s-bahn-berlin-gmbh",
							name: "S-Bahn Berlin GmbH"
						}
					},
					direction: "Flughafen BER",
					arrivalPlatform: "5",
					plannedArrivalPlatform: "5",
					arrivalPrognosisType: "prognosed",
					departurePlatform: "15",
					plannedDeparturePlatform: "15",
					departurePrognosisType: "prognosed",
					stopovers: [
						{
							stop: {
								type: "stop",
								id: "900003201",
								name: "S+U Berlin Hauptbahnhof",
								location: {
									type: "location",
									id: "900003201",
									latitude: 52.525607,
									longitude: 13.369072
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900003201"
								}
							},
							arrival: null,
							plannedArrival: null,
							arrivalDelay: null,
							arrivalPlatform: null,
							arrivalPrognosisType: null,
							plannedArrivalPlatform: null,
							departure: "2025-12-08T05:26:00+01:00",
							plannedDeparture: "2025-12-08T05:26:00+01:00",
							departureDelay: 0,
							departurePlatform: "15",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "15",
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)"
								}
							]
						},
						{
							stop: {
								type: "stop",
								id: "900100001",
								name: "S+U Friedrichstr. Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100001",
									latitude: 52.520304,
									longitude: 13.387257
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100001"
								}
							},
							arrival: "2025-12-08T05:28:00+01:00",
							plannedArrival: "2025-12-08T05:28:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: "2025-12-08T05:28:00+01:00",
							plannedDeparture: "2025-12-08T05:28:00+01:00",
							departureDelay: 0,
							departurePlatform: "5",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "5"
						},
						{
							stop: {
								type: "stop",
								id: "900100002",
								name: "S Hackescher Markt (Berlin)",
								location: {
									type: "location",
									id: "900100002",
									latitude: 52.522605,
									longitude: 13.402359
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100002"
								}
							},
							arrival: "2025-12-08T05:30:00+01:00",
							plannedArrival: "2025-12-08T05:30:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:30:00+01:00",
							plannedDeparture: "2025-12-08T05:30:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100003",
								name: "S+U Alexanderplatz Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100003",
									latitude: 52.521508,
									longitude: 13.411267
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100003"
								}
							},
							arrival: "2025-12-08T05:32:00+01:00",
							plannedArrival: "2025-12-08T05:32:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:32:00+01:00",
							plannedDeparture: "2025-12-08T05:32:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100004",
								name: "S+U Jannowitzbrücke (Berlin)",
								location: {
									type: "location",
									id: "900100004",
									latitude: 52.515503,
									longitude: 13.418027
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100004"
								}
							},
							arrival: "2025-12-08T05:34:00+01:00",
							plannedArrival: "2025-12-08T05:34:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:34:00+01:00",
							plannedDeparture: "2025-12-08T05:34:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900120005",
								name: "S Ostbahnhof (Berlin)",
								location: {
									type: "location",
									id: "900120005",
									latitude: 52.510335,
									longitude: 13.435089
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900120005"
								}
							},
							arrival: "2025-12-08T05:36:00+01:00",
							plannedArrival: "2025-12-08T05:36:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "9",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "9",
							departure: "2025-12-08T05:37:00+01:00",
							plannedDeparture: "2025-12-08T05:37:00+01:00",
							departureDelay: 0,
							departurePlatform: "9",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "9"
						},
						{
							stop: {
								type: "stop",
								id: "900120004",
								name: "S+U Warschauer Str. (Berlin)",
								location: {
									type: "location",
									id: "900120004",
									latitude: 52.505768,
									longitude: 13.449157
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900120004"
								}
							},
							arrival: "2025-12-08T05:39:00+01:00",
							plannedArrival: "2025-12-08T05:39:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "2",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "2",
							departure: "2025-12-08T05:39:00+01:00",
							plannedDeparture: "2025-12-08T05:39:00+01:00",
							departureDelay: 0,
							departurePlatform: "2",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "2"
						},
						{
							stop: {
								type: "stop",
								id: "900190001",
								name: "S Treptower Park (Berlin)",
								location: {
									type: "location",
									id: "900190001",
									latitude: 52.493426,
									longitude: 13.461283
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900190001"
								}
							},
							arrival: "2025-12-08T05:42:00+01:00",
							plannedArrival: "2025-12-08T05:42:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:43:00+01:00",
							plannedDeparture: "2025-12-08T05:43:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191002",
								name: "S Plänterwald (Berlin)",
								location: {
									type: "location",
									id: "900191002",
									latitude: 52.47872,
									longitude: 13.47403
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191002"
								}
							},
							arrival: "2025-12-08T05:45:00+01:00",
							plannedArrival: "2025-12-08T05:45:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:45:00+01:00",
							plannedDeparture: "2025-12-08T05:45:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191001",
								name: "S Baumschulenweg (Berlin)",
								location: {
									type: "location",
									id: "900191001",
									latitude: 52.467582,
									longitude: 13.489501
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191001"
								}
							},
							arrival: "2025-12-08T05:47:00+01:00",
							plannedArrival: "2025-12-08T05:47:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:50:00+01:00",
							plannedDeparture: "2025-12-08T05:50:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900192001",
								name: "S Schöneweide Bhf (Berlin)",
								location: {
									type: "location",
									id: "900192001",
									latitude: 52.45461,
									longitude: 13.510149
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900192001"
								}
							},
							arrival: "2025-12-08T05:53:00+01:00",
							plannedArrival: "2025-12-08T05:53:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:53:00+01:00",
							plannedDeparture: "2025-12-08T05:53:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193001",
								name: "S Johannisthal (Berlin)",
								location: {
									type: "location",
									id: "900193001",
									latitude: 52.446691,
									longitude: 13.524028
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193001"
								}
							},
							arrival: "2025-12-08T05:55:00+01:00",
							plannedArrival: "2025-12-08T05:55:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:56:00+01:00",
							plannedDeparture: "2025-12-08T05:56:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193002",
								name: "S Adlershof (Berlin)",
								location: {
									type: "location",
									id: "900193002",
									latitude: 52.435104,
									longitude: 13.54055
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193002"
								}
							},
							arrival: "2025-12-08T05:58:00+01:00",
							plannedArrival: "2025-12-08T05:58:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:58:00+01:00",
							plannedDeparture: "2025-12-08T05:58:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900195510",
								name: "S Altglienicke (Berlin)",
								location: {
									type: "location",
									id: "900195510",
									latitude: 52.407795,
									longitude: 13.559598
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900195510"
								}
							},
							arrival: "2025-12-08T06:02:00+01:00",
							plannedArrival: "2025-12-08T06:02:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:03:00+01:00",
							plannedDeparture: "2025-12-08T06:03:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900196001",
								name: "S Grünbergallee (Berlin)",
								location: {
									type: "location",
									id: "900196001",
									latitude: 52.399543,
									longitude: 13.54322
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900196001"
								}
							},
							arrival: "2025-12-08T06:05:00+01:00",
							plannedArrival: "2025-12-08T06:05:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:05:00+01:00",
							plannedDeparture: "2025-12-08T06:05:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260005",
								name: "S Schönefeld (bei Berlin) Bhf",
								location: {
									type: "location",
									id: "900260005",
									latitude: 52.390904,
									longitude: 13.513043
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260005"
								}
							},
							arrival: "2025-12-08T06:08:00+01:00",
							plannedArrival: "2025-12-08T06:08:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:08:00+01:00",
							plannedDeparture: "2025-12-08T06:08:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260080",
								name: "S Waßmannsdorf",
								location: {
									type: "location",
									id: "900260080",
									latitude: 52.368287,
									longitude: 13.463432
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:12061:900260080"
								}
							},
							arrival: "2025-12-08T06:12:00+01:00",
							plannedArrival: "2025-12-08T06:12:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:12:00+01:00",
							plannedDeparture: "2025-12-08T06:12:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260009",
								name: "Flughafen BER",
								location: {
									type: "location",
									id: "900260009",
									latitude: 52.36461,
									longitude: 13.50987
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260009"
								}
							},
							arrival: "2025-12-08T06:16:00+01:00",
							plannedArrival: "2025-12-08T06:16:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: null,
							plannedDeparture: null,
							departureDelay: null,
							departurePlatform: null,
							departurePrognosisType: null,
							plannedDeparturePlatform: null,
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (Flughafen BER)"
								}
							]
						}
					],
					cycle: {
						min: 1200,
						max: 1200,
						nr: 7
					}
				}
			],
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080526$202512080616$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			cycle: {
				min: 1200
			}
		},
		{
			type: "journey",
			legs: [
				{
					origin: {
						type: "stop",
						id: "900003201",
						name: "S+U Berlin Hauptbahnhof",
						location: {
							type: "location",
							id: "900003201",
							latitude: 52.525607,
							longitude: 13.369072
						},
						products: {
							suburban: true,
							subway: true,
							tram: true,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:11000:900003201"
						}
					},
					destination: {
						type: "stop",
						id: "900260009",
						name: "Flughafen BER",
						location: {
							type: "location",
							id: "900260009",
							latitude: 52.36461,
							longitude: 13.50987
						},
						products: {
							suburban: true,
							subway: false,
							tram: false,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:12061:900260009"
						}
					},
					departure: "2025-12-08T05:46:00+01:00",
					plannedDeparture: "2025-12-08T05:46:00+01:00",
					departureDelay: 0,
					arrival: "2025-12-08T06:36:00+01:00",
					plannedArrival: "2025-12-08T06:36:00+01:00",
					arrivalDelay: 0,
					reachable: true,
					tripId: "1|4490|2|86|8122025",
					line: {
						type: "line",
						id: "de-vbb-11000000-s-bahn-s9",
						fahrtNr: "19462",
						name: "S9",
						public: true,
						adminCode: "DBS---",
						productName: "S",
						mode: "train",
						product: "suburban",
						operator: {
							type: "operator",
							id: "s-bahn-berlin-gmbh",
							name: "S-Bahn Berlin GmbH"
						}
					},
					direction: "Flughafen BER",
					arrivalPlatform: "5",
					plannedArrivalPlatform: "5",
					arrivalPrognosisType: "prognosed",
					departurePlatform: "15",
					plannedDeparturePlatform: "15",
					departurePrognosisType: "prognosed",
					stopovers: [
						{
							stop: {
								type: "stop",
								id: "900003201",
								name: "S+U Berlin Hauptbahnhof",
								location: {
									type: "location",
									id: "900003201",
									latitude: 52.525607,
									longitude: 13.369072
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900003201"
								}
							},
							arrival: null,
							plannedArrival: null,
							arrivalDelay: null,
							arrivalPlatform: null,
							arrivalPrognosisType: null,
							plannedArrivalPlatform: null,
							departure: "2025-12-08T05:46:00+01:00",
							plannedDeparture: "2025-12-08T05:46:00+01:00",
							departureDelay: 0,
							departurePlatform: "15",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "15",
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)"
								}
							]
						},
						{
							stop: {
								type: "stop",
								id: "900100001",
								name: "S+U Friedrichstr. Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100001",
									latitude: 52.520304,
									longitude: 13.387257
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100001"
								}
							},
							arrival: "2025-12-08T05:48:00+01:00",
							plannedArrival: "2025-12-08T05:48:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: "2025-12-08T05:48:00+01:00",
							plannedDeparture: "2025-12-08T05:48:00+01:00",
							departureDelay: 0,
							departurePlatform: "5",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "5"
						},
						{
							stop: {
								type: "stop",
								id: "900100002",
								name: "S Hackescher Markt (Berlin)",
								location: {
									type: "location",
									id: "900100002",
									latitude: 52.522605,
									longitude: 13.402359
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100002"
								}
							},
							arrival: "2025-12-08T05:50:00+01:00",
							plannedArrival: "2025-12-08T05:50:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:50:00+01:00",
							plannedDeparture: "2025-12-08T05:50:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100003",
								name: "S+U Alexanderplatz Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100003",
									latitude: 52.521508,
									longitude: 13.411267
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100003"
								}
							},
							arrival: "2025-12-08T05:52:00+01:00",
							plannedArrival: "2025-12-08T05:52:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:52:00+01:00",
							plannedDeparture: "2025-12-08T05:52:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100004",
								name: "S+U Jannowitzbrücke (Berlin)",
								location: {
									type: "location",
									id: "900100004",
									latitude: 52.515503,
									longitude: 13.418027
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100004"
								}
							},
							arrival: "2025-12-08T05:54:00+01:00",
							plannedArrival: "2025-12-08T05:54:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T05:54:00+01:00",
							plannedDeparture: "2025-12-08T05:54:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900120005",
								name: "S Ostbahnhof (Berlin)",
								location: {
									type: "location",
									id: "900120005",
									latitude: 52.510335,
									longitude: 13.435089
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900120005"
								}
							},
							arrival: "2025-12-08T05:56:00+01:00",
							plannedArrival: "2025-12-08T05:56:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "9",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "9",
							departure: "2025-12-08T05:57:00+01:00",
							plannedDeparture: "2025-12-08T05:57:00+01:00",
							departureDelay: 0,
							departurePlatform: "9",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "9"
						},
						{
							stop: {
								type: "stop",
								id: "900120004",
								name: "S+U Warschauer Str. (Berlin)",
								location: {
									type: "location",
									id: "900120004",
									latitude: 52.505768,
									longitude: 13.449157
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900120004"
								}
							},
							arrival: "2025-12-08T05:59:00+01:00",
							plannedArrival: "2025-12-08T05:59:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "2",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "2",
							departure: "2025-12-08T05:59:00+01:00",
							plannedDeparture: "2025-12-08T05:59:00+01:00",
							departureDelay: 0,
							departurePlatform: "2",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "2"
						},
						{
							stop: {
								type: "stop",
								id: "900190001",
								name: "S Treptower Park (Berlin)",
								location: {
									type: "location",
									id: "900190001",
									latitude: 52.493426,
									longitude: 13.461283
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900190001"
								}
							},
							arrival: "2025-12-08T06:02:00+01:00",
							plannedArrival: "2025-12-08T06:02:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:03:00+01:00",
							plannedDeparture: "2025-12-08T06:03:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191002",
								name: "S Plänterwald (Berlin)",
								location: {
									type: "location",
									id: "900191002",
									latitude: 52.47872,
									longitude: 13.47403
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191002"
								}
							},
							arrival: "2025-12-08T06:05:00+01:00",
							plannedArrival: "2025-12-08T06:05:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:05:00+01:00",
							plannedDeparture: "2025-12-08T06:05:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191001",
								name: "S Baumschulenweg (Berlin)",
								location: {
									type: "location",
									id: "900191001",
									latitude: 52.467582,
									longitude: 13.489501
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191001"
								}
							},
							arrival: "2025-12-08T06:07:00+01:00",
							plannedArrival: "2025-12-08T06:07:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:10:00+01:00",
							plannedDeparture: "2025-12-08T06:10:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900192001",
								name: "S Schöneweide Bhf (Berlin)",
								location: {
									type: "location",
									id: "900192001",
									latitude: 52.45461,
									longitude: 13.510149
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900192001"
								}
							},
							arrival: "2025-12-08T06:13:00+01:00",
							plannedArrival: "2025-12-08T06:13:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:13:00+01:00",
							plannedDeparture: "2025-12-08T06:13:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193001",
								name: "S Johannisthal (Berlin)",
								location: {
									type: "location",
									id: "900193001",
									latitude: 52.446691,
									longitude: 13.524028
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193001"
								}
							},
							arrival: "2025-12-08T06:15:00+01:00",
							plannedArrival: "2025-12-08T06:15:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:16:00+01:00",
							plannedDeparture: "2025-12-08T06:16:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193002",
								name: "S Adlershof (Berlin)",
								location: {
									type: "location",
									id: "900193002",
									latitude: 52.435104,
									longitude: 13.54055
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193002"
								}
							},
							arrival: "2025-12-08T06:18:00+01:00",
							plannedArrival: "2025-12-08T06:18:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:18:00+01:00",
							plannedDeparture: "2025-12-08T06:18:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900195510",
								name: "S Altglienicke (Berlin)",
								location: {
									type: "location",
									id: "900195510",
									latitude: 52.407795,
									longitude: 13.559598
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900195510"
								}
							},
							arrival: "2025-12-08T06:22:00+01:00",
							plannedArrival: "2025-12-08T06:22:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:23:00+01:00",
							plannedDeparture: "2025-12-08T06:23:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900196001",
								name: "S Grünbergallee (Berlin)",
								location: {
									type: "location",
									id: "900196001",
									latitude: 52.399543,
									longitude: 13.54322
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900196001"
								}
							},
							arrival: "2025-12-08T06:25:00+01:00",
							plannedArrival: "2025-12-08T06:25:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:25:00+01:00",
							plannedDeparture: "2025-12-08T06:25:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260005",
								name: "S Schönefeld (bei Berlin) Bhf",
								location: {
									type: "location",
									id: "900260005",
									latitude: 52.390904,
									longitude: 13.513043
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260005"
								}
							},
							arrival: "2025-12-08T06:28:00+01:00",
							plannedArrival: "2025-12-08T06:28:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:28:00+01:00",
							plannedDeparture: "2025-12-08T06:28:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260080",
								name: "S Waßmannsdorf",
								location: {
									type: "location",
									id: "900260080",
									latitude: 52.368287,
									longitude: 13.463432
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:12061:900260080"
								}
							},
							arrival: "2025-12-08T06:32:00+01:00",
							plannedArrival: "2025-12-08T06:32:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:32:00+01:00",
							plannedDeparture: "2025-12-08T06:32:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260009",
								name: "Flughafen BER",
								location: {
									type: "location",
									id: "900260009",
									latitude: 52.36461,
									longitude: 13.50987
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260009"
								}
							},
							arrival: "2025-12-08T06:36:00+01:00",
							plannedArrival: "2025-12-08T06:36:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: null,
							plannedDeparture: null,
							departureDelay: null,
							departurePlatform: null,
							departurePrognosisType: null,
							plannedDeparturePlatform: null,
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (Flughafen BER)"
								}
							]
						}
					],
					cycle: {
						min: 1200,
						max: 1200,
						nr: 7
					}
				}
			],
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080546$202512080636$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			cycle: {
				min: 1200
			}
		},
		{
			type: "journey",
			legs: [
				{
					origin: {
						type: "stop",
						id: "900003201",
						name: "S+U Berlin Hauptbahnhof",
						location: {
							type: "location",
							id: "900003201",
							latitude: 52.525607,
							longitude: 13.369072
						},
						products: {
							suburban: true,
							subway: true,
							tram: true,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:11000:900003201"
						}
					},
					destination: {
						type: "stop",
						id: "900260009",
						name: "Flughafen BER",
						location: {
							type: "location",
							id: "900260009",
							latitude: 52.36461,
							longitude: 13.50987
						},
						products: {
							suburban: true,
							subway: false,
							tram: false,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:12061:900260009"
						}
					},
					departure: "2025-12-08T06:06:00+01:00",
					plannedDeparture: "2025-12-08T06:06:00+01:00",
					departureDelay: 0,
					arrival: "2025-12-08T06:56:00+01:00",
					plannedArrival: "2025-12-08T06:56:00+01:00",
					arrivalDelay: 0,
					reachable: true,
					tripId: "1|4490|3|86|8122025",
					line: {
						type: "line",
						id: "de-vbb-11000000-s-bahn-s9",
						fahrtNr: "19461",
						name: "S9",
						public: true,
						adminCode: "DBS---",
						productName: "S",
						mode: "train",
						product: "suburban",
						operator: {
							type: "operator",
							id: "s-bahn-berlin-gmbh",
							name: "S-Bahn Berlin GmbH"
						}
					},
					direction: "Flughafen BER",
					arrivalPlatform: "5",
					plannedArrivalPlatform: "5",
					arrivalPrognosisType: "prognosed",
					departurePlatform: "15",
					plannedDeparturePlatform: "15",
					departurePrognosisType: "prognosed",
					stopovers: [
						{
							stop: {
								type: "stop",
								id: "900003201",
								name: "S+U Berlin Hauptbahnhof",
								location: {
									type: "location",
									id: "900003201",
									latitude: 52.525607,
									longitude: 13.369072
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900003201"
								}
							},
							arrival: null,
							plannedArrival: null,
							arrivalDelay: null,
							arrivalPlatform: null,
							arrivalPrognosisType: null,
							plannedArrivalPlatform: null,
							departure: "2025-12-08T06:06:00+01:00",
							plannedDeparture: "2025-12-08T06:06:00+01:00",
							departureDelay: 0,
							departurePlatform: "15",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "15",
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)"
								}
							]
						},
						{
							stop: {
								type: "stop",
								id: "900100001",
								name: "S+U Friedrichstr. Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100001",
									latitude: 52.520304,
									longitude: 13.387257
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100001"
								}
							},
							arrival: "2025-12-08T06:08:00+01:00",
							plannedArrival: "2025-12-08T06:08:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: "2025-12-08T06:08:00+01:00",
							plannedDeparture: "2025-12-08T06:08:00+01:00",
							departureDelay: 0,
							departurePlatform: "5",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "5"
						},
						{
							stop: {
								type: "stop",
								id: "900100002",
								name: "S Hackescher Markt (Berlin)",
								location: {
									type: "location",
									id: "900100002",
									latitude: 52.522605,
									longitude: 13.402359
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100002"
								}
							},
							arrival: "2025-12-08T06:10:00+01:00",
							plannedArrival: "2025-12-08T06:10:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:10:00+01:00",
							plannedDeparture: "2025-12-08T06:10:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100003",
								name: "S+U Alexanderplatz Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100003",
									latitude: 52.521508,
									longitude: 13.411267
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100003"
								}
							},
							arrival: "2025-12-08T06:12:00+01:00",
							plannedArrival: "2025-12-08T06:12:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:12:00+01:00",
							plannedDeparture: "2025-12-08T06:12:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100004",
								name: "S+U Jannowitzbrücke (Berlin)",
								location: {
									type: "location",
									id: "900100004",
									latitude: 52.515503,
									longitude: 13.418027
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100004"
								}
							},
							arrival: "2025-12-08T06:14:00+01:00",
							plannedArrival: "2025-12-08T06:14:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:14:00+01:00",
							plannedDeparture: "2025-12-08T06:14:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900120005",
								name: "S Ostbahnhof (Berlin)",
								location: {
									type: "location",
									id: "900120005",
									latitude: 52.510335,
									longitude: 13.435089
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900120005"
								}
							},
							arrival: "2025-12-08T06:16:00+01:00",
							plannedArrival: "2025-12-08T06:16:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "9",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "9",
							departure: "2025-12-08T06:17:00+01:00",
							plannedDeparture: "2025-12-08T06:17:00+01:00",
							departureDelay: 0,
							departurePlatform: "9",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "9"
						},
						{
							stop: {
								type: "stop",
								id: "900120004",
								name: "S+U Warschauer Str. (Berlin)",
								location: {
									type: "location",
									id: "900120004",
									latitude: 52.505768,
									longitude: 13.449157
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900120004"
								}
							},
							arrival: "2025-12-08T06:19:00+01:00",
							plannedArrival: "2025-12-08T06:19:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "2",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "2",
							departure: "2025-12-08T06:19:00+01:00",
							plannedDeparture: "2025-12-08T06:19:00+01:00",
							departureDelay: 0,
							departurePlatform: "2",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "2"
						},
						{
							stop: {
								type: "stop",
								id: "900190001",
								name: "S Treptower Park (Berlin)",
								location: {
									type: "location",
									id: "900190001",
									latitude: 52.493426,
									longitude: 13.461283
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900190001"
								}
							},
							arrival: "2025-12-08T06:22:00+01:00",
							plannedArrival: "2025-12-08T06:22:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:23:00+01:00",
							plannedDeparture: "2025-12-08T06:23:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191002",
								name: "S Plänterwald (Berlin)",
								location: {
									type: "location",
									id: "900191002",
									latitude: 52.47872,
									longitude: 13.47403
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191002"
								}
							},
							arrival: "2025-12-08T06:25:00+01:00",
							plannedArrival: "2025-12-08T06:25:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:25:00+01:00",
							plannedDeparture: "2025-12-08T06:25:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191001",
								name: "S Baumschulenweg (Berlin)",
								location: {
									type: "location",
									id: "900191001",
									latitude: 52.467582,
									longitude: 13.489501
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191001"
								}
							},
							arrival: "2025-12-08T06:27:00+01:00",
							plannedArrival: "2025-12-08T06:27:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:30:00+01:00",
							plannedDeparture: "2025-12-08T06:30:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900192001",
								name: "S Schöneweide Bhf (Berlin)",
								location: {
									type: "location",
									id: "900192001",
									latitude: 52.45461,
									longitude: 13.510149
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900192001"
								}
							},
							arrival: "2025-12-08T06:33:00+01:00",
							plannedArrival: "2025-12-08T06:33:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:33:00+01:00",
							plannedDeparture: "2025-12-08T06:33:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193001",
								name: "S Johannisthal (Berlin)",
								location: {
									type: "location",
									id: "900193001",
									latitude: 52.446691,
									longitude: 13.524028
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193001"
								}
							},
							arrival: "2025-12-08T06:35:00+01:00",
							plannedArrival: "2025-12-08T06:35:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:36:00+01:00",
							plannedDeparture: "2025-12-08T06:36:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193002",
								name: "S Adlershof (Berlin)",
								location: {
									type: "location",
									id: "900193002",
									latitude: 52.435104,
									longitude: 13.54055
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193002"
								}
							},
							arrival: "2025-12-08T06:38:00+01:00",
							plannedArrival: "2025-12-08T06:38:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:38:00+01:00",
							plannedDeparture: "2025-12-08T06:38:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900195510",
								name: "S Altglienicke (Berlin)",
								location: {
									type: "location",
									id: "900195510",
									latitude: 52.407795,
									longitude: 13.559598
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900195510"
								}
							},
							arrival: "2025-12-08T06:42:00+01:00",
							plannedArrival: "2025-12-08T06:42:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:43:00+01:00",
							plannedDeparture: "2025-12-08T06:43:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900196001",
								name: "S Grünbergallee (Berlin)",
								location: {
									type: "location",
									id: "900196001",
									latitude: 52.399543,
									longitude: 13.54322
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900196001"
								}
							},
							arrival: "2025-12-08T06:45:00+01:00",
							plannedArrival: "2025-12-08T06:45:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:45:00+01:00",
							plannedDeparture: "2025-12-08T06:45:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260005",
								name: "S Schönefeld (bei Berlin) Bhf",
								location: {
									type: "location",
									id: "900260005",
									latitude: 52.390904,
									longitude: 13.513043
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260005"
								}
							},
							arrival: "2025-12-08T06:48:00+01:00",
							plannedArrival: "2025-12-08T06:48:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:48:00+01:00",
							plannedDeparture: "2025-12-08T06:48:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260080",
								name: "S Waßmannsdorf",
								location: {
									type: "location",
									id: "900260080",
									latitude: 52.368287,
									longitude: 13.463432
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:12061:900260080"
								}
							},
							arrival: "2025-12-08T06:52:00+01:00",
							plannedArrival: "2025-12-08T06:52:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T06:52:00+01:00",
							plannedDeparture: "2025-12-08T06:52:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260009",
								name: "Flughafen BER",
								location: {
									type: "location",
									id: "900260009",
									latitude: 52.36461,
									longitude: 13.50987
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260009"
								}
							},
							arrival: "2025-12-08T06:56:00+01:00",
							plannedArrival: "2025-12-08T06:56:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: null,
							plannedDeparture: null,
							departureDelay: null,
							departurePlatform: null,
							departurePrognosisType: null,
							plannedDeparturePlatform: null,
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (Flughafen BER)"
								}
							]
						}
					],
					cycle: {
						min: 1200,
						max: 1200,
						nr: 7
					}
				}
			],
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080606$202512080656$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			cycle: {
				min: 1200
			}
		},
		{
			type: "journey",
			legs: [
				{
					origin: {
						type: "stop",
						id: "900003201",
						name: "S+U Berlin Hauptbahnhof",
						location: {
							type: "location",
							id: "900003201",
							latitude: 52.525607,
							longitude: 13.369072
						},
						products: {
							suburban: true,
							subway: true,
							tram: true,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:11000:900003201"
						}
					},
					destination: {
						type: "stop",
						id: "900260009",
						name: "Flughafen BER",
						location: {
							type: "location",
							id: "900260009",
							latitude: 52.36461,
							longitude: 13.50987
						},
						products: {
							suburban: true,
							subway: false,
							tram: false,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:12061:900260009"
						}
					},
					departure: "2025-12-08T06:26:00+01:00",
					plannedDeparture: "2025-12-08T06:26:00+01:00",
					departureDelay: 0,
					arrival: "2025-12-08T07:16:00+01:00",
					plannedArrival: "2025-12-08T07:16:00+01:00",
					arrivalDelay: 0,
					reachable: true,
					tripId: "1|4490|4|86|8122025",
					line: {
						type: "line",
						id: "de-vbb-11000000-s-bahn-s9",
						fahrtNr: "19460",
						name: "S9",
						public: true,
						adminCode: "DBS---",
						productName: "S",
						mode: "train",
						product: "suburban",
						operator: {
							type: "operator",
							id: "s-bahn-berlin-gmbh",
							name: "S-Bahn Berlin GmbH"
						}
					},
					direction: "Flughafen BER",
					arrivalPlatform: "5",
					plannedArrivalPlatform: "5",
					arrivalPrognosisType: "prognosed",
					departurePlatform: "15",
					plannedDeparturePlatform: "15",
					departurePrognosisType: "prognosed",
					stopovers: [
						{
							stop: {
								type: "stop",
								id: "900003201",
								name: "S+U Berlin Hauptbahnhof",
								location: {
									type: "location",
									id: "900003201",
									latitude: 52.525607,
									longitude: 13.369072
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900003201"
								}
							},
							arrival: null,
							plannedArrival: null,
							arrivalDelay: null,
							arrivalPlatform: null,
							arrivalPrognosisType: null,
							plannedArrivalPlatform: null,
							departure: "2025-12-08T06:26:00+01:00",
							plannedDeparture: "2025-12-08T06:26:00+01:00",
							departureDelay: 0,
							departurePlatform: "15",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "15",
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)"
								}
							]
						},
						{
							stop: {
								type: "stop",
								id: "900100001",
								name: "S+U Friedrichstr. Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100001",
									latitude: 52.520304,
									longitude: 13.387257
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100001"
								}
							},
							arrival: "2025-12-08T06:28:00+01:00",
							plannedArrival: "2025-12-08T06:28:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: "2025-12-08T06:28:00+01:00",
							plannedDeparture: "2025-12-08T06:28:00+01:00",
							departureDelay: 0,
							departurePlatform: "5",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "5"
						},
						{
							stop: {
								type: "stop",
								id: "900100002",
								name: "S Hackescher Markt (Berlin)",
								location: {
									type: "location",
									id: "900100002",
									latitude: 52.522605,
									longitude: 13.402359
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100002"
								}
							},
							arrival: "2025-12-08T06:30:00+01:00",
							plannedArrival: "2025-12-08T06:30:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:30:00+01:00",
							plannedDeparture: "2025-12-08T06:30:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100003",
								name: "S+U Alexanderplatz Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100003",
									latitude: 52.521508,
									longitude: 13.411267
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100003"
								}
							},
							arrival: "2025-12-08T06:32:00+01:00",
							plannedArrival: "2025-12-08T06:32:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:32:00+01:00",
							plannedDeparture: "2025-12-08T06:32:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100004",
								name: "S+U Jannowitzbrücke (Berlin)",
								location: {
									type: "location",
									id: "900100004",
									latitude: 52.515503,
									longitude: 13.418027
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100004"
								}
							},
							arrival: "2025-12-08T06:34:00+01:00",
							plannedArrival: "2025-12-08T06:34:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:34:00+01:00",
							plannedDeparture: "2025-12-08T06:34:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900120005",
								name: "S Ostbahnhof (Berlin)",
								location: {
									type: "location",
									id: "900120005",
									latitude: 52.510335,
									longitude: 13.435089
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900120005"
								}
							},
							arrival: "2025-12-08T06:36:00+01:00",
							plannedArrival: "2025-12-08T06:36:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "9",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "9",
							departure: "2025-12-08T06:37:00+01:00",
							plannedDeparture: "2025-12-08T06:37:00+01:00",
							departureDelay: 0,
							departurePlatform: "9",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "9"
						},
						{
							stop: {
								type: "stop",
								id: "900120004",
								name: "S+U Warschauer Str. (Berlin)",
								location: {
									type: "location",
									id: "900120004",
									latitude: 52.505768,
									longitude: 13.449157
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900120004"
								}
							},
							arrival: "2025-12-08T06:39:00+01:00",
							plannedArrival: "2025-12-08T06:39:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "2",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "2",
							departure: "2025-12-08T06:39:00+01:00",
							plannedDeparture: "2025-12-08T06:39:00+01:00",
							departureDelay: 0,
							departurePlatform: "2",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "2"
						},
						{
							stop: {
								type: "stop",
								id: "900190001",
								name: "S Treptower Park (Berlin)",
								location: {
									type: "location",
									id: "900190001",
									latitude: 52.493426,
									longitude: 13.461283
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900190001"
								}
							},
							arrival: "2025-12-08T06:42:00+01:00",
							plannedArrival: "2025-12-08T06:42:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:43:00+01:00",
							plannedDeparture: "2025-12-08T06:43:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191002",
								name: "S Plänterwald (Berlin)",
								location: {
									type: "location",
									id: "900191002",
									latitude: 52.47872,
									longitude: 13.47403
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191002"
								}
							},
							arrival: "2025-12-08T06:45:00+01:00",
							plannedArrival: "2025-12-08T06:45:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:45:00+01:00",
							plannedDeparture: "2025-12-08T06:45:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191001",
								name: "S Baumschulenweg (Berlin)",
								location: {
									type: "location",
									id: "900191001",
									latitude: 52.467582,
									longitude: 13.489501
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191001"
								}
							},
							arrival: "2025-12-08T06:47:00+01:00",
							plannedArrival: "2025-12-08T06:47:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:50:00+01:00",
							plannedDeparture: "2025-12-08T06:50:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900192001",
								name: "S Schöneweide Bhf (Berlin)",
								location: {
									type: "location",
									id: "900192001",
									latitude: 52.45461,
									longitude: 13.510149
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900192001"
								}
							},
							arrival: "2025-12-08T06:53:00+01:00",
							plannedArrival: "2025-12-08T06:53:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:53:00+01:00",
							plannedDeparture: "2025-12-08T06:53:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193001",
								name: "S Johannisthal (Berlin)",
								location: {
									type: "location",
									id: "900193001",
									latitude: 52.446691,
									longitude: 13.524028
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193001"
								}
							},
							arrival: "2025-12-08T06:55:00+01:00",
							plannedArrival: "2025-12-08T06:55:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:56:00+01:00",
							plannedDeparture: "2025-12-08T06:56:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193002",
								name: "S Adlershof (Berlin)",
								location: {
									type: "location",
									id: "900193002",
									latitude: 52.435104,
									longitude: 13.54055
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193002"
								}
							},
							arrival: "2025-12-08T06:58:00+01:00",
							plannedArrival: "2025-12-08T06:58:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:58:00+01:00",
							plannedDeparture: "2025-12-08T06:58:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900195510",
								name: "S Altglienicke (Berlin)",
								location: {
									type: "location",
									id: "900195510",
									latitude: 52.407795,
									longitude: 13.559598
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900195510"
								}
							},
							arrival: "2025-12-08T07:02:00+01:00",
							plannedArrival: "2025-12-08T07:02:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T07:03:00+01:00",
							plannedDeparture: "2025-12-08T07:03:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900196001",
								name: "S Grünbergallee (Berlin)",
								location: {
									type: "location",
									id: "900196001",
									latitude: 52.399543,
									longitude: 13.54322
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900196001"
								}
							},
							arrival: "2025-12-08T07:05:00+01:00",
							plannedArrival: "2025-12-08T07:05:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T07:05:00+01:00",
							plannedDeparture: "2025-12-08T07:05:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260005",
								name: "S Schönefeld (bei Berlin) Bhf",
								location: {
									type: "location",
									id: "900260005",
									latitude: 52.390904,
									longitude: 13.513043
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260005"
								}
							},
							arrival: "2025-12-08T07:08:00+01:00",
							plannedArrival: "2025-12-08T07:08:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T07:08:00+01:00",
							plannedDeparture: "2025-12-08T07:08:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260080",
								name: "S Waßmannsdorf",
								location: {
									type: "location",
									id: "900260080",
									latitude: 52.368287,
									longitude: 13.463432
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:12061:900260080"
								}
							},
							arrival: "2025-12-08T07:12:00+01:00",
							plannedArrival: "2025-12-08T07:12:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T07:12:00+01:00",
							plannedDeparture: "2025-12-08T07:12:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260009",
								name: "Flughafen BER",
								location: {
									type: "location",
									id: "900260009",
									latitude: 52.36461,
									longitude: 13.50987
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260009"
								}
							},
							arrival: "2025-12-08T07:16:00+01:00",
							plannedArrival: "2025-12-08T07:16:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: null,
							plannedDeparture: null,
							departureDelay: null,
							departurePlatform: null,
							departurePrognosisType: null,
							plannedDeparturePlatform: null,
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (Flughafen BER)"
								}
							]
						}
					],
					cycle: {
						min: 1200,
						max: 1200,
						nr: 7
					}
				}
			],
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080626$202512080716$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			cycle: {
				min: 1200
			}
		},
		{
			type: "journey",
			legs: [
				{
					origin: {
						type: "stop",
						id: "900003201",
						name: "S+U Berlin Hauptbahnhof",
						location: {
							type: "location",
							id: "900003201",
							latitude: 52.525607,
							longitude: 13.369072
						},
						products: {
							suburban: true,
							subway: true,
							tram: true,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:11000:900003201"
						}
					},
					destination: {
						type: "stop",
						id: "900260009",
						name: "Flughafen BER",
						location: {
							type: "location",
							id: "900260009",
							latitude: 52.36461,
							longitude: 13.50987
						},
						products: {
							suburban: true,
							subway: false,
							tram: false,
							bus: true,
							ferry: false,
							express: true,
							regional: true
						},
						ids: {
							ifopt: "de:12061:900260009"
						}
					},
					departure: "2025-12-08T06:46:00+01:00",
					plannedDeparture: "2025-12-08T06:46:00+01:00",
					departureDelay: 0,
					arrival: "2025-12-08T07:36:00+01:00",
					plannedArrival: "2025-12-08T07:36:00+01:00",
					arrivalDelay: 0,
					reachable: true,
					tripId: "1|4490|5|86|8122025",
					line: {
						type: "line",
						id: "de-vbb-11000000-s-bahn-s9",
						fahrtNr: "19459",
						name: "S9",
						public: true,
						adminCode: "DBS---",
						productName: "S",
						mode: "train",
						product: "suburban",
						operator: {
							type: "operator",
							id: "s-bahn-berlin-gmbh",
							name: "S-Bahn Berlin GmbH"
						}
					},
					direction: "Flughafen BER",
					arrivalPlatform: "5",
					plannedArrivalPlatform: "5",
					arrivalPrognosisType: "prognosed",
					departurePlatform: "15",
					plannedDeparturePlatform: "15",
					departurePrognosisType: "prognosed",
					stopovers: [
						{
							stop: {
								type: "stop",
								id: "900003201",
								name: "S+U Berlin Hauptbahnhof",
								location: {
									type: "location",
									id: "900003201",
									latitude: 52.525607,
									longitude: 13.369072
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900003201"
								}
							},
							arrival: null,
							plannedArrival: null,
							arrivalDelay: null,
							arrivalPlatform: null,
							arrivalPrognosisType: null,
							plannedArrivalPlatform: null,
							departure: "2025-12-08T06:46:00+01:00",
							plannedDeparture: "2025-12-08T06:46:00+01:00",
							departureDelay: 0,
							departurePlatform: "15",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "15",
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)"
								}
							]
						},
						{
							stop: {
								type: "stop",
								id: "900100001",
								name: "S+U Friedrichstr. Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100001",
									latitude: 52.520304,
									longitude: 13.387257
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100001"
								}
							},
							arrival: "2025-12-08T06:48:00+01:00",
							plannedArrival: "2025-12-08T06:48:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: "2025-12-08T06:48:00+01:00",
							plannedDeparture: "2025-12-08T06:48:00+01:00",
							departureDelay: 0,
							departurePlatform: "5",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "5"
						},
						{
							stop: {
								type: "stop",
								id: "900100002",
								name: "S Hackescher Markt (Berlin)",
								location: {
									type: "location",
									id: "900100002",
									latitude: 52.522605,
									longitude: 13.402359
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100002"
								}
							},
							arrival: "2025-12-08T06:50:00+01:00",
							plannedArrival: "2025-12-08T06:50:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:50:00+01:00",
							plannedDeparture: "2025-12-08T06:50:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100003",
								name: "S+U Alexanderplatz Bhf (Berlin)",
								location: {
									type: "location",
									id: "900100003",
									latitude: 52.521508,
									longitude: 13.411267
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900100003"
								}
							},
							arrival: "2025-12-08T06:52:00+01:00",
							plannedArrival: "2025-12-08T06:52:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:52:00+01:00",
							plannedDeparture: "2025-12-08T06:52:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900100004",
								name: "S+U Jannowitzbrücke (Berlin)",
								location: {
									type: "location",
									id: "900100004",
									latitude: 52.515503,
									longitude: 13.418027
								},
								products: {
									suburban: true,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100004"
								}
							},
							arrival: "2025-12-08T06:54:00+01:00",
							plannedArrival: "2025-12-08T06:54:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T06:54:00+01:00",
							plannedDeparture: "2025-12-08T06:54:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900120005",
								name: "S Ostbahnhof (Berlin)",
								location: {
									type: "location",
									id: "900120005",
									latitude: 52.510335,
									longitude: 13.435089
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900120005"
								}
							},
							arrival: "2025-12-08T06:56:00+01:00",
							plannedArrival: "2025-12-08T06:56:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "9",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "9",
							departure: "2025-12-08T06:57:00+01:00",
							plannedDeparture: "2025-12-08T06:57:00+01:00",
							departureDelay: 0,
							departurePlatform: "9",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "9"
						},
						{
							stop: {
								type: "stop",
								id: "900120004",
								name: "S+U Warschauer Str. (Berlin)",
								location: {
									type: "location",
									id: "900120004",
									latitude: 52.505768,
									longitude: 13.449157
								},
								products: {
									suburban: true,
									subway: true,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900120004"
								}
							},
							arrival: "2025-12-08T06:59:00+01:00",
							plannedArrival: "2025-12-08T06:59:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "2",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "2",
							departure: "2025-12-08T06:59:00+01:00",
							plannedDeparture: "2025-12-08T06:59:00+01:00",
							departureDelay: 0,
							departurePlatform: "2",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "2"
						},
						{
							stop: {
								type: "stop",
								id: "900190001",
								name: "S Treptower Park (Berlin)",
								location: {
									type: "location",
									id: "900190001",
									latitude: 52.493426,
									longitude: 13.461283
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900190001"
								}
							},
							arrival: "2025-12-08T07:02:00+01:00",
							plannedArrival: "2025-12-08T07:02:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T07:03:00+01:00",
							plannedDeparture: "2025-12-08T07:03:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191002",
								name: "S Plänterwald (Berlin)",
								location: {
									type: "location",
									id: "900191002",
									latitude: 52.47872,
									longitude: 13.47403
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191002"
								}
							},
							arrival: "2025-12-08T07:05:00+01:00",
							plannedArrival: "2025-12-08T07:05:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T07:05:00+01:00",
							plannedDeparture: "2025-12-08T07:05:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900191001",
								name: "S Baumschulenweg (Berlin)",
								location: {
									type: "location",
									id: "900191001",
									latitude: 52.467582,
									longitude: 13.489501
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900191001"
								}
							},
							arrival: "2025-12-08T07:07:00+01:00",
							plannedArrival: "2025-12-08T07:07:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T07:10:00+01:00",
							plannedDeparture: "2025-12-08T07:10:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900192001",
								name: "S Schöneweide Bhf (Berlin)",
								location: {
									type: "location",
									id: "900192001",
									latitude: 52.45461,
									longitude: 13.510149
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:11000:900192001"
								}
							},
							arrival: "2025-12-08T07:13:00+01:00",
							plannedArrival: "2025-12-08T07:13:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T07:13:00+01:00",
							plannedDeparture: "2025-12-08T07:13:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193001",
								name: "S Johannisthal (Berlin)",
								location: {
									type: "location",
									id: "900193001",
									latitude: 52.446691,
									longitude: 13.524028
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193001"
								}
							},
							arrival: "2025-12-08T07:15:00+01:00",
							plannedArrival: "2025-12-08T07:15:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T07:16:00+01:00",
							plannedDeparture: "2025-12-08T07:16:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900193002",
								name: "S Adlershof (Berlin)",
								location: {
									type: "location",
									id: "900193002",
									latitude: 52.435104,
									longitude: 13.54055
								},
								products: {
									suburban: true,
									subway: false,
									tram: true,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900193002"
								}
							},
							arrival: "2025-12-08T07:18:00+01:00",
							plannedArrival: "2025-12-08T07:18:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "3",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "3",
							departure: "2025-12-08T07:18:00+01:00",
							plannedDeparture: "2025-12-08T07:18:00+01:00",
							departureDelay: 0,
							departurePlatform: "3",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "3"
						},
						{
							stop: {
								type: "stop",
								id: "900195510",
								name: "S Altglienicke (Berlin)",
								location: {
									type: "location",
									id: "900195510",
									latitude: 52.407795,
									longitude: 13.559598
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900195510"
								}
							},
							arrival: "2025-12-08T07:22:00+01:00",
							plannedArrival: "2025-12-08T07:22:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T07:23:00+01:00",
							plannedDeparture: "2025-12-08T07:23:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900196001",
								name: "S Grünbergallee (Berlin)",
								location: {
									type: "location",
									id: "900196001",
									latitude: 52.399543,
									longitude: 13.54322
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900196001"
								}
							},
							arrival: "2025-12-08T07:25:00+01:00",
							plannedArrival: "2025-12-08T07:25:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T07:25:00+01:00",
							plannedDeparture: "2025-12-08T07:25:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260005",
								name: "S Schönefeld (bei Berlin) Bhf",
								location: {
									type: "location",
									id: "900260005",
									latitude: 52.390904,
									longitude: 13.513043
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260005"
								}
							},
							arrival: "2025-12-08T07:28:00+01:00",
							plannedArrival: "2025-12-08T07:28:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T07:28:00+01:00",
							plannedDeparture: "2025-12-08T07:28:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260080",
								name: "S Waßmannsdorf",
								location: {
									type: "location",
									id: "900260080",
									latitude: 52.368287,
									longitude: 13.463432
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:12061:900260080"
								}
							},
							arrival: "2025-12-08T07:32:00+01:00",
							plannedArrival: "2025-12-08T07:32:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "1",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "1",
							departure: "2025-12-08T07:32:00+01:00",
							plannedDeparture: "2025-12-08T07:32:00+01:00",
							departureDelay: 0,
							departurePlatform: "1",
							departurePrognosisType: "prognosed",
							plannedDeparturePlatform: "1"
						},
						{
							stop: {
								type: "stop",
								id: "900260009",
								name: "Flughafen BER",
								location: {
									type: "location",
									id: "900260009",
									latitude: 52.36461,
									longitude: 13.50987
								},
								products: {
									suburban: true,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: true,
									regional: true
								},
								ids: {
									ifopt: "de:12061:900260009"
								}
							},
							arrival: "2025-12-08T07:36:00+01:00",
							plannedArrival: "2025-12-08T07:36:00+01:00",
							arrivalDelay: 0,
							arrivalPlatform: "5",
							arrivalPrognosisType: "prognosed",
							plannedArrivalPlatform: "5",
							departure: null,
							plannedDeparture: null,
							departureDelay: null,
							departurePlatform: null,
							departurePrognosisType: null,
							plannedDeparturePlatform: null,
							remarks: [
								{
									type: "hint",
									code: "FK",
									text: "Fahrradmitnahme möglich (Flughafen BER)"
								}
							]
						}
					],
					cycle: {
						min: 1200,
						max: 1200,
						nr: 7
					}
				}
			],
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080646$202512080736$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			cycle: {
				min: 1200
			}
		}
	],
	realtimeDataUpdatedAt: 1765137971
} as Journeys;
