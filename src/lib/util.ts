import type {
	Fetchable,
	JourneyBlock,
	DefiningBlock,
	LocationBlock,
	ParsedLocation,
	TransitData,
	ZugResponse,
	KeyedItem,
	TransitType,
	ParsedTime,
	KeylessDatabaseEntry
} from "$lib/types";
import { startLoading, stopLoading } from "$lib/stores/loadingStore";
import { toast } from "$lib/stores/toastStore";

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
	if (window.umami !== undefined) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
		void window.umami.track((props) => ({ ...props, url: `GET ${url.pathname}` }));
	}

	const result: ZugResponse<T> = await fetch(url)
		.then((res: Response) => res.json() as Promise<ZugResponse<T>>)
		.catch(() => {
			return {
				isError: true,
				type: "ERROR",
				code: 400,
				station1: undefined,
				station2: undefined,
				description: "Verbindung zum Server fehlgeschlagen."
			};
		});
	if (loadingId !== undefined) {
		stopLoading(loadingId, result.isError);
	}
	if (result.isError) {
		toast(result.description, "red");
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
	if (window.umami !== undefined) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
		void window.umami.track((props) => ({ ...props, url: `PUT ${url.pathname}` }));
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
				station2: undefined,
				description: "Verbindung zum Server fehlgeschlagen."
			};
		});

	if (loadingId !== undefined) {
		stopLoading(loadingId, result.isError);
	}
	if (result.isError) {
		toast(result.description, "red");
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

export function dateToString(date: Date | undefined): string {
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
