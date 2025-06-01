import {
	type AbstractConstructor,
	ApiClient,
	type HttpMethod,
	type RequestData
} from "$lib/api-client/ApiClient";
import type { VahrplanResult } from "$lib/VahrplanResult";
import type { RequestEvent } from "@sveltejs/kit";

type BodyfulHttpMethod = Extract<HttpMethod, "POST" | "PUT">;

/**
 * @mixin BodySettable Lets {@linkcode ApiClient}s pass information through the request body
 */
// eslint-disable-next-line @typescript-eslint/naming-convention,
export function BodySettable<ReqT, ResT, RequestEventT extends RequestEvent<object, string>>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		MethodT extends BodyfulHttpMethod,
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
	>(base: BaseT) {
		abstract class BodySettable extends base {
			protected abstract formatBody(content: ReqT): string;

			protected override requestInternal(
				content: ReqT,
				requestData: RequestData,
				fetchFn?: typeof fetch
			): Promise<VahrplanResult<ResT>> {
				requestData.requestInit.body = this.formatBody(content);
				return super.requestInternal(content, requestData, fetchFn);
			}
		}
		return BodySettable;
	};
}
