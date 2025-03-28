import {
	type AbstractConstructor,
	ApiClient,
	type HttpMethod,
	type RequestData
} from "$lib/api-client/ApiClient";
import type { VahrplanResult } from "$lib/VahrplanResult";
import type { RequestEvent } from "@sveltejs/kit";

/**
 * Mixin adding
 * @mixin
 * @constructor
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function PathParamSettable<ReqT, ResT>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		MethodT extends HttpMethod,
		RequestEventT extends RequestEvent<object, string>,
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
	>(base: BaseT) {
		abstract class PathParamSettable extends base {
			/**
			 * format the url path
			 * @param content
			 * @protected
			 */
			protected abstract formatUrlPath(content: ReqT): `/api/${string}`;

			protected override requestInternal(
				content: ReqT,
				requestData: RequestData,
				fetchFn?: typeof fetch
			): Promise<VahrplanResult<ResT>> {
				requestData.url.pathname = this.formatUrlPath(content);
				return super.requestInternal(content, requestData, fetchFn);
			}
		}
		return PathParamSettable;
	};
}
