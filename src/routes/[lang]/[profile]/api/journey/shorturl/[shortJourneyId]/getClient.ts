import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { browser } from "$app/environment";

export class GetJourneyShortUrlApiClient extends NonApiUsable<string, string[], RequestEvent>()(
	PathParamSettable<string, string[], RequestEvent>()(
		ApiClient<string, string[], "GET", RequestEvent>
	)
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "journey/shorturl/[shortJourneyId]";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;
	protected override readonly nonApiRoute = "/de/dbnav/journey/shorturl/[shortJourneyId]";

	protected override formatUrlPath(content: string): `/de/dbnav/api/${string}` {
		return `/de/dbnav/api/journey/shorturl/${content}`;
	}

	override parse(reqEvent: RequestEvent): string {
		return reqEvent.params.shortJourneyId;
	}

	override formatNonApiUrl(content: string): URL {
		const pathname = this.nonApiRoute.replace("[shortJourneyId]", content);
		return new URL(pathname, browser ? location.origin : "http://localhost");
	}

	protected override requestEventFromUrl(url: URL): RequestEvent {
		return {
			url,
			params: { shortJourneyId: url.pathname.substring(url.pathname.lastIndexOf("/") + 1) }
		} as RequestEvent;
	}
}
