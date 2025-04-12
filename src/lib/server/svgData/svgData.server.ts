import type { JourneyBlock, ParsedLocation, SubJourney, TransitType } from "$lib/types";
import { MAX_DATE } from "$lib/constants";
import {
	getLocationRepresentative,
	type LocationEquivalenceSystem
} from "../../../routes/api/diagram/locationRepresentativesUtils";
import { computeTransferSvgData, type TransferSvgData } from "$lib/server/svgData/transferSvgData";
import { computeLegSvgData, type LegSvgData } from "$lib/server/svgData/legSvgData";
import { error } from "@sveltejs/kit";
import { VahrplanError } from "$lib/VahrplanError";

export type SvgData = {
	yMin: number;
	yMax: number;
	firstTimeMark: number;
	timeMarkInterval: number;
	columns: { subJourneys: SubJourneySvgData[] }[];
};

type SubJourneySvgData = {
	blocks: BlockSvgData[];
};

type BlockSvgData = LegSvgData | TransferSvgData;

export type TransferPosition = "start" | "end" | "middle";

export type SvgPosition = [number, number];

export function generateSvgData(
	subJourneys: SubJourney[][],
	ctx: {
		timeData: Record<TransitType, string>[][];
		locationEquivalenceSystem: LocationEquivalenceSystem;
	}
): SvgData {
	const yMin = computeMinY(ctx.timeData);
	const yMax = computeMaxY(ctx.timeData);

	const stops = computeStops(subJourneys, ctx.locationEquivalenceSystem);

	const columns: SvgData["columns"] = subJourneys.map((column, columnIndex) => {
		const journeyEndPositions = {
			departure: stops[columnIndex]?.position ?? { lat: 0, lng: 0 },
			arrival: stops[columnIndex + 1]?.position ?? { lat: 0, lng: 0 }
		};
		return {
			subJourneys: column.map((subJourney) => ({
				blocks: subJourneyToSvgData(subJourney, {
					journeyEndPositions,
					locationEquivalenceSystem: ctx.locationEquivalenceSystem
				})
			}))
		};
	});

	return { yMin, yMax, columns, firstTimeMark: 0, timeMarkInterval: 0 };
}

function computeMinY(timeData: Record<TransitType, string>[][]): number {
	return timeData.reduce(
		(currentMin, column) => Math.min(currentMin, new Date(column[0].departure).getTime()),
		MAX_DATE
	);
}

function computeMaxY(timeData: Record<TransitType, string>[][]): number {
	return timeData.reduce((currentMax, column) => {
		// compute latest arrival in column (columns are sorted by departure, but not arrival!)
		const columnMax = column.reduce(
			(currentColumnMax, subJourneyData) =>
				Math.max(currentColumnMax, new Date(subJourneyData.arrival).getTime()),
			0
		);

		return Math.max(currentMax, columnMax);
	}, 0);
}

function computeStops(
	subJourneys: SubJourney[][],
	equivSys: LocationEquivalenceSystem
): (ParsedLocation | undefined)[] {
	return subJourneys.reduce(
		(stops, column) => [...stops, legBlockToLocation(column[0].blocks.at(-1), equivSys)],
		[legBlockToLocation(subJourneys[0][0].blocks[0], equivSys)]
	);
}

function legBlockToLocation(
	block: JourneyBlock | undefined,
	equivSys: LocationEquivalenceSystem
): ParsedLocation | undefined {
	if (block === undefined) {
		return undefined;
	}

	let location: ParsedLocation;
	if (block.type === "location") {
		location = block.location;
	} else if (block.type === "leg") {
		location = block.arrivalData.location;
	} else {
		error(500, new VahrplanError("ERROR"));
	}

	return getLocationRepresentative(equivSys, location);
}

function subJourneyToSvgData(
	subJourney: SubJourney,
	ctx: {
		journeyEndPositions: Record<TransitType, ParsedLocation["position"]>;
		locationEquivalenceSystem: LocationEquivalenceSystem;
	}
): BlockSvgData[] {
	const { journeyEndPositions, locationEquivalenceSystem } = ctx;
	const blocksSvgData: BlockSvgData[] = [];
	subJourney.blocks.forEach((block, blockIndex) => {
		if (block.type === "leg") {
			blocksSvgData.push(computeLegSvgData(block, journeyEndPositions));
		} else if (
			block.type === "walk" ||
			block.type === "transfer" ||
			block.type === "onward-journey"
		) {
			blocksSvgData.push(
				computeTransferSvgData(block, blockIndex, {
					journeyEndPositions,
					locationEquivalenceSystem,
					subJourney
				})
			);
		}
	});
	return blocksSvgData;
}
