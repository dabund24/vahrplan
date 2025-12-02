import { expect, test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest, getProfileConfig } from "./utils";

const route = "diagram/shorturl/[shortDiagramId]";
const client = apiClient("GET", route);
let input: Parameters<(typeof client)["request"]>[0];

test(`GET ${route} api client parsing and formatting`, async () => {
	input = "myDiagramId";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/diagram/shorturl/${input}`,
		params: { shortDiagramId: input }
	});
});

test(`GET ${route} api client non-api url formatting`, () => {
	input = "myDiagramId";
	const url = client.formatNonApiUrl(input, { profileConfig: getProfileConfig() });
	expect(url.pathname).toEqual("/de/dbnav/diagram/shorturl/myDiagramId");
});

test(`GET ${route} api client non-api url parsing`, () => {
	const url = new URL("http://localhost/diagram/shorturl/myDiagramId");
	const id = client.parseNonApiUrl(url, { profileConfig: getProfileConfig() });
	expect(id.reqContent).toEqual("myDiagramId");
});

test(`GET ${route} api client plausible`, async () => {
	input = "hellloew";
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/diagram/shorturl/[shortDiagramId]",
		props: {}
	});
});
