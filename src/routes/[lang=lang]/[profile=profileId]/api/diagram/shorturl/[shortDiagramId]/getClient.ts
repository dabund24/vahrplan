import type { GetDiagramApiClient } from "../../getClient";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient, type RequestData } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import { browser } from "$app/environment";
import type { Language } from "../../../../../../../params/lang";
import type { ProfileId } from "../../../../../../../params/profileId";

type ResT = Parameters<GetDiagramApiClient["request"]>[0];

export class GetDiagramShortUrlApiClient extends PathParamSettable<string, ResT, RequestEvent>()(
	NonApiUsable<string, ResT, RequestEvent>()(ApiClient<string, ResT, "GET", RequestEvent>)
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "diagram/shorturl/[shortDiagramId]";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;
	protected override readonly nonApiRoute = "/de/dbnav/diagram/shorturl/[shortDiagramId]";

	protected override formatUrlPath(
		content: string,
		ctx: Pick<RequestData, "apiPathBase" | "profileConfig">
	): `/${Language}/${ProfileId}/api/${string}` {
		const { apiPathBase } = ctx;
		return `${apiPathBase}diagram/shorturl/${content}`;
	}

	protected override parseRequestContent(reqEvent: RequestEvent): string {
		return reqEvent.params.shortDiagramId;
	}

	public override formatNonApiUrl(content: string): URL {
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
