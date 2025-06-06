import type {
	JourneyBlock,
	DefiningBlock,
	LocationBlock,
	ParsedLocation,
	TransitData,
	KeyedItem,
	TransitType,
	ParsedTime
} from "$lib/types";
import { MINUTE_IN_MS } from "$lib/constants";

export function isDefined<T>(arg: T | undefined): arg is T {
	return arg !== undefined;
}

export function valueIsDefined<T, K extends number | string>(
	keyedItem: KeyedItem<T | undefined, K>
): keyedItem is KeyedItem<T, K> {
	return keyedItem.value !== undefined;
}

export function isTimeDefined(block: JourneyBlock): block is DefiningBlock {
	return block.type === "leg" || block.type === "location";
}

export function getFirstAndLastTime(blocks: JourneyBlock[]): Record<TransitType, ParsedTime> {
	const departureBlock = blocks.find<DefiningBlock>(isTimeDefined);
	const arrivalBlock = blocks.findLast<DefiningBlock>(isTimeDefined);
	return {
		departure: getTimeFromBlock(departureBlock, "departure"),
		arrival: getTimeFromBlock(arrivalBlock, "arrival")
	};
}

function getTimeFromBlock(block: DefiningBlock | undefined, type: TransitType): ParsedTime {
	if (block?.type === "leg") {
		return block[`${type}Data`].time;
	} else {
		return { [type]: block?.time[type] };
	}
}

/**
 * returns the start location of a block or `undefined` if it cannot be determined
 * @param block
 */
export function getBlockStart(block: JourneyBlock | undefined): ParsedLocation | undefined {
	switch (block?.type) {
		case "location":
			return block.location;
		case "transfer":
			return block.transitData.location;
		case "onward-journey":
		case "walk":
			return block.originLocation;
		case "leg":
			return block.departureData.location;
	}
}

/**
 * returns the end location of a block or `undefined` if it cannot be determined
 * @param block
 */
export function getBlockEnd(block: JourneyBlock | undefined): ParsedLocation | undefined {
	switch (block?.type) {
		case "location":
			return block.location;
		case "transfer":
			return block.transitData.location;
		case "onward-journey":
		case "walk":
			return block.destinationLocation;
		case "leg":
			return block.arrivalData.location;
	}
}

export function mergeTransitData(
	transitData1: TransitData,
	transitData2: TransitData,
	singlePlatform?: boolean
): TransitData {
	return {
		location: transitData1.location,
		time: {
			arrival: transitData1.time.arrival,
			departure: transitData2.time.departure
		},
		attribute: transitData1.attribute,
		attribute2: transitData2.attribute,
		platformData: transitData1.platformData,
		platformData2: singlePlatform ? undefined : transitData2.platformData
	};
}

export function getRawLocationBlock(location: ParsedLocation): LocationBlock {
	return {
		type: "location",
		location,
		time: {},
		hidden: false
	};
}

export function timeToString(time: string | number | undefined): string {
	if (time === undefined || time === null) {
		return "−−:−−";
	}
	const date = new Date(time);
	return date.toLocaleTimeString("de-DE", {
		hour: "2-digit",
		minute: "2-digit"
	});
}

export function dateToString(date: string | undefined): string {
	if (date === undefined) {
		return "";
	}
	return new Date(date).toLocaleDateString("de-DE", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}

export function dateToInputDate(date: string): string {
	const dateObject = new Date(date);
	const timezoneOffset = dateObject.getTimezoneOffset() * MINUTE_IN_MS;
	const timeIsoString = new Date(dateObject.getTime() - timezoneOffset).toISOString();
	return timeIsoString.substring(0, timeIsoString.indexOf("T") + 6);
}

/**
 * subtract a date from another
 * @param sooner the first date
 * @param later the second date
 * @returns the difference in minutes
 */
export function dateDifference(
	sooner: string | number | Date | undefined,
	later: string | number | Date | undefined
): number | undefined {
	if (sooner === undefined || later === undefined) {
		return undefined;
	}
	const dateA = new Date(sooner).getTime();
	const dateB = new Date(later).getTime();
	const differenceMilliseconds = dateB - dateA;
	return differenceMilliseconds / MINUTE_IN_MS;
}
