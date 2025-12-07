import { type LineShape, LineShapeParser } from "$lib/server/journey-data/LineShapeParser";
import type { Line } from "hafas-client";

export class DbnavLineShapeParser extends LineShapeParser<Line> {
	public override getLineShape = (line?: Line): LineShape | undefined => {
		if (line?.name === undefined) {
			return undefined;
		}
		const lineName = line.name.toLowerCase().replaceAll(" ", "");
		const lineNumber = lineName.replace(line.productName?.toLowerCase() ?? "", "");

		const matchedRow = LineShapeParser.traewellingLineShapes.find((lineShapeEntry) => {
			const entryLineName = lineShapeEntry.lineName.toLowerCase().replaceAll(" ", "");
			const isLineNameMatch = entryLineName === lineName || entryLineName === lineNumber;
			if (!isLineNameMatch) {
				return false;
			}

			const isAdminCodeMatch =
				line.adminCode !== undefined &&
				lineShapeEntry.lineId.includes(`-${line.adminCode.toLowerCase()}-`);
			const isOperatorCodeMatch =
				line.operator?.id !== undefined &&
				lineShapeEntry.operatorCode === line.operator?.id;

			return isAdminCodeMatch || isOperatorCodeMatch; // either operator code or admin code must match
		});

		if (matchedRow === undefined) {
			return undefined;
		}

		const linePrefix =
			matchedRow.lineName.toLowerCase().replaceAll(" ", "") === lineName
				? undefined
				: line.productName;
		return {
			linePrefix,
			lineName: matchedRow.lineName,
			backgroundColor: matchedRow.backgroundColor,
			textColor: matchedRow.textColor,
			borderColor: matchedRow.borderColor,
			shape: matchedRow.shape
		};
	};
}
