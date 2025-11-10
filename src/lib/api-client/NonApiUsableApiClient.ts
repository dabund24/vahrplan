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
export function NonApiUsable<
	ReqT,
	ResT,
	RequestEventT extends RequestEvent<
		{ lang: Language; profile: ProfileId },
		`/[lang=lang]/[profile=profileId]/api/${string}`
	>
>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		MethodT extends NonBodyfulHttpMethod,
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
		// BaseT extends ReturnType<typeof QueryParamSettable<ReqT, ResT>>
	>(base: BaseT) {
		abstract class NonApiUsable extends base {
			/**
			 * format the suffix of a url for non-api purposes. The prefix is passed in `basePath`
			 * @param content
			 * @param ctx
			 */
			protected abstract formatNonApiUrlSuffix(
				content: ReqT,
				ctx: Pick<RequestData, "profileConfig"> & { pathBase: `/${Language}/${ProfileId}/` }
			): URL;

			/**
			 * format a url for non-api purposes
			 *
			 * must not be overridden by api client implementations. override `formatNonApiUrlSuffix` instead
			 * @param content
			 * @param ctx
			 * @sealed
			 */
			public formatNonApiUrl(content: ReqT, ctx: Pick<RequestData, "profileConfig">): URL {
				const { lang, id } = ctx.profileConfig;
				const pathBase: `/${Language}/${ProfileId}/` = `/${lang}/${id}/`;
				return this.formatNonApiUrlSuffix(content, { ...ctx, pathBase });
			}

			/**
			 * mock a request event from a url. The request event should be passable to the `parseRequest()` method
			 * @param url the url the request event is formatted from
			 * @param ctx
			 * @protected
			 */
			protected abstract requestEventFromUrl(
				url: URL,
				ctx: Pick<RequestData, "profileConfig">
			): Pick<RequestEventT, "url" | "params">;

			/**
			 * parse a url for non-api purposes
			 * @sealed
			 * @param url the url to parse
			 * @param ctx
			 */
			public parseNonApiUrl(
				url: URL,
				ctx: Pick<RequestData, "profileConfig">
			): ReturnType<typeof this.parseRequest> {
				const reqEvent: RequestEventT = this.requestEventFromUrl(url, ctx) as RequestEventT;
				return this.parseRequest(reqEvent);
			}
		}
		return NonApiUsable;
	};
}
