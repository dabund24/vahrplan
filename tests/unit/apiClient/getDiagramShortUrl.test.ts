import { expect, test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./utils";

const route = "diagram/shorturl/[shortDiagramId]";
const client = apiClient("GET", route);
let input: ReturnType<(typeof client)["parse"]>;

test(`GET ${route} api client parsing and formatting`, async () => {
	input = "myDiagramId";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/diagram/shorturl/${input}`,
		params: { shortDiagramId: input }
	});
});

test(`GET ${route} api client non-api url formatting`, () => {
	input = "myDiagramId";
	const url = client.formatNonApiUrl(input);
	expect(url.pathname).toEqual("/de/dbnav/diagram/shorturl/myDiagramId");
});

test(`GET ${route} api client non-api url parsing`, () => {
	const url = new URL("http://localhost/diagram/shorturl/myDiagramId");
	const id = client.parseNonApiUrl(url);
	expect(id).toEqual("myDiagramId");
});

test(`GET ${route} api client plausible`, async () => {
	input = "hellloew";
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/diagram/shorturl/[shortDiagramId]",
		props: {}
	});
});
