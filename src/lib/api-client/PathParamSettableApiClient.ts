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
	RequestEventT extends RequestEvent<
		{ lang: Language; profile: ProfileId },
		`/[lang=lang]/[profile=profileId]/api/${string}`
	>
>() {
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
			protected abstract formatUrlPath(
				content: ReqT,
				ctx: Pick<RequestData, "apiPathBase" | "profileConfig">
			): `/${Language}/${ProfileId}/api/${string}`;

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
