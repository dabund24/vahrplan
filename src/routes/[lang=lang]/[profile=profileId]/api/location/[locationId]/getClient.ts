import type { ParsedLocation } from "$lib/types";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient, type MinimalRequestEvent, type RequestData } from "$lib/api-client/ApiClient";
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

	protected override formatUrlPath = (
		content: string,
		{ apiPathBase }: Pick<RequestData, "apiPathBase" | "profileConfig">
	): `/${Language}/${ProfileId}/api/${string}` => `${apiPathBase}location/${content}`;

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>
	): string => reqEvent.params.locationId;
}
