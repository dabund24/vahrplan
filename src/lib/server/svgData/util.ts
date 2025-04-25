import type { ParsedLocation, TransitType } from "$lib/types";
import { MINUTE_IN_MS } from "$lib/constants";

/**
 * compute the x-coordinate for a location in a svg diagram
 * @param position coordinates of the location
 * @param departure coordinates of the origin location of the sub journey
 * @param arrival coordinates of the destination location of the sub journey
 */
export function computeCoordinateX(
	position: ParsedLocation["position"],
	{ departure, arrival }: Record<TransitType, ParsedLocation["position"]>
): number {
	const distanceFromOrigin = computeLocationDistances(departure, position);
	const distanceFromDestination = computeLocationDistances(position, arrival);
	const totalDistance = distanceFromOrigin + distanceFromDestination;
	return distanceFromOrigin / totalDistance;
}

function computeLocationDistances(
	x: ParsedLocation["position"],
	y: ParsedLocation["position"]
): number {
	const a = y.lat - x.lat;
	const b = y.lng - x.lng;
	return Math.sqrt(a * a + b * b); // pythagoras should be fine
}

/**
 * compute the x-coordinate for a time in a svg diagram
 * @param time
 */
export function computeCoordinateY(time: string | undefined | null | number): number {
	if (time === undefined || time === null) {
		return 0;
	}
	return new Date(time).getTime() / MINUTE_IN_MS;
}
