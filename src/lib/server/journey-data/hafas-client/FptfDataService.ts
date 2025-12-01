import {
	JourneyDataService,
	type JourneyDataServiceConfig,
	type JourneyNodesWithRefs
} from "$lib/server/journey-data/JourneyDataService";
import type { HafasClient, Line } from "hafas-client";
import { RateLimiter } from "$lib/server/RateLimiter";
import type { ParsedLocation, Product, SubJourney } from "$lib/types";
import { type VahrplanResult } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";
import type { OptionId } from "../../../../routes/[lang=lang]/[profile=profileId]/api/profile/profile.server";
import { FptfRequestFormatter } from "$lib/server/journey-data/hafas-client/FptfRequestFormatter";
import type { LineShapeParser } from "$lib/server/journey-data/LineShapeParser";
import { FptfResponseParser } from "$lib/server/journey-data/hafas-client/FptfResponseParser";

export type FptfOptionT = Extract<
	OptionId,
	"bike" | "accessible" | "maxTransfers" | "minTransferTime"
>;

// see https://github.com/public-transport/hafas-client/blob/336a9ba115d6a7e6b946349376270907f5c0742c/lib/errors.js
export type HafasError = Error & {
	isHafasError: true;
	code: "ACCESS_DENIED" | "INVALID_REQUEST" | "NOT_FOUND" | "SERVER_ERROR" | "QUOTA_EXCEEDED";
	isCausedByServer: boolean;
	hafasCode: string;
	hafasDescription: string;
};

type FptfDataServiceConfig<ProductT extends Product> = Pick<
	JourneyDataServiceConfig<ProductT, FptfOptionT>,
	"productMapping"
> & {
	client: HafasClient;
	requestFormatter: FptfRequestFormatter<ProductT>;
	responseParser: FptfResponseParser<ProductT>;
	hasTickets: boolean;
	quota: ConstructorParameters<typeof RateLimiter>[0];
	lineShapeParser: LineShapeParser<Line>;
};

/**
 * can be used with fptf-clients like hafas-client, db-vendo-client or motis-client
 */
export class FptfDataService<ProductT extends Product> extends JourneyDataService<
	ProductT,
	FptfOptionT
> {
	private readonly client: HafasClient;
	protected override readonly requestFormatter: FptfRequestFormatter<ProductT>;
	protected override readonly responseParser: FptfResponseParser<ProductT>;

	/**
	 * Create a JourneyDataService from a HafasClient
	 * @param config information about how this client should work.
	 * note that the client must support the `refreshJourney()` endpoint! (check `index.js` to verify)
	 */
	public constructor(config: FptfDataServiceConfig<ProductT>) {
		const optionMapping = {
			bike: "bike",
			accessible: "accessibility",
			maxTransfers: "transfers",
			minTransferTime: "transferTime"
		} as const;
		super({
			productMapping: config.productMapping,
			optionMapping,
			hasTickets: config.hasTickets
		});

		this.client = this.wrapClientWithRateLimiter({ ...config.client }, config.quota);
		this.requestFormatter = new FptfRequestFormatter({
			optionMapping,
			productMapping: config.productMapping,
			hasTickets: config.hasTickets
		});
		this.responseParser = new FptfResponseParser({
			productMapping: config.productMapping,
			lineShapeParser: config.lineShapeParser
		});
	}

	public override journeys = (
		...params: Parameters<JourneyDataService<ProductT, FptfOptionT>["journeys"]>
	): Promise<VahrplanResult<JourneyNodesWithRefs>> =>
		this.performRequest(
			"journeys",
			{
				formatReqParams: this.requestFormatter.formatRequest.journeys,
				request: this.client.journeys,
				parseRes: this.responseParser.parseResponse.journeys
			},
			...params
		);

	public override refresh = (
		...params: Parameters<JourneyDataService<ProductT, FptfOptionT>["refresh"]>
	): Promise<VahrplanResult<SubJourney>> =>
		this.performRequest(
			"refresh",
			{
				formatReqParams: this.requestFormatter.formatRequest.refresh,
				request: this.client.refreshJourney!,
				parseRes: this.responseParser.parseResponse.refresh
			},
			...params
		);

	public override location = (
		...params: Parameters<JourneyDataService<ProductT, FptfOptionT>["location"]>
	): Promise<VahrplanResult<ParsedLocation>> =>
		this.performRequest(
			"location",
			{
				formatReqParams: this.requestFormatter.formatRequest.location,
				request: this.client.stop,
				parseRes: this.responseParser.parseResponse.location
			},
			...params
		);

	public override locations = (
		...params: Parameters<JourneyDataService<ProductT, FptfOptionT>["locations"]>
	): Promise<VahrplanResult<ParsedLocation[]>> =>
		this.performRequest(
			"locations",
			{
				formatReqParams: this.requestFormatter.formatRequest.locations,
				request: this.client.locations,
				parseRes: this.responseParser.parseResponse.locations
			},
			...params
		);

	protected override parseError = (err: unknown): VahrplanError => {
		let errorType: VahrplanError["type"] = "ERROR";
		let message = "Hafas: Server-Fehler. Die Anfrage ist möglicherweise ungültig.";
		if (FptfDataService.isHafasError(err)) {
			if (err.code === "QUOTA_EXCEEDED") {
				// handle this in a special way since this error is not thrown by hafas/hafas-client!!!
				return new VahrplanError("QUOTA_EXCEEDED");
			}
			message = `Hafas: ${err.hafasDescription ?? "Hafas-Fehler"}`;
			errorType = `HAFAS_${err.code ?? "SERVER_ERROR"}`;
		}
		return VahrplanError.withMessage(errorType, message);
	};

	/**
	 * Checks if a given error is an instance of HafasError
	 * @param error
	 * @private
	 */
	private static isHafasError = (error: unknown): error is HafasError => {
		return (
			typeof error === "object" &&
			error !== null &&
			"isHafasError" in error &&
			error.isHafasError === true
		);
	};

	/**
	 * always throws an error indicating error 429
	 * @throws HafasError
	 * @private
	 */
	protected override throwQuotaError = (): never => {
		throw {
			isHafasError: true,
			code: "QUOTA_EXCEEDED",
			isCausedByServer: true,
			hafasCode: "",
			hafasDescription: ""
		} as HafasError;
	};
}
