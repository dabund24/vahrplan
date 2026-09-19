import type { Ctx, ParsedLocation } from "$lib/types";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";

export class GetLocationApiClient extends PathParamSettable<string, ParsedLocation, RequestEvent>()(
	ApiClient<string, ParsedLocation, "GET", RequestEvent>,
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "location/[locationId]";
	protected override readonly isLoadingAnimated = false;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;

	protected override formatUrlPath = (
		content: string,
		{ apiPathBase }: Pick<Ctx, "apiPathBase" | "profileConfig">,
	): `${Ctx["apiPathBase"]}${string}` => `${apiPathBase}location/${content}`;

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>,
	): string => reqEvent.params.locationId;
}
