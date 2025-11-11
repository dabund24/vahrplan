import {
	type AbstractConstructor,
	ApiClient,
	type ApiClientRequestEvent,
	type HttpMethod,
	type RequestData
} from "$lib/api-client/ApiClient";
import type { VahrplanResult } from "$lib/VahrplanResult";
import type { Ctx } from "$lib/types";

/**
 * @mixin BodySettable Lets {@linkcode ApiClient}s pass information in the url pathname
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function PathParamSettable<ReqT, ResT, RequestEventT extends ApiClientRequestEvent>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		MethodT extends HttpMethod,
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
	>(base: BaseT) {
		abstract class PathParamSettable extends base {
			/**
			 * format the url path
			 * @param content
			 * @param ctx
			 * @protected
			 */
			protected abstract formatUrlPath: (
				content: ReqT,
				ctx: Pick<Ctx, "apiPathBase" | "profileConfig">
			) => `${Ctx["apiPathBase"]}${string}`;

			protected override requestInternal(
				content: ReqT,
				requestData: RequestData,
				fetchFn?: typeof fetch
			): Promise<VahrplanResult<ResT>> {
				const ctx = {
					apiPathBase: requestData.apiPathBase,
					profileConfig: requestData.profileConfig
				};
				requestData.url.pathname = this.formatUrlPath(content, ctx);
				return super.requestInternal(content, requestData, fetchFn);
			}
		}
		return PathParamSettable;
	};
}
