import { type LineShape, LineShapeParser } from "$lib/server/journey-data/LineShapeParser";
import type { Line } from "hafas-client";

export class HafasClientLineShapeParser extends LineShapeParser<Line> {
	public override getLineShape = (line?: Line): LineShape | undefined => {
		if (line === undefined) {
			return undefined;
		}

		const resLine = LineShapeParser.traewellingLineShapes.find(
			({ delfiAgencyName, lineName }) =>
				delfiAgencyName === line?.operator?.name && lineName === line?.name,
		);

		if (resLine === undefined) {
			return undefined;
		}

		return {
			lineName: resLine.lineName,
			shape: resLine.shape,
			backgroundColor: resLine.backgroundColor,
			textColor: resLine.textColor,
			borderColor: resLine.borderColor,
		};
	};
}
