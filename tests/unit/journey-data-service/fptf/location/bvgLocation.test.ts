import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, Location, Station, Stop } from "hafas-client";
import {
	bvgLocationAddressParsedRes,
	bvgLocationPoiParsedRes,
	bvgLocationStationParsedRes,
} from "./bvgLocation-parsedRes";
import { bvgLocationFormattedReq } from "./bvgLocation-formattedReq";
import { bvgLocationRawRes } from "./bvgLocation-rawRes";

vi.mock("$app/server", () => ({
	read: (): object => ({ text: () => "" }),
}));

test("fptf data service station location", async () => {
	vi.mock("hafas-client", () => {
		return {
			createClient: (): Pick<HafasClient, "stop"> => ({
				stop(...params): Promise<Station | Stop | Location> {
					expect(params, "request was formatted incorrectly").toEqual(
						bvgLocationFormattedReq,
					);
					return Promise.resolve(bvgLocationRawRes);
				},
			}),
		};
	});

	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.location("900100003", { lang: "de" });

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		bvgLocationStationParsedRes,
	);
});

test("fptf data service address location", async () => {
	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.location(
		'{"type":"location","id":null,"latitude":52.517544,"longitude":13.397047,"address":"Unter den Linden, 10117 Berlin-Mitte"}',
		{ lang: "de" },
	);

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		bvgLocationAddressParsedRes,
	);
});

test("fptf data service poi location", async () => {
	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.location(
		'{"type":"location","id":"900981087","latitude":52.518614,"longitude":13.375535,"name":"Berlin, Reichstagsgebäude","poi":true}',
		{ lang: "de" },
	);

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		bvgLocationPoiParsedRes,
	);
});
