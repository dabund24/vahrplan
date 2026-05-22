import { Profile } from "$lib/server/profiles/profile";
import {
	FptfDataService,
	type FptfOptionId,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
import { createClient } from "hafas-client";
import { profile } from "hafas-client/p/sbahn-muenchen";
import { SbahnmuenchenLineShapeParser } from "$lib/server/profiles/profile-implementations/sbahnmuenchen/SbahnmuenchenLineShapeParser";

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
	protected override readonly name = { de: "München" };
	protected override readonly disabledNotice = undefined;
	protected override readonly supportedLanguages = ["de"] as const satisfies string[];
	protected override readonly fallbackLanguage = "de";
	protected override readonly products = {
		longDistanceExpress: { name: Profile.translingual("InterCityExpress") },
		longDistance: { name: Profile.translingual("InterCity/EuroCity") },
		regionalExpress: { name: { de: "sonst. Fernzüge" } },
		regional: { name: { de: "Regionalzüge" } },
		suburban: { name: { de: "S-Bahn" } },
		subway: { name: { de: "U-Bahn" } },
		tram: { name: { de: "Tram" } },
		bus: { name: { de: "Bus" } },
		taxi: { name: { de: "Ruftaxi" } },
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
		quota: {
			threshold: 60,
			interval: 60,
		},
	});
}
