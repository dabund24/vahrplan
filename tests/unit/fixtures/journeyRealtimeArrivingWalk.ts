import type { Journey } from "hafas-client";

export const berlinToBerlinFernsehturmJourney: Journey = {
	type: "journey",
	legs: [
		{
			origin: {
				id: "8011160",
				name: "Berlin Hbf",
				type: "station",
				location: {
					type: "location",
					id: "8011160",
					latitude: 52.524925,
					longitude: 13.369629
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
				weight: 2543302.1,
				ril100Ids: ["BHBF", "BHBT", "BL", "BLS"],
				ifoptId: "de:11000:900003201",
				priceCategory: 1,
				transitAuthority: "VBB Berlin",
				stadaId: "1071"
			},
			destination: {
				id: "8011155",
				name: "Berlin Alexanderplatz",
				type: "station",
				location: {
					type: "location",
					id: "8011155",
					latitude: 52.521526,
					longitude: 13.411088
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
				weight: 46268.3,
				ril100Ids: ["BALE", "BALX"],
				ifoptId: "de:11000:900100003",
				priceCategory: 3,
				transitAuthority: "VBB Berlin",
				stadaId: "53"
			},
			departure: "2025-05-27T21:16:00+02:00",
			plannedDeparture: "2025-05-27T21:14:00+02:00",
			departureDelay: 120,
			arrival: "2025-05-27T21:21:00+02:00",
			plannedArrival: "2025-05-27T21:20:00+02:00",
			arrivalDelay: 60,
			tripId: "2|#VN#1#ST#1747860008#PI#0#ZI#557359#TA#0#DA#270525#1S#8010060#1T#2019#LS#8010113#LT#2231#PU#80#RT#1#CA#DPN#ZE#73786#ZB#RE 73786#PC#3#FR#8010060#FT#2019#TO#8010113#TT#2231#",
			line: {
				type: "line",
				id: "re-73786",
				fahrtNr: "73786",
				name: "RE 1",
				public: true,
				adminCode: "OWRE__",
				productName: "RE",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "ostdeutsche-eisenbahn-gmbh",
					name: "Ostdeutsche Eisenbahn GmbH"
				}
			},
			direction: "Frankfurt(Oder)",
			arrivalPlatform: "1",
			plannedArrivalPlatform: "1",
			departurePlatform: "12",
			plannedDeparturePlatform: "11",
			stopovers: [
				{
					stop: {
						id: "8011160",
						name: "Berlin Hbf",
						type: "station",
						location: {
							type: "location",
							id: "8011160",
							latitude: 52.524925,
							longitude: 13.369629
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
						weight: 2543302.1,
						ril100Ids: ["BHBF", "BHBT", "BL", "BLS"],
						ifoptId: "de:11000:900003201",
						priceCategory: 1,
						transitAuthority: "VBB Berlin",
						stadaId: "1071"
					},
					arrival: null,
					plannedArrival: null,
					arrivalDelay: null,
					arrivalPlatform: "12",
					arrivalPrognosisType: null,
					plannedArrivalPlatform: "11",
					departure: "2025-05-27T21:16:00+02:00",
					plannedDeparture: "2025-05-27T21:14:00+02:00",
					departureDelay: 120,
					departurePlatform: "12",
					departurePrognosisType: null,
					plannedDeparturePlatform: "11",
					remarks: []
				},
				{
					stop: {
						id: "8011306",
						name: "Berlin Friedrichstraße",
						type: "station",
						location: {
							type: "location",
							id: "8011306",
							latitude: 52.520332,
							longitude: 13.386925
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
						weight: 288804.8,
						ril100Ids: ["BFRI", "BFST", "BFSTT"],
						ifoptId: "de:11000:900100001",
						priceCategory: 2,
						transitAuthority: "VBB Berlin",
						stadaId: "527"
					},
					arrival: "2025-05-27T21:17:00+02:00",
					plannedArrival: "2025-05-27T21:16:00+02:00",
					arrivalDelay: 60,
					arrivalPlatform: "1",
					arrivalPrognosisType: null,
					plannedArrivalPlatform: "1",
					departure: "2025-05-27T21:18:00+02:00",
					plannedDeparture: "2025-05-27T21:17:00+02:00",
					departureDelay: 60,
					departurePlatform: "1",
					departurePrognosisType: null,
					plannedDeparturePlatform: "1",
					remarks: []
				},
				{
					stop: {
						id: "8011155",
						name: "Berlin Alexanderplatz",
						type: "station",
						location: {
							type: "location",
							id: "8011155",
							latitude: 52.521526,
							longitude: 13.411088
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
						weight: 46268.3,
						ril100Ids: ["BALE", "BALX"],
						ifoptId: "de:11000:900100003",
						priceCategory: 3,
						transitAuthority: "VBB Berlin",
						stadaId: "53"
					},
					arrival: "2025-05-27T21:21:00+02:00",
					plannedArrival: "2025-05-27T21:20:00+02:00",
					arrivalDelay: 60,
					arrivalPlatform: "1",
					arrivalPrognosisType: null,
					plannedArrivalPlatform: "1",
					departure: null,
					plannedDeparture: null,
					departureDelay: null,
					departurePlatform: "1",
					departurePrognosisType: null,
					plannedDeparturePlatform: "1",
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
					code: "GL",
					summary: "Beförderung von Gruppen eingeschränkt",
					text: "Beförderung von Gruppen eingeschränkt",
					type: "hint",
					priority: 330
				},
				{
					text: "Rollstuhlstellplatz",
					type: "hint",
					code: "wheelchairs-space",
					summary: "space for wheelchairs"
				},
				{
					text: "Fahrzeuggebundene Einstiegshilfe vorhanden",
					type: "hint",
					code: "boarding-ramp",
					summary: "vehicle-mounted boarding ramp available"
				},
				{
					code: "EA",
					summary: "Behindertengerechte Ausstattung",
					text: "Behindertengerechte Ausstattung",
					type: "hint",
					priority: 560
				},
				{
					text: "Laptop-Steckdosen",
					type: "hint",
					code: "power-sockets",
					summary: "power sockets available"
				},
				{
					text: "Klimaanlage",
					type: "hint",
					code: "air-conditioned",
					summary: "air-conditioned vehicle"
				},
				{
					text: "WLAN verfügbar",
					type: "hint",
					code: "wifi",
					summary: "WiFi available"
				}
			]
		},
		{
			origin: {
				id: "8011155",
				name: "Berlin Alexanderplatz",
				type: "station",
				location: {
					type: "location",
					id: "8011155",
					latitude: 52.521526,
					longitude: 13.411088
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
				transitAuthority: "VBB Berlin"
			},
			destination: {
				type: "location",
				id: "991671997",
				latitude: 52.5213,
				longitude: 13.409694,
				name: "Berlin, Fernsehturm (Tourismus)",
				poi: true
			},
			departure: "2025-05-27T21:21:00+02:00",
			plannedDeparture: "2025-05-27T21:20:00+02:00",
			departureDelay: 60,
			arrival: "2025-05-27T21:24:00+02:00",
			plannedArrival: "2025-05-27T21:23:00+02:00",
			arrivalDelay: 60,
			public: true,
			walking: true,
			distance: 137
		}
	],
	refreshToken:
		"¶HKI¶T$A=1@O=Berlin Hbf@X=13369549@Y=52525589@L=8011160@a=128@$A=1@O=Berlin Alexanderplatz@X=13410962@Y=52521481@L=8011155@a=128@$202505272114$202505272120$RE 73786$$1$$$$$$§W$A=1@O=Berlin Alexanderplatz@X=13410962@Y=52521481@L=8011155@a=128@$A=1@O=Berlin Alexanderplatz@X=13410728@Y=52521409@L=618011155@a=128@$202505272120$202505272120$$$1$$$$$$§G@F$A=1@O=Berlin Alexanderplatz@X=13410728@Y=52521409@L=618011155@a=128@$A=4@O=Berlin, Fernsehturm (Tourismus)@X=13409694@Y=52521301@L=991671997@a=128@$202505272121$202505272123$$$1$$$$$$¶GP¶ft@0@2000@120@1@100@1@0@0@@@@@false@0@-1@0@-1@-1@$f@$f@$f@$f@$f@$§bt@0@2000@120@1@100@1@0@0@@@@@false@0@-1@0@-1@-1@$f@$f@$f@$f@$f@$§tf@$f@$f@$f@$f@$f@$",
	remarks: [
		{
			summary: "RE 73786 fährt abweichend von Berlin Hbf ab Gleis 12",
			text: "RE 73786 fährt abweichend von Berlin Hbf ab Gleis 12",
			type: "warning"
		}
	]
} as Journey;
