import type {
	Fetchable,
	JourneyBlock,
	DefiningBlock,
	LocationBlock,
	ParsedLocation,
	TransitData,
	ZugResponse,
	KeyedItem,
	ParsedGeolocation,
	TransitType,
	ParsedTime,
	KeylessDatabaseEntry
} from "$lib/types";
import { startLoading, stopLoading } from "$lib/stores/loadingStore";

export function isDefined<T>(arg: T | undefined): arg is T {
	return arg !== undefined;
}

export function valueIsDefined<T, K extends number | string>(
	keyedItem: KeyedItem<T | undefined, K>
): keyedItem is KeyedItem<T, K> {
	return keyedItem.value !== undefined;
}

export async function getApiData<T extends Fetchable>(
	url: URL,
	loadingEst: number | undefined
): Promise<ZugResponse<T>> {
	let loadingId: number | undefined = undefined;
	if (loadingEst !== undefined) {
		loadingId = startLoading(loadingEst);
	}

	const result: ZugResponse<T> = await fetch(url)
		.then((res: Response) => res.json() as Promise<ZugResponse<T>>)
		.catch(() => {
			return {
				isError: true,
				type: "ERROR",
				code: 400,
				station1: undefined,
				station2: undefined
			};
		});

	if (loadingId !== undefined) {
		stopLoading(loadingId, result.isError);
	}
	return result;
}

/**
 * perform a put request to an api endpoint
 * @param url url of the endpoint
 * @param body data to be stored
 * @param loadingEst estimated client waiting time in seconds
 */
export async function putApiData<R, T>(
	url: URL,
	body: KeylessDatabaseEntry<R>,
	loadingEst: number | undefined
): Promise<ZugResponse<T>> {
	let loadingId: number | undefined = undefined;
	if (loadingEst !== undefined) {
		loadingId = startLoading(loadingEst);
	}

	const stringifiedBody = JSON.stringify(body);
	const result: ZugResponse<T> = await fetch(url, { method: "PUT", body: stringifiedBody })
		.then((res: Response) => res.json() as Promise<ZugResponse<T>>)
		.catch(() => {
			return {
				isError: true,
				type: "ERROR",
				code: 400,
				station1: undefined,
				station2: undefined
			};
		});

	if (loadingId !== undefined) {
		stopLoading(loadingId, result.isError);
	}
	return result;
}

export function isTimeDefined(block: JourneyBlock): block is DefiningBlock {
	return block.type === "leg" || block.type === "location";
}

export function getFirstAndLastTime(blocks: JourneyBlock[]): { [K in TransitType]: ParsedTime } {
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

export function timeToString(time: Date | undefined): string {
	if (time === undefined || time === null) {
		return "−−:−−";
	}
	const date = new Date(time);
	return date.toLocaleTimeString("de-DE", {
		hour: "2-digit",
		minute: "2-digit"
	});
}

export function dateToInputDate(dateObject: Date): string {
	const timezoneOffset = dateObject.getTimezoneOffset() * 60000;
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
	return differenceMilliseconds / 60000;
}

/**
 * gives a human-readable relative string for a given date from the past relative to now
 * stolen from https://stackoverflow.com/a/53800501
 * @param date the old date
 */
function relativeDate(date: Date): string {
	const diff = Math.round(new Date(date).getTime() - new Date().getTime());
	const units = {
		year: 24 * 60 * 60 * 1000 * 365,
		month: (24 * 60 * 60 * 1000 * 365) / 12,
		day: 24 * 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		minute: 60 * 1000
	};
	const rtf = new Intl.RelativeTimeFormat("de", { numeric: "auto" });

	let u: keyof typeof units;
	for (u in units)
		if (Math.abs(diff) > units[u]) {
			return rtf.format(Math.round(diff / units[u]), u);
		}
	return "";
}

export function getGeolocationString(creationDate: Date, prefix = "Standort"): string {
	return `${prefix} ${relativeDate(creationDate)}`;
}

export function getParsedGeolocation(
	date: Date,
	position: ParsedLocation["position"]
): ParsedGeolocation {
	return {
		type: "currentLocation",
		name: "Standort",
		requestParameter: {
			type: "location",
			address: "Standort",
			latitude: position.lat,
			longitude: position.lng
		},
		position: position,
		asAt: date
	};
}

export async function getCurrentGeolocation(): Promise<ParsedGeolocation> {
	const loadingId = startLoading(5);
	return new Promise<ParsedGeolocation>((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const currentLocation: ParsedLocation = getParsedGeolocation(
					new Date(position.timestamp),
					{
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				);
				stopLoading(loadingId, false);
				resolve(currentLocation);
			},
			() => {
				stopLoading(loadingId, true);
				throw new Error();
			}
		);
	});
}
