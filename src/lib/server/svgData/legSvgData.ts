import type { LegBlock, ParsedLocation, Product, TransitType } from "$lib/types";
import { computeCoordinateX, computeCoordinateY } from "$lib/server/svgData/util";
import type { SvgPosition } from "$lib/server/svgData/svgData.server";

export type LegSvgData = {
	type: "leg";
	start: SvgPosition;
	end: SvgPosition;
	transferrableStopovers: { id: number; position: SvgPosition }[];
	product: Product;
};

export function computeLegSvgData(
	legBlock: LegBlock,
	journeyEndPositions: Record<TransitType, ParsedLocation["position"]>
): LegSvgData {
	const start: [number, number] = [
		computeCoordinateX(legBlock.departureData.location.position, journeyEndPositions),
		computeCoordinateY(legBlock.departureData.time.departure?.time)
	];
	const end: [number, number] = [
		computeCoordinateX(legBlock.arrivalData.location.position, journeyEndPositions),
		computeCoordinateY(legBlock.arrivalData.time.arrival?.time)
	];
	return {
		type: "leg",
		product: legBlock.product,
		transferrableStopovers: [],
		start: start,
		end
	};
}
