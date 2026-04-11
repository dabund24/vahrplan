import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { QueryParamSettable } from "$lib/api-client/QueryParamSettableApiClient";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import type { RequestEvent } from "./$types";
import type { Ctx, Trip } from "$lib/types";
import { browser } from "$app/environment";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";

type ReqType = {
	tripId: string;
	highlightData?: {
		fromStop: string;
		toStop: string;
	};
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
	protected override readonly queryParamNames = {
		fromStop: "from-stop",
		toStop: "to-stop",
	} as const;

	protected override formatQueryParams = (content: ReqType): URLSearchParams => {
		const params = new URLSearchParams();
		if (content.highlightData !== undefined) {
			let paramName: keyof typeof this.queryParamNames;
			for (paramName in this.queryParamNames) {
				params.set(this.queryParamNames[paramName], content.highlightData[paramName]);
			}
		}
		return params;
	};

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>,
	): ReqType => {
		const content: ReqType = {
			tripId: decodeURIComponent(reqEvent.params.tripId),
			highlightData: undefined,
		};
		const queryParams = reqEvent.url.searchParams;
		const fromStop = queryParams.get(this.queryParamNames.fromStop);
		const toStop = queryParams.get(this.queryParamNames.toStop);
		if (fromStop !== null && toStop !== null) {
			content.highlightData = { fromStop, toStop };
		}
		return content;
	};

	protected override formatUrlPath = (
		{ tripId }: ReqType,
		{ apiPathBase }: Pick<Ctx, "apiPathBase">,
	): `${Ctx["apiPathBase"]}${string}` => `${apiPathBase}trip/${encodeURIComponent(tripId)}`;

	public override formatNonApiUrlSuffix = (
		content: ReqType,
		ctx: Pick<Ctx, "profileConfig" | "pathBase">,
	): URL => {
		const queryParams = this.formatQueryParams(content);
		const path = `${ctx.pathBase}trip/${encodeURIComponent(content.tripId)}`;
		const url = new URL(path, browser ? location.origin : "http://localhost");
		for (const [queryParamKey, queryParamValue] of queryParams) {
			url.searchParams.append(queryParamKey, queryParamValue);
		}
		return url;
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
