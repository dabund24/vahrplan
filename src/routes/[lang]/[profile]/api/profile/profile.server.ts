import type { Product } from "$lib/types";
import type { AssertUniqueTuple } from "$lib/utilityTypes";

export type ProfileId = "dbnav";
export type Language = "de";

type LocaleString = Record<Language, string>;

type OptionConfig = {
	/** human-readable, short description */
	name: LocaleString;
	defaultValue: string | number | boolean;
};

/**
 * all options ever available. A profile uses a subset of those
 */
const options = {
	bike: { defaultValue: false, name: { de: "Fahrradmitnahme" } },
	accessible: { defaultValue: false, name: { de: "Barrierefreies Reisen" } },
	maxTransfers: { defaultValue: -1, name: { de: "Maximale Umstiegsanzahl" } },
	minTransferTime: { defaultValue: 0, name: { de: "Mindestumsteigezeit" } }
} as const satisfies Record<string, OptionConfig>;
type Options = typeof options;

type ProductConfig = {
	name: LocaleString | string;
};

type NameWithKnownLocale<T extends { name: LocaleString | string }> = Omit<T, "name"> & {
	name: string;
};

type ProfileConfig<
	IdT extends ProfileId,
	ProductT extends Product,
	OptionT extends keyof Options
> = {
	/** very short identifier used for urls */
	id: IdT;
	/** human-readable, unique profile name; ideally the city or region where it can be used */
	name: string;
	products: Record<ProductT, NameWithKnownLocale<ProductConfig>>;
	options: { [K in OptionT]: NameWithKnownLocale<Options[K]> };
};

/**
 * extend to define a profile
 */
export abstract class Profile<
	IdT extends ProfileId,
	ProductT extends Product,
	OptionT extends readonly (keyof Options)[]
> {
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

	/**
	 * get the profile spec primed for a language
	 * @param lang
	 * @sealed
	 */
	public ofLanguage(lang: Language): ProfileConfig<IdT, ProductT, OptionT[number]> {
		const opt = this.options.reduce<Pick<Options, OptionT[number]>>(
			(acc, key: OptionT[number]) => {
				acc[key] = options[key];
				return acc;
			},
			{} as Pick<Options, OptionT[number]>
		);

		return {
			name: this.name[lang],
			id: this.id,
			products: this.assignLangNames(lang, this.products),
			options: this.assignLangNames(lang, opt)
		};
	}
}
