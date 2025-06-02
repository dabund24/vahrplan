import { apiClient } from "$lib/api-client/apiClientFactory";
import { json } from "@sveltejs/kit";
import { expect, test, vi } from "vitest";
import { VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";

test("api client success", async () => {
	const client = apiClient("GET", "journey/shorturl/[shortJourneyId]");
	const input = "station";
	const response = ["journeyId"];

	global.location = { origin: "http://localhost" } as Location;
	global.fetch = vi.fn(async (_request: RequestInfo | URL, _?: RequestInit) => {
		return Promise.resolve(json(new VahrplanSuccess(response)));
	});

	const result = await client.request(input);

	expect(fetch).toHaveBeenCalledOnce();
	expect(result.isError).toBe(false);
	expect((result as VahrplanSuccess<string[]>).content).toEqual(response);
});

test("api client error", async () => {
	const client = apiClient("GET", "journey/shorturl/[shortJourneyId]");

	const input = "station";
	const error = new VahrplanError("ERROR");

	global.location = { origin: "http://localhost" } as Location;
	global.fetch = vi.fn(async (_request: RequestInfo | URL, _?: RequestInit) =>
		Promise.resolve(json(error))
	);

	const result = await client.request(input);

	expect(fetch).toHaveBeenCalledOnce();
	expect({ ...result }).toEqual({ ...error });
});
