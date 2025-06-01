import type { SubJourney } from "$lib/types";
import type { RequestEvent } from "./$types";
import { QueryParamSettable } from "$lib/api-client/QueryParamSettableApiClient";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { ApiClient } from "$lib/api-client/ApiClient";
import { browser } from "$app/environment";
import type { LocationEquivalenceSystem } from "../diagram/locationRepresentativesUtils";
import type { SvgData } from "$lib/server/svgData/svgData.server";

type ResType = {
	subJourneys: SubJourney[];
	transferLocations: LocationEquivalenceSystem;
	svgData: SvgData;
};

export class GetJourneyApiClient extends NonApiUsable<string[], ResType, RequestEvent>()(
	QueryParamSettable<string[], ResType, RequestEvent>()(
		ApiClient<string[], ResType, "GET", RequestEvent>
	)
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "journey";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = 30;
	protected override readonly queryParamNames = {
		tokens: "tokens"
	} as const;
	protected override readonly nonApiRoute = "/de/dbnav/journey";

	protected override formatQueryParams(content: string[]): URLSearchParams {
		const queryParams = new URLSearchParams();
		this.writeArrayQueryParameter(queryParams, this.queryParamNames.tokens, content);
		return queryParams;
	}

	override parse(reqEvent: RequestEvent): string[] {
		return this.readArrayQueryParameter(reqEvent.url.searchParams, this.queryParamNames.tokens);
	}

	protected override estimateUpstreamCalls(reqContent: string[]): number {
		return reqContent.length - 1;
	}

	override formatNonApiUrl(content: string[]): URL {
		const url = new URL(this.nonApiRoute, browser ? location.origin : "http://localhost");
		const queryParams = this.formatQueryParams(content);
		for (const [queryParamKey, queryParamValue] of queryParams) {
			url.searchParams.append(queryParamKey, queryParamValue);
		}
		return url;
	}

	protected requestEventFromUrl(url: URL): RequestEvent {
		return { url } as RequestEvent;
	}
}
