import type { Language, Profile, ProfileId } from "./profile.server";
import { DbnavProfile } from "./dbnavProfile.server";

const profiles = {
	dbnav: new DbnavProfile()
} as const satisfies { [K in ProfileId]: Profile<K> };

export function profile<T extends ProfileId>(
	id: T,
	lang: Language
): ReturnType<(typeof profiles)[T]["ofLanguage"]> {
	return profiles[id].ofLanguage(lang) as ReturnType<(typeof profiles)[T]["ofLanguage"]>; // I have no idea why this assertion would be necessary
}
