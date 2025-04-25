import type {
	BlockSvgData,
	SubJourneySvgData,
	SvgData,
	SvgPosition
} from "$lib/server/svgData/svgData.server";
import { timeToString } from "$lib/util";
import { MINUTE_IN_MS } from "$lib/constants";

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
	return `${(x + columnIndex).toFixed(3)},${y - minTime}`;
}

export type TimeMark = {
	content: string;
	yCoordinate: number;
	topInsetPercent: number;
};

export function* timeMarkIt(
	timeMarksData: SvgData["timeMarksData"],
	minTime: number,
	maxTime: number
): Generator<TimeMark> {
	for (
		let t = timeMarksData.firstTimeMark + timeMarksData.timeMarkInterval;
		t < maxTime;
		t += timeMarksData.timeMarkInterval
	) {
		yield formatTimeMark(t, minTime, maxTime);
	}

	for (let t = timeMarksData.firstTimeMark; t >= minTime; t -= timeMarksData.timeMarkInterval) {
		yield formatTimeMark(t, minTime, maxTime);
	}
}

function formatTimeMark(t: number, minTime: number, maxTime: number): TimeMark {
	const content = timeToString(t * MINUTE_IN_MS);
	const yCoordinate = t - minTime;
	const yRange = maxTime - minTime;
	const topInsetPercent = (100 * yCoordinate) / yRange;
	return { content, yCoordinate, topInsetPercent };
}
