import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/api/location/[locationId]");
let input: ReturnType<(typeof client)["parse"]>;

test("GET /api/location/[locationId] api client parsing and formatting", async () => {
	input = "hello";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/api/location/${input}`,
		params: { locationId: input }
	});
});
