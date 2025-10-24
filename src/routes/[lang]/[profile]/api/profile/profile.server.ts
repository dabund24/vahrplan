import type { Product } from "$lib/types";
import type { AssertUniqueTuple } from "$lib/utilityTypes";

export type ProfileId = "dbnav";
export type Language = "de";

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
	name: LocaleString | string;
};

type NameWithKnownLocale<T extends { name: LocaleString | string }> = Omit<T, "name"> & {
	name: string;
};

export type ProfileConfig<
	IdT extends ProfileId,
	ProductT extends Product,
	OptionT extends keyof typeof Profile.availableOptions
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
	ProductT extends Product = Product,
	OptionT extends
		readonly (keyof typeof Profile.availableOptions)[] = readonly (keyof typeof Profile.availableOptions)[]
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
			name: { de: "Maximale Umstiegs-Anzahl" },
			possibleValues: [0, 1, 2, 3, 4, 5, -1],
			defaultValue: -1,
			optionNames: {
				0: { de: "Direkt-Verbindungen" },
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
	protected abstract readonly options: AssertUniqueTuple<OptionT>;

	/**
	 * fix the languages for all features of a feature set
	 * @param lang the language
	 * @param obj an object with properties, where their values all have a name property mapping languages to names
	 * @private
	 */
	private assignLangNames<T extends Record<string, { name: LocaleString | string }>>(
		lang: Language,
		obj: T
	): { [K in keyof T]: NameWithKnownLocale<T[K]> } {
		const res = {} as { [K in keyof T]: NameWithKnownLocale<T[K]> };
		let feature: keyof T;
		for (feature in obj) {
			const localeName = obj[feature].name;
			const name = typeof localeName === "string" ? localeName : localeName[lang];
			res[feature] = Object.assign({}, obj[feature], { name });
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
	public ofLanguage(lang: Language): ProfileConfig<IdT, ProductT, OptionT[number]> {
		const opt = this.options.reduce<Pick<typeof Profile.availableOptions, OptionT[number]>>(
			(acc, key: OptionT[number]) => {
				acc[key] = Profile.availableOptions[key];
				return acc;
			},
			{} as Pick<typeof Profile.availableOptions, OptionT[number]>
		);

		return {
			name: this.name[lang],
			id: this.id,
			products: this.assignLangNames(lang, this.products),
			options: this.assignLangNames(lang, opt)
		};
	}
}
