import { Profile } from "../profile";
import {
	FptfDataService,
	type FptfOptionId
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
// @ts-expect-error no types for db-vendo-client yet
import { createClient } from "db-vendo-client";
// @ts-expect-error no types for db-vendo-client yet
import { profile } from "db-vendo-client/p/dbnav";
import type { HafasClient } from "hafas-client";
import { DbnavLineShapeParser } from "$lib/server/journey-data/fptf-clients/DbnavLineShapeParser";
import { DbnavTicketUrlParser } from "$lib/server/journey-data/fptf-clients/DbnavTicketUrlParser";

/**
 * uses https://github.com/public-transport/hafas-client/tree/main/p/db
 * via https://github.com/public-transport/db-vendo-client/tree/main/p/dbnav
 */
export class DbnavProfile extends Profile<
	"dbnav",
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
	protected override readonly id = "dbnav";
	protected override readonly name = { de: "Deutschland" };
	protected override readonly disabledNotice = undefined;
	protected override readonly supportedLanguages = ["de"] as const satisfies string[];
	protected override readonly fallbackLanguage = "de";
	protected override readonly products = {
		longDistanceExpress: { name: Profile.translingual("InterCityExpress") },
		longDistance: { name: Profile.translingual("InterCity") },
		regionalExpress: { name: { de: "sonst. Fernzug" } },
		regional: { name: { de: "Regionalexpress/-bahn" } },
		suburban: { name: { de: "S-Bahn" } },
		subway: { name: { de: "U-Bahn" } },
		tram: { name: { de: "Straßenbahn" } },
		bus: { name: { de: "Bus" } },
		taxi: { name: { de: "Ruftaxi" } },
		ferry: { name: { de: "Schiff" } }
	};
	protected override readonly options = {
		bike: {},
		accessible: {},
		maxTransfers: {},
		minTransferTime: {}
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
			taxi: "taxi"
		},
		lineShapeParser: new DbnavLineShapeParser(),
		hasTickets: true,
		ticketUrlParser: new DbnavTicketUrlParser(),
		quota: {
			threshold: 60,
			interval: 60
		}
	});
}
