import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, Location, Station, Stop } from "hafas-client";
import { bvgLocationsParsedRes } from "./bvgLocations-parsedRes";
import { bvgLocationsFormattedReq } from "./bvgLocations-formattedReq";
import { bvgLocationsRawRes } from "./bvgLocations-rawRes";

vi.mock("$app/server", () => ({
	read: (): object => ({ text: () => "" }),
}));

test("fptf data service locations", async () => {
	vi.mock("hafas-client", () => {
		return {
			createClient: (): Pick<HafasClient, "locations"> => ({
				locations(...params): Promise<(Station | Stop | Location)[]> {
					expect(params, "request was formatted incorrectly").toEqual(
						bvgLocationsFormattedReq,
					);
					return Promise.resolve(bvgLocationsRawRes);
				},
			}),
		};
	});

	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.locations("Alexanderplatz", { lang: "de" });

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		bvgLocationsParsedRes,
	);
});
