import type {
	Ctx,
	JourneysFilters,
	ParsedLocation,
	Product,
	SubJourney,
	TimeData
} from "$lib/types";
import { VahrplanError } from "$lib/VahrplanError";
import {
	type UnpackedVahrplanResult,
	type VahrplanResult,
	VahrplanSuccess
} from "$lib/VahrplanResult";
import type { OptionId } from "../../../routes/[lang=lang]/[profile=profileId]/api/profile/profile.server";
import { RateLimiter } from "$lib/server/RateLimiter";
import type { JourneyDataRequestFormatter } from "$lib/server/journey-data/JourneyDataRequestFormatter";
import type { JourneyDataResponseParser } from "$lib/server/journey-data/JourneyDataResponseParser";

export type JourneyNodesWithRefs = {
	journeys: SubJourney[];
	earlierRef: string;
	laterRef: string;
};

export type JourneyDataServiceConfig<ProductT extends Product, OptionT extends OptionId> = {
	productMapping: Record<ProductT, string>;
	optionMapping: Record<OptionT, string>;
	hasTickets: boolean;
};

export abstract class JourneyDataService<ProductT extends Product, OptionT extends OptionId> {
	protected abstract readonly requestFormatter: JourneyDataRequestFormatter<ProductT, OptionT>;
	protected abstract readonly responseParser: JourneyDataResponseParser<ProductT>;

	protected products: Record<ProductT, string>;
	protected optionIds: Record<OptionT, string>;

	protected constructor(config: JourneyDataServiceConfig<ProductT, OptionT>) {
		this.products = config.productMapping;
		this.optionIds = config.optionMapping;
	}

	/**
	 * get journeys between two stations
	 * @param stops where to start and where to go
	 * @param timeData when to depart or when to arrive
	 * @param options additional options
	 */
	public abstract journeys: (
		stops: { from: string; to: string },
		options: { timeData: TimeData; filters: JourneysFilters<ProductT, OptionT> },
		ctx: Pick<Ctx, "lang">
	) => Promise<VahrplanResult<JourneyNodesWithRefs>>;

	/**
	 * get a journey consisting of multiple sub-journeys
	 * @param tokens refresh tokens of the sub-journeys
	 */
	public abstract refresh: (
		token: string,
		ctx: Pick<Ctx, "lang">
	) => Promise<VahrplanResult<SubJourney>>;

	/**
	 * suggest locations based on a string. Can be used for autocomplete inputs
	 * @param name the location to find
	 */
	public abstract locations: (
		name: string,
		ctx: Pick<Ctx, "lang">
	) => Promise<VahrplanResult<ParsedLocation[]>>;

	/**
	 * get a single location based on a token
	 * @param token the request token of the location
	 */
	public abstract location: (
		token: ParsedLocation["id"],
		ctx: Pick<Ctx, "lang">
	) => Promise<VahrplanResult<ParsedLocation>>;

	/**
	 * parse an error that may be thrown when data fetching goes wrong
	 * @param err
	 */
	protected abstract parseError: (err: unknown) => VahrplanError;

	protected abstract throwQuotaError: () => never;

	protected wrapClientWithRateLimiter = <
		T extends Record<string | symbol, (...args: never[]) => Promise<unknown>>
	>(
		client: T,
		quota: ConstructorParameters<typeof RateLimiter>[0]
	): T => {
		const rateLimiter = new RateLimiter(quota);

		const proxyHandler = {
			get: (target: T, prop: keyof T): T[keyof T] => {
				const result = rateLimiter.accessResource("global", () => target[prop]);
				if (result.isError) {
					// Pretend as if client threw an error
					return this.throwQuotaError();
				}
				return result.content;
			}
		};
		return new Proxy(client, proxyHandler);
	};

	/**
	 * perform a request and return a `VahrplanResult` wrapping the result or a corresponding error
	 * @sealed
	 */
	protected performRequest = <
		EndpointT extends keyof JourneyDataService<ProductT, OptionT>,
		FormattedReqParamsT extends unknown[],
		UnparsedResT
	>(
		_endpoint: EndpointT,
		callbacks: {
			formatReqParams: (
				...reqData: Parameters<JourneyDataService<ProductT, OptionT>[EndpointT]>
			) => FormattedReqParamsT;
			request: (...params: FormattedReqParamsT) => Promise<UnparsedResT>;
			parseRes: (
				res: UnparsedResT
			) => UnpackedVahrplanResult<
				Awaited<ReturnType<JourneyDataService<ProductT, OptionT>[EndpointT]>>
			>;
		},
		...reqData: Parameters<JourneyDataService<ProductT, OptionT>[EndpointT]>
	): ReturnType<JourneyDataService<ProductT, OptionT>[EndpointT]> => {
		const formattedReqParams = callbacks.formatReqParams(...reqData);
		return callbacks
			.request(...formattedReqParams)
			.then((r) => new VahrplanSuccess(callbacks.parseRes(r)), this.parseError) as ReturnType<
			JourneyDataService<ProductT, OptionT>[EndpointT] // this assertion is stupid. Why is this necessary ts????
		>;
	};
}
