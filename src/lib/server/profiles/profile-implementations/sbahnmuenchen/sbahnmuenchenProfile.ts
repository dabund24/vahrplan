import { Profile } from "$lib/server/profiles/profile";
import {
	FptfDataService,
	type FptfOptionId,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
import { createClient } from "hafas-client";
import { profile } from "hafas-client/p/sbahn-muenchen";
import { SbahnmuenchenLineShapeParser } from "$lib/server/profiles/profile-implementations/sbahnmuenchen/SbahnmuenchenLineShapeParser";
import { DbnavTicketUrlParser } from "$lib/server/profiles/profile-implementations/dbnav/DbnavTicketUrlParser";

export class SbahnmuenchenProfile extends Profile<
	"sbahnmuenchen",
	| "longDistanceExpress"
	| "longDistance"
	| "regionalExpress"
	| "regional"
	| "suburban"
	| "bus"
	| "subway"
	| "tram"
	| "taxi",
	FptfOptionId
> {
	protected override readonly id = "sbahnmuenchen";
	protected override readonly name = { de: "München", en: "Munich" };
	protected override readonly supportedLanguages = ["de", "en"] as const satisfies string[];
	protected override readonly fallbackLanguage = "en";
	protected override readonly products = {
		longDistanceExpress: { name: Profile.translingual("InterCityExpress") },
		longDistance: { name: Profile.translingual("InterCity/EuroCity") },
		regionalExpress: { name: { de: "sonst. Fernzüge", en: "other Long-Distance Trains" } },
		regional: { name: { de: "Regionalzüge", en: "Regional Trains" } },
		suburban: { name: Profile.translingual("S-Bahn") },
		subway: { name: Profile.translingual("U-Bahn") },
		tram: { name: { de: "Tram", en: "Tram" } },
		bus: { name: { de: "Bus", en: "Bus" } },
		taxi: { name: { de: "Ruftaxi", en: "On-Demand Service" } },
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
			longDistanceExpress: "ice",
			longDistance: "ic-ec",
			regionalExpress: "ir-d",
			regional: "region",
			suburban: "sbahn",
			subway: "ubahn",
			tram: "tram",
			bus: "bus",
			taxi: "on-call",
		},
		lineShapeParser: new SbahnmuenchenLineShapeParser(),
		ticketUrlParser: new DbnavTicketUrlParser(), // uses same ids as dbnav
		quota: {
			threshold: 60,
			interval: 60,
		},
	});
}
