import { type GetDiagramApiClient } from "../getClient";
import type { Ctx, KeylessDatabaseEntry } from "$lib/types";
import type { RequestEvent } from "./$types";
import { BodySettable } from "$lib/api-client/BodySettableApiClient";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";

type ReqType = KeylessDatabaseEntry<
	GetDiagramApiClient extends ApiClient<infer ReqT, infer _A, infer _B, infer _C> ? ReqT : never
>;

export class PutDiagramShortApiClient extends BodySettable<ReqType, string, RequestEvent>()(
	ApiClient<ReqType, string, "PUT", RequestEvent>,
) {
	protected override readonly methodType = "PUT";
	protected override readonly route = "diagram/shorturl";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;

	protected override formatBody = (content: ReqType, _ctx: Pick<Ctx, "profileConfig">): string =>
		JSON.stringify(content);

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"PUT", RequestEvent>,
	): Promise<ReqType> => reqEvent.request.json() as Promise<ReqType>;
}
