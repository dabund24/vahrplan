import type { RequestEvent } from "@sveltejs/kit";
import { ApiClient, type HttpMethod } from "$lib/api-client/ApiClient";
import { GetDiagramApiClient } from "../../routes/api/diagram/getClient";
import { GetDiagramShortUrlApiClient } from "../../routes/api/diagram/shorturl/[shortDiagramId]/getClient";
import { GetJourneyApiClient } from "../../routes/api/journey/getClient";
import { GetJourneyShortUrlApiClient } from "../../routes/api/journey/shorturl/[shortJourneyId]/getClient";
import { GetLocationApiClient } from "../../routes/api/location/[locationId]/getClient";
import { GetLocationsApiClient } from "../../routes/api/locations/[name]/getClient";
import { PutDiagramShortApiClient } from "../../routes/api/diagram/shorturl/putClient";
import { PutJourneyShortUrlApiClient } from "../../routes/api/journey/shorturl/putClient";

const routes = {
	diagram: "/api/diagram",
	diagramShortUrl: "/api/diagram/shorturl",
	diagramShortUrlId: "/api/diagram/shorturl/[shortDiagramId]",
	journey: "/api/journey",
	journeyShortUrl: "/api/journey/shorturl",
	journeyShortUrlId: "/api/journey/shorturl/[shortJourneyId]",
	location: "/api/location/[locationId]",
	locations: "/api/locations/[name]"
} as const;

const clients = {
	["GET"]: {
		[routes.diagram]: new GetDiagramApiClient(),
		[routes.diagramShortUrlId]: new GetDiagramShortUrlApiClient(),
		[routes.journey]: new GetJourneyApiClient(),
		[routes.journeyShortUrlId]: new GetJourneyShortUrlApiClient(),
		[routes.location]: new GetLocationApiClient(),
		[routes.locations]: new GetLocationsApiClient()
	},
	["PUT"]: {
		[routes.diagramShortUrl]: new PutDiagramShortApiClient(),
		[routes.journeyShortUrl]: new PutJourneyShortUrlApiClient()
	}
} as const satisfies {
	[MethodT in HttpMethod]?: {
		[RouteT in (typeof routes)[keyof typeof routes]]?: ApiClient<
			unknown,
			unknown,
			MethodT, // ensure the mapped client handles the correct http method
			RequestEvent<object, RouteT> // ensure the mapped client handles the correct route
		>;
	};
};

export function apiClient<
	MethodT extends keyof typeof clients,
	RouteT extends keyof (typeof clients)[MethodT]
>(method: MethodT, route: RouteT): (typeof clients)[MethodT][RouteT] {
	return clients[method][route];
}
