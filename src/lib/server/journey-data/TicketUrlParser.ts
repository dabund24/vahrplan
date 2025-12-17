import type { SubJourney } from "$lib/types";

export abstract class TicketUrlParser {
	/**
	 * generate a ticket url from a sub journey object
	 */
	public abstract readonly generateTicketUrl: (
		subJourneyData: Pick<
			SubJourney,
			"refreshToken" | "departureTime" | "arrivalTime" | "blocks"
		>,
	) => string;
}
