import { expect, test, vi } from "vitest";
import { journeyDataService } from "$lib/server/profiles/profileRegistry";
import type { HafasClient, JourneyWithRealtimeData } from "hafas-client";
import { bvgRefreshParsedRes } from "./bvgRefresh-parsedRes";
import { bvgRefreshFormattedReq } from "./bvgRefresh-formattedReq";
import { bvgRefreshRawRes } from "./bvgRefresh-rawRes";

vi.mock("$app/server", () => ({
	read: (): object => ({ text: () => "" }),
}));

test("fptf data service refresh", async () => {
	vi.setSystemTime(new Date(69));
	vi.mock("hafas-client", () => {
		return {
			createClient: (): Pick<HafasClient, "refreshJourney"> => ({
				refreshJourney(...params): Promise<JourneyWithRealtimeData> {
					expect(params, "request was formatted incorrectly").toEqual(
						bvgRefreshFormattedReq,
					);
					return Promise.resolve(bvgRefreshRawRes);
				},
			}),
		};
	});

	const dataService = journeyDataService("bvg", "de");
	const res = await dataService.refresh(
		"¶HKI¶T$A=1@O=S+U Alexanderplatz Bhf (Berlin)@L=900100003@a=128@$A=1@O=U Hermannplatz (Berlin)@L=900078101@a=128@$202512072200$202512072210$ U8$$1$$$$$$§T$A=1@O=U Hermannplatz (Berlin)@L=900078101@a=128@$A=1@O=U Rudow (Berlin)@L=900083201@a=128@$202512072215$202512072233$ U7$$1$$$$$$§T$A=1@O=U Rudow (Berlin)@L=900083201@a=128@$A=1@O=Flughafen BER@L=900260009@a=128@$202512072237$202512072250$ X7$$1$$$$$$¶KC¶#VE#2#CF#100#CA#0#CM#0#SICT#0#AM#97#AM2#0#RT#7#¶KRCC¶#VE#1#",
		{ lang: "de" },
	);

	expect(!res.isError && res.content, "response was parsed incorrectly").toEqual(
		bvgRefreshParsedRes,
	);
});
