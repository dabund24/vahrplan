import type { Profile, ProfileConfig } from "./profile";
import type { ProfileId } from "../../../params/profileId";
import type { Language } from "../../../params/lang";
import { EmptyProfile } from "./profile-implementations/emptyProfile";
import { BvgProfile } from "$lib/server/profiles/profile-implementations/bvg/bvgProfile";
import { OebbProfile } from "$lib/server/profiles/profile-implementations/oebb/oebbProfile";
import { SbahnmuenchenProfile } from "$lib/server/profiles/profile-implementations/sbahnmuenchen/sbahnmuenchenProfile";
import { TransitousProfile } from "$lib/server/profiles/profile-implementations/transitous/transitousProfile";

const profiles = {
	empty: new EmptyProfile(),
	transitous: new TransitousProfile(),
	// dbnav: new DbnavProfile(),
	oebb: new OebbProfile(),
	bvg: new BvgProfile(),
	sbahnmuenchen: new SbahnmuenchenProfile(),
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
	_lang: Language,
): (typeof profiles)[ProfileT]["dataService"] {
	return profiles[profile].dataService;
	// TODO proxy data service such that the future language parameter doesn't need to be specified
}
