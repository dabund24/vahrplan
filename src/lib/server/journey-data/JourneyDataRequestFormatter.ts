import type { Product } from "$lib/types";
import { type OptionId, type PossibleOptionValues } from "../profiles/profile";
import type {
	JourneyDataService,
	JourneyDataServiceConfig,
} from "$lib/server/journey-data/JourneyDataService";

export abstract class JourneyDataRequestFormatter<
	ProductT extends Product,
	OptionT extends OptionId,
> {
	public constructor(
		config: Omit<
			JourneyDataServiceConfig<ProductT, OptionT>,
			"requestFormatter" | "responseParser"
		>,
	) {
		this.optionMapping = config.optionMapping;
		this.productMapping = config.productMapping;
	}

	protected readonly productMapping: Record<ProductT, string>;
	protected readonly optionMapping: Record<OptionT, string>;

	/**
	 * map option values to their representative in the upstream api
	 * @protected
	 */
	protected abstract readonly formatOptionValues: {
		[K in OptionT]: (value: PossibleOptionValues<K>) => unknown;
	};

	/**
	 * format requests for the upstream api
	 */
	public abstract readonly formatRequest: {
		[K in keyof JourneyDataService<ProductT, OptionT>]: (
			...params: Parameters<JourneyDataService<ProductT, OptionT>[K]>
		) => unknown;
	};
}
