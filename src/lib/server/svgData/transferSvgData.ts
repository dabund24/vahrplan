import type {
	OnwardJourneyBlock,
	ParsedLocation,
	SubJourney,
	TransferBlock,
	TransitType,
	WalkingBlock
} from "$lib/types";
import {
	getLocationRepresentative,
	type LocationEquivalenceSystem
} from "../../../routes/api/diagram/locationRepresentativesUtils";
import { type SvgPosition, type TransferPosition } from "$lib/server/svgData/svgData.server";
import { computeCoordinateX, computeCoordinateY } from "$lib/server/svgData/util";

export type TransferSvgData = {
	type: "transfer";
	start: SvgPosition;
	end: SvgPosition;
	locationId: string;
	transferPosition: TransferPosition;
};

export function computeTransferSvgData(
	block: TransferBlock | WalkingBlock | OnwardJourneyBlock,
	blockIndex: number,
	ctx: {
		journeyEndPositions: Record<TransitType, ParsedLocation["position"]>;
		locationEquivalenceSystem: LocationEquivalenceSystem;
		subJourney: SubJourney;
	}
): TransferSvgData {
	const { journeyEndPositions, locationEquivalenceSystem, subJourney } = ctx;
	const transferPosition = determineTransferPosition(subJourney, blockIndex);

	const originLocation =
		block.type === "transfer" ? block.transitData.location : block.originLocation;
	const destinationLocation =
		block.type === "transfer" ? block.transitData.location : block.destinationLocation;
	const time = block.type === "transfer" ? block.transitData.time : block.time;

	let start: [number, number];
	let end: [number, number];
	const startY = computeCoordinateY(time.arrival?.time);
	const endY = computeCoordinateY(
		new Date(time.arrival?.time ?? 0).getTime() + block.transferTime * 60000
	);

	if (transferPosition === "middle") {
		// transfer is somewhere in the middle, so use representative location
		const location = getLocationRepresentative(
			locationEquivalenceSystem,
			block.type === "transfer" ? block.transitData.location : block.destinationLocation
		);
		start = [computeCoordinateX(location.position, journeyEndPositions), startY];
		end = [computeCoordinateX(location.position, journeyEndPositions), endY];
		return {
			type: "transfer",
			start,
			end,
			locationId: location.requestParameter,
			transferPosition
		};
	}

	// transfer starts or ends journey, so use non-start/non-destination location
	start = [computeCoordinateX(originLocation.position, journeyEndPositions), startY];
	end = [computeCoordinateX(destinationLocation.position, journeyEndPositions), endY];
	const { requestParameter: locationId } =
		transferPosition === "start" ? originLocation : destinationLocation;

	return { type: "transfer", start, end, locationId, transferPosition };
}

function determineTransferPosition(subJourney: SubJourney, blockIndex: number): TransferPosition {
	if (blockIndex === 1 && subJourney.blocks[0].type === "location") {
		return "start";
	} else if (
		blockIndex === subJourney.blocks.length - 2 &&
		subJourney.blocks.at(-1)?.type === "location"
	) {
		return "end";
	}
	return "middle";
}
