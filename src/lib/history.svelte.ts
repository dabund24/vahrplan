import type { ParsedGeolocation, ParsedLocation } from "$lib/types";
import type { ProfileId } from "../params/profileId";
import { settings } from "$lib/state/settingStore";
import { browser } from "$app/environment";
import { get } from "svelte/store";

export type StationHistoryEntry = Exclude<ParsedLocation, ParsedGeolocation> & {
	profile: ProfileId;
};

const STORAGE_KEY = "stationHistory";
export const MAX_ENTRIES_PER_PROFILE = 10;

/** most recently used first */
let stationHistory: StationHistoryEntry[] = $state([]);

if (browser) {
	initStationHistory();
	settings.subscribe(({ storage }) => {
		if (!storage.stationHistory) {
			stationHistory = [];
		}
	});
}

export function initStationHistory(): void {
	const stringifiedHistory = localStorage.getItem(STORAGE_KEY);
	if (stringifiedHistory === null) {
		stationHistory = [];
		return;
	}
	try {
		stationHistory = JSON.parse(stringifiedHistory) as StationHistoryEntry[];
	} catch {
		stationHistory = [];
	}
}

function syncLocalStorage(): void {
	if (!get(settings).storage.stationHistory) {
		return;
	}
	localStorage.setItem(STORAGE_KEY, JSON.stringify(stationHistory));
}

/**
 * move the passed locations to the top of the station history of the profile. does nothing if the history is disabled
 * @param locations locations of a submitted search, the current location is ignored
 * @param profile
 */
export function addToStationHistory(locations: ParsedLocation[], profile: ProfileId): void {
	if (!get(settings).storage.stationHistory) {
		return;
	}
	const newEntries: StationHistoryEntry[] = [];
	for (const location of locations) {
		if (location.type === "currentLocation" || newEntries.some((e) => e.id === location.id)) {
			continue;
		}
		newEntries.push({ ...location, profile });
	}
	const otherEntries = stationHistory.filter(
		(entry) =>
			entry.profile !== profile || newEntries.every((newEntry) => newEntry.id !== entry.id),
	);
	let profileEntryCount = 0;
	stationHistory = [...newEntries, ...otherEntries].filter(
		(entry) => entry.profile !== profile || ++profileEntryCount <= MAX_ENTRIES_PER_PROFILE,
	);
	syncLocalStorage();
}

/**
 * get the station history of a profile, most recently used first
 * @param profile
 */
export function getStationHistory(profile: ProfileId): StationHistoryEntry[] {
	return stationHistory.filter((entry) => entry.profile === profile);
}

/**
 * remove a location from the station history of a profile
 * @param id id of the location
 * @param profile
 */
export function removeFromStationHistory(id: string, profile: ProfileId): void {
	stationHistory = stationHistory.filter((entry) => entry.profile !== profile || entry.id !== id);
	syncLocalStorage();
}
