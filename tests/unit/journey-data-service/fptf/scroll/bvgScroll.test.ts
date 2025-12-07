import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, Journeys } from "hafas-client";
import { bvgScrollParsedRes } from "./bvgScroll-parsedRes";
import { bvgScrollFormattedReq } from "./bvgScroll-formattedReq";
import { bvgScrollRawRes } from "./bvgScroll-rawRes";

vi.mock("$app/server", () => ({
	read: (): object => ({ text: () => "" })
}));

test("fptf data service scroll", async () => {
	vi.mock("hafas-client", () => {
		return {
			createClient: (): Pick<HafasClient, "journeys"> => ({
				journeys(...params): Promise<Journeys> {
					expect(params, "request was formatted incorrectly").toEqual(
						bvgScrollFormattedReq
					);
					return Promise.resolve(bvgScrollRawRes);
				}
			})
		};
	});

	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.journeys(
		{ from: "900003201", to: "900260009" },
		{
			timeData: {
				type: "relative",
				time: "3|OF|MT#14#14686#14686#14736#14736#0#0#325#14667#6#0#10#0#0#-2147483648#1#2|PDH#b3f919b4bde6cc72b8616dd2a3c3215e|RD#7122025|RT#193857|US#1|RS#INIT",
				scrollDirection: "later"
			},
			filters: {
				products: {
					longDistanceExpress: true,
					regional: false,
					bus: true,
					ferry: true,
					subway: true,
					suburban: true,
					tram: false
				},
				options: {
					bike: true,
					accessible: true,
					maxTransfers: 0,
					minTransferTime: 5
				}
			}
		},
		{ lang: "de" }
	);

	expect(!res.isError && res.content).toEqual(bvgScrollParsedRes);
});
