import type { Product } from "$lib/types";

export type ProfileId = "dbnav";
export type Language = "de";

type LocaleString = Record<Language, string>;

type OptionConfig = {
	/** human-readable, short description */
	name: LocaleString;
	defaultValue: string | number | boolean;
};

/**
 * all possible options. A profile uses a subset of those
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Options extends Record<string, OptionConfig> {
	bike: { defaultValue: false; name: { de: "Fahrradmitnahme" } };
	accessible: { defaultValue: false; name: { de: "Barrierefreies Reisen" } };
	maxTransfers: { defaultValue: -1; name: { de: "Maximale Umstiegsanzahl" } };
	minTransferTime: { defaultValue: 0; name: { de: "Mindestumsteigezeit" } };
}

type ProductConfig = {
	name: LocaleString;
};

type NameWithKnownLocale<T extends { name: Record<Language, string> }> = Omit<T, "name"> & {
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
abstract class Profile<
	IdT extends ProfileId,
	ProductT extends Product,
	OptionT extends keyof Options
> {
	/** very short identifier used for urls */
	protected abstract readonly id: IdT;
	/** human-readable, unique profile name; ideally the city or region where it can be used */
	protected abstract readonly name: LocaleString;
	protected abstract readonly products: Record<ProductT, ProductConfig>;
	protected abstract readonly options: { [K in OptionT]: Options[K] };

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

	public ofLanguage(lang: Language): ProfileConfig<IdT, ProductT, OptionT> {
		return {
			name: this.name[lang],
			id: this.id,
			products: this.assignLangNames(lang, this.products),
			options: this.assignLangNames(lang, this.options)
		};
	}
}
