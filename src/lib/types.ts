import type { Location, Station, Stop } from "hafas-client";
import type { Product, Settings } from "$lib/stores/settingStore";

export type KeyedItem<T, K extends number | string> = {
	value: T;
	key: K;
};

// see https://github.com/public-transport/hafas-client/blob/336a9ba115d6a7e6b946349376270907f5c0742c/lib/errors.js
export type HafasErrorCode =
	| "ACCESS_DENIED"
	| "INVALID_REQUEST"
	| "NOT_FOUND"
	| "SERVER_ERROR"
	| "QUOTA_EXCEEDED";

export type TransitType = "arrival" | "departure";

export type TransitAttribute = "cancelled" | "additional" | undefined;

/**
 * each time displayed in this app is either representing departure or arrival.
 * Usually, both are shown vertically next to each other.
 * This type represents such a time pair and can be used universally
 */
export type ParsedTime = Partial<
	Record<
		TransitType,
		{
			time: Date;
			status?: "on-time" | "delayed" | "cancelled";
			delay?: number;
		} | null
	>
>;

export type ParsedLocation =
	| {
			name: string;
			requestParameter: string | Station | Stop | Location;
			readonly type: "station" | "address" | "poi";
			position: { lat: number; lng: number };
	  }
	| ParsedGeolocation;

export type ParsedGeolocation = {
	name: string;
	requestParameter: Location;
	readonly type: "currentLocation";
	asAt: Date;
	position: { lat: number; lng: number };
};

/**
 * This type is used whenever a journey comes in touch with a station.
 * In particular, it is used in [transfer blocks]{@linkcode TransferBlock} and for stopovers in [leg blocks]{@linkcode LegBlock}
 */
export type TransitData = {
	location: ParsedLocation;
	attribute?: TransitAttribute;
	attribute2?: TransitAttribute;
	time: ParsedTime;
	platformData: {
		platform: string;
		platformChanged: boolean;
	} | null;
	platformData2?: {
		platform: string;
		platformChanged: boolean;
	} | null;
};

export type SubJourney = {
	refreshToken: string;
	blocks: JourneyBlock[];
	ticketData?: {
		minPrice?: number;
		currency: string;
		hint?: string;
		url: string;
	};
} & { [K in TransitType as `${K}Time`]: ParsedTime[K] };

export type Diagram = {
	recommendedVias: ParsedLocation[][];
	tree: TreeNode[];
};

export type TreeNode = JourneyNode | EmptyNode;

export type JourneyNode = {
	type: "journeyNode";
	depth: number;
	idInDepth: number;
	subJourney: SubJourney;
	children: TreeNode[];
};

export type EmptyNode = {
	type: "emptyNode";
	children: TreeNode[];
};

export type JourneyBlock =
	| LegBlock
	| WalkingBlock
	| OnwardJourneyBlock
	| TransferBlock
	| LocationBlock
	| ErrorBlock
	| UnselectedBlock;

/**
 * Every block with an even index in a journey is such a block. (*Exception*: unselected journeys!
 * Those consist of one {@linkcode UnselectedBlock})
 *
 * Because users select journeys only based on those blocks, they define the way a journey looks like.
 * Important characteristics:
 * - Selected journeys start and end with a defining block.
 * - Every defining block has a departure time and arrival time
 */
export type DefiningBlock = LegBlock | LocationBlock;

/**
 * Every block with an odd index in a journey is such a block. (*Exception*: unselected journeys! Those consist of one {@linkcode UnselectedBlock})
 *
 * What they look like for a journey depends directly on the preceding and succeeding {@linkcode DefiningBlock}.
 */
export type FillerBlock = Exclude<JourneyBlock, DefiningBlock>;

/**
 * When merging two journeys all possibilities are covered by this type.
 * Check out the function {@linkcode getMergingBlock} in `$lib/merge.ts` for all merging possibilities
 */
export type AdhesiveBlock = LocationBlock | WalkingBlock | TransferBlock | undefined;

export type LegBlock = {
	type: "leg";
	tripId: string;
	blockKey: string;
	attribute?: TransitAttribute;
	duration: number;
	direction: string;
	name: string;
	productName: string;
	product: Product;
	info: {
		statuses: string[];
		hints: string[];
	};
	currentLocation?: ParsedGeolocation;
	stopovers: TransitData[];
	polyline: [number, number][];
	precededBy?: "transfer" | "stopover";
	succeededBy?: "transfer" | "stopover";
} & { [K in TransitType as `${K}Data`]: TransitData };

export type WalkingBlock = {
	type: "walk";
	originLocation: ParsedLocation;
	destinationLocation: ParsedLocation;
	transferTime: number;
	walkingTime?: number;
	distance: number;
};

export type OnwardJourneyBlock = {
	type: "onward-journey";
	originLocation: ParsedLocation;
	destinationLocation: ParsedLocation;
	transferTime: number;
	travelTime?: number;
	recommendedAction?: string;
	distance: number;
};

export type TransferBlock = {
	type: "transfer";
	transferTime: number;
	transitData: TransitData;
	arrivalProduct: Product;
	departureProduct: Product;
	isStopover: boolean;
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

export type PopupData = PopupDataStation | PopupDataLine | PopupDataWalk | PopupDataOnwardJourney;

export type PopupDataWalk = {
	type: "walk";
	duration: number;
	walkingTime?: number;
	distance?: number;
};

export type PopupDataLine = {
	type: "line";
	duration: number;
	direction: string;
	product: Product;
	name: string;
};

export type PopupDataStation = {
	type: "station";
	transitData: TransitData;
	product1?: Product;
	product2?: Product;
};

export type PopupDataOnwardJourney = {
	type: "onward-journey";
	duration: number;
	travelTime?: number;
	recommendedAction?: string;
	distance: number;
};

export type DatabaseEntry<T> = {
	type: DatabaseEntryType;
	key: string;
	value: T;
	expirationDate: number;
};

export type KeylessDatabaseEntry<T> = Omit<DatabaseEntry<T>, "key">;

export type DatabaseEntryType = "journey" | "journeys";

export type DiagramRequestData = {
	stops: (string | Station | Stop | Location)[];
	timeRole: TransitType;
	options: Settings["journeysOptions"];
	time: Date;
};
