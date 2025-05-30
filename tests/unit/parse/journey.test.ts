import { beforeAll, expect, test, vi } from "vitest";
import { parseSubJourney } from "$lib/server/journey-data/hafas-client/parse/parse";
import { berlinToBerlinFernsehturmJourney } from "../fixtures/journeyRealtimeArrivingWalk";
import { lindauInselToAugsburgJourney } from "../fixtures/journeyRealtimeStartingOnwardJourney";

const berlinToBerlinFernsehturmExpected = {
	refreshToken:
		"¶HKI¶T$A=1@O=Berlin Hbf@X=13369549@Y=52525589@L=8011160@a=128@$A=1@O=Berlin Alexanderplatz@X=13410962@Y=52521481@L=8011155@a=128@$202505272114$202505272120$RE 73786$$1$$$$$$§W$A=1@O=Berlin Alexanderplatz@X=13410962@Y=52521481@L=8011155@a=128@$A=1@O=Berlin Alexanderplatz@X=13410728@Y=52521409@L=618011155@a=128@$202505272120$202505272120$$$1$$$$$$§G@F$A=1@O=Berlin Alexanderplatz@X=13410728@Y=52521409@L=618011155@a=128@$A=4@O=Berlin, Fernsehturm (Tourismus)@X=13409694@Y=52521301@L=991671997@a=128@$202505272121$202505272123$$$1$$$$$$¶GP¶ft@0@2000@120@1@100@1@0@0@@@@@false@0@-1@0@-1@-1@$f@$f@$f@$f@$f@$§bt@0@2000@120@1@100@1@0@0@@@@@false@0@-1@0@-1@-1@$f@$f@$f@$f@$f@$§tf@$f@$f@$f@$f@$f@$",
	blocks: [
		{
			type: "leg",
			tripId: "2|#VN#1#ST#1747860008#PI#0#ZI#557359#TA#0#DA#270525#1S#8010060#1T#2019#LS#8010113#LT#2231#PU#80#RT#1#CA#DPN#ZE#73786#ZB#RE 73786#PC#3#FR#8010060#FT#2019#TO#8010113#TT#2231#",
			attribute: undefined,
			blockKey: "Ostdeutsche_Eisenbahn_GmbH73786RE_1Frankfurt_Oder_",
			currentLocation: undefined,
			departureData: {
				attribute: undefined,
				location: {
					name: "Berlin Hbf",
					id: "8011160",
					type: "station",
					position: {
						lat: 52.524925,
						lng: 13.369629
					}
				},
				time: {
					departure: {
						time: new Date("2025-05-27T19:16:00.000Z"),
						delay: 2,
						status: "on-time"
					}
				},
				platformData: {
					platform: "12",
					platformChanged: true
				}
			},
			arrivalData: {
				attribute: undefined,
				location: {
					name: "Berlin Alexanderplatz",
					id: "8011155",
					type: "station",
					position: {
						lat: 52.521526,
						lng: 13.411088
					}
				},
				time: {
					arrival: {
						time: new Date("2025-05-27T19:21:00.000Z"),
						delay: 1,
						status: "on-time"
					}
				},
				platformData: {
					platform: "1",
					platformChanged: false
				}
			},
			duration: 5,
			direction: "Frankfurt(Oder)",
			lineShape: undefined,
			name: "RE 1",
			productName: "RE",
			product: "regional",
			info: {
				statuses: [],
				hints: [
					"Fahrradmitnahme begrenzt möglich",
					"Beförderung von Gruppen eingeschränkt",
					"Rollstuhlstellplatz",
					"Fahrzeuggebundene Einstiegshilfe vorhanden",
					"Behindertengerechte Ausstattung",
					"Laptop-Steckdosen",
					"Klimaanlage",
					"WLAN verfügbar",
					"Betreiber: Ostdeutsche Eisenbahn GmbH",
					"Fahrtnummer: 73786"
				]
			},
			stopovers: [
				{
					attribute: undefined,
					location: {
						name: "Berlin Friedrichstraße",
						id: "8011306",
						type: "station",
						position: {
							lat: 52.520332,
							lng: 13.386925
						}
					},
					time: {
						arrival: {
							time: new Date("2025-05-27T19:17:00.000Z"),
							delay: 1,
							status: "on-time"
						},
						departure: {
							time: new Date("2025-05-27T19:18:00.000Z"),
							delay: 1,
							status: "on-time"
						}
					},
					platformData: {
						platform: "1",
						platformChanged: false
					}
				}
			],
			polyline: [
				[52.524925, 13.369629],
				[52.520332, 13.386925],
				[52.521526, 13.411088]
			]
		},
		{
			type: "walk",
			originLocation: {
				name: "Berlin Alexanderplatz",
				id: "8011155",
				type: "station",
				position: {
					lat: 52.521526,
					lng: 13.411088
				}
			},
			destinationLocation: {
				name: "Berlin, Fernsehturm (Tourismus)",
				id: '{"type":"location","id":"991671997","latitude":52.5213,"longitude":13.409694,"name":"Berlin, Fernsehturm (Tourismus)","poi":true}',
				type: "poi",
				position: {
					lat: 52.5213,
					lng: 13.409694
				}
			},
			time: {
				arrival: {
					time: new Date("2025-05-27T19:21:00.000Z"),
					delay: 1,
					status: "on-time"
				},
				departure: {
					time: new Date("2025-05-27T19:24:00.000Z"),
					delay: 1,
					status: "on-time"
				}
			},
			transferTime: 3,
			travelTime: 3,
			distance: 137
		},
		{
			type: "location",
			location: {
				name: "Berlin, Fernsehturm (Tourismus)",
				id: '{"type":"location","id":"991671997","latitude":52.5213,"longitude":13.409694,"name":"Berlin, Fernsehturm (Tourismus)","poi":true}',
				type: "poi",
				position: {
					lat: 52.5213,
					lng: 13.409694
				}
			},
			time: {
				arrival: {
					delay: undefined,
					status: undefined,
					time: new Date("2025-05-27T19:24:00.000Z")
				}
			},
			hidden: false
		}
	],
	arrivalTime: {
		delay: undefined,
		status: undefined,
		time: new Date("2025-05-27T19:24:00.000Z")
	},
	departureTime: {
		time: new Date("2025-05-27T19:16:00.000Z"),
		delay: 2,
		status: "on-time"
	},
	ticketData: {
		currency: "EUR",
		hint: undefined,
		minPrice: undefined,
		url: "https://www.bahn.de/buchung/start?so=Berlin+Hbf&zo=Berlin%2C+Fernsehturm+%28Tourismus%29&soid=O%3DBerlin+Hbf&zoid=O%3DBerlin%2C+Fernsehturm+%28Tourismus%29&cbs=true&hd=Tue+May+27+2025+19%3A16%3A00+GMT%2B0000+%28Coordinated+Universal+Time%29&gh=%C2%B6HKI%C2%B6T%24A%3D1%40O%3DBerlin+Hbf%40X%3D13369549%40Y%3D52525589%40L%3D8011160%40a%3D128%40%24A%3D1%40O%3DBerlin+Alexanderplatz%40X%3D13410962%40Y%3D52521481%40L%3D8011155%40a%3D128%40%24202505272114%24202505272120%24RE+73786%24%241%24%24%24%24%24%24%C2%A7W%24A%3D1%40O%3DBerlin+Alexanderplatz%40X%3D13410962%40Y%3D52521481%40L%3D8011155%40a%3D128%40%24A%3D1%40O%3DBerlin+Alexanderplatz%40X%3D13410728%40Y%3D52521409%40L%3D618011155%40a%3D128%40%24202505272120%24202505272120%24%24%241%24%24%24%24%24%24%C2%A7G%40F%24A%3D1%40O%3DBerlin+Alexanderplatz%40X%3D13410728%40Y%3D52521409%40L%3D618011155%40a%3D128%40%24A%3D4%40O%3DBerlin%2C+Fernsehturm+%28Tourismus%29%40X%3D13409694%40Y%3D52521301%40L%3D991671997%40a%3D128%40%24202505272121%24202505272123%24%24%241%24%24%24%24%24%24%C2%B6GP%C2%B6ft%400%402000%40120%401%40100%401%400%400%40%40%40%40%40false%400%40-1%400%40-1%40-1%40%24f%40%24f%40%24f%40%24f%40%24f%40%24%C2%A7bt%400%402000%40120%401%40100%401%400%400%40%40%40%40%40false%400%40-1%400%40-1%40-1%40%24f%40%24f%40%24f%40%24f%40%24f%40%24%C2%A7tf%40%24f%40%24f%40%24f%40%24f%40%24f%40%24#sts=true"
	}
};

