import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("PUT", "/de/dbnav/api/journey/shorturl");
let input: Awaited<ReturnType<(typeof client)["parse"]>>;

test("PUT /de/dbnav/api/journey/shorturl api client parsing and formatting", async () => {
	input = {
		type: "journey",
		value: ["gbiaerlgbwkj.n", "fngWJHNKGNSNF", "FJEWIUGHEWIULFH"],
		expirationDate: 123456789
	};
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/journey/shorturl`,
		params: {}
	});
});
