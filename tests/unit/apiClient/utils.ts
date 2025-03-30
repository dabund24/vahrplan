import type { ApiClient, HttpMethod } from "$lib/api-client/ApiClient";
import { type RequestEvent } from "@sveltejs/kit";
import { expect, vi } from "vitest";

export async function apiClientParseFormatTest<
	ReqT,
	ResT,
	MethodT extends HttpMethod,
	RequestEventT extends RequestEvent<object, string>
>(
	client: ApiClient<ReqT, ResT, MethodT, RequestEventT>,
	input: ReqT,
	paramInfo: {
		expectedPath: string;
		params: RequestEventT["params"];
	}
): Promise<void> {
	let url: URL | undefined = undefined;
	let parsed: ReqT | undefined = undefined;

	global.location = { origin: "http://localhost" } as Location;
	global.fetch = vi.fn(async (request: RequestInfo | URL, _?: RequestInit) => {
		url = new URL((request as Request).url);
		parsed = await client.parse({ params: paramInfo.params, url, request } as RequestEventT);
		return Promise.resolve(new Response());
	});

	await client.request(input);

	expect(fetch).toHaveBeenCalledOnce();
	expect(decodeURIComponent(url!.pathname), "path is resolved correctly").toBe(
		paramInfo.expectedPath
	);
	expect(parsed, "parsing formatted request is input").toEqual(input);
}
