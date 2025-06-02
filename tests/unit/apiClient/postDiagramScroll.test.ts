import { apiClient } from "$lib/api-client/apiClientFactory";
import { test, vi } from "vitest";
import { apiClientParseFormatTest, apiClientPlausibleTest } from "./utils";

const route = "diagram/scroll/[scrollDirection]";
const client = apiClient("POST", route);
const input: Awaited<ReturnType<(typeof client)["parse"]>> = {
	scrollDirection: "earlier",
	stops: ["", "12345"],
	tokens: ["earlierTokenOne", "earlierTokenTwo"],
	options: {
		products: {
			longDistanceExpress: false,
			longDistance: false,
			regionalExpress: false,
			regional: true,
			suburban: true,
			subway: true,
			tram: true,
			bus: true,
			taxi: true,
			ferry: true
		},
		bike: false,
		accessible: true,
		minTransferTime: 0,
		maxTransfers: -1
	},
	tree: [
		{
			type: "journeyNode",
			columnIndex: 0,
			timeData: { departure: "123", arrival: "456" },
			rowIndex: 0,
			children: []
		},
		{
			type: "journeyNode",
			columnIndex: 1,
			timeData: { departure: "69", arrival: "420" },
			rowIndex: 0,
			children: [
				{
					type: "emptyNode",
					children: []
				}
			]
		}
	],
	transferLocations: {
		idToRepresentative: {
			foo: "foo",
			bar: "foo"
		},
		representatives: {
			foo: {
				type: "station",
				name: "Foo",
				id: "foo",
				position: { lng: 1, lat: 2 }
			}
		}
	},
	recommendedVias: [
		[
			{
				location: {
					type: "station",
					name: "Hello",
					position: { lng: 0, lat: 1 },
					id: "123456789"
				},
				locationId: "123456789"
			},
			{
				location: {
					type: "address",
					name: "My street",
					position: { lng: 42, lat: 24 },
					id: "refresh"
				},
				locationId: "refresh"
			}
		],
		[]
	]
};

test(`POST ${route} api client parsing and formatting`, async () => {
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/diagram/scroll/${input.scrollDirection}`,
		params: { scrollDirection: input.scrollDirection }
	});
});

test(`POST ${route} api client plausible`, async () => {
	vi.mock("$app/environment", () => ({ browser: true }));

	await apiClientPlausibleTest(client, input, {
		goal: "POST /api/diagram/scroll/[scrollDirection]",
		props: { viaCount: 0 }
	});
});
