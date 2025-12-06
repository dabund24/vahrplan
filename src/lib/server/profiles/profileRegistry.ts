import type { Profile, ProfileConfig } from "./profile";
import { DbnavProfile } from "./dbnavProfile";
import type { ProfileId } from "../../../params/profileId";
import type { Language } from "../../../params/lang";
import { EmptyProfile } from "./emptyProfile";

const profiles = {
	empty: new EmptyProfile(),
	dbnav: new DbnavProfile()
} as const satisfies {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[K in ProfileId]: Profile<K, any, any>;
};

export function profileRegistry<T extends ProfileId>(id: T): (typeof profiles)[T] {
	return profiles[id];
}

export function allProfileConfigs(lang: Language): ProfileConfig[] {
	return Object.values(profiles)
		.map((p) => p.configOfLanguage(lang))
		.filter(({ id }) => id !== "empty");
}

export function journeyDataService<ProfileT extends ProfileId>(
	profile: ProfileT,
	_lang: Language
): (typeof profiles)[ProfileT]["dataService"] {
	return profiles[profile].dataService;
	// TODO proxy data service such that the future language parameter doesn't need to be specified
}
