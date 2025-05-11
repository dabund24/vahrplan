import type { SvgData } from "$lib/server/svgData/svgData.server";
import { HOUR_IN_MINUTES } from "$lib/constants";

export function computeTimeMarksData(
	minTime: number,
	minutesPerHeight: number
): SvgData["timeMarksData"] {
	const timeMarkInterval = computeTimeMarkInterval(minutesPerHeight);
	const firstTimeMark = computeFirstTimeMark(minTime, timeMarkInterval);

	return { firstTimeMark, timeMarkInterval };
}

const timeMarkIntervals = [
	12 * HOUR_IN_MINUTES,
	8 * HOUR_IN_MINUTES,
	6 * HOUR_IN_MINUTES,
	3 * HOUR_IN_MINUTES,
	2 * HOUR_IN_MINUTES,
	HOUR_IN_MINUTES,
	0.5 * HOUR_IN_MINUTES,
	20,
	15,
	10,
	5,
	2,
	1
];

function computeTimeMarkInterval(minutesPerHeight: number): number {
	const minTickCountPerHeight = 5;

	for (const timeMarkInterval of timeMarkIntervals) {
		if (minutesPerHeight > minTickCountPerHeight * timeMarkInterval) {
			return timeMarkInterval;
		}
	}
	return 1;
}

function computeFirstTimeMark(minTime: number, timeMarkInterval: number): number {
	const roundedDate = new Date(Math.ceil(minTime / timeMarkInterval) * 60000 * timeMarkInterval);

	let firstTimeMark = roundedDate.getTime() / 60000;

	if (timeMarkInterval < 2 * HOUR_IN_MINUTES) {
		// do not fix time zone
		return firstTimeMark;
	}

	const tzOffset = roundedDate.getTimezoneOffset();
	firstTimeMark += tzOffset;
	while (firstTimeMark < minTime) {
		if (tzOffset > 0) {
			firstTimeMark -= timeMarkInterval;
		} else {
			firstTimeMark += timeMarkInterval;
		}
	}

	return firstTimeMark;
}
