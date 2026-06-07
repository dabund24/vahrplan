import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, TripWithRealtimeData } from "hafas-client";
import { transitousTripFormattedReq } from "./transitousTrip-formattedReq";
import { transitousTripRawRes } from "./transitousTrip-rawRes";
import { transitousTripParsedRes } from "./transitousTrip-parsedRes";

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
						transitousTripFormattedReq,
					);
					return Promise.resolve(transitousTripRawRes);
				},
			}),
		};
	});

	const dataService = journeyDataService("transitous", "de");
	const res = await dataService.trip("20260608_14:46_de-DELFI_3211624697", { lang: "de" });

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		transitousTripParsedRes,
	);
});
