import type { Line, Location, Station, Stop } from "hafas-client";
import type { LineString } from "geojson";
import type { NumericRange } from "@sveltejs/kit";

export type Fetchable = JourneyNode[] | JourneyBlock[] | ParsedLocation[];

export type ZugResponse<T extends Fetchable> = ZugSuccess<T> | ZugError;

export type ZugSuccess<T extends Fetchable> = {
	isError: false;
	content: T;
};

export type ZugError = {
	isError: true;
	code: NumericRange<400, 599>;
	type: ZugErrorType;
	station1?: number;
	station2?: number;
};

export type ZugErrorType =
	| `HAFAS_${HafasError["code"]}`
	| "NO_CONNECTIONS"
	| "MISSING_PROPERTY"
	| "NOT_FOUND"
	| "ERROR";

// see https://github.com/public-transport/hafas-client/blob/336a9ba115d6a7e6b946349376270907f5c0742c/lib/errors.js
export type HafasError = {
	isHafasError: true;
	code: "ACCESS_DENIED" | "INVALID_REQUEST" | "NOT_FOUND" | "SERVER_ERROR";
	isCausedByServer: boolean;
	hafasCode: string;
};

export type ParsedTime = {
	// for arrival/departure: actual time if realtime data exists, else planned time
	// for stopovers and waits: arrival time
	a: {
		time: string;
		color?: "red" | "green";
		delay?: number;
	};
	// for arrival/departure: planned time if realtime data exists, else undefined
	// for stopovers and waits: departure time
	b?: {
		time: string;
		color?: "red" | "green";
		delay?: number;
	};
};

export type ParsedLocation = {
	name: string;
	requestParameter: string | Station | Stop | Location;
	type: "station" | "address" | "poi";
	longitude: number;
	latitude: number;
};

export type TransitData = {
	location: ParsedLocation;
	attribute?: "cancelled" | "additional";
	time: ParsedTime;
	platform?: string;
	platformChanged: boolean;
};

export type JourneyNode = {
	depth: number;
	idInDepth: number;
	refreshToken: string;
	blocks: JourneyBlock[];
	children: JourneyNode[];
};

export type JourneyBlock = LegBlock | WalkingBlock | TransferBlock | LocationBlock | ErrorBlock;

// has departureTime and arrivalTime
export type JourneyBlockTimeDefined = LegBlock | LocationBlock;

export type JourneyBlockDurationDefined = Exclude<JourneyBlock, JourneyBlockTimeDefined>;

export type LegBlock = {
	type: "leg";
	departureData: TransitData;
	arrivalData: TransitData;
	direction: string;
	line: Line;
	stopovers: TransitData[];
	polyline: LineString;
};

export type WalkingBlock = {
	type: "walk";
	originLocation: ParsedLocation;
	destinationLocation: ParsedLocation;
	transferTime: string;
	walkingTime?: string;
	distance: number;
};

export type TransferBlock = {
	type: "transfer";
	transferTime: string;
};

export type LocationBlock = {
	type: "location";
	time: ParsedTime;
	location: ParsedLocation;
};

export type ErrorBlock = {
	type: "error";
};
