import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./utils";

const route = "diagram";
const client = apiClient("GET", route);
const input: ReturnType<(typeof client)["parse"]> = {
	stops: ["12345", "Lorem Ip+um D*lor $it am€t"],
	timeData: {
		type: "absolute",
		time: new Date().toISOString(),
		scrollDirection: "later"
	},
	options: {
		products: {
			longDistanceExpress: true,
			longDistance: false,
			regionalExpress: true,
			regional: false,
			suburban: true,
			subway: false,
			tram: true,
			bus: false,
			taxi: true,
			ferry: false
		},
		bike: false,
		accessible: true,
		minTransferTime: 12,
		maxTransfers: 4
	}
};

test(`GET ${route} api client parsing and formatting`, async () => {
	await apiClientParseFormatTest(client, input, {
		expectedPath: "/de/dbnav/api/diagram",
		params: {}
	});
});

test(`GET ${route} api client plausible`, async () => {
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/diagram",
		props: { viaCount: 0 }
	});
});
