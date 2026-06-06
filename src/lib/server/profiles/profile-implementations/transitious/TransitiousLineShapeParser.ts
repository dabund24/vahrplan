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

		return LineShapeParser.traewellingLineShapesDe.find(
			({ delfiAgencyID: id, lineName }) =>
				id === lineDetails.operator?.id &&
				this.stringToNormalForm(lineName) ===
					this.stringToNormalForm(lineDetails.name ?? ""),
		);
	}
}
