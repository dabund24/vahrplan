import {
	type AbstractConstructor,
	ApiClient,
	type HttpMethod,
	type RequestData
} from "$lib/api-client/ApiClient";
import type { VahrplanResult } from "$lib/VahrplanResult";
import type { RequestEvent } from "@sveltejs/kit";
import type { Language } from "../../params/lang";
import type { ProfileId } from "../../params/profileId";

/**
 * @mixin BodySettable Lets {@linkcode ApiClient}s pass information in the url pathname
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function PathParamSettable<
	ReqT,
	ResT,
	RequestEventT extends RequestEvent<object, string>
>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		MethodT extends HttpMethod,
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
	>(base: BaseT) {
		abstract class PathParamSettable extends base {
			/**
			 * format the url path
			 * @param apiPathBase api base with profile id and language
			 * @param content
			 * @protected
			 */
			protected abstract formatUrlPath(
				apiPathBase: `/${Language}/${ProfileId}/api/`,
				content: ReqT
			): `/${Language}/${ProfileId}/api/${string}`;

			protected override requestInternal(
				content: ReqT,
				requestData: RequestData,
				fetchFn?: typeof fetch
			): Promise<VahrplanResult<ResT>> {
				requestData.url.pathname = this.formatUrlPath(requestData.apiPathBase, content);
				return super.requestInternal(content, requestData, fetchFn);
			}
		}
		return PathParamSettable;
	};
}
