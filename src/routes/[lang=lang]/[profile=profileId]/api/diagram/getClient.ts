import type { Ctx, JourneysFilters, Product, RelativeTimeType, TimeData } from "$lib/types";
import type { RequestEvent } from "./$types";
import { error } from "@sveltejs/kit";
import { QueryParamSettable } from "$lib/api-client/QueryParamSettableApiClient";
import type { CamelToKebab } from "$lib/utilityTypes";
import type { DiagramData } from "$lib/state/diagramData.svelte.js";
import { NonApiUsable } from "$lib/api-client/NonApiUsableApiClient";
import type { DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import { ApiClient, type MinimalRequestEvent } from "$lib/api-client/ApiClient";
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
import type { OptionId, PossibleOptionValues, Profile } from "$lib/server/profiles/profile";

type ReqType = {
	stops: string[];
	timeData: TimeData;
	filters: JourneysFilters;
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
		[K in keyof ReqType["filters"]["products"]]: CamelToKebab<K>;
	};

	protected override formatQueryParams = (
		content: ReqType,
		{ profileConfig }: Pick<Ctx, "profileConfig">
	): URLSearchParams => {
		const queryParams = new URLSearchParams();
		this.writeArrayQueryParameter(queryParams, this.queryParamNames.stops, content.stops);
		queryParams.set(this.queryParamNames.time, content.timeData.time);
		queryParams.set(
			this.queryParamNames.timeRole,
			content.timeData.scrollDirection === "later" ? "departure" : "arrival"
		);

		let product: Product;
		for (product in profileConfig.products) {
			// only set products from profile config
			this.writeBooleanQueryParameter(
				queryParams,
				this.queryParamNames[product],
				content.filters.products[product]
			);
		}

		let optionKey: OptionId;
		for (optionKey in profileConfig.options) {
			// only set options from profile config
			const value = content.filters.options[optionKey];
			if (typeof value === "boolean") {
				this.writeBooleanQueryParameter(
					queryParams,
					this.queryParamNames[optionKey],
					value
				);
			} else {
				queryParams.set(this.queryParamNames[optionKey], String(value));
			}
		}

		return queryParams;
	};

	/**
	 * read an option value from a query parameter; return the default value if it doesn't exist
	 * @param key option key
	 * @param defaultValue
	 * @param queryParams
	 */
	private readNonBooleanOptionValue = <
		KeyT extends {
			[K in OptionId]: PossibleOptionValues<K> extends boolean ? never : K;
		}[OptionId]
	>(
		key: KeyT,
		defaultValue: PossibleOptionValues<KeyT> &
			(typeof Profile.availableOptions)[KeyT]["defaultValue"],
		queryParams: URLSearchParams
	): PossibleOptionValues<KeyT> => {
		const paramValue = queryParams.get(this.queryParamNames[key]);
		if (paramValue === null) {
			return defaultValue;
		}
		return Number(paramValue) as PossibleOptionValues<KeyT>;
		// disambiguate between string and number param once a number param exists
	};

	protected override parseRequestContent = (
		reqEvent: MinimalRequestEvent<"GET", RequestEvent>
	): ReqType => {
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

		const products: Record<Product, boolean> = {
			longDistanceExpress: url.searchParams.has(this.queryParamNames.longDistanceExpress),
			longDistance: url.searchParams.has(this.queryParamNames.longDistance),
			regionalExpress: url.searchParams.has(this.queryParamNames.regionalExpress),
			regional: url.searchParams.has(this.queryParamNames.regional),
			suburban: url.searchParams.has(this.queryParamNames.suburban),
			subway: url.searchParams.has(this.queryParamNames.subway),
			tram: url.searchParams.has(this.queryParamNames.tram),
			bus: url.searchParams.has(this.queryParamNames.bus),
			taxi: url.searchParams.has(this.queryParamNames.taxi),
			ferry: url.searchParams.has(this.queryParamNames.ferry)
		};

		const options: { [K in OptionId]: PossibleOptionValues<K> } = {
			bike: url.searchParams.has(this.queryParamNames.bike),
			accessible: url.searchParams.has(this.queryParamNames.accessible),
			maxTransfers: this.readNonBooleanOptionValue("maxTransfers", -1, url.searchParams),
			minTransferTime: this.readNonBooleanOptionValue("minTransferTime", 0, url.searchParams)
		};

		return {
			stops,
			timeData: {
				type: "absolute",
				time: timeParam,
				scrollDirection
			},
			filters: {
				products,
				options
			}
		};
	};

	protected override estimateUpstreamCalls = (reqContent: ReqType): number =>
		1 + (reqContent.stops.length - 2) * DIAGRAM_COLUMN_MAX_REQUESTS; // first column is always one request

	protected override formatProps = (
		content: ReqType
	): Record<PlausibleProp, string | number> => ({
		viaCount: content.stops.length - 2
	});

	protected override formatNonApiUrlSuffix = (
		content: ReqType,
		ctx: Pick<Ctx, "profileConfig" | "pathBase">
	): URL => {
		const queryParams = this.formatQueryParams(content, ctx);
		const { pathBase } = ctx;
		const path = `${pathBase}diagram`;
		const url = new URL(path, browser ? location.origin : "http://localhost");
		for (const [queryParamKey, queryParamValue] of queryParams) {
			url.searchParams.append(queryParamKey, queryParamValue);
		}
		return url;
	};

	protected override requestEventFromUrl = (
		url: URL,
		ctx: Pick<Ctx, "profileConfig">
	): MinimalRequestEvent<"GET", RequestEvent> => ({
		url,
		params: { lang: ctx.profileConfig.lang, profile: ctx.profileConfig.id }
	});

	public formDataToRequestData = (formData: DisplayedFormData): ReqType => ({
		stops: formData.locations.map((l) => l.value.id),
		timeData: formData.timeData,
		filters: formData.filters
	});
}
