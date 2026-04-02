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
	protected override readonly name = { de: "Österreich" };
	protected override readonly disabledNotice = undefined;
	protected override readonly supportedLanguages = ["de"] as const satisfies string[];
	protected override readonly fallbackLanguage = "de";
	protected override readonly products = {
		longDistanceExpress: { name: Profile.translingual("RailJet/InterCityExpress") },
		longDistance: { name: Profile.translingual("InterCity/EuroCity/InterRegio") },
		regionalExpress: { name: { de: "Nacht-/Schnellzüge" } },
		regional: { name: { de: "Regionalzüge" } },
		suburban: { name: { de: "S-Bahn" } },
		subway: { name: { de: "U-Bahn" } },
		tram: { name: { de: "Straßenbahn" } },
		bus: { name: { de: "Bus" } },
		taxi: { name: { de: "Ruftaxi" } },
		ferry: { name: { de: "Schiff" } },
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
