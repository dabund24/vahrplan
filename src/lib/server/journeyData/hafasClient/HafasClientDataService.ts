import type {
	JourneyDataService,
	JourneyNodesWithRefs
} from "$lib/server/journeyData/JourneyDataService";
import {
	createClient as createHafasClient,
	type HafasClient,
	type Journey,
	type JourneysOptions,
	type JourneyWithRealtimeData
} from "hafas-client";
import { profile as dbProfile } from "hafas-client/p/db";
import { RateLimiter } from "$lib/server/RateLimiter";
import {
	getSuccessResponse,
	getZugErrorFromHafasError,
	throwHafasQuotaError
} from "$lib/server/responses";
import type { LegBlock, ParsedLocation, SubJourney, ZugResponse } from "$lib/types";
import { version } from "$app/environment";
import {
	journeyToBlocks,
	parseStationStopLocation
} from "$lib/server/journeyData/hafasClient/parse/parse";
import { getFirstAndLastTime } from "$lib/util";

export class HafasClientDataService implements JourneyDataService {
	client: HafasClient;

	constructor() {
		const userAgent = `https://vahrplan.de ${version}`;

		const hafasClientRaw = createHafasClient(dbProfile, userAgent);

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
					return async () => Promise.resolve(throwHafasQuotaError());
				}
				return result.content;
			}
		};

		this.client = new Proxy(hafasClientRaw, hafasClientHandler);
	}

	async journeys(
		from: ParsedLocation["requestParameter"],
		to: ParsedLocation["requestParameter"],
		options: JourneysOptions
	): Promise<JourneyNodesWithRefs> {
		options.tickets = true;
		const hafasJourneys = await this.client.journeys(from, to, options);

		const fetchedJourneys = // convert to vahrplan format
			hafasJourneys.journeys?.map((journey) =>
				HafasClientDataService.hafasJourneyToSubJourney(journey)
			) ?? [];

		return {
			journeys: fetchedJourneys,
			earlierRef: hafasJourneys.earlierRef ?? "",
			laterRef: hafasJourneys.laterRef ?? ""
		};
	}

	async refresh(tokens: string[]): Promise<ZugResponse<SubJourney[]>> {
		try {
			const hafasJourneys = await Promise.all(
				tokens.map(
					async (token): Promise<JourneyWithRealtimeData> =>
						this.client.refreshJourney?.(token, {
							stopovers: true,
							language: "de",
							polylines: true
						}) ?? { journey: { type: "journey", legs: [] } }
				)
			);
			const blocks = hafasJourneys.map((journeys) =>
				HafasClientDataService.hafasJourneyToSubJourney(journeys.journey)
			);
			return getSuccessResponse(HafasClientDataService.setMergingProperties(blocks));
		} catch (e) {
			return getZugErrorFromHafasError(e);
		}
	}

	private static hafasJourneyToSubJourney(journey: Journey): SubJourney {
		const blocks = journeyToBlocks(journey);
		const { arrival, departure } = getFirstAndLastTime(blocks);
		const result: SubJourney = {
			refreshToken: journey.refreshToken ?? "",
			blocks,
			arrivalTime: arrival.arrival ?? { time: new Date(0) },
			departureTime: departure.departure ?? { time: new Date(0) }
		};
		if (journey.price === undefined) {
			return result;
		}

		result.ticketData = {
			minPrice: journey.price.amount,
			currency: journey.price.currency,
			hint: journey.price.hint ?? "",
			url: ""
		};
		return result;
	}

	/**
	 * sets `precededBy` and `succeededBy` properties of sub-journeys
	 * @param subJourneys the sub-journeys to modify
	 * @private
	 */
	private static setMergingProperties(subJourneys: SubJourney[]): SubJourney[] {
		for (let i = 1; i < subJourneys.length; i++) {
			const arrivingSubJourneyBlock = subJourneys[i - 1].blocks.at(-1);
			const departungSubJourneyBlock = subJourneys[i].blocks.at(0);
			if (
				arrivingSubJourneyBlock?.type !== "leg" ||
				departungSubJourneyBlock?.type !== "leg"
			) {
				// do nothing
			} else if (arrivingSubJourneyBlock.blockKey === departungSubJourneyBlock.blockKey) {
				arrivingSubJourneyBlock.succeededBy = "stopover";
				departungSubJourneyBlock.precededBy = "stopover";
			} else if (
				HafasClientDataService.legsHaveSameLocations(
					arrivingSubJourneyBlock,
					departungSubJourneyBlock
				)
			) {
				arrivingSubJourneyBlock.succeededBy = "transfer";
				departungSubJourneyBlock.precededBy = "transfer";
			}
		}
		return subJourneys;
	}

	/**
	 * returns whether the destination and origin of two legs are the same
	 * @param arrivingLeg the leg with the destination to check
	 * @param departingLeg the leg with the origin to check
	 * @private
	 */
	private static legsHaveSameLocations(arrivingLeg: LegBlock, departingLeg: LegBlock): boolean {
		return (
			arrivingLeg.arrivalData.location.position.lng ===
				departingLeg.departureData.location.position.lng &&
			arrivingLeg.arrivalData.location.position.lat ===
				departingLeg.departureData.location.position.lat
		);
	}

	async location(
		token: ParsedLocation["requestParameter"]
	): Promise<ZugResponse<ParsedLocation>> {
		if (typeof token !== "string") {
			// token is location object
			return Promise.resolve(getSuccessResponse(parseStationStopLocation(token)));
		}
		return this.client
			.stop(token, {})
			.then((location) => getSuccessResponse(parseStationStopLocation(location)))
			.catch(getZugErrorFromHafasError);
	}

	async locations(name: string): Promise<ZugResponse<ParsedLocation[]>> {
		try {
			const locations = await this.client.locations(name, { results: 10 });
			return getSuccessResponse(locations.map(parseStationStopLocation));
		} catch (error) {
			return getZugErrorFromHafasError(error);
		}
	}
}
