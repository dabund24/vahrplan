import type { LegBlock, ParsedLocation, Product, TransitType } from "$lib/types";
import { computeCoordinateX, computeCoordinateY } from "$lib/server/svgData/util";
import type { SvgPosition } from "$lib/server/svgData/svgData.server";
import {
	getLocationRepresentative,
	type LocationEquivalenceSystem
} from "../../../routes/api/diagram/locationRepresentativesUtils";

export type LegSvgData = {
	type: "leg";
	start: SvgPosition;
	end: SvgPosition;
	transferableStopovers: { id: number; position: SvgPosition }[];
	product: Product;
};

export function computeLegSvgData(
	legBlock: LegBlock,
	journeyEndPositions: Record<TransitType, ParsedLocation["position"]>,
	transferLocations: LocationEquivalenceSystem
): LegSvgData {
	const departureLocation = getLocationRepresentative(
		transferLocations,
		legBlock.departureData.location
	);
	const start: [number, number] = [
		computeCoordinateX(departureLocation.position, journeyEndPositions),
		computeCoordinateY(legBlock.departureData.time.departure?.time)
	];

	const arrivalLocation = getLocationRepresentative(
		transferLocations,
		legBlock.arrivalData.location
	);
	const end: [number, number] = [
		computeCoordinateX(arrivalLocation.position, journeyEndPositions),
		computeCoordinateY(legBlock.arrivalData.time.arrival?.time)
	];
	return {
		type: "leg",
		product: legBlock.product,
		transferableStopovers: [],
		start: start,
		end
	};
}
