import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./testApiClientUtils";

const route = "locations/[name]";
const client = apiClient("GET", route);
let input: Parameters<(typeof client)["request"]>[0];

test(`GET ${route} api client parsing and formatting`, async () => {
	input = "Nordpol";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/locations/${input}`,
		params: { name: input },
	});
});

test(`GET ${route} api client plausible`, async () => {
	input = "Das Haus vom Nikolaus";
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/locations/[name]",
		props: {},
	});
});
