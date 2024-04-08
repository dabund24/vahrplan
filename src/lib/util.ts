import type {
	Fetchable,
	JourneyBlock,
	DefiningBlock,
	LocationBlock,
	ParsedLocation,
	TransitData,
	ZugResponse,
	KeyedItem
} from "$lib/types";
import { get } from "svelte/store";
import { journeysOptions } from "$lib/settings";

export function isDefined<T>(arg: T | undefined): arg is T {
	return arg !== undefined;
}

export function valueIsDefined<T, K extends number | string>(
	keyedItem: KeyedItem<T | undefined, K>
): keyedItem is KeyedItem<T, K> {
	return keyedItem.value !== undefined;
}

export async function getApiData<T extends Fetchable>(url: URL): Promise<ZugResponse<T>> {
	return fetch(url).then((res) => res.json() as Promise<ZugResponse<T>>);
}

export function getTreeUrl(locations: ParsedLocation[]): URL {
	const url = new URL("/api/journeys", location.origin);
	url.searchParams.set(
		"stops",
		JSON.stringify(locations.map((location) => location.requestParameter))
	);
	url.searchParams.set("options", JSON.stringify(get(journeysOptions)));
	return url;
}

export function isTimeDefined(block: JourneyBlock): block is DefiningBlock {
	return block.type === "leg" || block.type === "location";
}

export function mergeTransitData(
	transitData1: TransitData,
	transitData2: TransitData
): TransitData {
	return {
		location: transitData1.location,
		time: {
			arrival: transitData1.time.arrival,
			departure: transitData2.time.departure
		},
		attribute: transitData1.attribute,
		attribute2: transitData2.attribute,
		platform: transitData1.platform,
		platformChanged: transitData1.platformChanged,
		platform2: transitData2.platform,
		platform2Changed: transitData2.platform2Changed
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

export function timeToString(time: string | Date | number | undefined): string {
	if (time === undefined || time === null || time === "") {
		return "";
	}
	const date = new Date(time);
	return date.toLocaleTimeString("de-DE", {
		hour: "2-digit",
		minute: "2-digit"
	});
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
): number {
	if (sooner === undefined || later === undefined) {
		return 0;
	}
	const dateA = new Date(sooner).getTime();
	const dateB = new Date(later).getTime();
	const differenceMilliseconds = dateB - dateA;
	/*const difference = {
		minutes: (differenceMilliseconds / 60000) % 60,
		hours: Math.floor(differenceMilliseconds / 3600000)
	};
	if (difference.hours < 0) {
		difference.hours++;
	}
	return difference;
	 */
	return differenceMilliseconds / 60000;
}

export function dateDifferenceString(
	sooner: string | number | Date | undefined,
	later: string | number | Date | undefined
): string {
	if (sooner === undefined || later === undefined) {
		return "n/a";
	}
	const difference = dateDifference(sooner, later);
	if (difference.hours === 0) {
		return `${difference.minutes}min`;
	} else {
		return `${difference.hours}h ${difference.minutes < 0 ? -difference.minutes : difference.minutes}min`;
	}
}
