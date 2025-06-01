import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const route = "diagram/shorturl";
const client = apiClient("PUT", route);
let input: Awaited<ReturnType<(typeof client)["parse"]>>;

test(`PUT ${route} api client parsing and formatting`, async () => {
	input = {
		type: "journeys",
		value: {
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
		},
		expirationDate: 69420
	};
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/diagram/shorturl`,
		params: {}
	});
});
