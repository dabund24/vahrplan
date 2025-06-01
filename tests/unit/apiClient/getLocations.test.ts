import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const route = "locations/[name]";
const client = apiClient("GET", route);
let input: Awaited<ReturnType<(typeof client)["parse"]>>;

test(`GET ${route} api client parsing and formatting`, async () => {
	input = "Nordpol";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/locations/${input}`,
		params: { name: input }
	});
});
