import type { ParsedGeolocation, ParsedLocation } from "$lib/types";
import { get } from "svelte/store";
import { settings } from "$lib/stores/settingStore";
import { toast } from "$lib/stores/toastStore";
import { startLoading, stopLoading } from "$lib/stores/loadingStore";

export type CurrentPositionData = {
	position: ParsedLocation["position"] | undefined;
	orientation: number | undefined;
};

/**
 * stores the current position and orientation of the device
 * after `setupCurrentPositionData` was called and if allowed by settings
 */
export const currentPositionData: CurrentPositionData = $state({
	position: undefined,
	orientation: undefined
});

// stops current geolocation from being updated
let positionCleanup: () => void = () => void {};
// stops current device orientation from being updated
let orientationCleanup: () => void = () => void {};

/**
 * after this function is called, the current geolocation and device orientation
 * can be processed from `currentPositionData`
 */
export async function setupCurrentPositionData(): Promise<void> {
	if (currentPositionData.position !== undefined && !get(settings).general.mapGeolocation) {
		return;
	}
	positionCleanup = watchPosition();
	orientationCleanup = await watchDeviceOrientation();
}

/**
 * sets up observation of current geolocation. The orientation is written to `currentPositionData`
 * @returns a cleanup function stopping the observation
 */
function watchPosition(): () => void {
	const watchId = navigator.geolocation.watchPosition(
		(position) => {
			console.log(position.coords);
			currentPositionData.position = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
		},
		(e) => {
			currentPositionData.position = undefined;
			toast(getGeolocationErrorMessage(e.code), "red");
		}
	);

	return () => navigator.geolocation.clearWatch(watchId);
}

function getGeolocationErrorMessage(code: number): string {
	switch (code) {
		case GeolocationPositionError.PERMISSION_DENIED:
			return "Der Zugriff auf den Standort wurde verweigert.";
		default:
			return "Der Standort konnte nicht ermittelt werden.";
	}
}

/**
 * sets up observation of device orientation. The orientation is written to `currentPositionData`
 * @returns a cleanup function stopping the observation
 */
async function watchDeviceOrientation(): Promise<() => void> {
	if (
		typeof DeviceOrientationEvent !== "undefined" &&
		typeof DeviceOrientationEvent.requestPermission === "function"
	) {
		// ios
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
		const permissionState = await DeviceOrientationEvent.requestPermission().catch(
			console.error
		);

		if (permissionState !== "granted") {
			return () => {};
		}

		const deviceOrientationEventListener = function (e: DeviceOrientationEvent): void {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			currentPositionData.orientation = e.webkitCompassHeading;
		};
		window.addEventListener("deviceorientation", deviceOrientationEventListener);
		return () =>
			window.removeEventListener("deviceorientation", deviceOrientationEventListener);
	} else {
		// rest of world
		const deviceOrientationEventListener = function (e: DeviceOrientationEvent): void {
			if (e.alpha === null || !e.absolute) {
				return;
			}
			//console.log(e.alpha);
			currentPositionData.orientation = Math.abs(e.alpha - 360);
		};
		window.addEventListener("deviceorientationabsolute", deviceOrientationEventListener);
		return () =>
			window.removeEventListener("deviceorientationabsolute", deviceOrientationEventListener);
	}
}

export function cleanupCurrentPositionData(): void {
	positionCleanup();
	orientationCleanup();
	currentPositionData.position = undefined;
	currentPositionData.orientation = undefined;
}

/**
 * gives a human-readable relative string for a given date from the past relative to now
 * stolen from https://stackoverflow.com/a/53800501
 * @param date the old date
 */
function relativeDate(date: Date): string {
	const diff = Math.round(new Date(date).getTime() - new Date().getTime());
	const units = {
		year: 24 * 60 * 60 * 1000 * 365,
		month: (24 * 60 * 60 * 1000 * 365) / 12,
		day: 24 * 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		minute: 60 * 1000
	};
	const rtf = new Intl.RelativeTimeFormat("de", { numeric: "auto" });

	let u: keyof typeof units;
	for (u in units)
		if (Math.abs(diff) > units[u]) {
			return rtf.format(Math.round(diff / units[u]), u);
		}
	return "";
}

export function getGeolocationString(creationDate: Date, prefix = "Standort"): string {
	return `${prefix} ${relativeDate(creationDate)}`;
}

export function getParsedGeolocation(
	date: Date,
	position: ParsedLocation["position"]
): ParsedGeolocation {
	return {
		type: "currentLocation",
		name: "Standort",
		requestParameter: {
			type: "location",
			address: "Standort",
			latitude: position.lat,
			longitude: position.lng
		},
		position: position,
		asAt: date
	};
}

export async function getCurrentGeolocation(): Promise<ParsedGeolocation | undefined> {
	const loadingId = startLoading(5);
	return new Promise<ParsedGeolocation>((resolve) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const currentLocation: ParsedLocation = getParsedGeolocation(
					new Date(position.timestamp),
					{
						lat: position.coords.latitude,
						lng: position.coords.longitude
					}
				);
				stopLoading(loadingId, false);
				resolve(currentLocation);
			},
			(e) => {
				stopLoading(loadingId, true);
				toast(getGeolocationErrorMessage(e.code), "red");
				return undefined;
			}
		);
	});
}