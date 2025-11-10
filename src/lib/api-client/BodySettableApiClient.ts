import {
	type AbstractConstructor,
	ApiClient,
	type ApiClientRequestEvent,
	type BodyfulHttpMethod,
	type RequestData
} from "$lib/api-client/ApiClient";
import type { VahrplanResult } from "$lib/VahrplanResult";

/**
 * @mixin BodySettable Lets {@linkcode ApiClient}s pass information through the request body
 */
// eslint-disable-next-line @typescript-eslint/naming-convention,
export function BodySettable<
	ReqT,
	ResT,
	MethodT extends BodyfulHttpMethod,
	RequestEventT extends ApiClientRequestEvent
>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
	>(base: BaseT) {
		abstract class BodySettable extends base {
			/**
			 * override to generate body of http request
			 * @param content
			 * @param ctx
			 * @protected
			 */
			protected abstract formatBody(
				content: ReqT,
				ctx: Pick<RequestData, "profileConfig">
			): string;

			protected override requestInternal(
				content: ReqT,
				requestData: RequestData,
				fetchFn?: typeof fetch
			): Promise<VahrplanResult<ResT>> {
				const ctx = { profileConfig: requestData.profileConfig };
				requestData.requestInit.body = this.formatBody(content, ctx);
				return super.requestInternal(content, requestData, fetchFn);
			}
		}
		return BodySettable;
	};
}
