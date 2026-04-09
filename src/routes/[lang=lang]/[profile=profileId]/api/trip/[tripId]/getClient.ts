import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { QueryParamSettable } from "$lib/api-client/QueryParamSettableApiClient";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import type { RequestEvent } from "./$types";
import type { Ctx, Trip } from "$lib/types";
import { browser } from "$app/environment";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";

type ReqType = {
	tripId: string;
};

export class GetTripApiClient extends NonApiUsable<ReqType, Trip, RequestEvent>()(
	QueryParamSettable<ReqType, Trip, RequestEvent>()(
		PathParamSettable<ReqType, Trip, RequestEvent>()(
			ApiClient<ReqType, Trip, "GET", RequestEvent>,
		),
	),
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "trip/[tripId]";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = 30;
	protected override readonly queryParamNames = {} as const;

	protected override formatQueryParams = (_content: ReqType): URLSearchParams => {
		return new URLSearchParams();
	};

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>,
	): ReqType => ({ tripId: decodeURIComponent(reqEvent.params.tripId) });

	protected override formatUrlPath = (
		{ tripId }: ReqType,
		{ apiPathBase }: Pick<Ctx, "apiPathBase">,
	): `${Ctx["apiPathBase"]}${string}` => `${apiPathBase}trip/${encodeURIComponent(tripId)}`;

	public override formatNonApiUrlSuffix = (
		{ tripId }: ReqType,
		ctx: Pick<Ctx, "profileConfig" | "pathBase">,
	): URL => {
		const { pathBase } = ctx;
		const path = `${pathBase}trip/${encodeURIComponent(tripId)}`;
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
			tripId: decodeURIComponent(url.pathname.substring(url.pathname.lastIndexOf("/") + 1)),
		},
	});
}
