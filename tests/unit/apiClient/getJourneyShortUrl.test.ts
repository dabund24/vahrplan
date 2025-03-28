import { expect, test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/api/journey/shorturl/[shortJourneyId]");
let input: ReturnType<(typeof client)["parse"]>;

test("GET /api/journey/shorturl/[shortJourneyId] api client parsing and formatting", async () => {
	input = "knjgnaekgnaw";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/api/journey/shorturl/${input}`,
		params: { shortJourneyId: input }
	});
});

test("GET /api/journey/shorturl/[shortJourneyId] api client non-api url formatting", () => {
	input = "knjgnaekgnaw";
	const url = client.formatNonApiUrl(input);
	expect(url.pathname).toEqual("/journey/shorturl/knjgnaekgnaw");
});

test("GET /api/journey/shorturl/[shortJourneyId] api client non-api url parsing", () => {
	const url = new URL("http://localhost/journey/shorturl/knjgnaekgnaw");
	const id = client.parseNonApiUrl(url);
	expect(id).toEqual("knjgnaekgnaw");
});
