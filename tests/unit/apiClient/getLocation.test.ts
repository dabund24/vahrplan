import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/de/dbnav/api/location/[locationId]");
let input: ReturnType<(typeof client)["parse"]>;

test("GET /de/dbnav/api/location/[locationId] api client parsing and formatting", async () => {
	input = "hello";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/location/${input}`,
		params: { locationId: input }
	});
});
