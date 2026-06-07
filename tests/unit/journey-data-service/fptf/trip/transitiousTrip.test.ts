import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, TripWithRealtimeData } from "hafas-client";
import { transitiousTripFormattedReq } from "./transitiousTrip-formattedReq";
import { transitiousTripRawRes } from "./transitiousTrip-rawRes";
import { transitiousTripParsedRes } from "./transitiousTrip-parsedRes";

vi.mock("$app/server", () => ({
	read: (): object => ({ text: () => "" }),
}));

test("fptf data service trip", async () => {
	vi.setSystemTime(new Date(42));
	vi.mock("@motis-project/motis-fptf-client", () => {
		return {
			createClient: (): Pick<HafasClient, "trip"> => ({
				trip(...params): Promise<TripWithRealtimeData> {
					expect(params, "request was formatted incorrectly").toEqual(
						transitiousTripFormattedReq,
					);
					return Promise.resolve(transitiousTripRawRes);
				},
			}),
		};
	});

	const dataService = journeyDataService("transitious", "de");
	const res = await dataService.trip("20260608_14:46_de-DELFI_3211624697", { lang: "de" });

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		transitiousTripParsedRes,
	);
});
