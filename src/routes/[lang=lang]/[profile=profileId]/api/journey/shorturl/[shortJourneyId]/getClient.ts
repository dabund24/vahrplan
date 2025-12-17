import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { browser } from "$app/environment";
import type { Ctx } from "$lib/types";

export class GetJourneyShortUrlApiClient extends NonApiUsable<string, string[], RequestEvent>()(
	PathParamSettable<string, string[], RequestEvent>()(
		ApiClient<string, string[], "GET", RequestEvent>,
	),
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "journey/shorturl/[shortJourneyId]";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;

	protected override formatUrlPath = (
		content: string,
		{ apiPathBase }: Pick<Ctx, "apiPathBase">,
	): `${Ctx["apiPathBase"]}${string}` => `${apiPathBase}journey/shorturl/${content}`;

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>,
	): string => reqEvent.params.shortJourneyId;

	protected override formatNonApiUrlSuffix = (
		content: string,
		ctx: Pick<Ctx, "profileConfig" | "pathBase">,
	): URL => {
		const { pathBase } = ctx;
		const path = `${pathBase}journey/shorturl/${content}`;
		return new URL(path, browser ? location.origin : "http://localhost");
	};

	protected override requestEventFromUrl = (
		url: URL,
		ctx: Pick<Ctx, "profileConfig">,
	): MinimalRequestEvent<"GET", RequestEvent> => ({
		url,
		params: {
			lang: ctx.profileConfig.lang,
			profile: ctx.profileConfig.id,
			shortJourneyId: url.pathname.substring(url.pathname.lastIndexOf("/") + 1),
		},
	});
}
