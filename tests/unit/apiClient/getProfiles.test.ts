import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./testApiClientUtils";

const route = "profiles";
const client = apiClient("GET", route);
let input: Parameters<(typeof client)["request"]>[0];

test(`GET ${route} api client parsing and formatting`, async () => {
	input = { lang: "de" };
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/profiles`,
		params: {},
	});
});

test(`GET ${route} api client plausible`, async () => {
	input = { lang: "de" };
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/profiles",
		props: {},
	});
});
