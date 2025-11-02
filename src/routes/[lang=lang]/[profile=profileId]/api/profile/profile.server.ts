import type { Product } from "$lib/types";
import type { AssertUniqueTuple, EmptyRecord } from "$lib/utilityTypes";
import type { ProfileId } from "../../../../../params/profileId";
import type { Language } from "../../../../../params/lang";

type LocaleString = Record<Language, string>;

type OptionValues = {
	bike: boolean;
	accessible: boolean;
	maxTransfers: [0, 1, 2, 3, 4, 5, -1];
	minTransferTime: [0, 2, 5, 10, 15, 20, 30, 40, 50, 60];
};

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
					LocaleString
				>;
			});

type ProductConfig = {
	name: LocaleString;
};

type NameWithKnownLocale<T extends { name: LocaleString }> = Omit<T, "name"> & {
	name: string;
};

export type ProfileConfig<
	IdT extends ProfileId = ProfileId,
	ProductT extends Product = Product,
	OptionT extends keyof typeof Profile.availableOptions = keyof typeof Profile.availableOptions
> = {
	/** very short identifier used for urls */
	id: IdT;
	/** human-readable, unique profile name; ideally the city or region where it can be used */
	name: string;
	products: Record<ProductT, NameWithKnownLocale<ProductConfig>>;
	options: { [K in OptionT]: NameWithKnownLocale<(typeof Profile.availableOptions)[K]> };
};

/**
 * extend to define a profile
 */
export abstract class Profile<
	IdT extends ProfileId,
	ProductT extends Product,
	OptionT extends keyof typeof Profile.availableOptions
> {
	/** all options ever available. a profile uses a subset of those */
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
				0: { de: "nur Direkt-Verbindungen" },
				1: Profile.translingual("1"),
				2: Profile.translingual("2"),
				3: Profile.translingual("3"),
				4: Profile.translingual("4"),
				5: Profile.translingual("5"),
				[-1]: { de: "beliebig" }
			}
		},
		minTransferTime: {
			name: { de: "Mindest-Umsteigezeit" },
			possibleValues: [0, 2, 5, 10, 15, 20, 30, 40, 50, 60],
			defaultValue: 0,
			optionNames: {
				0: Profile.translingual("0min"),
				2: Profile.translingual("2min"),
				5: Profile.translingual("5min"),
				10: Profile.translingual("10min"),
				15: Profile.translingual("15min"),
				20: Profile.translingual("20min"),
				30: Profile.translingual("30min"),
				40: Profile.translingual("40min"),
				50: Profile.translingual("50min"),
				60: Profile.translingual("1h")
			}
		}
	} as const satisfies { [K in keyof OptionValues]: OptionConfig<OptionValues[K]> };

	/** very short identifier used for urls */
	protected abstract readonly id: IdT;
	/** human-readable, unique profile name; ideally the city or region where it can be used */
	protected abstract readonly name: LocaleString;
	protected abstract readonly products: Record<ProductT, ProductConfig>;
	protected abstract readonly options: Record<OptionT, EmptyRecord>;

	/**
	 * fix the languages for all features of a feature set
	 * @param lang the language
	 * @param obj an object with properties, where their values all have a name property mapping languages to names
	 * @private
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

	protected static translingual(name: string): LocaleString {
		return { de: name };
	}

	/**
	 * get the profile spec primed for a language
	 * @param lang
	 * @sealed
	 */
	public ofLanguage(lang: Language): ProfileConfig<IdT, ProductT, OptionT> {
		const opt = {} as Pick<typeof Profile.availableOptions, OptionT>;
		for (const optionKey in this.options) {
			opt[optionKey] = Profile.availableOptions[optionKey];
		}

		return {
			name: this.name[lang],
			id: this.id,
			products: this.assignLangNames(lang, this.products),
			options: this.assignLangNames(lang, opt)
		};
	}
}
