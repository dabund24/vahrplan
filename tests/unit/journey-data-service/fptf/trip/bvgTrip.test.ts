import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, TripWithRealtimeData } from "hafas-client";
import { bvgTripParsedRes } from "./bvgTrip-parsedRes";
import { bvgTripFormattedReq } from "./bvgTrip-formattedReq";
import { bvgTripRawRes } from "./bvgTrip-rawRes";

vi.mock("$app/server", () => ({
	read: (): object => ({ text: () => "" }),
}));

test("fptf data service trip", async () => {
	vi.setSystemTime(new Date(42));
	vi.mock("hafas-client", () => {
		return {
			createClient: (): Pick<HafasClient, "trip"> => ({
				trip(...params): Promise<TripWithRealtimeData> {
					expect(params, "request was formatted incorrectly").toEqual(
						bvgTripFormattedReq,
					);
					return Promise.resolve(bvgTripRawRes);
				},
			}),
		};
	});

	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.trip("1|73342|0|86|11042026", { lang: "de" });

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		bvgTripParsedRes,
	);
});
