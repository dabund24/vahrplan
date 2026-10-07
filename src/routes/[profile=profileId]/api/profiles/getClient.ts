import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
import { DAY_IN_SECONDS, DEFAULT_LOCALE } from "$lib/constants";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import type { RequestEvent } from "./$types";
import type { Ctx } from "$lib/types";
import type { ProfileConfig } from "$lib/server/profiles/profile";
import { extractLocaleFromUrl, type Locale } from "$lib/paraglide/runtime";

type ReqType = {
	lang: Locale;
};
type ResType = ProfileConfig[];

export class GetProfilesApiClient extends PathParamSettable<ReqType, ResType, RequestEvent>()(
	ApiClient<ReqType, ResType, "GET", RequestEvent>,
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "profiles";
	protected override readonly isLoadingAnimated = false;
	protected override readonly cacheMaxAge = DAY_IN_SECONDS;

	public override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>,
	): ReqType => ({ lang: extractLocaleFromUrl(reqEvent.url) ?? DEFAULT_LOCALE });

	protected override formatUrlPath = ({ lang }: ReqType): `${Ctx["apiPathBase"]}${string}` =>
		`/${lang}/transitous/api/profiles`; // we are free to choose the profile parameter except for empty
}
