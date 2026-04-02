import { TicketUrlParser } from "$lib/server/journey-data/TicketUrlParser";
import type { SubJourney } from "$lib/types";
import { getBlockEnd, getBlockStart } from "$lib/util";

export class OebbTicketUrlParser extends TicketUrlParser {
	public override readonly generateTicketUrl = (
		subJourneyData: Pick<SubJourney, "departureTime" | "arrivalTime" | "blocks">,
	): string => {
		const { blocks, departureTime } = subJourneyData;
		const startId = getBlockStart(blocks.at(0))?.id ?? "";
		const endId = getBlockEnd(blocks.at(-1))?.id ?? "";

		const ticketUrl = new URL("https://shop.oebbtickets.at/de/ticket");
		ticketUrl.searchParams.set("outwardDateTime", departureTime?.time ?? "");
		ticketUrl.searchParams.set("stationOrigEva", startId);
		ticketUrl.searchParams.set("stationDestEva", endId);

		return ticketUrl.href;
	};
}
