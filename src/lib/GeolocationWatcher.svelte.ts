import type { ParsedLocation } from "$lib/types";
import { get } from "svelte/store";
import { settings } from "$lib/stores/settingStore";

export type CurrentPositionData = {
	position: ParsedLocation["position"] | undefined;
	orientation: number | undefined;
};

export class GeolocationWatcher {
	currentPositionData: CurrentPositionData = $state({
		position: undefined,
		orientation: undefined
	});
	watchID: number;

	constructor() {
		this.watchID = 0;

		if (!get(settings).general.mapGeolocation) {
			return;
		}

		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				this.currentPositionData.position = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
			},
			() => {
				this.currentPositionData.position = undefined;
			}
		);

		if (
			typeof DeviceOrientationEvent !== "undefined" &&
			typeof DeviceOrientationEvent.requestPermission === "function"
		) {
			// ios
			DeviceOrientationEvent.requestPermission()
				.then((permissionState) => {
					if (permissionState === "granted") {
						window.addEventListener("deviceorientation", (e) => {
							this.currentPositionData.orientation = e.webkitCompassHeading;
						});
					}
				})
				.catch(console.error);
		} else {
			// rest of world
			window.addEventListener("deviceorientationabsolute", (e) => {
				if (e.alpha === null) {
					return;
				}
				this.currentPositionData.orientation = Math.abs(e.alpha - 360);
			});
		}
	}

	destroy(): void {
		if (this.watchID !== undefined) {
			navigator.geolocation.clearWatch(this.watchID);
		}
	}
}
