export const bvgScrollParsedRes = {
	journeys: [
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080506$202512080556$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4490|0|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19464S9Flughafen_BER",
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
								time: new Date("2025-12-08T04:06:00.000Z"),
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
								time: new Date("2025-12-08T04:56:00.000Z"),
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
						min: 20,
						max: 20,
					},
					tripNumber: "19464",
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
									time: new Date("2025-12-08T04:10:00.000Z"),
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
									time: new Date("2025-12-08T04:14:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:14:00.000Z"),
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
									time: new Date("2025-12-08T04:16:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:17:00.000Z"),
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
									time: new Date("2025-12-08T04:19:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:19:00.000Z"),
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
									time: new Date("2025-12-08T04:27:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:30:00.000Z"),
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
									time: new Date("2025-12-08T04:33:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:33:00.000Z"),
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
									time: new Date("2025-12-08T04:35:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:36:00.000Z"),
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
									time: new Date("2025-12-08T04:38:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:38:00.000Z"),
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
									time: new Date("2025-12-08T04:42:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:43:00.000Z"),
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
									time: new Date("2025-12-08T04:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:45:00.000Z"),
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
									time: new Date("2025-12-08T04:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:48:00.000Z"),
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
									time: new Date("2025-12-08T04:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:52:00.000Z"),
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
				time: new Date("2025-12-08T04:56:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T04:06:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080526$202512080616$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4490|1|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19463S9Flughafen_BER",
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
								time: new Date("2025-12-08T04:26:00.000Z"),
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
								time: new Date("2025-12-08T05:16:00.000Z"),
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
						min: 20,
						max: 20,
					},
					tripNumber: "19463",
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
									time: new Date("2025-12-08T04:30:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:30:00.000Z"),
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
									time: new Date("2025-12-08T04:34:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:34:00.000Z"),
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
									time: new Date("2025-12-08T04:36:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:37:00.000Z"),
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
									time: new Date("2025-12-08T04:39:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:39:00.000Z"),
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
									time: new Date("2025-12-08T04:42:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:43:00.000Z"),
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
									time: new Date("2025-12-08T04:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:45:00.000Z"),
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
									time: new Date("2025-12-08T04:47:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:50:00.000Z"),
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
									time: new Date("2025-12-08T04:53:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:53:00.000Z"),
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
									time: new Date("2025-12-08T04:55:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:56:00.000Z"),
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
									time: new Date("2025-12-08T04:58:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:58:00.000Z"),
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
									time: new Date("2025-12-08T05:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:03:00.000Z"),
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
									time: new Date("2025-12-08T05:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:05:00.000Z"),
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
									time: new Date("2025-12-08T05:08:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:08:00.000Z"),
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
									time: new Date("2025-12-08T05:12:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:12:00.000Z"),
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
				time: new Date("2025-12-08T05:16:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T04:26:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080546$202512080636$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4490|2|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19462S9Flughafen_BER",
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
								time: new Date("2025-12-08T04:46:00.000Z"),
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
								time: new Date("2025-12-08T05:36:00.000Z"),
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
						min: 20,
						max: 20,
					},
					tripNumber: "19462",
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
									time: new Date("2025-12-08T04:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:48:00.000Z"),
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
									time: new Date("2025-12-08T04:50:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:50:00.000Z"),
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
									time: new Date("2025-12-08T04:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:52:00.000Z"),
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
									time: new Date("2025-12-08T04:54:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:54:00.000Z"),
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
									time: new Date("2025-12-08T04:56:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:57:00.000Z"),
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
									time: new Date("2025-12-08T04:59:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T04:59:00.000Z"),
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
									time: new Date("2025-12-08T05:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:03:00.000Z"),
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
									time: new Date("2025-12-08T05:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:05:00.000Z"),
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
									time: new Date("2025-12-08T05:07:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:10:00.000Z"),
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
									time: new Date("2025-12-08T05:13:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:13:00.000Z"),
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
									time: new Date("2025-12-08T05:15:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:16:00.000Z"),
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
									time: new Date("2025-12-08T05:18:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:18:00.000Z"),
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
									time: new Date("2025-12-08T05:22:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:23:00.000Z"),
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
									time: new Date("2025-12-08T05:25:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:25:00.000Z"),
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
									time: new Date("2025-12-08T05:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:28:00.000Z"),
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
									time: new Date("2025-12-08T05:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:32:00.000Z"),
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
				time: new Date("2025-12-08T05:36:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T04:46:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080606$202512080656$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4490|3|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19461S9Flughafen_BER",
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
								time: new Date("2025-12-08T05:06:00.000Z"),
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
								time: new Date("2025-12-08T05:56:00.000Z"),
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
						min: 20,
						max: 20,
					},
					tripNumber: "19461",
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
									time: new Date("2025-12-08T05:08:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:08:00.000Z"),
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
									time: new Date("2025-12-08T05:10:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:10:00.000Z"),
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
									time: new Date("2025-12-08T05:12:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:12:00.000Z"),
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
									time: new Date("2025-12-08T05:14:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:14:00.000Z"),
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
									time: new Date("2025-12-08T05:16:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:17:00.000Z"),
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
									time: new Date("2025-12-08T05:19:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:19:00.000Z"),
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
									time: new Date("2025-12-08T05:22:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:23:00.000Z"),
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
									time: new Date("2025-12-08T05:25:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:25:00.000Z"),
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
									time: new Date("2025-12-08T05:27:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:30:00.000Z"),
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
									time: new Date("2025-12-08T05:33:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:33:00.000Z"),
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
									time: new Date("2025-12-08T05:35:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:36:00.000Z"),
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
									time: new Date("2025-12-08T05:38:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:38:00.000Z"),
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
									time: new Date("2025-12-08T05:42:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:43:00.000Z"),
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
									time: new Date("2025-12-08T05:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:45:00.000Z"),
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
									time: new Date("2025-12-08T05:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:48:00.000Z"),
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
									time: new Date("2025-12-08T05:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:52:00.000Z"),
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
				time: new Date("2025-12-08T05:56:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T05:06:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080626$202512080716$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4490|4|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19460S9Flughafen_BER",
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
								time: new Date("2025-12-08T05:26:00.000Z"),
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
								time: new Date("2025-12-08T06:16:00.000Z"),
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
						min: 20,
						max: 20,
					},
					tripNumber: "19460",
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
									time: new Date("2025-12-08T05:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:28:00.000Z"),
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
									time: new Date("2025-12-08T05:30:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:30:00.000Z"),
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
									time: new Date("2025-12-08T05:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:32:00.000Z"),
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
									time: new Date("2025-12-08T05:34:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:34:00.000Z"),
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
									time: new Date("2025-12-08T05:36:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:37:00.000Z"),
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
									time: new Date("2025-12-08T05:39:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:39:00.000Z"),
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
									time: new Date("2025-12-08T05:42:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:43:00.000Z"),
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
									time: new Date("2025-12-08T05:45:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:45:00.000Z"),
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
									time: new Date("2025-12-08T05:47:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:50:00.000Z"),
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
									time: new Date("2025-12-08T05:53:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:53:00.000Z"),
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
									time: new Date("2025-12-08T05:55:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:56:00.000Z"),
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
									time: new Date("2025-12-08T05:58:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:58:00.000Z"),
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
									time: new Date("2025-12-08T06:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:03:00.000Z"),
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
									time: new Date("2025-12-08T06:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:05:00.000Z"),
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
									time: new Date("2025-12-08T06:08:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:08:00.000Z"),
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
									time: new Date("2025-12-08T06:12:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:12:00.000Z"),
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
				time: new Date("2025-12-08T06:16:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T05:26:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
		{
			refreshToken:
				"¶HKI¶T$A=1@O=S+U Berlin Hauptbahnhof@L=900003201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512080646$202512080736$      S9$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#5#SICT#0#AM#99#AM2#0#RT#7#¶KRCC¶#VE#1#",
			blocks: [
				{
					type: "leg",
					tripId: "1|4490|5|86|8122025",
					blockKey: "S_Bahn_Berlin_GmbH19459S9Flughafen_BER",
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
								time: new Date("2025-12-08T05:46:00.000Z"),
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
								time: new Date("2025-12-08T06:36:00.000Z"),
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
						min: 20,
						max: 20,
					},
					tripNumber: "19459",
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
									time: new Date("2025-12-08T05:48:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:48:00.000Z"),
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
									time: new Date("2025-12-08T05:50:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:50:00.000Z"),
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
									time: new Date("2025-12-08T05:52:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:52:00.000Z"),
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
									time: new Date("2025-12-08T05:54:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:54:00.000Z"),
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
									time: new Date("2025-12-08T05:56:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:57:00.000Z"),
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
									time: new Date("2025-12-08T05:59:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T05:59:00.000Z"),
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
									time: new Date("2025-12-08T06:02:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:03:00.000Z"),
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
									time: new Date("2025-12-08T06:05:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:05:00.000Z"),
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
									time: new Date("2025-12-08T06:07:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:10:00.000Z"),
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
									time: new Date("2025-12-08T06:13:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:13:00.000Z"),
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
									time: new Date("2025-12-08T06:15:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:16:00.000Z"),
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
									time: new Date("2025-12-08T06:18:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:18:00.000Z"),
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
									time: new Date("2025-12-08T06:22:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:23:00.000Z"),
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
									time: new Date("2025-12-08T06:25:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:25:00.000Z"),
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
									time: new Date("2025-12-08T06:28:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:28:00.000Z"),
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
									time: new Date("2025-12-08T06:32:00.000Z"),
									delay: 0,
									status: "on-time",
								},
								departure: {
									time: new Date("2025-12-08T06:32:00.000Z"),
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
				time: new Date("2025-12-08T06:36:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			departureTime: {
				time: new Date("2025-12-08T05:46:00.000Z"),
				delay: 0,
				status: "on-time",
			},
			ticketData: {
				currency: "EUR",
			},
		},
	],
	earlierRef:
		"3|OB|MT#14#14706#14706#14756#14756#0#0#325#14687#7#0#10#0#0#-2147483648#1#2|PDH#b3f919b4bde6cc72b8616dd2a3c3215e|RD#7122025|RT#193857|US#1|RS#INIT",
	laterRef:
		"3|OF|MT#14#14806#14806#14856#14856#0#0#325#14787#12#0#10#0#0#-2147483648#1#2|PDH#b3f919b4bde6cc72b8616dd2a3c3215e|RD#7122025|RT#193857|US#1|RS#INIT",
} as const;
