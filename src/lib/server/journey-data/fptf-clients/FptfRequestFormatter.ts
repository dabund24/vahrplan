import type { Product } from "$lib/types";
import { JourneyDataRequestFormatter } from "$lib/server/journey-data/JourneyDataRequestFormatter";
import type { JourneyDataService } from "$lib/server/journey-data/JourneyDataService";
import type {
	FptfDataService,
	FptfOptionId,
} from "$lib/server/journey-data/fptf-clients/FptfDataService";
import type {
	JourneysOptions as FptfJourneysOptions,
	Location,
	LocationsOptions,
	RefreshJourneyOptions,
	Station,
	Stop,
	StopOptions,
} from "hafas-client";
import type { PossibleOptionValues } from "../../profiles/profile";
import type { Language } from "../../../../params/lang";

export class FptfRequestFormatter<ProductT extends Product> extends JourneyDataRequestFormatter<
	ProductT,
	FptfOptionId
> {
	protected override readonly formatOptionValues = {
		bike: (value: PossibleOptionValues<"bike">): FptfJourneysOptions["bike"] => value,
		accessible: (
			value: PossibleOptionValues<"accessible">,
		): FptfJourneysOptions["accessibility"] => (value ? "complete" : "none"),
		minTransferTime: (
			value: PossibleOptionValues<"minTransferTime">,
		): FptfJourneysOptions["transferTime"] => value,
		maxTransfers: (
			value: PossibleOptionValues<"maxTransfers">,
		): FptfJourneysOptions["transfers"] => value,
	};

	private readonly formatFptfOptions = (
		lang: Language,
		{
			timeData,
			filters,
		}: Parameters<JourneyDataService<ProductT, FptfOptionId>["journeys"]>[1],
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
			entrances: false,
			language: lang,
		};

		if (timeData.type === "absolute") {
			fptfOptions[timeData.scrollDirection === "later" ? "departure" : "arrival"] = new Date(
				timeData.time,
			);
		} else {
			fptfOptions[`${timeData.scrollDirection}Than`] = timeData.time;
		}

		return fptfOptions;
	};

	private readonly formatFptfStop = (
		stop: Parameters<JourneyDataService<ProductT, FptfOptionId>["location"]>[0],
	): string | Station | Stop | Location => {
		if (stop.startsWith("{")) {
			return JSON.parse(stop) as Station | Stop | Location;
		}
		return stop;
	};

	public override readonly formatRequest = {
		journeys: (
			...[{ from, to }, options, { lang }]: Parameters<
				JourneyDataService<ProductT, FptfOptionId>["journeys"]
			>
		): Parameters<FptfDataService<ProductT>["client"]["journeys"]> => {
			const fptfFrom = this.formatFptfStop(from);
			const fptfTo = this.formatFptfStop(to);
			const fptfOptions = this.formatFptfOptions(lang, options);
			return [fptfFrom, fptfTo, fptfOptions];
		},

		refresh: (
			...[token, { lang }]: Parameters<JourneyDataService<ProductT, FptfOptionId>["refresh"]>
		): Parameters<NonNullable<FptfDataService<ProductT>["client"]["refreshJourney"]>> => {
			const fptfOptions: RefreshJourneyOptions = {
				stopovers: true,
				language: lang,
				polylines: true,
			};
			return [token, fptfOptions];
		},

		locations: (
			...[name, { lang }]: Parameters<JourneyDataService<ProductT, FptfOptionId>["locations"]>
		): Parameters<FptfDataService<ProductT>["client"]["locations"]> => {
			const fptfOptions: LocationsOptions = {
				language: lang,
				results: 10,
				addresses: true,
				poi: true,
				entrances: false,
				linesOfStops: false,
			};
			return [name, fptfOptions];
		},

		location: (
			...[token, { lang }]: Parameters<JourneyDataService<ProductT, FptfOptionId>["location"]>
		): Parameters<FptfDataService<ProductT>["client"]["stop"]> => {
			const fptfOptions: StopOptions = {
				language: lang,
				entrances: false,
				linesOfStops: false,
				subStops: false,
				remarks: false,
			};
			return [token, fptfOptions];
		},
	};
}
