import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./testApiClientUtils";

const route = "profile";
const client = apiClient("GET", route);
let input: Parameters<(typeof client)["request"]>[0];

test(`GET ${route} api client parsing and formatting`, async () => {
	input = { lang: "de", profile: "dbnav" };
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/profile`,
		params: {}
	});
});

test(`GET ${route} api client plausible`, async () => {
	input = { lang: "de", profile: "bvg" };
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/profile",
		props: {}
	});
});
