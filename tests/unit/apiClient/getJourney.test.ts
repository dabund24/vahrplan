import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./testApiClientUtils";

const route = "journey";
const client = apiClient("GET", route);
let input: Parameters<(typeof client)["request"]>[0];

test(`GET ${route} api client parsing and formatting`, async () => {
	input = ["@#$^&*()", "fjewghiue", "qwerty"];
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/journey`,
		params: {}
	});
});

test(`GET ${route} api client plausible`, async () => {
	input = ["@#$^&*()", "jo;wew", "mgwol", "fjewghiue", "mf;qe", "qwerty"];
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/journey",
		props: { viaCount: 5 }
	});
});
