import { ApiClient, type HttpMethod } from "$lib/api-client/ApiClient";
import { type PlausibleProp } from "$lib/api-client/PlausiblePropSettableApiClient";
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
		params: Omit<RequestEventT["params"], "lang" | "profile">;
	}
): Promise<void> {
	let url: URL | undefined = undefined;
	let parsed: ReqT | undefined = undefined;

	// @ts-expect-error plausible
	global.plausible = () => void {};
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

export async function apiClientPlausibleTest<
	ReqT,
	ResT,
	MethodT extends HttpMethod,
	RequestEventT extends RequestEvent<object, string>
>(
	client: ApiClient<ReqT, ResT, MethodT, RequestEventT>,
	input: ReqT,
	expected: { goal: string; props: Partial<Record<PlausibleProp, string | number>> }
): Promise<void> {
	// @ts-expect-error plausible
	global.plausible = vi.fn(
		(_goal: string, _props: { props: Partial<Record<PlausibleProp, string | number>> }) =>
			void {}
	);

	global.location = { ...global.location, origin: "http://localhost" };

	global.fetch = async (
		_request: RequestInfo | URL,
		_requestInit?: RequestInit
	): Promise<Response> => Promise.resolve(new Response());

	await client.request(input);

	// @ts-expect-error plausible
	expect(plausible, "registered incorrect plausible event").toHaveBeenCalledExactlyOnceWith(
		expected.goal,
		{ props: expected.props }
	);
}
