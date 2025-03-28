import type { GetDiagramApiClient } from "../../getClient";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { browser } from "$app/environment";

type ResT = Parameters<GetDiagramApiClient["request"]>[0];

export class GetDiagramShortUrlApiClient extends NonApiUsable<string, ResT>()(
	PathParamSettable<string, ResT>()(ApiClient<string, ResT, "GET", RequestEvent>)
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "/api/diagram/shorturl/[shortDiagramId]";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;
	protected override readonly nonApiRoute = "/diagram/shorturl/[shortDiagramId]";

	protected override formatUrlPath(content: string): `/api/${string}` {
		return `/api/diagram/shorturl/${content}`;
	}

	override parse(reqEvent: RequestEvent): string {
		return reqEvent.params.shortDiagramId;
	}

	override formatNonApiUrl(content: string): URL {
		const pathname = this.nonApiRoute.replace("[shortDiagramId]", content);
		return new URL(pathname, browser ? location.origin : "http://localhost");
	}

	protected override requestEventFromUrl(url: URL): RequestEvent {
		return {
			url,
			params: { shortDiagramId: url.pathname.substring(url.pathname.lastIndexOf("/") + 1) }
		} as RequestEvent;
	}
}
