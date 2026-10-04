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
import { TransitousLineShapeParser } from "$lib/server/profiles/profile-implementations/transitous/TransitousLineShapeParser";

export class TransitousProfile extends Profile<
	"transitous",
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
	static readonly operatorNames = {
		db: ["DB Fernverkehr AG", "Deutsche Bahn AG"],
		oebb: ["OEBB Personenverkehr AG Kundenservice", "Österreichische Bundesbahnen"],
		sbb: ["Schweizerische Bundesbahnen SBB", "SBB"],
		ns: ["NS Int"],
		flix: ["FlixBus-eu", "FlixTrain-de"],
		westbahn: ["WESTbahn Management GmbH"],
	};

	protected override readonly id = "transitous" as const;
	protected override readonly name = { de: "Weltweit", en: "Worldwide" };
	protected override readonly infoLink = {
		name: { de: "Über die Datenquelle", en: "About this data source" },
		url: "https://transitous.org/sources/",
	};
	protected override readonly supportedLanguages = ["de", "en"] as const satisfies string[];
	protected override readonly fallbackLanguage = "en";
	protected override readonly products = {
		longDistanceExpress: { name: { de: "Hochgeschwindigkeits-Zug", en: "High-Speed Train" } },
		longDistance: { name: { de: "Fernzug/Nachtzug", en: "Long-Distance Train/Night Train" } },
		regionalExpress: { name: { de: "sonstige Schnellzüge", en: "other Fast Trains" } },
		regional: { name: { de: "Regionalzug", en: "Regional Train" } },
		suburban: { name: { de: "S-Bahn", en: "Commuter Train" } },
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
		lineShapeParser: new TransitousLineShapeParser(),
		quota: {
			threshold: 180,
			interval: 60,
		},
	});
}
