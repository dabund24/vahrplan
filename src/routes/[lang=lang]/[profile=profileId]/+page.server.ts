import type { EntryGenerator } from "./$types";
import { profileIds } from "../../../params/profileId";

export const entries: EntryGenerator = () => profileIds.map((id) => ({ lang: "de", profile: id }));

// eslint-disable-next-line @typescript-eslint/naming-convention
export const prerender = true;
