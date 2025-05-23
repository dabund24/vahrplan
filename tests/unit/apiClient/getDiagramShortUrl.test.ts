import { expect, test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/de/dbnav/api/diagram/shorturl/[shortDiagramId]");
let input: ReturnType<(typeof client)["parse"]>;

test("GET /de/dbnav/api/diagram/shorturl/[shortDiagramId] api client parsing and formatting", async () => {
	input = "myDiagramId";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/diagram/shorturl/${input}`,
		params: { shortDiagramId: input }
	});
});

test("GET /de/dbnav/api/diagram/shorturl/[shortDiagramId] api client non-api url formatting", () => {
	input = "myDiagramId";
	const url = client.formatNonApiUrl(input);
	expect(url.pathname).toEqual("/de/dbnav/diagram/shorturl/myDiagramId");
});

test("GET /de/dbnav/api/diagram/shorturl/[shortDiagramId] api client non-api url parsing", () => {
	const url = new URL("http://localhost/diagram/shorturl/myDiagramId");
	const id = client.parseNonApiUrl(url);
	expect(id).toEqual("myDiagramId");
});
