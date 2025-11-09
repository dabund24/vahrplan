import {
	type AbstractConstructor,
	ApiClient,
	type HttpMethod,
	type RequestData
} from "$lib/api-client/ApiClient";
import type { RequestEvent } from "@sveltejs/kit";
import type { Language } from "../../params/lang";
import type { ProfileId } from "../../params/profileId";

type NonBodyfulHttpMethod = Exclude<HttpMethod, "POST" | "PUT">;

/**
 * @mixin NonApiUsable Provides methods in {@linkcode ApiClient}s for parsing and formatting urls in non-api context
 */
// eslint-disable-next-line @typescript-eslint/naming-convention,
export function NonApiUsable<ReqT, ResT, RequestEventT extends RequestEvent<object, string>>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		MethodT extends NonBodyfulHttpMethod,
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
		// BaseT extends ReturnType<typeof QueryParamSettable<ReqT, ResT>>
	>(base: BaseT) {
		abstract class NonApiUsable extends base {
			protected abstract readonly nonApiRoute: `/${Language}/${ProfileId}/${string}`;

			/**
			 * format a url for non-api purposes
			 * @param content
			 * @param ctx
			 */
			public abstract formatNonApiUrl(
				content: ReqT,
				ctx: Pick<RequestData, "profileConfig">
			): URL;

			/**
			 * mock a request event from an url. The request event should be passable to the `parse()` method
			 * @param url the url the request event is formatted from
			 * @protected
			 */
			protected abstract requestEventFromUrl(url: URL): RequestEventT;

			/**
			 * parse an url for non-api purposes
			 * @sealed
			 * @param url the url to parse
			 */
			public parseNonApiUrl(url: URL): ReqT | Promise<ReqT> {
				const reqEvent = this.requestEventFromUrl(url);
				return this.parse(reqEvent);
			}
		}
		return NonApiUsable;
	};
}
