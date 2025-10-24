import type { ParamMatcher } from "@sveltejs/kit";

const languages = ["de"] as const;
export type Language = (typeof languages)[number];

export const match = ((param: string): param is Language =>
	languages.includes(param as Language)) satisfies ParamMatcher;
