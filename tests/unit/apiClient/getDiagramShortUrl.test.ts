import { expect, test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/api/diagram/shorturl/[shortDiagramId]");
let input: ReturnType<(typeof client)["parse"]>;

test("GET /api/diagram/shorturl/[shortDiagramId] api client parsing and formatting", async () => {
	input = "myDiagramId";
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/api/diagram/shorturl/${input}`,
		params: { shortDiagramId: input }
	});
});

test("GET /api/diagram/shorturl/[shortDiagramId] api client non-api url formatting", () => {
	input = "myDiagramId";
	const url = client.formatNonApiUrl(input);
	expect(url.pathname).toEqual("/diagram/shorturl/myDiagramId");
});

test("GET /api/diagram/shorturl/[shortDiagramId] api client non-api url parsing", () => {
	const url = new URL("http://localhost/diagram/shorturl/myDiagramId");
	const id = client.parseNonApiUrl(url);
	expect(id).toEqual("myDiagramId");
});
