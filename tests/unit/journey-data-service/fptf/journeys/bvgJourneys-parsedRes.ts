export const bvgJourneysParsedRes = {
	journeys: [
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080313$202512080406$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4536|0|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19318S9Flughafen_BER",
					departureData: {
						location: {
							name: "S+U Berlin Hauptbahnhof",
							id: "900003201",
							type: "station",
							position: {
								lat: 52.525607,
								lng: 13.369072,
							},
						},
						time: {
							departure: {
								time: new Date("2025-12-08T02:13:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "15",
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
								time: new Date("2025-12-08T03:06:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "6",
							platformChanged: false,
						},
					},
					duration: 53,
					direction: "Flughafen BER",
					name: "S9",
					productName: "S",
					product: "suburban",
					operator: "S-Bahn Berlin GmbH",
					cycle: {
						min: 780,
						max: 1200,
					},
					tripNumber: "19318",
					info: {
						statuses: [],
						hints: [
							"Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)",
							"Fahrradmitnahme möglich (Flughafen BER)",
						],
					},
					stopovers: [
						{
							location: {
								name: "S+U Friedrichstr. Bhf (Berlin)",
								id: "900100001",
								type: "station",
								position: {
									lat: 52.520304,
									lng: 13.387257,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:15:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:16:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "5",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Hackescher Markt (Berlin)",
								id: "900100002",
								type: "station",
								position: {
									lat: 52.522605,
									lng: 13.402359,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:17:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:18:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
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
									time: new Date("2025-12-08T02:19:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:20:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
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
							time: {
								arrival: {
									time: new Date("2025-12-08T02:21:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:22:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Ostbahnhof (Berlin)",
								id: "900120005",
								type: "station",
								position: {
									lat: 52.510335,
									lng: 13.435089,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:24:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:24:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "8",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S+U Warschauer Str. (Berlin)",
								id: "900120004",
								type: "station",
								position: {
									lat: 52.505768,
									lng: 13.449157,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:26:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:26:00.000Z"),
									delay: 0,
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
								name: "S Treptower Park (Berlin)",
								id: "900190001",
								type: "station",
								position: {
									lat: 52.493426,
									lng: 13.461283,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:29:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:35:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Plänterwald (Berlin)",
								id: "900191002",
								type: "station",
								position: {
									lat: 52.47872,
									lng: 13.47403,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:38:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:38:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Baumschulenweg (Berlin)",
								id: "900191001",
								type: "station",
								position: {
									lat: 52.467582,
									lng: 13.489501,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:40:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:40:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Schöneweide Bhf (Berlin)",
								id: "900192001",
								type: "station",
								position: {
									lat: 52.45461,
									lng: 13.510149,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:43:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:44:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Johannisthal (Berlin)",
								id: "900193001",
								type: "station",
								position: {
									lat: 52.446691,
									lng: 13.524028,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:46:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:46:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Adlershof (Berlin)",
								id: "900193002",
								type: "station",
								position: {
									lat: 52.435104,
									lng: 13.54055,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:49:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Altglienicke (Berlin)",
								id: "900195510",
								type: "station",
								position: {
									lat: 52.407795,
									lng: 13.559598,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:53:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:53:00.000Z"),
									delay: 0,
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
								name: "S Grünbergallee (Berlin)",
								id: "900196001",
								type: "station",
								position: {
									lat: 52.399543,
									lng: 13.54322,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:55:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:55:00.000Z"),
									delay: 0,
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
								name: "S Schönefeld (bei Berlin) Bhf",
								id: "900260005",
								type: "station",
								position: {
									lat: 52.390904,
									lng: 13.513043,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:58:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:58:00.000Z"),
									delay: 0,
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
								name: "S Waßmannsdorf",
								id: "900260080",
								type: "station",
								position: {
									lat: 52.368287,
									lng: 13.463432,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:03:00.000Z"),
									delay: 0,
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
						[52.525607, 13.369072],
						[52.520304, 13.387257],
						[52.522605, 13.402359],
						[52.521508, 13.411267],
						[52.515503, 13.418027],
						[52.510335, 13.435089],
						[52.505768, 13.449157],
						[52.493426, 13.461283],
						[52.47872, 13.47403],
						[52.467582, 13.489501],
						[52.45461, 13.510149],
						[52.446691, 13.524028],
						[52.435104, 13.54055],
						[52.407795, 13.559598],
						[52.399543, 13.54322],
						[52.390904, 13.513043],
						[52.368287, 13.463432],
						[52.36461, 13.50987],
					],
				},
			],
			arrivalTime: {
				time: new Date("2025-12-08T03:06:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T02:13:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080326$202512080416$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4485|0|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19291S9Flughafen_BER",
					departureData: {
						location: {
							name: "S+U Berlin Hauptbahnhof",
							id: "900003201",
							type: "station",
							position: {
								lat: 52.525607,
								lng: 13.369072,
							},
						},
						time: {
							departure: {
								time: new Date("2025-12-08T02:26:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "15",
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
								time: new Date("2025-12-08T03:16:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "5",
							platformChanged: false,
						},
					},
					duration: 50,
					direction: "Flughafen BER",
					name: "S9",
					productName: "S",
					product: "suburban",
					operator: "S-Bahn Berlin GmbH",
					cycle: {
						min: 1200,
						max: 1200,
					},
					tripNumber: "19291",
					info: {
						statuses: [],
						hints: [
							"Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)",
							"Fahrradmitnahme möglich (Flughafen BER)",
						],
					},
					stopovers: [
						{
							location: {
								name: "S+U Friedrichstr. Bhf (Berlin)",
								id: "900100001",
								type: "station",
								position: {
									lat: 52.520304,
									lng: 13.387257,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "5",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Hackescher Markt (Berlin)",
								id: "900100002",
								type: "station",
								position: {
									lat: 52.522605,
									lng: 13.402359,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:30:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:30:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
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
									time: new Date("2025-12-08T02:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
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
							time: {
								arrival: {
									time: new Date("2025-12-08T02:34:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:34:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Ostbahnhof (Berlin)",
								id: "900120005",
								type: "station",
								position: {
									lat: 52.510335,
									lng: 13.435089,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:36:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:37:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "8",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S+U Warschauer Str. (Berlin)",
								id: "900120004",
								type: "station",
								position: {
									lat: 52.505768,
									lng: 13.449157,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:39:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:39:00.000Z"),
									delay: 0,
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
								name: "S Treptower Park (Berlin)",
								id: "900190001",
								type: "station",
								position: {
									lat: 52.493426,
									lng: 13.461283,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:42:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:43:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Plänterwald (Berlin)",
								id: "900191002",
								type: "station",
								position: {
									lat: 52.47872,
									lng: 13.47403,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Baumschulenweg (Berlin)",
								id: "900191001",
								type: "station",
								position: {
									lat: 52.467582,
									lng: 13.489501,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:47:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:50:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Schöneweide Bhf (Berlin)",
								id: "900192001",
								type: "station",
								position: {
									lat: 52.45461,
									lng: 13.510149,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:53:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:53:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Johannisthal (Berlin)",
								id: "900193001",
								type: "station",
								position: {
									lat: 52.446691,
									lng: 13.524028,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:55:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:56:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Adlershof (Berlin)",
								id: "900193002",
								type: "station",
								position: {
									lat: 52.435104,
									lng: 13.54055,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:58:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:58:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Altglienicke (Berlin)",
								id: "900195510",
								type: "station",
								position: {
									lat: 52.407795,
									lng: 13.559598,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:03:00.000Z"),
									delay: 0,
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
								name: "S Grünbergallee (Berlin)",
								id: "900196001",
								type: "station",
								position: {
									lat: 52.399543,
									lng: 13.54322,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:05:00.000Z"),
									delay: 0,
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
								name: "S Schönefeld (bei Berlin) Bhf",
								id: "900260005",
								type: "station",
								position: {
									lat: 52.390904,
									lng: 13.513043,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:08:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:08:00.000Z"),
									delay: 0,
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
								name: "S Waßmannsdorf",
								id: "900260080",
								type: "station",
								position: {
									lat: 52.368287,
									lng: 13.463432,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:12:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:12:00.000Z"),
									delay: 0,
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
						[52.525607, 13.369072],
						[52.520304, 13.387257],
						[52.522605, 13.402359],
						[52.521508, 13.411267],
						[52.515503, 13.418027],
						[52.510335, 13.435089],
						[52.505768, 13.449157],
						[52.493426, 13.461283],
						[52.47872, 13.47403],
						[52.467582, 13.489501],
						[52.45461, 13.510149],
						[52.446691, 13.524028],
						[52.435104, 13.54055],
						[52.407795, 13.559598],
						[52.399543, 13.54322],
						[52.390904, 13.513043],
						[52.368287, 13.463432],
						[52.36461, 13.50987],
					],
				},
			],
			arrivalTime: {
				time: new Date("2025-12-08T03:16:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T02:26:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080346$202512080436$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4485|1|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19290S9Flughafen_BER",
					departureData: {
						location: {
							name: "S+U Berlin Hauptbahnhof",
							id: "900003201",
							type: "station",
							position: {
								lat: 52.525607,
								lng: 13.369072,
							},
						},
						time: {
							departure: {
								time: new Date("2025-12-08T02:46:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "15",
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
								time: new Date("2025-12-08T03:36:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "5",
							platformChanged: false,
						},
					},
					duration: 50,
					direction: "Flughafen BER",
					name: "S9",
					productName: "S",
					product: "suburban",
					operator: "S-Bahn Berlin GmbH",
					cycle: {
						min: 1200,
						max: 1200,
					},
					tripNumber: "19290",
					info: {
						statuses: [],
						hints: [
							"Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)",
							"Fahrradmitnahme möglich (Flughafen BER)",
						],
					},
					stopovers: [
						{
							location: {
								name: "S+U Friedrichstr. Bhf (Berlin)",
								id: "900100001",
								type: "station",
								position: {
									lat: 52.520304,
									lng: 13.387257,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "5",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Hackescher Markt (Berlin)",
								id: "900100002",
								type: "station",
								position: {
									lat: 52.522605,
									lng: 13.402359,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:50:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:50:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
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
									time: new Date("2025-12-08T02:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
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
							time: {
								arrival: {
									time: new Date("2025-12-08T02:54:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:54:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Ostbahnhof (Berlin)",
								id: "900120005",
								type: "station",
								position: {
									lat: 52.510335,
									lng: 13.435089,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:56:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:57:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "8",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S+U Warschauer Str. (Berlin)",
								id: "900120004",
								type: "station",
								position: {
									lat: 52.505768,
									lng: 13.449157,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T02:59:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T02:59:00.000Z"),
									delay: 0,
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
								name: "S Treptower Park (Berlin)",
								id: "900190001",
								type: "station",
								position: {
									lat: 52.493426,
									lng: 13.461283,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:03:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Plänterwald (Berlin)",
								id: "900191002",
								type: "station",
								position: {
									lat: 52.47872,
									lng: 13.47403,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Baumschulenweg (Berlin)",
								id: "900191001",
								type: "station",
								position: {
									lat: 52.467582,
									lng: 13.489501,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:07:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:10:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Schöneweide Bhf (Berlin)",
								id: "900192001",
								type: "station",
								position: {
									lat: 52.45461,
									lng: 13.510149,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:13:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:13:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Johannisthal (Berlin)",
								id: "900193001",
								type: "station",
								position: {
									lat: 52.446691,
									lng: 13.524028,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:15:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:16:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Adlershof (Berlin)",
								id: "900193002",
								type: "station",
								position: {
									lat: 52.435104,
									lng: 13.54055,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:18:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:18:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Altglienicke (Berlin)",
								id: "900195510",
								type: "station",
								position: {
									lat: 52.407795,
									lng: 13.559598,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:22:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:23:00.000Z"),
									delay: 0,
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
								name: "S Grünbergallee (Berlin)",
								id: "900196001",
								type: "station",
								position: {
									lat: 52.399543,
									lng: 13.54322,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:25:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:25:00.000Z"),
									delay: 0,
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
								name: "S Schönefeld (bei Berlin) Bhf",
								id: "900260005",
								type: "station",
								position: {
									lat: 52.390904,
									lng: 13.513043,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:28:00.000Z"),
									delay: 0,
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
								name: "S Waßmannsdorf",
								id: "900260080",
								type: "station",
								position: {
									lat: 52.368287,
									lng: 13.463432,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:32:00.000Z"),
									delay: 0,
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
						[52.525607, 13.369072],
						[52.520304, 13.387257],
						[52.522605, 13.402359],
						[52.521508, 13.411267],
						[52.515503, 13.418027],
						[52.510335, 13.435089],
						[52.505768, 13.449157],
						[52.493426, 13.461283],
						[52.47872, 13.47403],
						[52.467582, 13.489501],
						[52.45461, 13.510149],
						[52.446691, 13.524028],
						[52.435104, 13.54055],
						[52.407795, 13.559598],
						[52.399543, 13.54322],
						[52.390904, 13.513043],
						[52.368287, 13.463432],
						[52.36461, 13.50987],
					],
				},
			],
			arrivalTime: {
				time: new Date("2025-12-08T03:36:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T02:46:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080406$202512080456$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4484|0|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19289S9Flughafen_BER",
					departureData: {
						location: {
							name: "S+U Berlin Hauptbahnhof",
							id: "900003201",
							type: "station",
							position: {
								lat: 52.525607,
								lng: 13.369072,
							},
						},
						time: {
							departure: {
								time: new Date("2025-12-08T03:06:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "15",
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
								time: new Date("2025-12-08T03:56:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "5",
							platformChanged: false,
						},
					},
					duration: 50,
					direction: "Flughafen BER",
					name: "S9",
					productName: "S",
					product: "suburban",
					operator: "S-Bahn Berlin GmbH",
					cycle: {
						min: 1200,
						max: 1200,
					},
					tripNumber: "19289",
					info: {
						statuses: [],
						hints: [
							"Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)",
							"Fahrradmitnahme möglich (Flughafen BER)",
						],
					},
					stopovers: [
						{
							location: {
								name: "S+U Friedrichstr. Bhf (Berlin)",
								id: "900100001",
								type: "station",
								position: {
									lat: 52.520304,
									lng: 13.387257,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:08:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:08:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "5",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Hackescher Markt (Berlin)",
								id: "900100002",
								type: "station",
								position: {
									lat: 52.522605,
									lng: 13.402359,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:10:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:10:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
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
									time: new Date("2025-12-08T03:12:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:12:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
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
							time: {
								arrival: {
									time: new Date("2025-12-08T03:14:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:14:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Ostbahnhof (Berlin)",
								id: "900120005",
								type: "station",
								position: {
									lat: 52.510335,
									lng: 13.435089,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:16:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:17:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "8",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S+U Warschauer Str. (Berlin)",
								id: "900120004",
								type: "station",
								position: {
									lat: 52.505768,
									lng: 13.449157,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:19:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:19:00.000Z"),
									delay: 0,
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
								name: "S Treptower Park (Berlin)",
								id: "900190001",
								type: "station",
								position: {
									lat: 52.493426,
									lng: 13.461283,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:22:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:23:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Plänterwald (Berlin)",
								id: "900191002",
								type: "station",
								position: {
									lat: 52.47872,
									lng: 13.47403,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:25:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:25:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Baumschulenweg (Berlin)",
								id: "900191001",
								type: "station",
								position: {
									lat: 52.467582,
									lng: 13.489501,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:27:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:30:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Schöneweide Bhf (Berlin)",
								id: "900192001",
								type: "station",
								position: {
									lat: 52.45461,
									lng: 13.510149,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:33:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:33:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Johannisthal (Berlin)",
								id: "900193001",
								type: "station",
								position: {
									lat: 52.446691,
									lng: 13.524028,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:35:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:36:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Adlershof (Berlin)",
								id: "900193002",
								type: "station",
								position: {
									lat: 52.435104,
									lng: 13.54055,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:38:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:38:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Altglienicke (Berlin)",
								id: "900195510",
								type: "station",
								position: {
									lat: 52.407795,
									lng: 13.559598,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:42:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:43:00.000Z"),
									delay: 0,
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
								name: "S Grünbergallee (Berlin)",
								id: "900196001",
								type: "station",
								position: {
									lat: 52.399543,
									lng: 13.54322,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:45:00.000Z"),
									delay: 0,
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
								name: "S Schönefeld (bei Berlin) Bhf",
								id: "900260005",
								type: "station",
								position: {
									lat: 52.390904,
									lng: 13.513043,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:48:00.000Z"),
									delay: 0,
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
								name: "S Waßmannsdorf",
								id: "900260080",
								type: "station",
								position: {
									lat: 52.368287,
									lng: 13.463432,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:52:00.000Z"),
									delay: 0,
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
						[52.525607, 13.369072],
						[52.520304, 13.387257],
						[52.522605, 13.402359],
						[52.521508, 13.411267],
						[52.515503, 13.418027],
						[52.510335, 13.435089],
						[52.505768, 13.449157],
						[52.493426, 13.461283],
						[52.47872, 13.47403],
						[52.467582, 13.489501],
						[52.45461, 13.510149],
						[52.446691, 13.524028],
						[52.435104, 13.54055],
						[52.407795, 13.559598],
						[52.399543, 13.54322],
						[52.390904, 13.513043],
						[52.368287, 13.463432],
						[52.36461, 13.50987],
					],
				},
			],
			arrivalTime: {
				time: new Date("2025-12-08T03:56:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T03:06:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080426$202512080516$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4486|0|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19288S9Flughafen_BER",
					departureData: {
						location: {
							name: "S+U Berlin Hauptbahnhof",
							id: "900003201",
							type: "station",
							position: {
								lat: 52.525607,
								lng: 13.369072,
							},
						},
						time: {
							departure: {
								time: new Date("2025-12-08T03:26:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "15",
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
								time: new Date("2025-12-08T04:16:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "5",
							platformChanged: false,
						},
					},
					duration: 50,
					direction: "Flughafen BER",
					name: "S9",
					productName: "S",
					product: "suburban",
					operator: "S-Bahn Berlin GmbH",
					cycle: {
						min: 1200,
						max: 1200,
					},
					tripNumber: "19288",
					info: {
						statuses: [],
						hints: [
							"Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)",
							"Fahrradmitnahme möglich (Flughafen BER)",
						],
					},
					stopovers: [
						{
							location: {
								name: "S+U Friedrichstr. Bhf (Berlin)",
								id: "900100001",
								type: "station",
								position: {
									lat: 52.520304,
									lng: 13.387257,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "5",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Hackescher Markt (Berlin)",
								id: "900100002",
								type: "station",
								position: {
									lat: 52.522605,
									lng: 13.402359,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:30:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:30:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
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
									time: new Date("2025-12-08T03:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
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
							time: {
								arrival: {
									time: new Date("2025-12-08T03:34:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:34:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Ostbahnhof (Berlin)",
								id: "900120005",
								type: "station",
								position: {
									lat: 52.510335,
									lng: 13.435089,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:36:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:37:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "8",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S+U Warschauer Str. (Berlin)",
								id: "900120004",
								type: "station",
								position: {
									lat: 52.505768,
									lng: 13.449157,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:39:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:39:00.000Z"),
									delay: 0,
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
								name: "S Treptower Park (Berlin)",
								id: "900190001",
								type: "station",
								position: {
									lat: 52.493426,
									lng: 13.461283,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:42:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:43:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Plänterwald (Berlin)",
								id: "900191002",
								type: "station",
								position: {
									lat: 52.47872,
									lng: 13.47403,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Baumschulenweg (Berlin)",
								id: "900191001",
								type: "station",
								position: {
									lat: 52.467582,
									lng: 13.489501,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:47:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:50:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Schöneweide Bhf (Berlin)",
								id: "900192001",
								type: "station",
								position: {
									lat: 52.45461,
									lng: 13.510149,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:53:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:53:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Johannisthal (Berlin)",
								id: "900193001",
								type: "station",
								position: {
									lat: 52.446691,
									lng: 13.524028,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:55:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:56:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Adlershof (Berlin)",
								id: "900193002",
								type: "station",
								position: {
									lat: 52.435104,
									lng: 13.54055,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:58:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:58:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Altglienicke (Berlin)",
								id: "900195510",
								type: "station",
								position: {
									lat: 52.407795,
									lng: 13.559598,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:03:00.000Z"),
									delay: 0,
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
								name: "S Grünbergallee (Berlin)",
								id: "900196001",
								type: "station",
								position: {
									lat: 52.399543,
									lng: 13.54322,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:05:00.000Z"),
									delay: 0,
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
								name: "S Schönefeld (bei Berlin) Bhf",
								id: "900260005",
								type: "station",
								position: {
									lat: 52.390904,
									lng: 13.513043,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:08:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:08:00.000Z"),
									delay: 0,
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
								name: "S Waßmannsdorf",
								id: "900260080",
								type: "station",
								position: {
									lat: 52.368287,
									lng: 13.463432,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:12:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:12:00.000Z"),
									delay: 0,
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
						[52.525607, 13.369072],
						[52.520304, 13.387257],
						[52.522605, 13.402359],
						[52.521508, 13.411267],
						[52.515503, 13.418027],
						[52.510335, 13.435089],
						[52.505768, 13.449157],
						[52.493426, 13.461283],
						[52.47872, 13.47403],
						[52.467582, 13.489501],
						[52.45461, 13.510149],
						[52.446691, 13.524028],
						[52.435104, 13.54055],
						[52.407795, 13.559598],
						[52.399543, 13.54322],
						[52.390904, 13.513043],
						[52.368287, 13.463432],
						[52.36461, 13.50987],
					],
				},
			],
			arrivalTime: {
				time: new Date("2025-12-08T04:16:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T03:26:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080446$202512080536$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4486|1|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19287S9Flughafen_BER",
					departureData: {
						location: {
							name: "S+U Berlin Hauptbahnhof",
							id: "900003201",
							type: "station",
							position: {
								lat: 52.525607,
								lng: 13.369072,
							},
						},
						time: {
							departure: {
								time: new Date("2025-12-08T03:46:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "15",
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
								time: new Date("2025-12-08T04:36:00.000Z"),
								delay: 0,
								status: "on-time",
							},
						},
						platformData: {
							platform: "5",
							platformChanged: false,
						},
					},
					duration: 50,
					direction: "Flughafen BER",
					name: "S9",
					productName: "S",
					product: "suburban",
					operator: "S-Bahn Berlin GmbH",
					cycle: {
						min: 1200,
						max: 1200,
					},
					tripNumber: "19287",
					info: {
						statuses: [],
						hints: [
							"Fahrradmitnahme möglich (S+U Berlin Hauptbahnhof)",
							"Fahrradmitnahme möglich (Flughafen BER)",
						],
					},
					stopovers: [
						{
							location: {
								name: "S+U Friedrichstr. Bhf (Berlin)",
								id: "900100001",
								type: "station",
								position: {
									lat: 52.520304,
									lng: 13.387257,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "5",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Hackescher Markt (Berlin)",
								id: "900100002",
								type: "station",
								position: {
									lat: 52.522605,
									lng: 13.402359,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:50:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:50:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
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
									time: new Date("2025-12-08T03:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
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
							time: {
								arrival: {
									time: new Date("2025-12-08T03:54:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:54:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Ostbahnhof (Berlin)",
								id: "900120005",
								type: "station",
								position: {
									lat: 52.510335,
									lng: 13.435089,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:56:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:57:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "9",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S+U Warschauer Str. (Berlin)",
								id: "900120004",
								type: "station",
								position: {
									lat: 52.505768,
									lng: 13.449157,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T03:59:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T03:59:00.000Z"),
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
								name: "S Treptower Park (Berlin)",
								id: "900190001",
								type: "station",
								position: {
									lat: 52.493426,
									lng: 13.461283,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:03:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Plänterwald (Berlin)",
								id: "900191002",
								type: "station",
								position: {
									lat: 52.47872,
									lng: 13.47403,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Baumschulenweg (Berlin)",
								id: "900191001",
								type: "station",
								position: {
									lat: 52.467582,
									lng: 13.489501,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:07:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:10:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Schöneweide Bhf (Berlin)",
								id: "900192001",
								type: "station",
								position: {
									lat: 52.45461,
									lng: 13.510149,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:13:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:13:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Johannisthal (Berlin)",
								id: "900193001",
								type: "station",
								position: {
									lat: 52.446691,
									lng: 13.524028,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:15:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:16:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Adlershof (Berlin)",
								id: "900193002",
								type: "station",
								position: {
									lat: 52.435104,
									lng: 13.54055,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:18:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:18:00.000Z"),
									delay: 0,
									status: "on-time",
								},
							},
							platformData: {
								platform: "3",
								platformChanged: false,
							},
						},
						{
							location: {
								name: "S Altglienicke (Berlin)",
								id: "900195510",
								type: "station",
								position: {
									lat: 52.407795,
									lng: 13.559598,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:22:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:23:00.000Z"),
									delay: 0,
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
								name: "S Grünbergallee (Berlin)",
								id: "900196001",
								type: "station",
								position: {
									lat: 52.399543,
									lng: 13.54322,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:25:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:25:00.000Z"),
									delay: 0,
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
								name: "S Schönefeld (bei Berlin) Bhf",
								id: "900260005",
								type: "station",
								position: {
									lat: 52.390904,
									lng: 13.513043,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:28:00.000Z"),
									delay: 0,
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
								name: "S Waßmannsdorf",
								id: "900260080",
								type: "station",
								position: {
									lat: 52.368287,
									lng: 13.463432,
								},
							},
							time: {
								arrival: {
									time: new Date("2025-12-08T04:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:32:00.000Z"),
									delay: 0,
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
						[52.525607, 13.369072],
						[52.520304, 13.387257],
						[52.522605, 13.402359],
						[52.521508, 13.411267],
						[52.515503, 13.418027],
						[52.510335, 13.435089],
						[52.505768, 13.449157],
						[52.493426, 13.461283],
						[52.47872, 13.47403],
						[52.467582, 13.489501],
						[52.45461, 13.510149],
						[52.446691, 13.524028],
						[52.435104, 13.54055],
						[52.407795, 13.559598],
						[52.399543, 13.54322],
						[52.390904, 13.513043],
						[52.368287, 13.463432],
						[52.36461, 13.50987],
					],
				},
			],
			arrivalTime: {
				time: new Date("2025-12-08T04:36:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T03:46:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
	],
	earlierRef:
		"3|OB|MT#14#14593#14593#14646#14646#0#0#5#14138#1#0#10#0#0#-2147483648#1#2|PDH#b3f919b4bde6cc72b8616dd2a3c3215e|RD#7122025|RT#193857|US#1|RS#INIT",
	laterRef:
		"3|OF|MT#14#14686#14686#14736#14736#0#0#325#14667#6#0#10#0#0#-2147483648#1#2|PDH#b3f919b4bde6cc72b8616dd2a3c3215e|RD#7122025|RT#193857|US#1|RS#INIT",
} as const;
