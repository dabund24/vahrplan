import { Profile } from "./profile.server";

/**
 * uses https://github.com/public-transport/hafas-client/tree/main/p/db
 * via https://github.com/public-transport/db-vendo-client/tree/main/p/dbnav
 */
class DbnavProfile extends Profile<
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
	["bike", "accessible", "maxTransfers", "minTransferTime"]
> {
	protected readonly id = "dbnav";
	protected readonly name = { de: "Deutschland" };
	protected readonly products = {
		longDistanceExpress: { name: "InterCityExpress/InterCity" },
		longDistance: { name: "InterCity" },
		regionalExpress: { name: { de: "sonst. Fernzug" } },
		regional: { name: { de: "Regionalexpress/-bahn" } },
		suburban: { name: { de: "S-Bahn" } },
		subway: { name: { de: "U-Bahn" } },
		tram: { name: { de: "Straßenbahn" } },
		bus: { name: { de: "Bus" } },
		taxi: { name: { de: "Ruftaxi" } },
		ferry: { name: { de: "Schiff" } }
	};
	protected readonly options = [
		"bike",
		"accessible",
		"maxTransfers",
		"minTransferTime"
	] as const satisfies string[];
}
