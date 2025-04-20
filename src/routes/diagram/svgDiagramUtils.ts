import type {
	BlockSvgData,
	SubJourneySvgData,
	SvgPosition
} from "$lib/server/svgData/svgData.server";

export function svgJourneyToPolylinePoints(
	journey: SubJourneySvgData,
	minTime: number,
	columnIndex: number
): string {
	const journeyStartPoint = formatSvgPoint(journey.blocks[0].start, columnIndex, minTime);
	return journey.blocks.reduce((acc, block) => {
		const stopoverString = svgStopoversToPolylinePoints(block, columnIndex, minTime);
		const blockEndPoint = formatSvgPoint(block.end, columnIndex, minTime);
		return `${acc} ${stopoverString} ${blockEndPoint}`;
	}, journeyStartPoint);
}

export function svgBlockToPolylinePoints(
	block: BlockSvgData,
	columnIndex: number,
	minTime: number
): string {
	const blockStartPoint = formatSvgPoint(block.start, columnIndex, minTime);
	const stopoverString = svgStopoversToPolylinePoints(block, columnIndex, minTime);
	const blockEndPoint = formatSvgPoint(block.end, columnIndex, minTime);
	return `${blockStartPoint} ${stopoverString} ${blockEndPoint}`;
}

function svgStopoversToPolylinePoints(
	block: BlockSvgData,
	columnIndex: number,
	minTime: number
): string {
	if (block.type !== "leg") {
		return "";
	}

	return block.transferableStopovers.reduce((acc, stopoverData) => {
		const startPoint = formatSvgPoint(stopoverData.start, columnIndex, minTime);
		const endPoint = formatSvgPoint(stopoverData.end, columnIndex, minTime);
		return `${acc} ${startPoint} ${endPoint}`;
	}, "");
}

export function formatSvgPoint([x, y]: SvgPosition, columnIndex: number, minTime: number): string {
	return `${x + columnIndex},${y - minTime}`;
}
