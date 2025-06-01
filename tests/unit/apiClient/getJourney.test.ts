import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const route = "journey";
const client = apiClient("GET", route);
let input: ReturnType<(typeof client)["parse"]>;

test(`GET ${route} api client parsing and formatting`, async () => {
	input = ["@#$^&*()", "fjewghiue", "qwerty"];
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/journey`,
		params: {}
	});
});
