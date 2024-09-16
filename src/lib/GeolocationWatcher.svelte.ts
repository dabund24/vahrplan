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

		if (get(settings).general.mapGeolocation === undefined) {
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

		window.addEventListener("deviceorientationabsolute", (e) => {
			if (e.alpha === null || !e.absolute ) {
				return
			}
			this.currentPositionData.orientation = Math.abs(e.alpha - 360);
		});
	}

	destroy(): void {
		if (this.watchID !== undefined) {
			navigator.geolocation.clearWatch(this.watchID);
		}
	}
}
