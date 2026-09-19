import { Profile } from "../../profile";
import {
	FptfDataService,
	type FptfOptionId,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
import { createClient } from "hafas-client";
import { profile } from "hafas-client/p/bvg";
import { BvgLineShapeParser } from "$lib/server/profiles/profile-implementations/bvg/BvgLineShapeParser";

/**
 * uses https://github.com/public-transport/hafas-client/tree/main/p/bvg
 */
export class BvgProfile extends Profile<
	"bvg",
	"suburban" | "subway" | "tram" | "bus" | "ferry" | "longDistanceExpress" | "regional",
	FptfOptionId
> {
	protected override readonly id = "bvg";
	protected override readonly name = { de: "Berlin", en: "Berlin" };
	protected override readonly supportedLanguages = ["de", "en"] as const satisfies string[];
	protected override readonly fallbackLanguage = "en";
	protected override readonly products = {
		longDistanceExpress: { name: { de: "Fernverkehr", en: "Long-Distance Services" } },
		regional: { name: { de: "Regionalverkehr", en: "Regional Services" } },
		suburban: { name: Profile.translingual("S-Bahn") },
		subway: { name: Profile.translingual("U-Bahn") },
		tram: { name: { de: "Straßenbahn", en: "Tram" } },
		bus: { name: { de: "Bus", en: "Bus" } },
		ferry: { name: { de: "Fähre", en: "Ferry" } },
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
	});
}
