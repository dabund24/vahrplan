import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/de/dbnav/api/locations/[name]");
let input: Awaited<ReturnType<(typeof client)["parse"]>>;

test("GET /de/dbnav/api/locations/[name] api client parsing and formatting", async () => {
	input = "Nordpol";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/locations/${input}`,
		params: { name: input }
	});
});
