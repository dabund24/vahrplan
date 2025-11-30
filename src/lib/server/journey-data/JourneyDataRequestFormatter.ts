import type { Product } from "$lib/types";
import {
	type OptionId,
	type PossibleOptionValues
} from "../../../routes/[lang=lang]/[profile=profileId]/api/profile/profile.server";
import type {
	JourneyDataService,
	JourneyDataServiceConfig
} from "$lib/server/journey-data/JourneyDataService";
import type { Language } from "../../../params/lang";

export abstract class JourneyDataRequestFormatter<ProductT extends Product, OptionT extends OptionId> {
	public constructor(
		config: Omit<JourneyDataServiceConfig<ProductT, OptionT>, "requestFormatter">
	) {
		this.optionMapping = config.optionMapping;
		this.productMapping = config.productMapping;
		this.hasTickets = config.hasTickets;
	}

	protected readonly productMapping: Record<ProductT, string>;
	protected readonly optionMapping: Record<OptionT, string>;
	protected readonly hasTickets: boolean;

	protected abstract readonly formatOptionValues: {
		[K in OptionT]: (value: PossibleOptionValues<K>) => unknown;
	};

	public abstract readonly formatRequest: {
		[K in keyof JourneyDataService]: (
			lang: Language,
			...params: Parameters<JourneyDataService[K]>
		) => unknown;
	};
}
