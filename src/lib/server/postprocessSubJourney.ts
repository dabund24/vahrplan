import type { SubJourney } from "$lib/types";

export function postprocessSubJourney(
	subJourney: SubJourney,
	{ isFirst, isLast }: { isFirst: boolean; isLast: boolean },
): SubJourney {
	const firstBlock = subJourney.blocks.at(0);
	const lastBlock = subJourney.blocks.at(-1);
	if (!isFirst && firstBlock?.type === "location" && firstBlock.location.type === "station") {
		subJourney.blocks = subJourney.blocks.slice(2);
		const newFirstBlock = subJourney.blocks.at(0);
		if (newFirstBlock?.type === "leg") {
			subJourney.departureTime =
				newFirstBlock.departureData.time.departure ?? subJourney.departureTime;
		}
	}
	if (!isLast && lastBlock?.type === "location" && lastBlock.location.type === "station") {
		subJourney.blocks = subJourney.blocks.slice(0, -2);
		const newLastBlock = subJourney.blocks.at(-1);
		if (newLastBlock?.type === "leg") {
			subJourney.arrivalTime =
				newLastBlock.arrivalData.time.arrival ?? subJourney.arrivalTime;
		}
	}
	return subJourney;
}
