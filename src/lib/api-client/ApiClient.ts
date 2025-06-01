import { type VahrplanResult, VahrplanSuccess } from "$lib/VahrplanResult";
import { startLoading, stopLoading } from "$lib/state/loadingStore";
import { VahrplanError } from "$lib/VahrplanError";
import { toast } from "$lib/state/toastStore";
import { json, type RequestEvent, type RouteDefinition } from "@sveltejs/kit";
import { browser } from "$app/environment";
import { untrack } from "svelte";

export type RequestData = {
	url: URL;
	requestInit: RequestInit;
};

export type HttpMethod = Exclude<RouteDefinition["api"]["methods"][number], "*">;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AbstractConstructor<T = object> = abstract new (...args: any[]) => T;

/**
 * An abstract utility class simplifying the process of making fetch requests in Vahrplan.
 *
 * Can be extended with mixins
 */
export abstract class ApiClient<
	ReqT,
	ResT,
	MethodT extends HttpMethod,
	RequestEventT extends RequestEvent<object, string>
> {
	protected abstract readonly methodType: MethodT;
	protected abstract readonly route: RequestEventT["route"]["id"] extends `/[lang]/[profile]${infer RouteT}`
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
	public request(content: ReqT, fetchFn?: RequestEventT["fetch"]): Promise<VahrplanResult<ResT>> {
		let urlBase: string;
		if (browser) {
			urlBase = location.origin;
		}
		urlBase ??= "http://localhost";
		const requestData: RequestData = {
			url: new URL(`/de/dbnav${this.route}`, urlBase),
			requestInit: {}
		};
		return this.requestInternal(content, requestData, fetchFn);
	}

	/**
	 * answer with a VahrplanResult
	 * @sealed
	 * @param content response payload
	 */
	public formatResponse(content: VahrplanResult<ResT>): Response {
		content.throwIfError();
		const response = json(content, { status: 200 });
		response.headers.set("Cache-Control", `max-age=${this.cacheMaxAge}`);
		return response;
	}

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
		{ url, requestInit }: RequestData,
		fetchFn?: typeof fetch
	): Promise<VahrplanResult<ResT>> {
		const estimatedUpstreamCalls = this.estimateUpstreamCalls(_content);
		let loadingId: number | undefined = undefined;
		if (browser && this.isLoadingAnimated) {
			loadingId = untrack(() => startLoading(estimatedUpstreamCalls));
		}

		// @ts-expect-error plausible
		if (browser && window.plausible && typeof plausible === "function") {
			// @ts-expect-error plausible
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			plausible(`${this.methodType} ${this.route}`);
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
	protected estimateUpstreamCalls(_reqContent: ReqT): number {
		return 1;
	}

	/**
	 * parse a request on the server
	 * must be overridden by a client implementation
	 * @param reqEvent
	 */
	abstract parse(reqEvent: RequestEventT): ReqT | Promise<ReqT>;
}
