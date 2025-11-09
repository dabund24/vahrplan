import type { RequestEvent } from "@sveltejs/kit";
import {
	type AbstractConstructor,
	ApiClient,
	type HttpMethod,
	type RequestData
} from "$lib/api-client/ApiClient";
import type { VahrplanResult } from "$lib/VahrplanResult";
import type { Language } from "../../params/lang";
import type { ProfileId } from "../../params/profileId";

export type PlausibleProp = "viaCount";

/**
 * @mixin PlausiblePropSettable Lets {@linkcode ApiClient}s report custom properties to plausible
 */
// eslint-disable-next-line @typescript-eslint/naming-convention,
export function PlausiblePropSettable<
	ReqT,
	ResT,
	RequestEventT extends RequestEvent<
		{ lang: Language; profile: Exclude<ProfileId, "empty"> },
		`/[lang=lang]/[profile=profileId]/api/${string}`
	>
>() {
	// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
	return function <
		MethodT extends HttpMethod,
		BaseT extends AbstractConstructor<ApiClient<ReqT, ResT, MethodT, RequestEventT>>
	>(base: BaseT) {
		abstract class PlausiblePropSettable extends base {
			/**
			 * override to generate custom plausible properties (except for language and profile!)
			 * @param content
			 * @protected
			 */
			protected abstract formatProps(content: ReqT): Record<PlausibleProp, string | number>;

			protected override requestInternal(
				content: ReqT,
				requestData: RequestData,
				fetchFn?: typeof fetch
			): Promise<VahrplanResult<ResT>> {
				requestData.plausibleProps = {
					...requestData.plausibleProps,
					...this.formatProps(content)
				};
				return super.requestInternal(content, requestData, fetchFn);
			}
		}
		return PlausiblePropSettable;
	};
}
