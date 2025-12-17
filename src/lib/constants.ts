import type { ProfileConfig } from "./server/profiles/profile";

export const YEAR_IN_SECONDS = 31_536_000;
export const DAY_IN_SECONDS = 86400;
export const HOUR_IN_MINUTES = 60;
export const MINUTE_IN_SECONDS = 60;
export const MINUTE_IN_MS = 60_000;
export const MAX_DATE = 8_640_000_000_000_000;

export const DIAGRAM_COLUMN_MAX_REQUESTS = 3;
export const DIAGRAM_MIN_COLUMNS = 1;
export const DIAGRAM_MAX_COLUMNS = 5;

export const EMPTY_PROFILE: ProfileConfig = {
	name: "",
	id: "empty",
	supportedLanguages: ["de"],
	lang: "de",
	products: {},
	options: {},
};
