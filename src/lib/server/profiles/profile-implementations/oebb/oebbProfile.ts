import { Profile } from "$lib/server/profiles/profile";
import {
	FptfDataService,
	type FptfOptionId,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
import { createClient } from "hafas-client";
import { profile } from "hafas-client/p/oebb";
import { OebbTicketUrlParser } from "$lib/server/profiles/profile-implementations/oebb/OebbTicketUrlParser";
import { OebbLineShapeParser } from "$lib/server/profiles/profile-implementations/oebb/OebbLineShapeParser";

export class OebbProfile extends Profile<
	"oebb",
	| "longDistanceExpress"
	| "longDistance"
	| "regionalExpress"
	| "regional"
	| "suburban"
	| "bus"
	| "ferry"
	| "subway"
	| "tram"
	| "taxi",
	FptfOptionId
> {
	protected override readonly id = "oebb";
	protected override readonly name = { de: "Österreich", en: "Austria" };
	protected override readonly supportedLanguages = ["de", "en"] as const satisfies string[];
	protected override readonly fallbackLanguage = "en";
	protected override readonly products = {
		longDistanceExpress: { name: Profile.translingual("RailJet/InterCityExpress") },
		longDistance: { name: Profile.translingual("InterCity/EuroCity/InterRegio") },
		regionalExpress: { name: { de: "Nacht-/Schnellzug", en: "Night Train/Fast Train" } },
		regional: { name: { de: "Regionalzug", en: "Regional Train" } },
		suburban: { name: Profile.translingual("S-Bahn") },
		subway: { name: { de: "U-Bahn", en: "Underground Railway" } },
		tram: { name: { de: "Straßenbahn", en: "Tram" } },
		bus: { name: { de: "Bus", en: "Bus" } },
		taxi: { name: { de: "Ruftaxi", en: "On-Demand Service" } },
		ferry: { name: { de: "Schiff", en: "Ferry" } },
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
			longDistanceExpress: "nationalExpress",
			longDistance: "national",
			regionalExpress: "interregional",
			regional: "regional",
			suburban: "suburban",
			subway: "subway",
			tram: "tram",
			bus: "bus",
			ferry: "ferry",
			taxi: "onCall",
		},
		lineShapeParser: new OebbLineShapeParser(),
		ticketUrlParser: new OebbTicketUrlParser(),
		quota: {
			threshold: 90,
			interval: 60,
		},
	});
}
