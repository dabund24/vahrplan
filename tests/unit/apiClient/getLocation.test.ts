import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./utils";

const route = "location/[locationId]";
const client = apiClient("GET", route);
let input: ReturnType<(typeof client)["parse"]>;

test(`GET ${route} api client parsing and formatting`, async () => {
	input = "hello";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/location/${input}`,
		params: { locationId: input }
	});
});

test(`GET ${route} api client plausible`, async () => {
	input = "fkjewfenjsg";
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/location/[locationId]",
		props: {}
	});
});
