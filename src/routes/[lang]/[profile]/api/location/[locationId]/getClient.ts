import type { ParsedLocation } from "$lib/types";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";

export class GetLocationApiClient extends PathParamSettable<string, ParsedLocation, RequestEvent>()(
	ApiClient<string, ParsedLocation, "GET", RequestEvent>
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "/api/location/[locationId]";
	protected override readonly isLoadingAnimated = false;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;

	protected override formatUrlPath(content: string): `/de/dbnav/api/${string}` {
		return `/de/dbnav/api/location/${content}`;
	}

	override parse(lol: RequestEvent): string {
		return lol.params.locationId;
	}
}
