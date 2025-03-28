import { test } from "vitest";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("GET", "/api/diagram");
let input: ReturnType<(typeof client)["parse"]>;

test("GET /api/diagram api client parsing and formatting", async () => {
	input = {
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
	await apiClientParseFormatTest(client, input, {
		expectedPath: "/api/diagram",
		params: {}
	});
});
