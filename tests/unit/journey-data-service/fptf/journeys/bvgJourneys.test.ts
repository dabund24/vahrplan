import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, Journeys } from "hafas-client";
import { bvgJourneysParsedRes } from "./bvgJourneys-parsedRes";
import { bvgJourneysRawRes } from "./bvgJourneys-rawRes";
import { bvgJourneysFormattedReq } from "./bvgJourneys-formattedReq";

vi.mock("$app/server", () => ({
	read: (): object => ({ text: () => "" }),
}));

test("fptf data service journeys()", async () => {
	vi.mock("hafas-client", () => {
		return {
			createClient: (): Pick<HafasClient, "journeys"> => ({
				journeys(...params): Promise<Journeys> {
					expect(params, "request was formatted incorrectly").toEqual(
						bvgJourneysFormattedReq,
					);
					return Promise.resolve(bvgJourneysRawRes);
				},
			}),
		};
	});

	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.journeys(
		{ from: "900003201", to: "900260009" },
		{
			timeData: {
				time: "2025-12-08T03:13:00+01:00",
				type: "absolute",
				scrollDirection: "later",
			},
			filters: {
				products: {
					longDistanceExpress: true,
					regional: false,
					bus: true,
					ferry: true,
					subway: true,
					suburban: true,
					tram: false,
				},
				options: {
					bike: true,
					accessible: true,
					maxTransfers: 0,
					minTransferTime: 5,
				},
			},
		},
		{ lang: "de" },
	);

	expect(!res.isError && res.content).toEqual(bvgJourneysParsedRes);
});
