import { Profile } from "../profile";
import {
	FptfDataService,
	type FptfOptionId,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
import { createClient } from "hafas-client";
import { profile } from "hafas-client/p/bvg";
import { BvgLineShapeParser } from "$lib/server/journey-data/line-shapes/BvgLineShapeParser";

/**
 * uses https://github.com/public-transport/hafas-client/tree/main/p/db
 * via https://github.com/public-transport/db-vendo-client/tree/main/p/dbnav
 */
export class BvgProfile extends Profile<
	"bvg",
	"suburban" | "subway" | "tram" | "bus" | "ferry" | "longDistanceExpress" | "regional",
	FptfOptionId
> {
	protected override readonly id = "bvg";
	protected override readonly name = { de: "Berlin" };
	protected override readonly disabledNotice = undefined;
	protected override readonly supportedLanguages = ["de"] as const satisfies string[];
	protected override readonly fallbackLanguage = "de";
	protected override readonly products = {
		longDistanceExpress: { name: { de: "Fernverkehr" } },
		regional: { name: { de: "Regionalverkehr" } },
		suburban: { name: { de: "S-Bahn" } },
		subway: { name: { de: "U-Bahn" } },
		tram: { name: { de: "Straßenbahn" } },
		bus: { name: { de: "Bus" } },
		ferry: { name: { de: "Fähre" } },
	};
	protected override readonly options = {
		bike: {},
		accessible: {},
		maxTransfers: {},
		minTransferTime: {},
	};

	protected override readonly journeyDataService = new FptfDataService({
		client: createClient(profile, this.userAgent),
		productMapping: {
			longDistanceExpress: "express",
			regional: "regional",
			suburban: "suburban",
			subway: "subway",
			tram: "tram",
			bus: "bus",
			ferry: "ferry",
		},
		lineShapeParser: new BvgLineShapeParser(),
		hasTickets: false,
	});
}
