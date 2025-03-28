import type { JourneysOptions, TimeData } from "$lib/types";
import type { JourneysOptions as FptfJourneysOptions, Location, Station, Stop } from "hafas-client";

export function formatOptions(timeData: TimeData, options: JourneysOptions): FptfJourneysOptions {
	const fptfOptions: FptfJourneysOptions = {
		products: {
			nationalExpress: options.products.longDistanceExpress,
			national: options.products.longDistance,
			regionalExpress: options.products.regionalExpress,
			regional: options.products.regional,
			suburban: options.products.suburban,
			subway: options.products.subway,
			tram: options.products.tram,
			bus: options.products.bus,
			taxi: options.products.taxi,
			ferry: options.products.ferry
		},
		transferTime: options.minTransferTime,
		transfers: options.maxTransfers,
		accessibility: options.accessible ? "complete" : "none",
		results: 10,
		stopovers: true,
		tickets: true,
		language: "de"
	};

	if (timeData.type === "absolute") {
		fptfOptions[timeData.scrollDirection === "later" ? "departure" : "arrival"] = new Date(
			timeData.time
		);
	} else {
		fptfOptions[`${timeData.scrollDirection}Than`] = timeData.time;
	}

	return fptfOptions;
}

export function formatStop(stop: string): string | Station | Stop | Location {
	if (stop.startsWith("{")) {
		return JSON.parse(stop) as Station | Stop | Location;
	}
	return stop;
}
