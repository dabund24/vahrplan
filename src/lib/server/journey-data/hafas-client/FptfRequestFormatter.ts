import type { Product } from "$lib/types";
import { JourneyDataRequestFormatter } from "$lib/server/journey-data/JourneyDataRequestFormatter";
import type { JourneyDataService } from "$lib/server/journey-data/JourneyDataService";
import type { FptfDataService } from "$lib/server/journey-data/hafas-client/FptfDataService";
import type {
	JourneysOptions as FptfJourneysOptions,
	Location,
	LocationsOptions,
	RefreshJourneyOptions,
	Station,
	Stop,
	StopOptions
} from "hafas-client";
import type { PossibleOptionValues } from "../../../../routes/[lang=lang]/[profile=profileId]/api/profile/profile.server";
import type { Language } from "../../../../params/lang";

export class FptfRequestFormatter<ProductT extends Product> extends JourneyDataRequestFormatter<
	ProductT,
	"bike" | "accessible" | "maxTransfers" | "minTransferTime"
> {
	protected override readonly formatOptionValues = {
		bike: (value: PossibleOptionValues<"bike">): FptfJourneysOptions["bike"] => value,
		accessible: (
			value: PossibleOptionValues<"accessible">
		): FptfJourneysOptions["accessibility"] => (value ? "complete" : "none"),
		minTransferTime: (
			value: PossibleOptionValues<"minTransferTime">
		): FptfJourneysOptions["transferTime"] => value,
		maxTransfers: (
			value: PossibleOptionValues<"maxTransfers">
		): FptfJourneysOptions["transfers"] => value
	};

	private readonly formatFptfOptions = (
		lang: Language,
		{ timeData, filters }: Parameters<JourneyDataService["journeys"]>[1]
	): FptfJourneysOptions => {
		const products: Record<string, boolean> = {};
		for (const vahrplanProduct in this.productMapping) {
			products[this.productMapping[vahrplanProduct]] = filters.products[vahrplanProduct];
		}

		const fptfOptions: FptfJourneysOptions = {
			products,
			transferTime: this.formatOptionValues.minTransferTime(filters.options.minTransferTime),
			transfers: this.formatOptionValues.maxTransfers(filters.options.maxTransfers),
			accessibility: this.formatOptionValues.accessible(filters.options.accessible),
			bike: this.formatOptionValues.bike(filters.options.bike),
			results: 10,
			stopovers: true,
			tickets: this.hasTickets,
			language: lang
		};

		if (timeData.type === "absolute") {
			fptfOptions[timeData.scrollDirection === "later" ? "departure" : "arrival"] = new Date(
				timeData.time
			);
		} else {
			fptfOptions[`${timeData.scrollDirection}Than`] = timeData.time;
		}

		return fptfOptions;
	};

	private readonly formatFptfStop = (
		stop: Parameters<JourneyDataService["location"]>[0]
	): string | Station | Stop | Location => {
		if (stop.startsWith("{")) {
			return JSON.parse(stop) as Station | Stop | Location;
		}
		return stop;
	};

	public override readonly formatRequest = {
		journeys: (
			lang: Language,
			...[{ from, to }, options]: Parameters<JourneyDataService["journeys"]>
		): Parameters<FptfDataService<ProductT>["client"]["journeys"]> => {
			const fptfFrom = this.formatFptfStop(from);
			const fptfTo = this.formatFptfStop(to);
			const fptfOptions = this.formatFptfOptions(lang, options);
			return [fptfFrom, fptfTo, fptfOptions];
		},

		refresh: (
			lang: Language,
			...[tokens]: Parameters<JourneyDataService["refresh"]>
		): Parameters<NonNullable<FptfDataService<ProductT>["client"]["refreshJourney"]>>[] =>
			tokens.map((token) => {
				const fptfOptions: RefreshJourneyOptions = {
					stopovers: true,
					language: lang,
					polylines: true
				};
				return [token, fptfOptions];
			}),

		locations: (
			lang: Language,
			...[name]: Parameters<JourneyDataService["locations"]>
		): Parameters<FptfDataService<ProductT>["client"]["locations"]> => {
			const fptfOptions: LocationsOptions = {
				language: lang,
				results: 10
			};
			return [name, fptfOptions];
		},

		location: (
			lang: Language,
			...[token]: Parameters<JourneyDataService["location"]>
		): Parameters<FptfDataService<ProductT>["client"]["stop"]> => {
			const fptfOptions: StopOptions = {
				language: lang
			};
			return [token, fptfOptions];
		}
	} as const;
}
