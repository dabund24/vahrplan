import type { RequestEvent } from "@sveltejs/kit";
import { ApiClient, type HttpMethod } from "$lib/api-client/ApiClient";
import { GetDiagramApiClient } from "../../routes/de/dbnav/api/diagram/getClient";
import { PostDiagramScrollApiClient } from "../../routes/de/dbnav/api/diagram/scroll/[scrollDirection]/postClient";
import { GetDiagramShortUrlApiClient } from "../../routes/de/dbnav/api/diagram/shorturl/[shortDiagramId]/getClient";
import { GetJourneyApiClient } from "../../routes/de/dbnav/api/journey/getClient";
import { GetJourneyShortUrlApiClient } from "../../routes/de/dbnav/api/journey/shorturl/[shortJourneyId]/getClient";
import { GetLocationApiClient } from "../../routes/de/dbnav/api/location/[locationId]/getClient";
import { GetLocationsApiClient } from "../../routes/de/dbnav/api/locations/[name]/getClient";
import { PutDiagramShortApiClient } from "../../routes/de/dbnav/api/diagram/shorturl/putClient";
import { PutJourneyShortUrlApiClient } from "../../routes/de/dbnav/api/journey/shorturl/putClient";

const routes = {
	diagram: "/de/dbnav/api/diagram",
	diagramScroll: "/de/dbnav/api/diagram/scroll/[scrollDirection]",
	diagramShortUrl: "/de/dbnav/api/diagram/shorturl",
	diagramShortUrlId: "/de/dbnav/api/diagram/shorturl/[shortDiagramId]",
	journey: "/de/dbnav/api/journey",
	journeyShortUrl: "/de/dbnav/api/journey/shorturl",
	journeyShortUrlId: "/de/dbnav/api/journey/shorturl/[shortJourneyId]",
	location: "/de/dbnav/api/location/[locationId]",
	locations: "/de/dbnav/api/locations/[name]"
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
	["POST"]: {
		[routes.diagramScroll]: new PostDiagramScrollApiClient()
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
