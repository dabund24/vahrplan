import type { ParsedLocation } from "$lib/types";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";

export class GetLocationsApiClient extends PathParamSettable<
	string,
	ParsedLocation[],
	RequestEvent
>()(ApiClient<string, ParsedLocation[], "GET", RequestEvent>) {
	protected override readonly methodType = "GET";
	protected override readonly route = "locations/[name]";
	protected override readonly isLoadingAnimated = false;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;

	protected override formatUrlPath(content: string): `/de/dbnav/api/${string}` {
		return `/de/dbnav/api/locations/${encodeURIComponent(content)}`;
	}

	override parse(reqEvent: RequestEvent): string {
		return reqEvent.params.name;
	}
}
