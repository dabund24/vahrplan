import { ApiClient } from "$lib/api-client/ApiClient";
import type { profileConfig } from "./profileConfigFactory.server";
import { DAY_IN_SECONDS } from "$lib/constants";
import type { ProfileId } from "../../../../../params/profileId";
import type { Language } from "../../../../../params/lang";
import { PathParamSettable } from "$lib/api-client/PathParamSettableApiClient";
import type { RequestEvent } from "./$types";

type ReqType = {
	language: Language;
	profile: ProfileId;
};
type ResType = ReturnType<typeof profileConfig>;

export class GetProfileApiClient extends PathParamSettable<ReqType, ResType, RequestEvent>()(
	ApiClient<ReqType, ResType, "GET", RequestEvent>
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "profile";
	protected override readonly isLoadingAnimated = false;
	protected override readonly cacheMaxAge = DAY_IN_SECONDS;

	public override parse(reqEvent: RequestEvent): ReqType {
		return {
			language: reqEvent.params.lang,
			profile: reqEvent.params.profile
		};
	}

	protected override formatUrlPath(content: ReqType): `/de/dbnav/api/${string}` {
		const { language, profile } = content;
		return `/${language}/${profile}/api/profile`;
	}
}
