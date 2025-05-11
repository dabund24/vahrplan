import {
	JourneyDataService,
	type JourneyNodesWithRefs
} from "$lib/server/journey-data/JourneyDataService";
import {
	type HafasClient,
	type Journeys,
	type JourneyWithRealtimeData,
	type Location,
	type Station,
	type Stop
} from "hafas-client";
import { RateLimiter } from "$lib/server/RateLimiter";
import type { JourneysOptions, ParsedLocation, SubJourney, TimeData } from "$lib/types";
import {
	parseStationStopLocation,
	parseSubJourney
} from "$lib/server/journey-data/hafas-client/parse/parse";
import { type VahrplanResult, VahrplanSuccess } from "$lib/VahrplanResult";
import { VahrplanError } from "$lib/VahrplanError";
import { formatOptions, formatStop } from "$lib/server/journey-data/hafas-client/formatOptions";

// see https://github.com/public-transport/hafas-client/blob/336a9ba115d6a7e6b946349376270907f5c0742c/lib/errors.js
export type HafasError = Error & {
	isHafasError: true;
	code: "ACCESS_DENIED" | "INVALID_REQUEST" | "NOT_FOUND" | "SERVER_ERROR" | "QUOTA_EXCEEDED";
	isCausedByServer: boolean;
	hafasCode: string;
	hafasDescription: string;
};

export class HafasClientDataService extends JourneyDataService {
	client: HafasClient;

	/**
	 * Create a JourneyDataService from a HafasClient
	 * @param client hafas-client
	 */
	constructor(client: HafasClient) {
		super();

		const rateLimiterIntervalSeconds = 60;
		const rateLimiterAccessThreshold = 200;
		const hafasGlobalRateLimiter = new RateLimiter(
			rateLimiterIntervalSeconds,
			rateLimiterAccessThreshold
		);

		// wrap hafas client with rate limiter
		const hafasClientHandler: ProxyHandler<HafasClient> = {
			get(target: HafasClient, prop: keyof HafasClient): HafasClient[keyof HafasClient] {
				const result = hafasGlobalRateLimiter.accessResource("global", () => target[prop]);
				if (result.isError) {
					// Pretend as if hafas client threw an error
					return async () =>
						Promise.resolve(HafasClientDataService.throwHafasQuotaError());
				}
				return result.content;
			}
		};

		this.client = new Proxy(client, hafasClientHandler);
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

	async journeys(
		{ from, to }: Parameters<JourneyDataService["journeys"]>[0],
		timeData: TimeData,
		options: JourneysOptions
	): Promise<VahrplanResult<JourneyNodesWithRefs>> {
		return this.performRequest(
			() =>
				this.client.journeys(
					formatStop(from),
					formatStop(to),
					formatOptions(timeData, options)
				),
			this.parseJourneysResponseCallback
		);
	}

	async refresh(tokens: string[]): Promise<VahrplanResult<SubJourney[]>> {
		return this.performRequest(
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
	}

	async location(
		token: ParsedLocation["id"]
	): Promise<VahrplanResult<ParsedLocation>> {
		if (token.startsWith("{")) {
			// token is location object
			return Promise.resolve(
				new VahrplanSuccess(
					parseStationStopLocation(JSON.parse(token) as Station | Stop | Location)
				)
			);
		}

		return this.performRequest(() => this.client.stop(token, {}), parseStationStopLocation);
	}

	async locations(name: string): Promise<VahrplanResult<ParsedLocation[]>> {
		return this.performRequest(
			() => this.client.locations(name, { results: 10 }),
			(locations) => locations.map(parseStationStopLocation)
		);
	}

	parseError(err: unknown): VahrplanError {
		let errorType: VahrplanError["type"] = "ERROR";
		let message = "Hafas: Server-Fehler. Die Anfrage ist möglicherweise ungültig.";
		if (HafasClientDataService.isHafasError(err)) {
			if (err.code === "QUOTA_EXCEEDED") {
				// handle this in a special way since this error is not thrown by hafas/hafas-client!!!
				return new VahrplanError("QUOTA_EXCEEDED");
			}
			message = `Hafas: ${err.hafasDescription ?? "Hafas-Fehler"}`;
			errorType = `HAFAS_${err.code ?? "SERVER_ERROR"}`;
		}
		return VahrplanError.withMessage(errorType, message);
	}

	/**
	 * Checks if a given error is an instance of HafasError
	 * @param error
	 * @private
	 */
	private static isHafasError(error: unknown): error is HafasError {
		return (
			typeof error === "object" &&
			error !== null &&
			"isHafasError" in error &&
			error.isHafasError === true
		);
	}

	/**
	 * always throws an error indicating error 429
	 * @throws HafasError
	 * @private
	 */
	private static throwHafasQuotaError(): never {
		throw {
			isHafasError: true,
			code: "QUOTA_EXCEEDED",
			isCausedByServer: true,
			hafasCode: "",
			hafasDescription: ""
		} as HafasError;
	}
}
