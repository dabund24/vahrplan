import type {
	JourneyBlock,
	LegBlock,
	LocationBlock,
	OnwardJourneyBlock,
	ParsedGeolocation,
	ParsedLocation,
	ParsedTime,
	Product,
	SubJourney,
	TransitAttribute,
	TransitData,
	WalkingBlock
} from "$lib/types";
import type {
	JourneyDataService,
	JourneyDataServiceConfig
} from "$lib/server/journey-data/JourneyDataService";
import type { UnpackedVahrplanResult } from "$lib/VahrplanResult";

export abstract class JourneyDataResponseParser<ProductT extends Product> {
	protected readonly productMapping: Record<string, ProductT>;

	protected constructor(
		config: Pick<JourneyDataServiceConfig<ProductT, never>, "productMapping">
	) {
		this.productMapping = this.invertProductMapping(config.productMapping);
	}

	/**
	 * parse responses for all endpoints
	 * @protected
	 */
	public abstract readonly parseResponse: {
		[K in keyof JourneyDataService<ProductT, never>]: (
			...params: never[]
		) => UnpackedVahrplanResult<Awaited<ReturnType<JourneyDataService<ProductT, never>[K]>>>;
	};

	/***********************/
	/* Auxiliary Functions */
	/***********************/

	protected abstract readonly parseSubJourney: (...params: never[]) => SubJourney;

	protected abstract readonly parseJourneyBlocks: (...params: never[]) => JourneyBlock[];

	protected abstract readonly parseLegBlock: (...params: never[]) => LegBlock;

	protected abstract readonly parseLegCurrentLocation: (
		...params: never[]
	) => ParsedGeolocation | undefined;

	protected abstract readonly parseLocationBlock: (...params: never[]) => LocationBlock;

	protected abstract readonly parseWalkingBlock: (...params: never[]) => WalkingBlock;

	protected abstract readonly parseOnwardJourneyBlock: (...params: never[]) => OnwardJourneyBlock;

	protected abstract readonly parseStationStopLocation: (...params: never[]) => ParsedLocation;

	protected abstract readonly parseStopover: (...params: never[]) => TransitData;

	protected abstract readonly parseSingleTime: (...params: never[]) => ParsedTime;

	protected abstract readonly parseTimePair: (...params: never[]) => ParsedTime;

	protected abstract readonly parsePlatformData: (
		...params: never[]
	) => TransitData["platformData"];

	protected abstract readonly parseTransitAttribute: (...params: never[]) => TransitAttribute;

	protected abstract readonly parseLegInfo: (...params: never[]) => LegBlock["info"];

	protected abstract readonly parseLoadFactor: (...params: never[]) => LegBlock["loadFactor"];

	protected abstract readonly parseCycle: (...params: never[]) => LegBlock["cycle"];

	protected readonly parseProduct = (upstreamProduct: string | undefined): Product =>
		upstreamProduct !== undefined && upstreamProduct in this.productMapping
			? this.productMapping[upstreamProduct]
			: "longDistanceExpress";

	private readonly invertProductMapping = (
		invertedProductMapping: Record<ProductT, string>
	): Record<string, ProductT> => {
		const res: Record<string, ProductT> = {};
		for (const vahrplanProduct in invertedProductMapping) {
			res[invertedProductMapping[vahrplanProduct]] = vahrplanProduct;
		}
		return res;
	};
}
