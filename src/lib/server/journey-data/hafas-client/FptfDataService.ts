import {
	JourneyDataService,
	type JourneyDataServiceConfig,
	type JourneyNodesWithRefs
} from "$lib/server/journey-data/JourneyDataService";
import type {
	HafasClient,
	Journeys,
	JourneysOptions as FptfJourneysOptions,
	JourneyWithRealtimeData,
	Location,
	Station,
	Stop
} from "hafas-client";
import { RateLimiter } from "$lib/server/RateLimiter";
import type { JourneysFilters, ParsedLocation, Product, SubJourney, TimeData } from "$lib/types";
import {
	parseStationStopLocation,
	parseSubJourney
} from "$lib/server/journey-data/hafas-client/parse/parse";
import { type VahrplanResult, VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";
import type { OptionId } from "../../../../routes/[lang=lang]/[profile=profileId]/api/profile/profile.server";

type FptfDataServiceOptionId = Extract<
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
	JourneyDataServiceConfig<ProductT, FptfDataServiceOptionId>,
	"productMapping"
> & {
	client: HafasClient;
	hasTickets?: true;
	quota: ConstructorParameters<typeof RateLimiter>[0];
};

export class FptfDataService<ProductT extends Product> extends JourneyDataService<
	ProductT,
	"bike" | "accessible" | "maxTransfers" | "minTransferTime"
> {
	private readonly client: HafasClient;
	private readonly hasTickets?: true;

	/**
	 * Create a JourneyDataService from a HafasClient
	 * @param config information about how this client should work
	 */
	public constructor(config: FptfDataServiceConfig<ProductT>) {
		super({
			productMapping: config.productMapping,
			optionMapping: {
				bike: "bike",
				accessible: "accessibility",
				maxTransfers: "transfers",
				minTransferTime: "transferTime"
			}
		});

		this.client = this.wrapClientWithRateLimiter({ ...config.client }, config.quota);

		this.hasTickets = config.hasTickets;
	}

	private parseJourneysResponseCallback = (hafasJourneys: Journeys): JourneyNodesWithRefs => {
		const fetchedJourneys = // convert to vahrplan format
			hafasJourneys.journeys?.map((journey) => parseSubJourney(journey)) ?? [];

		return {
			journeys: fetchedJourneys,
			earlierRef: hafasJourneys.earlierRef ?? "",
			laterRef: hafasJourneys.laterRef ?? ""
		};
	};

	/**
	 * format options of the fptf request for journeys
	 * @param timeData
	 * @param filters
	 * @private
	 */
	private formatOptions = (
		timeData: TimeData,
		filters: JourneysFilters<
			ProductT,
			"bike" | "accessible" | "maxTransfers" | "minTransferTime"
		>
	): FptfJourneysOptions => {
		const products: Record<string, boolean> = {};
		for (const vahrplanProduct in this.products) {
			products[this.products[vahrplanProduct]] = filters.products[vahrplanProduct];
		}

		const fptfOptions: FptfJourneysOptions = {
			products,
			transferTime: filters.options.minTransferTime,
			transfers: filters.options.maxTransfers,
			accessibility: filters.options.accessible ? "complete" : "none",
			results: 10,
			stopovers: true,
			tickets: this.hasTickets,
			language: "de"
		};

		if (timeData.type === "absolute") {
			fptfOptions[timeData.scrollDirection === "later" ? "departure" : "arrival"] = new Date(
				timeData.time
			);
		} else {
			fptfOptions[`${timeData.scrollDirection}Than`] = timeData.time;
		}

		return fptfOptions;
	};

	/**
	 * format a stop for the fptf journeys or stop request
	 * @param stop
	 * @private
	 */
	private formatStop = (stop: string): string | Station | Stop | Location => {
		if (stop.startsWith("{")) {
			return JSON.parse(stop) as Station | Stop | Location;
		}
		return stop;
	};

	public override journeys = (
		{ from, to }: Parameters<JourneyDataService<ProductT>["journeys"]>[0],
		{ timeData, filters }: Parameters<JourneyDataService<ProductT>["journeys"]>[1]
	): Promise<VahrplanResult<JourneyNodesWithRefs>> =>
		this.performRequest(
			() =>
				this.client.journeys(
					this.formatStop(from),
					this.formatStop(to),
					this.formatOptions(timeData, filters)
				),
			this.parseJourneysResponseCallback
		);

	public override refresh = (tokens: string[]): Promise<VahrplanResult<SubJourney[]>> =>
		this.performRequest(
			() =>
				Promise.all(
					tokens.map(
						async (token): Promise<JourneyWithRealtimeData> =>
							this.client.refreshJourney?.(token, {
								stopovers: true,
								language: "de",
								polylines: true
							}) ?? { journey: { type: "journey", legs: [] } }
					)
				),
			(hafasJourneys) => {
				const blocks = hafasJourneys.map((journeys) => parseSubJourney(journeys.journey));
				return JourneyDataService.setMergingProperties(blocks);
			}
		);

	public override location = async (
		token: ParsedLocation["id"]
	): Promise<VahrplanResult<ParsedLocation>> => {
		const stop = this.formatStop(token);
		if (typeof stop === "string") {
			return this.performRequest(() => this.client.stop(token, {}), parseStationStopLocation);
		}
		return new VahrplanSuccess(parseStationStopLocation(stop));
	};

	public override locations = (name: string): Promise<VahrplanResult<ParsedLocation[]>> =>
		this.performRequest(
			() => this.client.locations(name, { results: 10 }),
			(locations) => locations.map(parseStationStopLocation)
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
