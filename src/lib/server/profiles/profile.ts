import type { Product } from "$lib/types";
import type { AssertUniqueTuple, EmptyRecord } from "$lib/utilityTypes";
import type { ProfileId } from "../../../params/profileId";
import type { Language } from "../../../params/lang";
import type { JourneyDataService } from "$lib/server/journey-data/JourneyDataService";
import { version } from "$app/environment";

type LocaleString = Record<Language, string>;

type OptionValues = {
	bike: boolean;
	accessible: boolean;
	maxTransfers: [0, 1, 2, 3, 4, 5, -1];
	minTransferTime: [0, 2, 5, 10, 15, 20, 30, 40, 50, 60];
};

export type OptionId = keyof OptionValues;

type OptionConfig<T extends string[] | number[] | boolean> = {
	name: LocaleString;
	defaultValue: T extends number[] | string[] ? T[number] : boolean;
} & (T extends boolean
	? Record<never, never>
	: AssertUniqueTuple<T extends number[] | string[] ? T : never> extends never
		? never
		: {
				possibleValues: T;
				optionNames: Record<
					T extends number[] | string[] ? T[number] : never,
					{ name: string }
				>;
			});

export type PossibleOptionValues<T extends OptionId> =
	(typeof Profile.availableOptions)[T] extends OptionConfig<string[] | number[]>
		? (typeof Profile.availableOptions)[T]["possibleValues"][number]
		: boolean;

type ProductConfig = {
	name: LocaleString;
};

type DisabledNotice = {
	name: LocaleString;
};

type NameWithKnownLocale<T extends { name: LocaleString }> = Omit<T, "name"> & {
	name: string;
};

export type ProfileConfig = {
	/** very short identifier used for urls */
	id: ProfileId;
	/** human-readable, unique profile name; ideally the city or region where it can be used */
	name: string;
	lang: Language;
	supportedLanguages: Language[];
	products: Partial<Record<Product, NameWithKnownLocale<ProductConfig>>>;
	options: {
		[K in OptionId]?: NameWithKnownLocale<(typeof Profile.availableOptions)[K]>; // TODO option names are still hard coded!
	};
	disabledNotice?: NameWithKnownLocale<DisabledNotice>;
};

/**
 * extend to define a profile
 */
export abstract class Profile<
	IdT extends ProfileId,
	ProductT extends Product = never,
	OptionT extends keyof typeof Profile.availableOptions = never
> {
	/**
	 * all options ever available. a profile uses a subset of those
	 * @sealed
	 */
	static readonly availableOptions = {
		bike: {
			name: { de: "Fahrradmitnahme" },
			defaultValue: false
		},
		accessible: {
			name: { de: "Barrierefreies Reisen" },
			defaultValue: false
		},
		maxTransfers: {
			name: { de: "Maximalanzahl an Umstiegen" },
			possibleValues: [0, 1, 2, 3, 4, 5, -1],
			defaultValue: -1,
			optionNames: {
				0: { name: "nur Direkt-Verbindungen" },
				1: { name: "1" },
				2: { name: "2" },
				3: { name: "3" },
				4: { name: "4" },
				5: { name: "5" },
				[-1]: { name: "beliebig" }
			}
		},
		minTransferTime: {
			name: { de: "Mindest-Umsteigezeit" },
			possibleValues: [0, 2, 5, 10, 15, 20, 30, 40, 50, 60],
			defaultValue: 0,
			optionNames: {
				0: { name: "0min" },
				2: { name: "2min" },
				5: { name: "5min" },
				10: { name: "10min" },
				15: { name: "15min" },
				20: { name: "20min" },
				30: { name: "30min" },
				40: { name: "40min" },
				50: { name: "50min" },
				60: { name: "1h" }
			}
		}
	} as const satisfies { [K in keyof OptionValues]: OptionConfig<OptionValues[K]> };
	/** @sealed */
	protected readonly userAgent = `https://vahrplan.de ${version}`;

	/** very short identifier used for urls */
	protected abstract readonly id: IdT;
	/** human-readable, unique profile name; ideally the city or region where it can be used */
	protected abstract readonly name: LocaleString;
	/** in case a profile ever stops working: use this property to indicate the reason */
	protected abstract readonly disabledNotice?: DisabledNotice;
	/** all languages the upstream api can return responses of */
	protected abstract readonly supportedLanguages: Language[];
	protected abstract readonly fallbackLanguage: Language;
	protected abstract readonly products: Record<ProductT, ProductConfig>;
	protected abstract readonly options: Record<OptionT, EmptyRecord>;

	/** the thing that talks with the upstream api */
	protected abstract readonly journeyDataService: JourneyDataService<ProductT, OptionT>;

	/**
	 * fix the languages for all features of a feature set
	 * @param lang the language
	 * @param obj an object with properties, where their values all have a name property mapping languages to names
	 * @private
	 * @sealed
	 */
	private assignLangNames<T extends Record<string, { name: LocaleString }>>(
		lang: Language,
		obj: T
	): { [K in keyof T]: NameWithKnownLocale<T[K]> } {
		const res = {} as { [K in keyof T]: NameWithKnownLocale<T[K]> };
		let feature: keyof T;
		for (feature in obj) {
			res[feature] = Object.assign({}, obj[feature], { name: obj[feature].name[lang] });
		}
		return res;
	}

	/**
	 * use this to create a locale string, which is the same in every language
	 * @param name
	 * @protected
	 * @sealed
	 */
	protected static translingual(name: string): LocaleString {
		return { de: name };
	}

	/**
	 * get the profile spec primed for a language
	 * @param lang
	 * @sealed
	 */
	public configOfLanguage(lang: Language): ProfileConfig {
		const opt = {} as Pick<typeof Profile.availableOptions, OptionT>;
		for (const optionKey in this.options) {
			opt[optionKey] = Profile.availableOptions[optionKey];
		}

		const res: ProfileConfig = {
			name: this.name[lang],
			id: this.id,
			lang,
			supportedLanguages: this.supportedLanguages,
			products: this.assignLangNames(lang, this.products),
			options: this.assignLangNames(lang, opt)
		};

		if (this.disabledNotice !== undefined) {
			res.disabledNotice = this.assignLangNames(lang, { _: this.disabledNotice })._;
		}

		return res;
	}

	/**
	 * get the journey data service of the profile
	 * @sealed
	 */
	public get dataService(): JourneyDataService<ProductT, OptionT> {
		return this.journeyDataService;
	}
}
