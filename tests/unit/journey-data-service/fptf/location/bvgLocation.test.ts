import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, Location, Station, Stop } from "hafas-client";
import { bvgLocationParsedRes } from "./bvgLocation-parsedRes";
import { bvgLocationFormattedReq } from "./bvgLocation-formattedReq";
import { bvgLocationRawRes } from "./bvgLocation-rawRes";

vi.mock("$app/server", () => ({
	read: (): object => ({ text: () => "" })
}));

test("fptf data service location", async () => {
	vi.mock("hafas-client", () => {
		return {
			createClient: (): Pick<HafasClient, "stop"> => ({
				stop(...params): Promise<Station | Stop | Location> {
					expect(params, "request was formatted incorrectly").toEqual(
						bvgLocationFormattedReq
					);
					return Promise.resolve(bvgLocationRawRes);
				}
			})
		};
	});

	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.location("900100003", { lang: "de" });

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		bvgLocationParsedRes
	);
});
