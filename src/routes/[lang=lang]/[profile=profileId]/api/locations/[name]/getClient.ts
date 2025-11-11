import type { Ctx, ParsedLocation } from "$lib/types";
import type { RequestEvent } from "./$types";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
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

	protected override formatUrlPath = (
		content: string,
		{ apiPathBase }: Pick<Ctx, "apiPathBase">
	): `${Ctx["apiPathBase"]}${string}` => `${apiPathBase}locations/${encodeURIComponent(content)}`;

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>
	): string => reqEvent.params.name;
}
