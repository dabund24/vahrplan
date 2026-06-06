import {
	type LineShape,
	LineShapeParser,
} from "$lib/server/journey-data/line-shapes/LineShapeParser";
import type { Line } from "hafas-client";

export class TransitiousLineShapeParser extends LineShapeParser<Line> {
	getLineShape(lineDetails: Line | undefined): LineShape | undefined {
		if (lineDetails == undefined) {
			return undefined;
		}

		return Object.values(LineShapeParser.traewellingLineShapes)
			.flat()
			.find(
				({ gtfsAgencyId, gtfsAgencyName, lineName }) =>
					gtfsAgencyId === lineDetails.operator?.id &&
					gtfsAgencyName === lineDetails.operator?.name &&
					this.stringToNormalForm(lineName) ===
						this.stringToNormalForm(lineDetails.name ?? ""),
			);
	}
}
