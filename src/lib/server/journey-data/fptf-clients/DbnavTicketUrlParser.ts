import { TicketUrlParser } from "$lib/server/journey-data/TicketUrlParser";
import type { SubJourney } from "$lib/types";
import { getBlockEnd, getBlockStart } from "$lib/util";

export class DbnavTicketUrlParser extends TicketUrlParser {
	/**
	 * stolen from https://gitlab.com/bahnvorhersage/bahnvorhersage_frontend/-/blob/f096b13ef52e63afc264db03c6accfa38158401d/src/components/JourneyDisplay/BuyTicketButton.vue
	 * @param subJourneyData
	 */
	public override readonly generateTicketUrl = (
		subJourneyData: Pick<
			SubJourney,
			"refreshToken" | "departureTime" | "arrivalTime" | "blocks"
		>,
	): string => {
		const { blocks, departureTime, refreshToken } = subJourneyData;
		const startName = getBlockStart(blocks.at(0))?.name ?? "";
		const endName = getBlockEnd(blocks.at(-1))?.name ?? "";
		const ticketUrl = new URL("https://www.bahn.de/buchung/start#sts=true");
		ticketUrl.searchParams.set("so", startName);
		ticketUrl.searchParams.set("zo", endName);
		ticketUrl.searchParams.set("soid", `O=${startName}`);
		ticketUrl.searchParams.set("zoid", `O=${endName}`);
		ticketUrl.searchParams.set("cbs", "true");
		ticketUrl.searchParams.set("hd", departureTime?.time ?? "");
		ticketUrl.searchParams.set("gh", refreshToken);
		return ticketUrl.href;
	};
}
