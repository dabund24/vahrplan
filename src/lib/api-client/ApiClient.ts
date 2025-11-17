import { type VahrplanResult, VahrplanSuccess } from "$lib/VahrplanResult";
import { startLoading, stopLoading } from "$lib/state/loadingStore";
import { VahrplanError } from "$lib/VahrplanError";
import { toast } from "$lib/state/toastStore";
import { json, type RequestEvent, type RouteDefinition } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { untrack } from "svelte";
import type { PlausibleProp } from "$lib/api-client/PlausiblePropSettableApiClient";
import type { Language } from "../../params/lang";
import type { ProfileId } from "../../params/profileId";
import type { ProfileConfig } from "../../routes/[lang=lang]/[profile=profileId]/api/profile/profile.server";
import { EMPTY_PROFILE } from "$lib/constants";
import type { Ctx } from "$lib/types";

export type RequestData = {
	url: URL;
	requestInit: RequestInit;
	plausibleProps: Partial<Record<PlausibleProp, string | number>>;
} & Pick<Ctx, "apiPathBase" | "profileConfig">;

export type HttpMethod = Exclude<RouteDefinition["api"]["methods"][number], "*">;
export type BodyfulHttpMethod = Extract<HttpMethod, "POST" | "PUT">;
export type NonBodyfulHttpMethod = Exclude<HttpMethod, BodyfulHttpMethod>;

export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T;

type ParsedRequest<MethodT extends HttpMethod, ReqT> = {
	reqContent: MethodT extends BodyfulHttpMethod ? Promise<ReqT> : ReqT;
	language: Language;
	profile: ProfileId;
};

/**
 * this is the minimal constraint a generated RequestEvent type needs to satisfy in api client implementations
 */
export type ApiClientRequestEvent = RequestEvent<
	{ lang: Language; profile: ProfileId },
	`/[lang=lang]/[profile=profileId]/api/${string}`
>;

export type MinimalRequestEvent<
	MethodT extends HttpMethod,
	RequestEventT extends ApiClientRequestEvent
> = Pick<RequestEventT, "url" | "params" | (MethodT extends BodyfulHttpMethod ? "request" : never)>;

/**
 * An abstract utility class simplifying the process of making fetch requests in Vahrplan.
 *
 * Can be extended with mixins
 */
export abstract class ApiClient<
	ReqT,
	ResT,
	MethodT extends HttpMethod,
	RequestEventT extends ApiClientRequestEvent
> {
	protected abstract readonly methodType: MethodT;
	protected abstract readonly route: RequestEventT["route"]["id"] extends `/[lang=lang]/[profile=profileId]/api/${infer RouteT}`
		? RouteT
		: never;
	protected abstract readonly cacheMaxAge: number;
	protected abstract readonly isLoadingAnimated: boolean;

	/**
	 * perform a request with a client implementation
	 *
	 * must not be overridden! must not be called by a mixin
	 * @sealed
	 * @param content
	 * @param fetchFn
	 */
	public async request(content: ReqT, fetchFn?: typeof fetch): Promise<VahrplanResult<ResT>> {
		let urlBase: string;
		let profileConfig: ProfileConfig;
		let apiPathBase: `/${Language}/${ProfileId}/api/`;
		if (browser) {
			urlBase = location.origin;
			const pageData = await import("$app/state").then(({ page }) => page.data);
			profileConfig = pageData.profile;
			apiPathBase = `/${pageData.lang}/${pageData.profile.id}/api/` as const;
		}
		profileConfig ??= EMPTY_PROFILE;
		urlBase ??= "http://localhost";
		apiPathBase ??= "/de/empty/api/" as const;
		const requestData: RequestData = {
			url: new URL(`${apiPathBase}${this.route}`, urlBase),
			profileConfig,
			apiPathBase,
			requestInit: {},
			plausibleProps: {}
		};
		return this.requestInternal(content, requestData, fetchFn);
	}

	/**
	 * answer with a VahrplanResult
	 * @sealed
	 * @param content response payload
	 */
	public formatResponse = (content: VahrplanResult<ResT>): Response => {
		content.throwIfError();
		const response = json(content, { status: 200 });
		response.headers.set("Cache-Control", `max-age=${this.cacheMaxAge}`);
		return response;
	};

	/**
	 * ***must not be used or overridden by a client implementation!!!***
	 *
	 * can be overridden and then called by a mixin to extend the client
	 * @param _content
	 * @param url
	 * @param requestInit
	 * @param fetchFn
	 * @param fetch
	 */
	protected async requestInternal(
		_content: ReqT,
		{ url, requestInit, plausibleProps }: RequestData,
		fetchFn?: typeof fetch
	): Promise<VahrplanResult<ResT>> {
		const estimatedUpstreamCalls = this.estimateUpstreamCalls(_content);
		let loadingId: number | undefined = undefined;
		if (browser && this.isLoadingAnimated) {
			loadingId = untrack(() => startLoading(estimatedUpstreamCalls));
		}

		// @ts-expect-error plausible
		if (browser && plausible) {
			void import("$app/state").then(
				({ page }) =>
					// @ts-expect-error plausible
					// eslint-disable-next-line @typescript-eslint/no-unsafe-call
					void plausible(`${this.methodType} /api/${this.route}`, {
						props: plausibleProps,
						u: `${location.origin}${page.route.id}`
					})
			);
		}

		requestInit.method = this.methodType;
		const result = await (
			fetchFn?.(`${url.pathname}?${url.searchParams.toString()}`) ??
			fetch(new Request(url, requestInit))
		)
			.then(async (res: Response) => {
				const vahrplanResult = (await res.json()) as VahrplanResult<ResT>;

				// ensure result is object of VahrplanResult class
				if (vahrplanResult.isError) {
					return VahrplanError.withMessage(vahrplanResult.type, vahrplanResult.message);
				}
				return new VahrplanSuccess(vahrplanResult.content);
			})
			.catch(() =>
				VahrplanError.withMessage("ERROR", "Verbindung zum Server ist fehlgeschlagen")
			);

		if (browser && loadingId !== undefined) {
			stopLoading(loadingId, result.isError);
		}
		if (browser && result.isError) {
			toast(result.message, "red");
		}

		return result;
	}

	/**
	 * estimate how many upstream requests have to be made for the passed content.
	 *
	 * Override in client implementation if this is not trivially one
	 * @param _reqContent
	 * @protected
	 */
	protected estimateUpstreamCalls = (_reqContent: ReqT): number => 1;

	/**
	 * parse request content from reqEvent
	 *
	 * override in client implementation
	 * @param reqEvent
	 * @protected
	 */
	protected abstract parseRequestContent: (
		reqEvent: MinimalRequestEvent<MethodT, RequestEventT>
	) => MethodT extends BodyfulHttpMethod ? Promise<ReqT> : ReqT;

	/**
	 * parse a request on the server
	 * must not be overridden by a client implementation; override `parseRequestContent` instead!
	 * @sealed
	 * @param reqEvent
	 */
	public parseRequest = (
		reqEvent: MinimalRequestEvent<MethodT, RequestEventT>
	): ParsedRequest<MethodT, ReqT> => ({
		reqContent: this.parseRequestContent(reqEvent),
		language: reqEvent.params.lang,
		profile: reqEvent.params.profile
	});
}
