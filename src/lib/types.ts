import type { JourneysOptions, Line, Location, Station, Stop } from "hafas-client";
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
	a?: {
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
	position: { lat: number; lng: number };
};

export type TransitData = {
	location: ParsedLocation;
	attribute?: "cancelled" | "additional";
	attribute2?: "cancelled" | "additional";
	time: ParsedTime;
	platform?: string;
	platform2?: string;
	platformChanged: boolean;
	platform2Changed?: boolean;
};

export type JourneyNode = {
	depth: number;
	idInDepth: number;
	refreshToken: string;
	blocks: JourneyBlock[];
	children: JourneyNode[];
};

export type JourneyBlock =
	| LegBlock
	| WalkingBlock
	| TransferBlock
	| LocationBlock
	| ErrorBlock
	| UnselectedBlock;

// has departureTime and arrivalTime
export type DefiningBlock = LegBlock | LocationBlock;

export type FillerBlock = Exclude<JourneyBlock, DefiningBlock>;

export type AdhesiveBlock = LocationBlock | WalkingBlock | TransferBlock | undefined;

export type LegBlock = {
	type: "leg";
	tripId: string;
	departureData: TransitData;
	arrivalData: TransitData;
	duration: string;
	direction: string;
	line: Line;
	stopovers: TransitData[];
	polyline: LineString;
	precededByTransferBlock: boolean;
	succeededByTransferBlock: boolean;
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
	transitData: TransitData;
	arrivalProduct: string;
	departureProduct: string;
};

export type LocationBlock = {
	type: "location";
	time: ParsedTime;
	location: ParsedLocation;
	hidden: boolean;
};

export type ErrorBlock = {
	type: "error";
};

export type UnselectedBlock = {
	type: "unselected";
};

export type PopupData = PopupDataStation | PopupDataLine | PopupDataWalk;

export type PopupDataWalk = {
	type: "walk";
	duration: string;
	walkingTime: string;
	distance: number;
};

export type PopupDataLine = {
	type: "line";
	duration: string;
	direction: string;
	line: Line;
};

export type PopupDataStation = {
	type: "station";
	transitData: TransitData;
	product1?: string;
	product2?: string;
};

export const products = {
	nationalExpress: "Intercity-Express",
	national: "Intercity/Eurocity",
	regionalExpress: "sonst. Fernzug",
	regional: "Regionalexpress/-bahn",
	suburban: "S-Bahn",
	subway: "U-Bahn",
	tram: "Straßenbahn",
	bus: "Bus",
	ferry: "Fähre",
	taxi: "Ruftaxi"
} as const;
export type Product = keyof typeof products;

/**
 * fie
 */
export type JourneysSettings = JourneysOptions & {
	accessibility: "none" | "partial" | "complete";
	bike: boolean;
	products: {
		[product in Product]: boolean;
	};
	transfers: -1 | 0 | 1 | 2 | 3 | 4 | 5;
	transferTime: number;
};
