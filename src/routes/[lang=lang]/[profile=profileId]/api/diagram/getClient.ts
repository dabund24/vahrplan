import type { JourneysFilters, Product, RelativeTimeType, TimeData } from "$lib/types";
import type { RequestEvent } from "./$types";
import { error } from "@sveltejs/kit";
import { QueryParamSettable } from "$lib/api-client/QueryParamSettableApiClient";
import type { CamelToKebab } from "$lib/utilityTypes";
import type { DiagramData } from "$lib/state/diagramData.svelte.js";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import type { DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import { ApiClient, type RequestData } from "$lib/api-client/ApiClient";
import {
	DIAGRAM_COLUMN_MAX_REQUESTS,
	DIAGRAM_MAX_COLUMNS,
	DIAGRAM_MIN_COLUMNS
} from "$lib/constants";
import { VahrplanError } from "$lib/VahrplanError";
import { browser } from "$app/environment";
import {
	type PlausibleProp,
	PlausiblePropSettable
} from "$lib/api-client/PlausiblePropSettableApiClient";
import { Profile } from "../profile/profile.server";

type ReqType = {
	stops: string[];
	timeData: TimeData;
	options: {
		[K in keyof JourneysFilters<Product, keyof typeof Profile.availableOptions>]: Partial<
			JourneysFilters<Product, keyof typeof Profile.availableOptions>[K]
		>;
	};
};

export class GetDiagramApiClient extends NonApiUsable<ReqType, DiagramData, RequestEvent>()(
	PlausiblePropSettable<ReqType, DiagramData, RequestEvent>()(
		QueryParamSettable<ReqType, DiagramData, RequestEvent>()(
			ApiClient<ReqType, DiagramData, "GET", RequestEvent>
		)
	)
) {
	protected override readonly methodType = "GET";
	protected override readonly route = "diagram";
	protected override readonly isLoadingAnimated = true;
	protected override readonly cacheMaxAge = 120;
	protected override readonly queryParamNames = {
		stops: "stops",
		time: "time",
		timeRole: "time-role",
		longDistanceExpress: "long-distance-express",
		longDistance: "long-distance",
		regionalExpress: "regional-express",
		regional: "regional",
		suburban: "suburban",
		subway: "subway",
		tram: "tram",
		bus: "bus",
		taxi: "taxi",
		ferry: "ferry",
		bike: "bike",
		accessible: "accessible",
		maxTransfers: "max-transfers",
		minTransferTime: "min-transfer-time"
	} as const satisfies Record<string, string> & {
		[K in keyof ReqType["options"]["products"]]: CamelToKebab<K>;
	};
	protected override nonApiRoute = "/de/dbnav/diagram" as const;

	protected override formatQueryParams(
		content: ReqType,
		ctx: Pick<RequestData, "profileConfig">
	): URLSearchParams {
		const queryParams = new URLSearchParams();
		this.writeArrayQueryParameter(queryParams, this.queryParamNames.stops, content.stops);
		queryParams.set(this.queryParamNames.time, content.timeData.time);
		queryParams.set(
			this.queryParamNames.timeRole,
			content.timeData.scrollDirection === "later" ? "departure" : "arrival"
		);
		// url.searchParams.set("passengers[]", null); TODO handle ticket data

		let product: Product;
		for (product in content.options.products) {
			this.writeBooleanQueryParameter(
				queryParams,
				this.queryParamNames[product],
				content.options.products[product]
			);
		}

		this.writeBooleanQueryParameter(
			queryParams,
			this.queryParamNames.bike,
			content.options.bike
		);
		this.writeBooleanQueryParameter(
			queryParams,
			this.queryParamNames.accessible,
			content.options.accessible
		);
		queryParams.set(this.queryParamNames.maxTransfers, String(content.options.maxTransfers));
		queryParams.set(
			this.queryParamNames.minTransferTime,
			String(content.options.minTransferTime)
		);
		return queryParams;
	}

	protected override parseRequestContent(reqEvent: RequestEvent): ReqType {
		const url = reqEvent.url;
		const stops = this.readArrayQueryParameter(url.searchParams, this.queryParamNames.stops);
		const timeParam = url.searchParams.get(this.queryParamNames.time);
		const scrollDirection: RelativeTimeType =
			url.searchParams.get(this.queryParamNames.timeRole) === "arrival" ? "earlier" : "later";

		if (stops.length - 1 < DIAGRAM_MIN_COLUMNS || stops.length - 1 > DIAGRAM_MAX_COLUMNS) {
			error(
				400,
				VahrplanError.withMessage(
					"HAFAS_INVALID_REQUEST",
					"Ungültige Anzahl an Zwischenstationen."
				)
			);
		}

		if (timeParam === null) {
			error(400, VahrplanError.withMessage("HAFAS_INVALID_REQUEST", "Ungültige Zeitangabe."));
		}
		return {
			stops,
			timeData: {
				type: "absolute",
				time: timeParam,
				scrollDirection
			},
			options: {
				products: {
					longDistanceExpress: url.searchParams.has(
						this.queryParamNames.longDistanceExpress
					),
					longDistance: url.searchParams.has(this.queryParamNames.longDistance),
					regionalExpress: url.searchParams.has(this.queryParamNames.regionalExpress),
					regional: url.searchParams.has(this.queryParamNames.regional),
					suburban: url.searchParams.has(this.queryParamNames.suburban),
					subway: url.searchParams.has(this.queryParamNames.subway),
					tram: url.searchParams.has(this.queryParamNames.tram),
					bus: url.searchParams.has(this.queryParamNames.bus),
					taxi: url.searchParams.has(this.queryParamNames.taxi),
					ferry: url.searchParams.has(this.queryParamNames.ferry)
				} as Record<Product, boolean>,
				bike: url.searchParams.has(this.queryParamNames.bike),
				accessible: url.searchParams.has(this.queryParamNames.accessible),
				maxTransfers: Number(url.searchParams.get(this.queryParamNames.maxTransfers)),
				minTransferTime: Number(url.searchParams.get(this.queryParamNames.minTransferTime))
			}
		};
	}

	protected override estimateUpstreamCalls(reqContent: ReqType): number {
		return 1 + (reqContent.stops.length - 2) * DIAGRAM_COLUMN_MAX_REQUESTS; // first column is always one request
	}

	protected override formatProps(content: ReqType): Record<PlausibleProp, string | number> {
		return {
			viaCount: content.stops.length - 2
		};
	}

	public override formatNonApiUrl(
		content: ReqType,
		ctx: Pick<RequestData, "profileConfig">
	): URL {
		const queryParams = this.formatQueryParams(content, ctx);
		const url = new URL(this.nonApiRoute, browser ? location.origin : "http://localhost");
		for (const [queryParamKey, queryParamValue] of queryParams) {
			url.searchParams.append(queryParamKey, queryParamValue);
		}
		return url;
	}

	protected override requestEventFromUrl(url: URL): RequestEvent {
		return { url } as RequestEvent;
	}

	public formDataToRequestData(formData: DisplayedFormData): ReqType {
		return {
			stops: formData.locations.map((l) => l.value.id),
			timeData: formData.timeData,
			options: formData.options
		};
	}
}
