import type { KeylessDatabaseEntry } from "$lib/types";
import type { RequestEvent } from "./$types";
import { BodySettable } from "$lib/api-client/BodySettableApiClient";
import { ApiClient } from "$lib/api-client/ApiClient";
import { YEAR_IN_SECONDS } from "$lib/constants";

type ReqType = KeylessDatabaseEntry<string[]>;

export class PutJourneyShortUrlApiClient extends BodySettable<ReqType, string, RequestEvent>()(
	ApiClient<ReqType, string, "PUT", RequestEvent>
) {
	protected override readonly methodType = "PUT";
	protected override readonly route = "journey/shorturl";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = YEAR_IN_SECONDS;

	protected override formatBody(content: ReqType): string {
		return JSON.stringify(content);
	}

	override async parse(reqEvent: RequestEvent): Promise<ReqType> {
		return (await reqEvent.request.json()) as ReqType;
	}
}
