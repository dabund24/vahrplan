import type { Profile } from "./profile.server";
import { DbnavProfile } from "./dbnavProfile.server";
import type { ProfileId } from "../../../../../params/profileId";
import type { Language } from "../../../../../params/lang";
import { EmptyProfile } from "./emptyProfile.server";
import type { JourneyDataService } from "$lib/server/journey-data/JourneyDataService";

type ProfileToDataService<T extends ProfileId> =
	(typeof profiles)[T] extends Profile<T, infer ProductT, infer OptionT>
		? JourneyDataService<ProductT, OptionT>
		: never;

const profiles = {
	empty: new EmptyProfile(),
	dbnav: new DbnavProfile()
} as const satisfies {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[K in ProfileId]: Profile<K, any, any>;
};

export function profileConfig<T extends ProfileId>(
	id: T,
	lang: Language
): ReturnType<(typeof profiles)[T]["configOfLanguage"]> {
	return profiles[id].configOfLanguage(lang) as ReturnType<
		(typeof profiles)[T]["configOfLanguage"]
	>; // I have no idea why this assertion would be necessary
}

export function journeyDataService<ProfileT extends ProfileId>(
	id: ProfileT,
	_lang: Language
): ProfileToDataService<ProfileId> {
	return profiles[id].dataService as ProfileToDataService<ProfileId>;
	// TODO proxy data service such that the future language parameter doesn't need to be specified
}
