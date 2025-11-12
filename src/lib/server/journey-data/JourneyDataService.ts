import type {
	JourneysFilters,
	LegBlock,
	ParsedLocation,
	Product,
	SubJourney,
	TimeData
} from "$lib/types";
import type { VahrplanError } from "$lib/VahrplanError";
import { type VahrplanResult, VahrplanSuccess } from "$lib/VahrplanResult";
import type { OptionId } from "../../../routes/[lang=lang]/[profile=profileId]/api/profile/profile.server";

export type JourneyNodesWithRefs = {
	journeys: SubJourney[];
	earlierRef: string;
	laterRef: string;
};

/**
 * extracts the generic type T from a VahrplanResult
 */
type ExtractResultType<T> = T extends VahrplanResult<infer X> ? X : never;

/**
 * all types a JourneyDataService can return
 */
type Fetchable = ExtractResultType<
	// e.g. `ZugResponse<ParsedLocation>`
	Awaited<
		// e.g. `Promise<ZugResponse<ParsedLocation>>`
		ReturnType<
			// all data serving class methods, e.g. `location`
			JourneyDataService[Exclude<keyof JourneyDataService, "parseError" | "performRequest">]
		>
	>
>;

export abstract class JourneyDataService<
	ProductT extends Product = Product,
	OptionT extends OptionId = OptionId
> {
	/**
	 * get journeys between two stations
	 * @param stops where to start and where to go
	 * @param timeData when to depart or when to arrive
	 * @param options additional options
	 */
	public abstract journeys: (
		stops: { from: string; to: string },
		options: { timeData: TimeData; filters: JourneysFilters<ProductT, OptionT> }
	) => Promise<VahrplanResult<JourneyNodesWithRefs>>;

	/**
	 * get a journey consisting of multiple sub-journeys
	 * @param tokens refresh tokens of the sub-journeys
	 */
	public abstract refresh: (tokens: string[]) => Promise<VahrplanResult<SubJourney[]>>;

	/**
	 * suggest locations based on a string. Can be used for autocomplete inputs
	 * @param name the location to find
	 */
	public abstract locations: (name: string) => Promise<VahrplanResult<ParsedLocation[]>>;

	/**
	 * get a single location based on a token
	 * @param token the request token of the location
	 */
	public abstract location: (
		token: ParsedLocation["id"]
	) => Promise<VahrplanResult<ParsedLocation>>;

	/**
	 * parse an error that may be thrown when data fetching goes wrong
	 * @param err
	 */
	protected abstract parseError: (err: unknown) => VahrplanError;

	/**
	 * perform a request and return a `VahrplanResult` wrapping the result or a corresponding error
	 * @param reqCallback the callback performing the request
	 * @param parseResponseCallback the callback performing some additional parsing of the raw response
	 * @sealed
	 */
	protected performRequest = <ResultType extends Fetchable, IntermediateType>(
		reqCallback: () => Promise<IntermediateType>,
		parseResponseCallback: (intermediateType: IntermediateType) => ResultType
	): Promise<VahrplanResult<ResultType>> =>
		reqCallback().then(
			(intermediateResult) => {
				const parsedResult = parseResponseCallback(intermediateResult);
				return new VahrplanSuccess(parsedResult);
			},
			(err: unknown) => this.parseError(err)
		);

	/**
	 * sets `precededBy` and `succeededBy` properties of sub-journeys
	 * @param subJourneys the sub-journeys to modify
	 * @private
	 * @sealed
	 */
	protected static setMergingProperties = (subJourneys: SubJourney[]): SubJourney[] => {
		for (let i = 1; i < subJourneys.length; i++) {
			const arrivingSubJourneyBlock = subJourneys[i - 1].blocks.at(-1);
			const departingSubJourneyBlock = subJourneys[i].blocks.at(0);
			if (
				arrivingSubJourneyBlock?.type !== "leg" ||
				departingSubJourneyBlock?.type !== "leg"
			) {
				// do nothing
			} else if (arrivingSubJourneyBlock.blockKey === departingSubJourneyBlock.blockKey) {
				arrivingSubJourneyBlock.succeededBy = "stopover";
				departingSubJourneyBlock.precededBy = "stopover";
			} else if (
				JourneyDataService.legsHaveSameLocations(
					arrivingSubJourneyBlock,
					departingSubJourneyBlock
				)
			) {
				arrivingSubJourneyBlock.succeededBy = "transfer";
				departingSubJourneyBlock.precededBy = "transfer";
			}
		}
		return subJourneys;
	};

	/**
	 * returns whether the destination and origin of two legs are the same
	 * @param arrivingLeg the leg with the destination to check
	 * @param departingLeg the leg with the origin to check
	 * @private
	 * @sealed
	 */
	private static legsHaveSameLocations = (
		arrivingLeg: LegBlock,
		departingLeg: LegBlock
	): boolean =>
		arrivingLeg.arrivalData.location.position.lng ===
			departingLeg.departureData.location.position.lng &&
		arrivingLeg.arrivalData.location.position.lat ===
			departingLeg.departureData.location.position.lat;
}
