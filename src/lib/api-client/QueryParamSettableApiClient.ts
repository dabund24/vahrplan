import {
	type AbstractConstructor,
	ApiClient,
	type HttpMethod,
	type RequestData
} from "$lib/api-client/ApiClient";
import type { VahrplanResult } from "$lib/VahrplanResult";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * @mixin QueryParamSettable Lets {@linkcode ApiClient}s pass information through query parameters
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function QueryParamSettable<ReqT, ResT>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		MethodT extends HttpMethod,
		RequestEventT extends RequestEvent<object, string>,
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
	>(base: BaseT) {
		abstract class QueryParamSettable extends base {
			/**
			 * override to store the names of the path parameters
			 * @protected
			 */
			protected abstract readonly queryParamNames: Record<string, `${Lowercase<string>}`>;

			/**
			 *
			 * @param content
=			 * @protected
			 */
			protected abstract formatQueryParams(content: ReqT): URLSearchParams;

			protected writeArrayQueryParameter(
				queryParams: URLSearchParams,
				paramName: Lowercase<string>,
				paramValues: (string | number)[]
			): void {
				for (const paramValue of paramValues) {
					queryParams.append(`${paramName}[]`, String(paramValue));
				}
			}

			protected readArrayQueryParameter(
				queryParams: URLSearchParams,
				paramName: Lowercase<string>
			): string[] {
				return queryParams.getAll(`${paramName}[]`);
			}

			protected writeBooleanQueryParameter(
				queryParams: URLSearchParams,
				paramName: string,
				paramValue: boolean
			): void {
				if (paramValue) {
					queryParams.set(paramName, "");
				}
			}

			protected override requestInternal(
				content: ReqT,
				requestData: RequestData,
				fetchFn?: typeof fetch
			): Promise<VahrplanResult<ResT>> {
				const queryParams = this.formatQueryParams(content);
				for (const [queryParamKey, queryParamValue] of queryParams) {
					requestData.url.searchParams.append(queryParamKey, queryParamValue);
				}
				return super.requestInternal(content, requestData, fetchFn);
			}
		}
		return QueryParamSettable;
	};
}
