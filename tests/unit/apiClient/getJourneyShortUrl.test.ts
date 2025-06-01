import { expect, test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./utils";

const route = "journey/shorturl/[shortJourneyId]";
const client = apiClient("GET", route);
let input: ReturnType<(typeof client)["parse"]>;

test(`GET ${route} api client parsing and formatting`, async () => {
	input = "knjgnaekgnaw";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/journey/shorturl/${input}`,
		params: { shortJourneyId: input }
	});
});

test(`GET ${route} api client non-api url formatting`, () => {
	input = "knjgnaekgnaw";
	const url = client.formatNonApiUrl(input);
	expect(url.pathname).toEqual("/de/dbnav/journey/shorturl/knjgnaekgnaw");
});

test(`GET ${route} api client non-api url parsing`, () => {
	const url = new URL("http://localhost/journey/shorturl/knjgnaekgnaw");
	const id = client.parseNonApiUrl(url);
	expect(id).toEqual("knjgnaekgnaw");
});

test(`GET ${route} api client plausible`, async () => {
	input = "fkjewfenjsg";
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/journey/shorturl/[shortJourneyId]",
		props: {}
	});
});
