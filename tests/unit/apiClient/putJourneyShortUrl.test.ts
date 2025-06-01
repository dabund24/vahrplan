import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const route = "journey/shorturl";
const client = apiClient("PUT", route);
let input: Awaited<ReturnType<(typeof client)["parse"]>>;

test(`PUT ${route} api client parsing and formatting`, async () => {
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
