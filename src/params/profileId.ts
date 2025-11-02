import type { ParamMatcher } from "@sveltejs/kit";

const profileIds = ["dbnav"] as const;
export type ProfileId = (typeof profileIds)[number] | "empty";

export const match = ((param: string): param is Exclude<ProfileId, "empty"> =>
	profileIds.includes(param as Exclude<ProfileId, "empty">)) satisfies ParamMatcher;
