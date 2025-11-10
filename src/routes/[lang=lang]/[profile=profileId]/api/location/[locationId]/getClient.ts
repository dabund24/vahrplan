import type { ParsedLocation } from "$lib/types";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient, type RequestData } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";
import type { Language } from "../../../../../../params/lang";
import type { ProfileId } from "../../../../../../params/profileId";

export class GetLocationApiClient extends PathParamSettable<string, ParsedLocation, RequestEvent>()(
	ApiClient<string, ParsedLocation, "GET", RequestEvent>
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "location/[locationId]";
	protected override readonly isLoadingAnimated = false;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;

	protected override formatUrlPath(
		content: string,
		ctx: Pick<RequestData, "apiPathBase" | "profileConfig">
	): `/${Language}/${ProfileId}/api/${string}` {
		const { apiPathBase } = ctx;
		return `${apiPathBase}location/${content}`;
	}

	protected override parseRequestContent(reqEvent: RequestEvent): string {
		return reqEvent.params.locationId;
	}
}
