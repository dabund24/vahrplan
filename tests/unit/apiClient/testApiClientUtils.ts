import {
	ApiClient,
	type ApiClientRequestEvent,
	type HttpMethod,
	type MinimalRequestEvent
} from "$lib/api-client/ApiClient";
import { type PlausibleProp } from "$lib/api-client/PlausiblePropSettableApiClient";
import { expect, vi } from "vitest";
import { exampleProfileConfig } from "../../testUtils";

export async function apiClientParseFormatTest<
	ReqT,
	ResT,
	MethodT extends HttpMethod,
	RequestEventT extends ApiClientRequestEvent
>(
	client: ApiClient<ReqT, ResT, MethodT, RequestEventT>,
	input: ReqT,
	paramInfo: {
		expectedPath: string;
		params: Omit<RequestEventT["params"], "lang" | "profile">;
	},
	expected?: ReqT
): Promise<void> {
	let url: URL | undefined = undefined;
	let parsed = {} as ReturnType<typeof client.parseRequest>;

	vi.mock("$app/state", () => ({
		page: { data: { profile: exampleProfileConfig, lang: "de" } }
	}));
	vi.mock("$app/server", () => ({ read: (): object => ({ text: () => "" }) }));
	vi.mock("$app/environment", () => ({ version: (): string => "test" }));
	// @ts-expect-error plausible
	global.plausible = () => void {};
	global.location = { origin: "http://localhost", href: "http://localhost" } as Location;
	global.fetch = vi.fn(async (request: RequestInfo | URL, _?: RequestInit) => {
		url = new URL((request as Request).url);
		parsed = client.parseRequest({
			url,
			params: { ...paramInfo.params, lang: "de", profile: "dbnav" },
			...({ request } as Record<never, never>)
		} as MinimalRequestEvent<MethodT, RequestEventT>);
		return Promise.resolve(new Response());
	});

	await client.request(input);

	expect(fetch).toHaveBeenCalledOnce();
	expect(decodeURIComponent(url!.pathname), "path is resolved correctly").toBe(
		paramInfo.expectedPath
	);
	expect(
		await (parsed.reqContent as Promise<unknown>),
		"parsing formatted request is input"
	).toEqual(expected ?? input);
}

export async function apiClientPlausibleTest<
	ReqT,
	ResT,
	MethodT extends HttpMethod,
	RequestEventT extends ApiClientRequestEvent
>(
	client: ApiClient<ReqT, ResT, MethodT, RequestEventT>,
	input: ReqT,
	expected: { goal: string; props: Partial<Record<PlausibleProp, string | number>> }
): Promise<void> {
	vi.mock("$app/state", () => ({
		page: { route: { id: "/foo/bar/baz" }, data: { profile: exampleProfileConfig, lang: "de" } }
	}));

	global.location = { ...global.location, origin: "https://vahrplan.de" };

	// @ts-expect-error plausible
	global.plausible = vi.fn(
		(_goal: string, _props: { props: Partial<Record<PlausibleProp, string | number>> }) =>
			void {}
	);

	global.fetch = async (
		_request: RequestInfo | URL,
		_requestInit?: RequestInit
	): Promise<Response> => Promise.resolve(new Response());

	await client.request(input);

	// @ts-expect-error plausible
	expect(plausible, "registered incorrect plausible event").toHaveBeenCalledExactlyOnceWith(
		expected.goal,
		{ props: expected.props, u: "https://vahrplan.de/foo/bar/baz" }
	);
}
