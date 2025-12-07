import type { JourneyWithRealtimeData } from "hafas-client";

export const bvgRefreshRawRes = {
	journey: {
		type: "journey",
		legs: [
			{
				origin: {
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
				destination: {
					type: "stop",
					id: "900078101",
					name: "U Hermannplatz (Berlin)",
					location: {
						type: "location",
						id: "900078101",
						latitude: 52.486954,
						longitude: 13.424724
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					},
					ids: {
						ifopt: "de:11000:900078101"
					}
				},
				departure: null,
				plannedDeparture: "2025-12-07T22:00:00+01:00",
				departureDelay: null,
				arrival: null,
				plannedArrival: "2025-12-07T22:10:00+01:00",
				arrivalDelay: null,
				reachable: false,
				polyline: {
					type: "FeatureCollection",
					features: [
						{
							type: "Feature",
							properties: {
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
							geometry: {
								type: "Point",
								coordinates: [13.41127, 52.52151]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41263, 52.52095]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41475, 52.51936]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41591, 52.51759]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41632, 52.51729]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41786, 52.51658]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41807, 52.51631]
							}
						},
						{
							type: "Feature",
							properties: {
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
							geometry: {
								type: "Point",
								coordinates: [13.41814, 52.5156]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41806, 52.51501]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41743, 52.51304]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.4165, 52.51108]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900100008",
								name: "U Heinrich-Heine-Str. (Berlin)",
								location: {
									type: "location",
									id: "900100008",
									latitude: 52.510559,
									longitude: 13.416122
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900100008"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.41574, 52.51013]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900013101",
								name: "U Moritzplatz (Berlin)",
								location: {
									type: "location",
									id: "900013101",
									latitude: 52.503737,
									longitude: 13.410944
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900013101"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.41063, 52.50365]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.40969, 52.50231]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.40975, 52.50186]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.40997, 52.5016]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41048, 52.50132]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41697, 52.49947]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900013102",
								name: "U Kottbusser Tor (Berlin)",
								location: {
									type: "location",
									id: "900013102",
									latitude: 52.499044,
									longitude: 13.417749
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900013102"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.41789, 52.49891]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41846, 52.49844]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.41949, 52.49676]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.42043, 52.49601]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.42079, 52.49497]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900016201",
								name: "U Schönleinstr. (Berlin)",
								location: {
									type: "location",
									id: "900016201",
									latitude: 52.493345,
									longitude: 13.421911
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900016201"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.42171, 52.49349]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.42499, 52.48822]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.42501, 52.48777]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.42433, 52.48648]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900078101",
								name: "U Hermannplatz (Berlin)",
								location: {
									type: "location",
									id: "900078101",
									latitude: 52.486954,
									longitude: 13.424724
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900078101"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.42472, 52.48696]
							}
						}
					]
				},
				tripId: "1|86329|1|86|7122025",
				line: {
					type: "line",
					id: "de-vbb-11000000-u-bahn-u8",
					fahrtNr: "21817",
					name: "U8",
					public: true,
					adminCode: "BVU---",
					productName: "U",
					mode: "train",
					product: "subway",
					operator: {
						type: "operator",
						id: "berliner-verkehrsbetriebe",
						name: "Berliner Verkehrsbetriebe"
					}
				},
				direction: "Hermannstraße",
				currentLocation: {
					type: "location",
					latitude: 52.564602,
					longitude: 13.363813
				},
				arrivalPlatform: null,
				plannedArrivalPlatform: "1 (U8)",
				arrivalPrognosisType: null,
				departurePlatform: null,
				plannedDeparturePlatform: "1 (U8)",
				departurePrognosisType: null,
				stopovers: [
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
						arrival: null,
						plannedArrival: null,
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: null,
						departure: null,
						plannedDeparture: "2025-12-07T22:00:00+01:00",
						departureDelay: null,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: "1 (U8)",
						cancelled: true,
						remarks: [
							{
								type: "status",
								code: "text.realtime.stop.cancelled",
								text: "Halt entfällt"
							},
							{
								type: "hint",
								code: "FK",
								text: "Fahrradmitnahme möglich (S+U Alexanderplatz Bhf (Berlin))"
							}
						],
						occupancy: "low"
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
						arrival: null,
						plannedArrival: "2025-12-07T22:02:00+01:00",
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: null,
						plannedDeparture: "2025-12-07T22:02:00+01:00",
						departureDelay: null,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						cancelled: true,
						remarks: [
							{
								type: "status",
								code: "text.realtime.stop.cancelled",
								text: "Halt entfällt"
							}
						],
						occupancy: "low"
					},
					{
						stop: {
							type: "stop",
							id: "900100008",
							name: "U Heinrich-Heine-Str. (Berlin)",
							location: {
								type: "location",
								id: "900100008",
								latitude: 52.510559,
								longitude: 13.416122
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900100008"
							}
						},
						arrival: null,
						plannedArrival: "2025-12-07T22:03:00+01:00",
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: null,
						plannedDeparture: "2025-12-07T22:03:00+01:00",
						departureDelay: null,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						cancelled: true,
						remarks: [
							{
								type: "status",
								code: "text.realtime.stop.cancelled",
								text: "Halt entfällt"
							}
						],
						occupancy: "low"
					},
					{
						stop: {
							type: "stop",
							id: "900013101",
							name: "U Moritzplatz (Berlin)",
							location: {
								type: "location",
								id: "900013101",
								latitude: 52.503737,
								longitude: 13.410944
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900013101"
							}
						},
						arrival: null,
						plannedArrival: "2025-12-07T22:05:00+01:00",
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: null,
						plannedDeparture: "2025-12-07T22:05:00+01:00",
						departureDelay: null,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						cancelled: true,
						remarks: [
							{
								type: "status",
								code: "text.realtime.stop.cancelled",
								text: "Halt entfällt"
							}
						],
						occupancy: "low"
					},
					{
						stop: {
							type: "stop",
							id: "900013102",
							name: "U Kottbusser Tor (Berlin)",
							location: {
								type: "location",
								id: "900013102",
								latitude: 52.499044,
								longitude: 13.417749
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900013102"
							}
						},
						arrival: null,
						plannedArrival: "2025-12-07T22:07:00+01:00",
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1 (U8)",
						departure: null,
						plannedDeparture: "2025-12-07T22:07:00+01:00",
						departureDelay: null,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: "1 (U8)",
						cancelled: true,
						remarks: [
							{
								type: "status",
								code: "text.realtime.stop.cancelled",
								text: "Halt entfällt"
							}
						],
						occupancy: "low"
					},
					{
						stop: {
							type: "stop",
							id: "900016201",
							name: "U Schönleinstr. (Berlin)",
							location: {
								type: "location",
								id: "900016201",
								latitude: 52.493345,
								longitude: 13.421911
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900016201"
							}
						},
						arrival: null,
						plannedArrival: "2025-12-07T22:08:00+01:00",
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: null,
						plannedDeparture: "2025-12-07T22:08:00+01:00",
						departureDelay: null,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						cancelled: true,
						remarks: [
							{
								type: "status",
								code: "text.realtime.stop.cancelled",
								text: "Halt entfällt"
							}
						],
						occupancy: "low"
					},
					{
						stop: {
							type: "stop",
							id: "900078101",
							name: "U Hermannplatz (Berlin)",
							location: {
								type: "location",
								id: "900078101",
								latitude: 52.486954,
								longitude: 13.424724
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: false,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900078101"
							}
						},
						arrival: null,
						plannedArrival: "2025-12-07T22:10:00+01:00",
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1 (U8)",
						departure: null,
						plannedDeparture: null,
						departureDelay: null,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: null,
						cancelled: true,
						remarks: [
							{
								type: "status",
								code: "text.realtime.stop.cancelled",
								text: "Halt entfällt"
							},
							{
								type: "hint",
								code: "FK",
								text: "Fahrradmitnahme möglich (U Hermannplatz (Berlin))"
							}
						]
					}
				],
				remarks: [
					{
						id: "309242",
						type: "warning",
						summary: "Einige Fahrten entfallen",
						text: "U 8: Derzeit fährt die Linie aufgrund einer Betriebsstörung unregelmäßig.",
						icon: {
							type: "HIM2",
							title: null
						},
						priority: 100,
						products: {
							suburban: false,
							subway: true,
							tram: false,
							bus: false,
							ferry: false,
							express: false,
							regional: false
						},
						company: "BVG",
						categories: [2],
						validFrom: "2025-12-07T21:15:00+01:00",
						validUntil: "2025-12-07T23:59:00+01:00",
						modified: "2025-12-07T21:15:52+01:00"
					},
					{
						id: "309243",
						type: "warning",
						summary: "Unterbrechung",
						text: "U 8: Die Linie fährt aufgrund eines Polizei-Einsatzes nicht zwischen U Bernauer Straße und U Hermannplatz. Bitte nutzen Sie die umliegenden Bus und U-Bahnlinien.",
						icon: {
							type: "HIM2",
							title: null
						},
						priority: 100,
						products: {
							suburban: false,
							subway: true,
							tram: false,
							bus: false,
							ferry: false,
							express: false,
							regional: false
						},
						company: "BVG",
						categories: [2],
						validFrom: "2025-12-07T21:41:00+01:00",
						validUntil: "2025-12-07T23:59:00+01:00",
						modified: "2025-12-07T21:44:02+01:00"
					},
					{
						type: "status",
						code: "text.realtime.journey.cancelled",
						text: "U8: Fällt aus"
					}
				],
				cycle: {
					min: 600,
					max: 600,
					nr: 1
				},
				cancelled: true,
				occupancy: "low"
			},
			{
				origin: {
					type: "stop",
					id: "900078101",
					name: "U Hermannplatz (Berlin)",
					location: {
						type: "location",
						id: "900078101",
						latitude: 52.486954,
						longitude: 13.424724
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					},
					ids: {
						ifopt: "de:11000:900078101"
					}
				},
				destination: {
					type: "stop",
					id: "900078101",
					name: "U Hermannplatz (Berlin)",
					location: {
						type: "location",
						id: "900078101",
						latitude: 52.486954,
						longitude: 13.424724
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					},
					ids: {
						ifopt: "de:11000:900078101"
					}
				},
				departure: "2025-12-07T22:10:00+01:00",
				plannedDeparture: "2025-12-07T22:10:00+01:00",
				departureDelay: null,
				arrival: "2025-12-07T22:10:00+01:00",
				plannedArrival: "2025-12-07T22:10:00+01:00",
				arrivalDelay: null,
				public: true,
				walking: true,
				distance: null
			},
			{
				origin: {
					type: "stop",
					id: "900078101",
					name: "U Hermannplatz (Berlin)",
					location: {
						type: "location",
						id: "900078101",
						latitude: 52.486954,
						longitude: 13.424724
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: false,
						ferry: false,
						express: false,
						regional: false
					},
					ids: {
						ifopt: "de:11000:900078101"
					}
				},
				destination: {
					type: "stop",
					id: "900083201",
					name: "U Rudow (Berlin)",
					location: {
						type: "location",
						id: "900083201",
						latitude: 52.415714,
						longitude: 13.49653
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					},
					ids: {
						ifopt: "de:11000:900083201"
					}
				},
				departure: "2025-12-07T22:16:00+01:00",
				plannedDeparture: "2025-12-07T22:15:00+01:00",
				departureDelay: 60,
				arrival: "2025-12-07T22:34:00+01:00",
				plannedArrival: "2025-12-07T22:33:00+01:00",
				arrivalDelay: 60,
				reachable: true,
				polyline: {
					type: "FeatureCollection",
					features: [
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900078101",
								name: "U Hermannplatz (Berlin)",
								location: {
									type: "location",
									id: "900078101",
									latitude: 52.486954,
									longitude: 13.424724
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900078101"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.42472, 52.48696]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.42414, 52.48633]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.43264, 52.48257]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900078102",
								name: "U Rathaus Neukölln (Berlin)",
								location: {
									type: "location",
									id: "900078102",
									latitude: 52.481147,
									longitude: 13.43481
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900078102"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.43402, 52.48169]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.43678, 52.47982]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.43726, 52.47936]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.43866, 52.47744]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900078103",
								name: "U Karl-Marx-Str. (Berlin)",
								location: {
									type: "location",
									id: "900078103",
									latitude: 52.476427,
									longitude: 13.439808
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900078103"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.43916, 52.47652]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44112, 52.47258]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900078201",
								name: "S+U Neukölln (Berlin)",
								location: {
									type: "location",
									id: "900078201",
									latitude: 52.469137,
									longitude: 13.442011
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
									ifopt: "de:11000:900078201"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.44176, 52.46867]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44234, 52.46557]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44379, 52.46402]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900080202",
								name: "U Grenzallee (Berlin)",
								location: {
									type: "location",
									id: "900080202",
									latitude: 52.463519,
									longitude: 13.444824
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900080202"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.44474, 52.46278]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44826, 52.45804]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44851, 52.45753]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44856, 52.45695]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44823, 52.45518]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900080201",
								name: "U Blaschkoallee (Berlin)",
								location: {
									type: "location",
									id: "900080201",
									latitude: 52.452741,
									longitude: 13.448977
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900080201"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.4491, 52.45217]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44985, 52.44972]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44999, 52.44864]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44992, 52.44659]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900080401",
								name: "U Parchimer Allee (Berlin)",
								location: {
									type: "location",
									id: "900080401",
									latitude: 52.445298,
									longitude: 13.449966
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900080401"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.44952, 52.44474]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44909, 52.44394]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44756, 52.44232]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44713, 52.44143]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.44711, 52.44029]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900080402",
								name: "U Britz-Süd (Berlin)",
								location: {
									type: "location",
									id: "900080402",
									latitude: 52.437073,
									longitude: 13.447665
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900080402"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.44805, 52.43783]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.45006, 52.4329]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.45149, 52.43101]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900082202",
								name: "U Johannisthaler Chaussee (Berlin)",
								location: {
									type: "location",
									id: "900082202",
									latitude: 52.429252,
									longitude: 13.453849
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900082202"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.45348, 52.42917]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.45471, 52.42825]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.45621, 52.42731]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.45759, 52.42659]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.46041, 52.42538]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900082201",
								name: "U Lipschitzallee (Berlin)",
								location: {
									type: "location",
									id: "900082201",
									latitude: 52.424649,
									longitude: 13.463108
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900082201"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.4623, 52.42475]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.46385, 52.42427]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.46484, 52.42409]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.47208, 52.42329]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900083102",
								name: "U Wutzkyallee (Berlin)",
								location: {
									type: "location",
									id: "900083102",
									latitude: 52.423148,
									longitude: 13.474821
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: false,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900083102"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.47473, 52.42328]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.4815, 52.42352]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.48231, 52.4235]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900083101",
								name: "U Zwickauer Damm (Berlin)",
								location: {
									type: "location",
									id: "900083101",
									latitude: 52.423031,
									longitude: 13.484368
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900083101"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.48371, 52.42328]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.49509, 52.41637]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900083201",
								name: "U Rudow (Berlin)",
								location: {
									type: "location",
									id: "900083201",
									latitude: 52.415714,
									longitude: 13.49653
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900083201"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.49653, 52.41572]
							}
						}
					]
				},
				tripId: "1|85936|1|86|7122025",
				line: {
					type: "line",
					id: "de-vbb-11000000-u-bahn-u7",
					fahrtNr: "20374",
					name: "U7",
					public: true,
					adminCode: "BVU---",
					productName: "U",
					mode: "train",
					product: "subway",
					operator: {
						type: "operator",
						id: "berliner-verkehrsbetriebe",
						name: "Berliner Verkehrsbetriebe"
					}
				},
				direction: "Rudow",
				currentLocation: {
					type: "location",
					latitude: 52.526263,
					longitude: 13.304808
				},
				arrivalPlatform: "2",
				plannedArrivalPlatform: "2",
				arrivalPrognosisType: null,
				departurePlatform: "1 (U7)",
				plannedDeparturePlatform: "1 (U7)",
				departurePrognosisType: null,
				stopovers: [
					{
						stop: {
							type: "stop",
							id: "900078101",
							name: "U Hermannplatz (Berlin)",
							location: {
								type: "location",
								id: "900078101",
								latitude: 52.486954,
								longitude: 13.424724
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: false,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900078101"
							}
						},
						arrival: null,
						plannedArrival: null,
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: null,
						departure: "2025-12-07T22:16:00+01:00",
						plannedDeparture: "2025-12-07T22:15:00+01:00",
						departureDelay: 60,
						departurePlatform: "1 (U7)",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1 (U7)",
						remarks: [
							{
								type: "hint",
								code: "FK",
								text: "Fahrradmitnahme möglich (U Hermannplatz (Berlin))"
							}
						],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900078102",
							name: "U Rathaus Neukölln (Berlin)",
							location: {
								type: "location",
								id: "900078102",
								latitude: 52.481147,
								longitude: 13.43481
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900078102"
							}
						},
						arrival: "2025-12-07T22:18:00+01:00",
						plannedArrival: "2025-12-07T22:17:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:18:00+01:00",
						plannedDeparture: "2025-12-07T22:17:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900078103",
							name: "U Karl-Marx-Str. (Berlin)",
							location: {
								type: "location",
								id: "900078103",
								latitude: 52.476427,
								longitude: 13.439808
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900078103"
							}
						},
						arrival: "2025-12-07T22:19:00+01:00",
						plannedArrival: "2025-12-07T22:18:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:19:00+01:00",
						plannedDeparture: "2025-12-07T22:18:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900078201",
							name: "S+U Neukölln (Berlin)",
							location: {
								type: "location",
								id: "900078201",
								latitude: 52.469137,
								longitude: 13.442011
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
								ifopt: "de:11000:900078201"
							}
						},
						arrival: "2025-12-07T22:21:00+01:00",
						plannedArrival: "2025-12-07T22:20:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:21:00+01:00",
						plannedDeparture: "2025-12-07T22:20:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900080202",
							name: "U Grenzallee (Berlin)",
							location: {
								type: "location",
								id: "900080202",
								latitude: 52.463519,
								longitude: 13.444824
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900080202"
							}
						},
						arrival: "2025-12-07T22:22:00+01:00",
						plannedArrival: "2025-12-07T22:21:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:22:00+01:00",
						plannedDeparture: "2025-12-07T22:21:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900080201",
							name: "U Blaschkoallee (Berlin)",
							location: {
								type: "location",
								id: "900080201",
								latitude: 52.452741,
								longitude: 13.448977
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900080201"
							}
						},
						arrival: "2025-12-07T22:24:00+01:00",
						plannedArrival: "2025-12-07T22:23:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:24:00+01:00",
						plannedDeparture: "2025-12-07T22:23:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900080401",
							name: "U Parchimer Allee (Berlin)",
							location: {
								type: "location",
								id: "900080401",
								latitude: 52.445298,
								longitude: 13.449966
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900080401"
							}
						},
						arrival: "2025-12-07T22:25:00+01:00",
						plannedArrival: "2025-12-07T22:24:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:25:00+01:00",
						plannedDeparture: "2025-12-07T22:24:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900080402",
							name: "U Britz-Süd (Berlin)",
							location: {
								type: "location",
								id: "900080402",
								latitude: 52.437073,
								longitude: 13.447665
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900080402"
							}
						},
						arrival: "2025-12-07T22:27:00+01:00",
						plannedArrival: "2025-12-07T22:26:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:27:00+01:00",
						plannedDeparture: "2025-12-07T22:26:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900082202",
							name: "U Johannisthaler Chaussee (Berlin)",
							location: {
								type: "location",
								id: "900082202",
								latitude: 52.429252,
								longitude: 13.453849
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900082202"
							}
						},
						arrival: "2025-12-07T22:28:00+01:00",
						plannedArrival: "2025-12-07T22:27:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:28:00+01:00",
						plannedDeparture: "2025-12-07T22:27:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900082201",
							name: "U Lipschitzallee (Berlin)",
							location: {
								type: "location",
								id: "900082201",
								latitude: 52.424649,
								longitude: 13.463108
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900082201"
							}
						},
						arrival: "2025-12-07T22:30:00+01:00",
						plannedArrival: "2025-12-07T22:29:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:30:00+01:00",
						plannedDeparture: "2025-12-07T22:29:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900083102",
							name: "U Wutzkyallee (Berlin)",
							location: {
								type: "location",
								id: "900083102",
								latitude: 52.423148,
								longitude: 13.474821
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: false,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900083102"
							}
						},
						arrival: "2025-12-07T22:31:00+01:00",
						plannedArrival: "2025-12-07T22:30:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:31:00+01:00",
						plannedDeparture: "2025-12-07T22:30:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900083101",
							name: "U Zwickauer Damm (Berlin)",
							location: {
								type: "location",
								id: "900083101",
								latitude: 52.423031,
								longitude: 13.484368
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900083101"
							}
						},
						arrival: "2025-12-07T22:32:00+01:00",
						plannedArrival: "2025-12-07T22:31:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "1",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "1",
						departure: "2025-12-07T22:32:00+01:00",
						plannedDeparture: "2025-12-07T22:31:00+01:00",
						departureDelay: 60,
						departurePlatform: "1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "1",
						remarks: [],
						occupancy: "high"
					},
					{
						stop: {
							type: "stop",
							id: "900083201",
							name: "U Rudow (Berlin)",
							location: {
								type: "location",
								id: "900083201",
								latitude: 52.415714,
								longitude: 13.49653
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900083201"
							}
						},
						arrival: "2025-12-07T22:34:00+01:00",
						plannedArrival: "2025-12-07T22:33:00+01:00",
						arrivalDelay: 60,
						arrivalPlatform: "2",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "2",
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
								text: "Fahrradmitnahme möglich (U Rudow (Berlin))"
							}
						]
					}
				],
				remarks: [],
				cycle: {
					min: 600,
					max: 600,
					nr: 13
				},
				occupancy: "high"
			},
			{
				origin: {
					type: "stop",
					id: "900083201",
					name: "U Rudow (Berlin)",
					location: {
						type: "location",
						id: "900083201",
						latitude: 52.415714,
						longitude: 13.49653
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					},
					ids: {
						ifopt: "de:11000:900083201"
					}
				},
				destination: {
					type: "stop",
					id: "900083201",
					name: "U Rudow (Berlin)",
					location: {
						type: "location",
						id: "900083201",
						latitude: 52.415714,
						longitude: 13.49653
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					},
					ids: {
						ifopt: "de:11000:900083201"
					}
				},
				departure: "2025-12-07T22:34:00+01:00",
				plannedDeparture: "2025-12-07T22:33:00+01:00",
				departureDelay: 60,
				arrival: "2025-12-07T22:34:00+01:00",
				plannedArrival: "2025-12-07T22:33:00+01:00",
				arrivalDelay: 60,
				public: true,
				walking: true,
				distance: null
			},
			{
				origin: {
					type: "stop",
					id: "900083201",
					name: "U Rudow (Berlin)",
					location: {
						type: "location",
						id: "900083201",
						latitude: 52.415714,
						longitude: 13.49653
					},
					products: {
						suburban: false,
						subway: true,
						tram: false,
						bus: true,
						ferry: false,
						express: false,
						regional: false
					},
					ids: {
						ifopt: "de:11000:900083201"
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
				departure: "2025-12-07T22:37:00+01:00",
				plannedDeparture: "2025-12-07T22:37:00+01:00",
				departureDelay: 0,
				arrival: "2025-12-07T22:50:00+01:00",
				plannedArrival: "2025-12-07T22:50:00+01:00",
				arrivalDelay: 0,
				reachable: true,
				polyline: {
					type: "FeatureCollection",
					features: [
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900083201",
								name: "U Rudow (Berlin)",
								location: {
									type: "location",
									id: "900083201",
									latitude: 52.415714,
									longitude: 13.49653
								},
								products: {
									suburban: false,
									subway: true,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900083201"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.49653, 52.41572]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.49597, 52.41582]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.49973, 52.4144]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.50103, 52.4137]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.50177, 52.41315]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.50561, 52.40952]
							}
						},
						{
							type: "Feature",
							properties: {
								type: "stop",
								id: "900083351",
								name: "Lieselotte-Berger-Str. (Berlin)",
								location: {
									type: "location",
									id: "900083351",
									latitude: 52.404235,
									longitude: 13.51085
								},
								products: {
									suburban: false,
									subway: false,
									tram: false,
									bus: true,
									ferry: false,
									express: false,
									regional: false
								},
								ids: {
									ifopt: "de:11000:900083351"
								}
							},
							geometry: {
								type: "Point",
								coordinates: [13.51026, 52.40469]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51645, 52.39865]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51789, 52.39688]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51804, 52.39683]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51858, 52.39695]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.5187, 52.39687]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51978, 52.39561]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.52101, 52.39452]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.52165, 52.39414]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.5268, 52.38943]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.53098, 52.3865]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.53778, 52.38241]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.5412, 52.37972]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.54265, 52.37835]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.5452, 52.37509]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.54541, 52.37402]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.54515, 52.37338]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.54456, 52.37279]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.54322, 52.37212]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.54231, 52.37182]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.54025, 52.37126]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51848, 52.36608]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51765, 52.36602]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51672, 52.36627]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51571, 52.36776]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51543, 52.36796]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51507, 52.36802]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51394, 52.36793]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.50888, 52.36675]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.5087, 52.36651]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.50875, 52.36635]
							}
						},
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "Point",
								coordinates: [13.51004, 52.3643]
							}
						},
						{
							type: "Feature",
							properties: {
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
							geometry: {
								type: "Point",
								coordinates: [13.50987, 52.36461]
							}
						}
					]
				},
				tripId: "1|68816|4|86|7122025",
				line: {
					type: "line",
					id: "de-vbb-11000000-bus-x7",
					fahrtNr: "170757",
					name: "X7",
					public: true,
					adminCode: "BVB---",
					productName: "Bus",
					mode: "bus",
					product: "bus",
					operator: {
						type: "operator",
						id: "berliner-verkehrsbetriebe",
						name: "Berliner Verkehrsbetriebe"
					}
				},
				direction: "Flughafen BER",
				arrivalPlatform: "Pos. A6",
				plannedArrivalPlatform: "Pos. A6",
				arrivalPrognosisType: null,
				departurePlatform: "Pos. 1",
				plannedDeparturePlatform: "Pos. 1",
				departurePrognosisType: null,
				stopovers: [
					{
						stop: {
							type: "stop",
							id: "900083201",
							name: "U Rudow (Berlin)",
							location: {
								type: "location",
								id: "900083201",
								latitude: 52.415714,
								longitude: 13.49653
							},
							products: {
								suburban: false,
								subway: true,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900083201"
							}
						},
						arrival: null,
						plannedArrival: null,
						arrivalDelay: null,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: null,
						departure: "2025-12-07T22:37:00+01:00",
						plannedDeparture: "2025-12-07T22:37:00+01:00",
						departureDelay: 0,
						departurePlatform: "Pos. 1",
						departurePrognosisType: null,
						plannedDeparturePlatform: "Pos. 1",
						remarks: [],
						occupancy: "low"
					},
					{
						stop: {
							type: "stop",
							id: "900083351",
							name: "Lieselotte-Berger-Str. (Berlin)",
							location: {
								type: "location",
								id: "900083351",
								latitude: 52.404235,
								longitude: 13.51085
							},
							products: {
								suburban: false,
								subway: false,
								tram: false,
								bus: true,
								ferry: false,
								express: false,
								regional: false
							},
							ids: {
								ifopt: "de:11000:900083351"
							}
						},
						arrival: "2025-12-07T22:40:00+01:00",
						plannedArrival: "2025-12-07T22:40:00+01:00",
						arrivalDelay: 0,
						arrivalPlatform: null,
						arrivalPrognosisType: null,
						plannedArrivalPlatform: null,
						departure: "2025-12-07T22:40:00+01:00",
						plannedDeparture: "2025-12-07T22:40:00+01:00",
						departureDelay: 0,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: null,
						remarks: [],
						occupancy: "low"
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
						arrival: "2025-12-07T22:50:00+01:00",
						plannedArrival: "2025-12-07T22:50:00+01:00",
						arrivalDelay: 0,
						arrivalPlatform: "Pos. A6",
						arrivalPrognosisType: null,
						plannedArrivalPlatform: "Pos. A6",
						departure: null,
						plannedDeparture: null,
						departureDelay: null,
						departurePlatform: null,
						departurePrognosisType: null,
						plannedDeparturePlatform: null
					}
				],
				remarks: [],
				cycle: {
					min: 600,
					max: 1860,
					nr: 10
				},
				alternatives: [
					{
						tripId: "1|74444|5|86|7122025",
						line: {
							type: "line",
							id: "de-vbb-11000000-bus-x71",
							fahrtNr: "176588",
							name: "X71",
							public: true,
							adminCode: "BVB---",
							productName: "Bus",
							mode: "bus",
							product: "bus",
							operator: {
								type: "operator",
								id: "berliner-verkehrsbetriebe",
								name: "Berliner Verkehrsbetriebe"
							}
						},
						direction: "Flughafen BER",
						when: "2025-12-07T22:47:00+01:00",
						plannedWhen: "2025-12-07T22:47:00+01:00",
						delay: null
					},
					{
						tripId: "1|68816|5|86|7122025",
						line: {
							type: "line",
							id: "de-vbb-11000000-bus-x7",
							fahrtNr: "170758",
							name: "X7",
							public: true,
							adminCode: "BVB---",
							productName: "Bus",
							mode: "bus",
							product: "bus",
							operator: {
								type: "operator",
								id: "berliner-verkehrsbetriebe",
								name: "Berliner Verkehrsbetriebe"
							}
						},
						direction: "Flughafen BER",
						when: "2025-12-07T22:57:00+01:00",
						plannedWhen: "2025-12-07T22:57:00+01:00",
						delay: null
					},
					{
						tripId: "1|74444|6|86|7122025",
						line: {
							type: "line",
							id: "de-vbb-11000000-bus-x71",
							fahrtNr: "176589",
							name: "X71",
							public: true,
							adminCode: "BVB---",
							productName: "Bus",
							mode: "bus",
							product: "bus",
							operator: {
								type: "operator",
								id: "berliner-verkehrsbetriebe",
								name: "Berliner Verkehrsbetriebe"
							}
						},
						direction: "Flughafen BER",
						when: "2025-12-07T23:07:00+01:00",
						plannedWhen: "2025-12-07T23:07:00+01:00",
						delay: 0
					},
					{
						tripId: "1|68816|6|86|7122025",
						line: {
							type: "line",
							id: "de-vbb-11000000-bus-x7",
							fahrtNr: "170759",
							name: "X7",
							public: true,
							adminCode: "BVB---",
							productName: "Bus",
							mode: "bus",
							product: "bus",
							operator: {
								type: "operator",
								id: "berliner-verkehrsbetriebe",
								name: "Berliner Verkehrsbetriebe"
							}
						},
						direction: "Flughafen BER",
						when: "2025-12-07T23:17:00+01:00",
						plannedWhen: "2025-12-07T23:17:00+01:00",
						delay: null
					},
					{
						tripId: "1|74444|7|86|7122025",
						line: {
							type: "line",
							id: "de-vbb-11000000-bus-x71",
							fahrtNr: "176590",
							name: "X71",
							public: true,
							adminCode: "BVB---",
							productName: "Bus",
							mode: "bus",
							product: "bus",
							operator: {
								type: "operator",
								id: "berliner-verkehrsbetriebe",
								name: "Berliner Verkehrsbetriebe"
							}
						},
						direction: "Flughafen BER",
						when: "2025-12-07T23:27:00+01:00",
						plannedWhen: "2025-12-07T23:27:00+01:00",
						delay: null
					}
				]
			}
		],
		refreshToken:
			"¶HKI¶T$A=1@O=S+U Alexanderplatz Bhf (Berlin)@L=900100003@a=128@$A=1@O=U Hermannplatz (Berlin)@L=900078101@a=128@$202512072200$202512072210$      U8$$1$$$$$$§T$A=1@O=U Hermannplatz (Berlin)@L=900078101@a=128@$A=1@O=U Rudow (Berlin)@L=900083201@a=128@$202512072215$202512072233$      U7$$1$$$$$$§T$A=1@O=U Rudow (Berlin)@L=900083201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512072237$202512072250$      X7$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#0#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
		cycle: {
			min: 600
		},
		remarks: [
			{
				type: "status",
				code: "text.realtime.connection.cancelled",
				text: "Verbindung fällt aus"
			}
		]
	},
	realtimeDataUpdatedAt: 1765140551
} as unknown as JourneyWithRealtimeData;
