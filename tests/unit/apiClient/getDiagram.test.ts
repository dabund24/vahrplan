import { test, vi } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./testApiClientUtils";

const route = "diagram";
const client = apiClient("GET", route);
const input: Parameters<(typeof client)["request"]>[0] = {
	stops: ["12345", "Lorem Ip+um D*lor $it am€t"],
	timeData: {
		type: "absolute",
		time: new Date().toISOString(),
		scrollDirection: "later"
	},
	filters: {
		products: {
			longDistanceExpress: true, // note: longDistanceExpress is true
			longDistance: false,
			regionalExpress: true,
			regional: false,
			suburban: true,
			subway: false,
			tram: true,
			bus: false, // note: bus is false
			taxi: true,
			ferry: false
		},
		options: {
			bike: false, // note: bike is false
			accessible: true,
			minTransferTime: 10, // note: minTransferTime is set
			maxTransfers: 4
		}
	}
};

test(`GET ${route} api client parsing and formatting`, async () => {
	await apiClientParseFormatTest(
		client,
		input,
		{
			expectedPath: "/de/dbnav/api/diagram",
			params: {}
		},
		{
			...input,
			filters: {
				products: {
					longDistanceExpress: true, // note: longDistanceExpress is true
					longDistance: false,
					regionalExpress: false, // default value, since not in config
					regional: false,
					suburban: false,
					subway: false,
					tram: false, // default value, since not in config
					bus: false, // note: bus is false
					taxi: false, // default value, since not in config
					ferry: false
				},
				options: {
					bike: false, // note: bike is false
					accessible: false, // default value, since not in config
					minTransferTime: 10, // note: minTransferTime is set
					maxTransfers: -1 // default value, since not in config
				}
			}
		}
	);
});

test(`GET ${route} api client plausible`, async () => {
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "GET /api/diagram",
		props: { viaCount: 0 }
	});
});
