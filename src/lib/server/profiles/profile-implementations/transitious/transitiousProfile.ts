import { Profile } from "$lib/server/profiles/profile";
import {
	FptfDataService,
	type FptfOptionId,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
// @ts-expect-error missing motis-fptf-client types
import { createClient } from "@motis-project/motis-fptf-client";
// @ts-expect-error missing motis-fptf-client types
import { profile } from "@motis-project/motis-fptf-client/p/transitous";
import type { HafasClient } from "hafas-client";
import { TransitiousLineShapeParser } from "$lib/server/profiles/profile-implementations/transitious/TransitiousLineShapeParser";

export class TransitiousProfile extends Profile<
	"transitious",
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
	protected override id = "transitious" as const;
	protected override readonly name = { de: "Weltweit" };
	protected override readonly disabledNotice = undefined;
	protected override readonly supportedLanguages = ["de"] as const satisfies string[];
	protected override readonly fallbackLanguage = "de";
	protected override readonly products = {
		longDistanceExpress: { name: Profile.translingual("Hochgeschwindigkeits-Zug") },
		longDistance: { name: Profile.translingual("Fernzug/Nachtzug") },
		regionalExpress: { name: { de: "sonstige Schnellzüge" } },
		regional: { name: { de: "Regionalzug" } },
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
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		client: createClient(profile, this.userAgent, {}) as HafasClient,
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
		lineShapeParser: new TransitiousLineShapeParser(),
		quota: {
			threshold: 180,
			interval: 60,
		},
	});
}
