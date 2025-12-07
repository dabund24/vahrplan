import type { Location, Station, Stop } from "hafas-client";

export const bvgLocationRawRes = {
	type: "station",
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
		tram: true,
		bus: true,
		ferry: false,
		express: false,
		regional: true
	},
	ids: {
		ifopt: "de:11000:900100003"
	}
} as Station | Stop | Location;
