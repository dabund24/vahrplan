import type { ParamMatcher } from "@sveltejs/kit";

export const profileIds = ["dbnav", "bvg"] as const;
export type ProfileId = (typeof profileIds)[number] | "empty";

export const match = ((param: string): param is ProfileId =>
	profileIds.includes(param as Exclude<ProfileId, "empty">)) satisfies ParamMatcher;