const lindauInselToAugsburgExpected = {
	refreshToken:
		"¶HKI¶TF$A=1@O=Lindau-Insel@X=9680465@Y=47544343@L=8000230@a=128@$A=1@O=Lindau-Reutin@X=9703289@Y=47552388@L=8003693@a=128@$202505301650$202505301710$$$1$$$$$$§T$A=1@O=Lindau-Reutin@X=9703289@Y=47552388@L=8003693@a=128@$A=1@O=Buchloe@X=10716221@Y=48033725@L=8000057@a=128@$202505301710$202505301823$ECE  195$$1$$$$$$§T$A=1@O=Buchloe@X=10716221@Y=48033725@L=8000057@a=128@$A=1@O=Augsburg Hbf@X=10885568@Y=48365444@L=8000013@a=128@$202505301838$202505301909$BRB62785$$1$$$$$$",
	blocks: [
		{
			type: "location",
			location: {
				name: "Lindau-Insel",
				id: "8000230",
				type: "station",
				position: {
					lat: 47.544308,
					lng: 9.68078
				}
			},
			time: {
				departure: {
					time: new Date("2025-05-30T14:50:00.000Z"),
					delay: undefined,
					status: undefined
				}
			},
			hidden: false
		},
		{
			type: "onward-journey",
			originLocation: {
				name: "Lindau-Insel",
				id: "8000230",
				type: "station",
				position: {
					lat: 47.544308,
					lng: 9.68078
				}
			},
			destinationLocation: {
				name: "Lindau-Reutin",
				id: "8003693",
				type: "station",
				position: {
					lat: 47.552406,
					lng: 9.70284
				}
			},
			time: {
				arrival: {
					time: new Date("2025-05-30T14:50:00.000Z"),
					delay: undefined,
					status: undefined
				},
				departure: {
					time: new Date("2025-05-30T15:10:00.000Z"),
					delay: undefined,
					status: undefined
				}
			},
			transferTime: 20,
			travelTime: 20,
			distance: 1886
		},
		{
			type: "leg",
			tripId: "2|#VN#1#ST#1748297855#PI#0#ZI#350825#TA#0#DA#300525#1S#8503000#1T#1533#LS#8098261#LT#1904#PU#80#RT#1#CA#EC#ZE#195#ZB#EC   195#PC#1#FR#8503000#FT#1533#TO#8098261#TT#1904#",
			blockKey: "DB_Fernverkehr_AG195ECE_195M_nchen_Hbf_Gl_27_36",
			departureData: {
				location: {
					name: "Lindau-Reutin",
					id: "8003693",
					type: "station",
					position: {
						lat: 47.552406,
						lng: 9.70284
					}
				},
				time: {
					departure: {
						time: new Date("2025-05-30T15:10:00.000Z"),
						delay: 0,
						status: "on-time"
					}
				},
				platformData: {
					platform: "22",
					platformChanged: false
				}
			},
			arrivalData: {
				location: {
					name: "Buchloe",
					id: "8000057",
					type: "station",
					position: {
						lat: 48.033733,
						lng: 10.71623
					}
				},
				time: {
					arrival: {
						time: new Date("2025-05-30T16:29:00.000Z"),
						delay: 6,
						status: "delayed"
					}
				},
				platformData: {
					platform: "2",
					platformChanged: false
				}
			},
			duration: 79,
			direction: "München Hbf Gl.27-36",
			name: "ECE 195",
			productName: "ECE",
			product: "longDistanceExpress",
			info: {
				statuses: [],
				hints: [
					"Fahrradmitnahme reservierungspflichtig",
					"Fahrradmitnahme begrenzt möglich",
					"Bordrestaurant",
					"Auslastung: hoch",
					"Betreiber: DB Fernverkehr AG",
					"Fahrtnummer: 195"
				]
			},
			stopovers: [
				{
					location: {
						name: "Memmingen",
						id: "8000249",
						type: "station",
						position: {
							lat: 47.985847,
							lng: 10.186954
						}
					},
					time: {
						arrival: {
							time: new Date("2025-05-30T16:04:00.000Z"),
							delay: 6,
							status: "delayed"
						},
						departure: {
							time: new Date("2025-05-30T16:06:00.000Z"),
							delay: 5,
							status: "on-time"
						}
					},
					platformData: {
						platform: "1",
						platformChanged: false
					}
				}
			],
			polyline: [
				[47.552406, 9.70284],
				[47.985847, 10.186954],
				[48.033733, 10.71623]
			],
			succeededBy: "transfer"
		},
		{
			type: "transfer",
			transferTime: 9,
			transitData: {
				location: {
					name: "Buchloe",
					id: "8000057",
					type: "station",
					position: {
						lat: 48.033733,
						lng: 10.71623
					}
				},
				time: {
					arrival: {
						time: new Date("2025-05-30T16:29:00.000Z"),
						delay: 6,
						status: "delayed"
					},
					departure: {
						time: new Date("2025-05-30T16:38:00.000Z"),
						delay: 0,
						status: "on-time"
					}
				},
				platformData: {
					platform: "2",
					platformChanged: false
				},
				platformData2: {
					platform: "1",
					platformChanged: false
				}
			},
			arrivalProduct: "longDistanceExpress",
			departureProduct: "regional",
			isStopover: false
		},
		{
			type: "leg",
			tripId: "2|#VN#1#ST#1748297855#PI#0#ZI#1379717#TA#2#DA#300525#1S#8000057#1T#1838#LS#8000013#LT#1909#PU#80#RT#1#CA#DPN#ZE#62785#ZB#BRB62785#PC#3#FR#8000057#FT#1838#TO#8000013#TT#1909#",
			blockKey: "Bayerische_Regiobahn62785BRB_RB77Augsburg_Hbf",
			departureData: {
				location: {
					name: "Buchloe",
					id: "8000057",
					type: "station",
					position: {
						lat: 48.033733,
						lng: 10.71623
					}
				},
				time: {
					departure: {
						time: new Date("2025-05-30T16:38:00.000Z"),
						delay: 0,
						status: "on-time"
					}
				},
				platformData: {
					platform: "1",
					platformChanged: false
				}
			},
			arrivalData: {
				location: {
					name: "Augsburg Hbf",
					id: "8000013",
					type: "station",
					position: {
						lat: 48.365246,
						lng: 10.885595
					}
				},
				time: {
					arrival: {
						time: new Date("2025-05-30T17:09:00.000Z"),
						delay: 0,
						status: "on-time"
					}
				},
				platformData: {
					platform: "10 C-E",
					platformChanged: false
				}
			},
			duration: 31,
			direction: "Augsburg Hbf",
			name: "BRB RB77",
			productName: "BRB",
			product: "regional",
			info: {
				statuses: [],
				hints: [
					"Fahrradmitnahme begrenzt möglich",
					"Fahrkarten im Zug erhältlich",
					"Rampe im Zug",
					"Behindertengerechte Ausstattung",
					"Klimaanlage",
					"Betreiber: Bayerische Regiobahn",
					"Fahrtnummer: 62785"
				]
			},
			stopovers: [
				{
					location: {
						name: "Schwabmünchen",
						id: "8005444",
						type: "station",
						position: {
							lat: 48.17845,
							lng: 10.768106
						}
					},
					time: {
						arrival: {
							time: new Date("2025-05-30T16:47:00.000Z"),
							delay: 0,
							status: "on-time"
						},
						departure: {
							time: new Date("2025-05-30T16:48:00.000Z"),
							delay: 0,
							status: "on-time"
						}
					},
					platformData: {
						platform: "3",
						platformChanged: false
					}
				},
				{
					location: {
						name: "Bobingen",
						id: "8001033",
						type: "station",
						position: {
							lat: 48.266373,
							lng: 10.83789
						}
					},
					time: {
						arrival: {
							time: new Date("2025-05-30T16:55:00.000Z"),
							delay: 0,
							status: "on-time"
						},
						departure: {
							time: new Date("2025-05-30T16:55:00.000Z"),
							delay: 0,
							status: "on-time"
						}
					},
					platformData: {
						platform: "2",
						platformChanged: false
					}
				},
				{
					location: {
						name: "Inningen",
						id: "8003079",
						type: "station",
						position: {
							lat: 48.311356,
							lng: 10.868911
						}
					},
					time: {
						arrival: {
							time: new Date("2025-05-30T16:59:00.000Z"),
							delay: 0,
							status: "on-time"
						},
						departure: {
							time: new Date("2025-05-30T17:00:00.000Z"),
							delay: 0,
							status: "on-time"
						}
					},
					platformData: {
						platform: "2",
						platformChanged: false
					}
				},
				{
					location: {
						name: "Augsburg Messe",
						id: "8000659",
						type: "station",
						position: {
							lat: 48.338684,
							lng: 10.886081
						}
					},
					time: {
						arrival: {
							time: new Date("2025-05-30T17:03:00.000Z"),
							delay: 0,
							status: "on-time"
						},
						departure: {
							time: new Date("2025-05-30T17:03:00.000Z"),
							delay: 0,
							status: "on-time"
						}
					},
					platformData: {
						platform: "1",
						platformChanged: false
					}
				},
				{
					location: {
						name: "Augsburg Morellstr.",
						id: "8000660",
						type: "station",
						position: {
							lat: 48.35508,
							lng: 10.893074
						}
					},
					time: {
						arrival: {
							time: new Date("2025-05-30T17:05:00.000Z"),
							delay: 0,
							status: "on-time"
						},
						departure: {
							time: new Date("2025-05-30T17:06:00.000Z"),
							delay: 0,
							status: "on-time"
						}
					},
					platformData: {
						platform: "1",
						platformChanged: false
					}
				}
			],
			polyline: [
				[48.033733, 10.71623],
				[48.17845, 10.768106],
				[48.266373, 10.83789],
				[48.311356, 10.868911],
				[48.338684, 10.886081],
				[48.35508, 10.893074],
				[48.365246, 10.885595]
			],
			precededBy: "transfer"
		}
	],
	arrivalTime: {
		time: new Date("2025-05-30T17:09:00.000Z"),
		delay: 0,
		status: "on-time"
	},
	departureTime: {
		time: new Date("2025-05-30T14:50:00.000Z"),
		delay: undefined,
		status: undefined
	},
	ticketData: {
		currency: "EUR",
		url: "https://www.bahn.de/buchung/start?so=Lindau-Insel&zo=Augsburg+Hbf&soid=O%3DLindau-Insel&zoid=O%3DAugsburg+Hbf&cbs=true&hd=Fri+May+30+2025+14%3A50%3A00+GMT%2B0000+%28Coordinated+Universal+Time%29&gh=%C2%B6HKI%C2%B6TF%24A%3D1%40O%3DLindau-Insel%40X%3D9680465%40Y%3D47544343%40L%3D8000230%40a%3D128%40%24A%3D1%40O%3DLindau-Reutin%40X%3D9703289%40Y%3D47552388%40L%3D8003693%40a%3D128%40%24202505301650%24202505301710%24%24%241%24%24%24%24%24%24%C2%A7T%24A%3D1%40O%3DLindau-Reutin%40X%3D9703289%40Y%3D47552388%40L%3D8003693%40a%3D128%40%24A%3D1%40O%3DBuchloe%40X%3D10716221%40Y%3D48033725%40L%3D8000057%40a%3D128%40%24202505301710%24202505301823%24ECE++195%24%241%24%24%24%24%24%24%C2%A7T%24A%3D1%40O%3DBuchloe%40X%3D10716221%40Y%3D48033725%40L%3D8000057%40a%3D128%40%24A%3D1%40O%3DAugsburg+Hbf%40X%3D10885568%40Y%3D48365444%40L%3D8000013%40a%3D128%40%24202505301838%24202505301909%24BRB62785%24%241%24%24%24%24%24%24#sts=true"
	}
};

beforeAll(() => {
	vi.mock("$app/server", () => ({
		read: (): object => ({ text: () => "" })
	}));
});

test("Parse journey with ending walk", () => {
	const res = parseSubJourney(berlinToBerlinFernsehturmJourney);
	expect(res).toEqual(berlinToBerlinFernsehturmExpected);
});

test("Parse journey with starting onward journey", () => {
	const res = parseSubJourney(lindauInselToAugsburgJourney);
	expect(res).toEqual(lindauInselToAugsburgExpected);
});
