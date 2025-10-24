import type { Profile, ProfileId } from "./profile.server";
import { DbnavProfile } from "./dbnavProfile.server";

const profiles = {
	dbnav: new DbnavProfile()
} as const satisfies { [K in ProfileId]: Profile<K> };
