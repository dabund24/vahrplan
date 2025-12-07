import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./testApiClientUtils";

const route = "diagram/shorturl";
const client = apiClient("PUT", route);
const input: Parameters<(typeof client)["request"]>[0] = {
	type: "journeys",
	value: {
		stops: ["12345", "Lorem Ip+um D*lor $it am€t"],
		timeData: {
			type: "absolute",
			time: new Date().toISOString(),
			scrollDirection: "later"
		},
		filters: {
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
			options: {
				bike: false,
				accessible: true,
				minTransferTime: 10,
				maxTransfers: 4
			}
		}
	},
	expirationDate: 69420
};

test(`PUT ${route} api client parsing and formatting`, async () => {
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/diagram/shorturl`,
		params: {}
	});
});

test(`PUT ${route} api client plausible`, async () => {
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "PUT /api/diagram/shorturl",
		props: {}
	});
});
