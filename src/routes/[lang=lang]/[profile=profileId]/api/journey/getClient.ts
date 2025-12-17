import type { Ctx, SubJourney } from "$lib/types";
import type { RequestEvent } from "./$types";
import { QueryParamSettable } from "$lib/api-client/QueryParamSettableApiClient";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import { browser } from "$app/environment";
import type { LocationEquivalenceSystem } from "../diagram/locationRepresentativesUtils";
import type { SvgData } from "$lib/server/svgData/svgData.server";
import {
	type PlausibleProp,
	PlausiblePropSettable,
} from "$lib/api-client/PlausiblePropSettableApiClient";

type ResType = {
	subJourneys: SubJourney[];
	transferLocations: LocationEquivalenceSystem;
	svgData: SvgData;
};

export class GetJourneyApiClient extends NonApiUsable<string[], ResType, RequestEvent>()(
	QueryParamSettable<string[], ResType, RequestEvent>()(
		PlausiblePropSettable<string[], ResType, RequestEvent>()(
			ApiClient<string[], ResType, "GET", RequestEvent>,
		),
	),
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "journey";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = 30;
	protected override readonly queryParamNames = {
		tokens: "tokens",
	} as const;

	protected override formatQueryParams = (content: string[]): URLSearchParams => {
		const queryParams = new URLSearchParams();
		this.writeArrayQueryParameter(queryParams, this.queryParamNames.tokens, content);
		return queryParams;
	};

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>,
	): string[] =>
		this.readArrayQueryParameter(reqEvent.url.searchParams, this.queryParamNames.tokens);

	protected override estimateUpstreamCalls = (reqContent: string[]): number =>
		reqContent.length - 1;

	public override formatNonApiUrlSuffix = (
		content: string[],
		ctx: Pick<Ctx, "profileConfig" | "pathBase">,
	): URL => {
		const { pathBase } = ctx;
		const path = `${pathBase}journey`;
		const url = new URL(path, browser ? location.origin : "http://localhost");
		const queryParams = this.formatQueryParams(content);
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
		params: { lang: ctx.profileConfig.lang, profile: ctx.profileConfig.id },
	});

	protected override formatProps = (
		content: string[],
	): Record<PlausibleProp, string | number> => ({
		viaCount: content.length - 1,
	});
}
