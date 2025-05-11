import { apiClient } from "$lib/api-client/apiClientFactory";
import { test } from "vitest";
import { apiClientParseFormatTest } from "./utils";

const client = apiClient("POST", "/de/dbnav/api/diagram/scroll/[scrollDirection]");
let input: Awaited<ReturnType<(typeof client)["parse"]>>;

test("GET /de/dbnav/api/diagram/shorturl/[shortDiagramId] api client parsing and formatting", async () => {
	input = {
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
					requestParameter: "foo",
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
						requestParameter: "123456789"
					},
					locationId: "123456789"
				},
				{
					location: {
						type: "address",
						name: "My street",
						position: { lng: 42, lat: 24 },
						requestParameter: "refresh"
					},
					locationId: "refresh"
				}
			],
			[]
		]
	};
	await apiClientParseFormatTest(client, input, {
		expectedPath: `/de/dbnav/api/diagram/scroll/${input.scrollDirection}`,
		params: { scrollDirection: input.scrollDirection }
	});
});
