import type { GetDiagramApiClient } from "../../getClient";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { browser } from "$app/environment";
import type { Ctx } from "$lib/types";

type ResType =
	GetDiagramApiClient extends ApiClient<infer _A, infer ResT, infer _B, infer _C> ? ResT : never;

export class GetDiagramShortUrlApiClient extends PathParamSettable<string, ResType, RequestEvent>()(
	NonApiUsable<string, ResType, RequestEvent>()(ApiClient<string, ResType, "GET", RequestEvent>)
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "diagram/shorturl/[shortDiagramId]";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;

	protected override formatUrlPath = (
		content: string,
		{ apiPathBase }: Pick<Ctx, "apiPathBase" | "profileConfig">
	): `${Ctx["apiPathBase"]}${string}` => `${apiPathBase}diagram/shorturl/${content}`;

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>
	): string => reqEvent.params.shortDiagramId;

	protected override formatNonApiUrlSuffix = (
		content: string,
		ctx: Pick<Ctx, "profileConfig" | "pathBase">
	): URL => {
		const { pathBase } = ctx;
		const pathname = `${pathBase}diagram/shorturl/${content}`;
		return new URL(pathname, browser ? location.origin : "http://localhost");
	};

	protected override requestEventFromUrl = (
		url: URL,
		{ profileConfig }: Pick<Ctx, "profileConfig">
	): MinimalRequestEvent<"GET", RequestEvent> => ({
		url,
		params: {
			lang: profileConfig.lang,
			profile: profileConfig.id,
			shortDiagramId: url.pathname.substring(url.pathname.lastIndexOf("/") + 1)
		}
	});
}
