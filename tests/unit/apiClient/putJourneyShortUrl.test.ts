import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./testApiClientUtils";

const route = "journey/shorturl";
const client = apiClient("PUT", route);
let input: Parameters<(typeof client)["request"]>[0];

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

test(`PUT ${route} api client plausible`, async () => {
	input = {
		type: "journey",
		value: ["123", "456", "789"],
		expirationDate: 123456789
	};
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "PUT /api/journey/shorturl",
		props: {}
	});
});
