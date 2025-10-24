import type { ParamMatcher } from "@sveltejs/kit";

const profileIds = ["dbnav"] as const;
export type ProfileId = (typeof profileIds)[number];

export const match = ((param: string): param is ProfileId =>
	profileIds.includes(param as ProfileId)) satisfies ParamMatcher;
