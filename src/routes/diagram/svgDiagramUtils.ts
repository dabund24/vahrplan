import type { SubJourneySvgData } from "$lib/server/svgData/svgData.server";

export function svgJourneyToPolylinePoints(
	journey: SubJourneySvgData,
	minTime: number,
	columnIndex: number
): string {
	return journey.blocks.reduce(
		(acc, block) =>
			`${acc} ${formatSvgX(block.end[0], columnIndex)},${formatSvgY(block.end[1], minTime)}`,
		`${formatSvgX(journey.blocks[0].start[0], columnIndex)},${formatSvgY(journey.blocks[0].start[1], minTime)}`
	);
}

export function formatSvgX(x: number, columnIndex: number): number {
	return x + columnIndex;
}

export function formatSvgY(y: number, minTime: number): number {
	return y - minTime;
}
