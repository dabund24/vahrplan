import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/api/journey");
let input: ReturnType<(typeof client)["parse"]>;

test("GET /api/journey/[journeyId] api client parsing and formatting", async () => {
	input = ["@#$^&*()", "fjewghiue", "qwerty"];
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/api/journey`,
		params: {}
	});
});
