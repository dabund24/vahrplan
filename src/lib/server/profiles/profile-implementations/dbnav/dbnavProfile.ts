import { Profile } from "../../profile";
import {
	FptfDataService,
	type FptfOptionId,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
// @ts-expect-error no types for db-vendo-client yet
import { createClient } from "db-vendo-client";
// @ts-expect-error no types for db-vendo-client yet
import { profile } from "db-vendo-client/p/db";
import type { HafasClient } from "hafas-client";
import { DbnavLineShapeParser } from "$lib/server/profiles/profile-implementations/dbnav/DbnavLineShapeParser";
import { DbnavTicketUrlParser } from "$lib/server/profiles/profile-implementations/dbnav/DbnavTicketUrlParser";

/**
 * uses https://github.com/public-transport/hafas-client/tree/main/p/db
 * via https://github.com/public-transport/db-vendo-client/tree/main/p/dbnav
 */
export class DbnavProfile extends Profile<
	"empty",
	| "longDistanceExpress"
	| "longDistance"
	| "regionalExpress"
	| "regional"
	| "suburban"
	| "subway"
	| "tram"
	| "bus"
	| "taxi"
	| "ferry",
	FptfOptionId
> {
	protected override readonly id = "empty";
	protected override readonly name = { de: "Deutschland", en: "Germany" };
	protected override readonly disabledNotice = {
		name: {
			de: "Leider ist die Datenschnittstelle der DB nicht verwendbar.",
			en: "Unfortunately, the API of DB is not usable.",
		},
	};
	protected override readonly supportedLanguages = ["de", "en"] as const satisfies string[];
	protected override readonly fallbackLanguage = "en";
	protected override readonly products = {
		longDistanceExpress: { name: Profile.translingual("InterCityExpress") },
		longDistance: { name: Profile.translingual("InterCity") },
		regionalExpress: { name: { de: "sonst. Fernzug", en: "other Long-Distance Train" } },
		regional: { name: { de: "Regionalexpress/-bahn", en: "Regional Train" } },
		suburban: { name: { de: "S-Bahn", en: "S-Bahn" } },
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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		client: createClient(profile, this.userAgent) as HafasClient,
		productMapping: {
			longDistanceExpress: "nationalExpress",
			longDistance: "national",
			regionalExpress: "regionalExpress",
			regional: "regional",
			suburban: "suburban",
			subway: "subway",
			tram: "tram",
			bus: "bus",
			ferry: "ferry",
			taxi: "taxi",
		},
		lineShapeParser: new DbnavLineShapeParser(),
		ticketUrlParser: new DbnavTicketUrlParser(),
		quota: {
			threshold: 40,
			interval: 60,
		},
	});
}
