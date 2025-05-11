import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/de/dbnav/api/journey");
let input: ReturnType<(typeof client)["parse"]>;

test("GET /de/dbnav/api/journey/[journeyId] api client parsing and formatting", async () => {
	input = ["@#$^&*()", "fjewghiue", "qwerty"];
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/journey`,
		params: {}
	});
});
