import type { RequestEvent } from "@sveltejs/kit";
import { ApiClient, type HttpMethod } from "$lib/api-client/ApiClient";
import { GetDiagramApiClient } from "../../routes/[lang]/[profile]/api/diagram/getClient";
import { PostDiagramScrollApiClient } from "../../routes/[lang]/[profile]/api/diagram/scroll/[scrollDirection]/postClient";
import { GetDiagramShortUrlApiClient } from "../../routes/[lang]/[profile]/api/diagram/shorturl/[shortDiagramId]/getClient";
import { GetJourneyApiClient } from "../../routes/[lang]/[profile]/api/journey/getClient";
import { GetJourneyShortUrlApiClient } from "../../routes/[lang]/[profile]/api/journey/shorturl/[shortJourneyId]/getClient";
import { GetLocationApiClient } from "../../routes/[lang]/[profile]/api/location/[locationId]/getClient";
import { GetLocationsApiClient } from "../../routes/[lang]/[profile]/api/locations/[name]/getClient";
import { PutDiagramShortApiClient } from "../../routes/[lang]/[profile]/api/diagram/shorturl/putClient";
import { PutJourneyShortUrlApiClient } from "../../routes/[lang]/[profile]/api/journey/shorturl/putClient";

/**
 * this contains all api paths without the preceding `/[lang]/[profile]/api/`
 */
type ApiRouteShort =
	| "diagram"
	| "diagram/scroll/[scrollDirection]"
	| "diagram/shorturl"
	| "diagram/shorturl/[shortDiagramId]"
	| "journey"
	| "journey/shorturl"
	| "journey/shorturl/[shortJourneyId]"
	| "location/[locationId]"
	| "locations/[name]";

/**
 * turns a short api route type into a long one by prepending `/[lang]/[profile]/api/`
 */
type LongRoute<ShortRoute extends ApiRouteShort> = `/[lang]/[profile]/api/${ShortRoute}`;

/**
 * all api routes
 */
type ApiRoute = LongRoute<ApiRouteShort>;

/**
 * stores instances of all clients. clients can be obtained either by their full api path or by the path without the prefix `/[lang]/[profile]/api/`
 */
const clients = {
	["GET"]: {
		...clientEntries("diagram", GetDiagramApiClient),
		...clientEntries("diagram/shorturl/[shortDiagramId]", GetDiagramShortUrlApiClient),
		...clientEntries("journey", GetJourneyApiClient),
		...clientEntries("journey/shorturl/[shortJourneyId]", GetJourneyShortUrlApiClient),
		...clientEntries("location/[locationId]", GetLocationApiClient),
		...clientEntries("locations/[name]", GetLocationsApiClient)
	},
	["POST"]: {
		...clientEntries("diagram/scroll/[scrollDirection]", PostDiagramScrollApiClient)
	},
	["PUT"]: {
		...clientEntries("diagram/shorturl", PutDiagramShortApiClient),
		...clientEntries("journey/shorturl", PutJourneyShortUrlApiClient)
	}
} as const satisfies {
	[MethodT in HttpMethod]?: {
		[RouteT in ApiRouteShort | ApiRoute]?: ApiClient<
			unknown,
			unknown,
			MethodT, // ensure the mapped client handles the correct http method
			RequestEvent<object, RouteT extends ApiRouteShort ? LongRoute<RouteT> : RouteT> // ensure the mapped client handles the correct route
		>;
	};
};

/**
 * generate an object with two entries: `route` and the long version of route are both mapped to the same instance of `clientClass`
 * @param route
 * @param clientClass
 */
function clientEntries<
	RouteT extends ApiRouteShort,
	ClientT extends ApiClient<unknown, unknown, HttpMethod, RequestEvent<object, LongRoute<RouteT>>>
>(route: RouteT, clientClass: new () => ClientT): Record<RouteT | LongRoute<RouteT>, ClientT> {
	const client = new clientClass();
	return {
		[route]: client,
		[`/[lang]/[profile]/api/${route}` satisfies LongRoute<RouteT>]: client
	} as Record<RouteT | LongRoute<RouteT>, ClientT>; // in a perfect world, this assertion would not be necessary. Unfortunately, it is: https://stackoverflow.com/a/64433457
}

/**
 * get the reference to an api client for an endpoint
 * @param method http method of the endpoint
 * @param route either full route of the endpoint or the route without the prefix `/[lang]/[profile]/api/`
 */
export function apiClient<
	MethodT extends keyof typeof clients,
	RouteT extends keyof (typeof clients)[MethodT]
>(method: MethodT, route: RouteT): (typeof clients)[MethodT][RouteT] {
	return clients[method][route];
}
