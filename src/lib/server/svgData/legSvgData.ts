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
	transferableStopovers: {
		id: string;
		start: SvgPosition;
		end: SvgPosition;
	}[];
	product: Product;
	isCancelled: boolean;
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

	const transferableStopovers = determineTransferableStopovers(
		legBlock,
		journeyEndPositions,
		transferLocations
	);

	return {
		type: "leg",
		product: legBlock.product,
		transferableStopovers,
		start,
		end,
		isCancelled: legBlock.attribute === "cancelled"
	};
}

function determineTransferableStopovers(
	legBlock: LegBlock,
	journeyEndPositions: Record<TransitType, ParsedLocation["position"]>,
	transferLocations: LocationEquivalenceSystem
): LegSvgData["transferableStopovers"] {
	return legBlock.stopovers.reduce((acc: LegSvgData["transferableStopovers"], stopover) => {
		if (
			transferLocations.idToRepresentative[stopover.location.requestParameter] !== undefined
		) {
			const location = getLocationRepresentative(transferLocations, stopover.location);
			const start: [number, number] = [
				computeCoordinateX(stopover.location.position, journeyEndPositions),
				computeCoordinateY(stopover.time.arrival?.time)
			];
			const end: [number, number] = [
				computeCoordinateX(stopover.location.position, journeyEndPositions),
				computeCoordinateY(stopover.time.departure?.time)
			];
			acc.push({ id: location.requestParameter, start, end });
		}
		return acc;
	}, []);
}
