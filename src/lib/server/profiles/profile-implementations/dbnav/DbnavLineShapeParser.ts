import {
	type LineShape,
	LineShapeParser,
} from "$lib/server/journey-data/line-shapes/LineShapeParser";
import type { Line } from "hafas-client";

export class DbnavLineShapeParser extends LineShapeParser<Line> {
	public override getLineShape = (line?: Line): LineShape | undefined => {
		if (line?.name === undefined) {
			return undefined;
		}

		if (line.productName === "WB") {
			return this.getCustomLineShape(line.name ?? "WB", "westbahn");
		}
		if (line.productName === "FLX") {
			return this.getCustomLineShape(line.name ?? "FLX", "flix");
		}
		if (line.productName === "NJ") {
			return this.getCustomLineShape(line.name ?? "NJ", "oebbNightjet");
		}
		if (line.productName === "EC" || line.productName === "EN") {
			return this.getCustomLineShape(line.name ?? line.productName, "eurocity");
		}
		if (line.productName === "RJ" || line.productName === "RJX") {
			return this.getCustomLineShape(line.name ?? line.productName, "oebbRailjet");
		}

		if (line.productName === "ICE" || line.productName === "IC") {
			return this.getCustomLineShape(line.name ?? "ICE", "dbIce");
		}

		if (line.product === "national" || line.product === "nationalExpress") {
			return this.getProductLineShape(line.name, { shape: "pill", type: "outlined" });
		}

		const lineName = this.stringToNormalForm(line.name);
		const lineNumber = this.lineNumberFromLineNameAndProduct(line.name, line.productName ?? "");

		const matchedRow = LineShapeParser.traewellingLineShapesDe.find((lineShapeEntry) => {
			const entryLineName = this.stringToNormalForm(lineShapeEntry.lineName);
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
			this.stringToNormalForm(matchedRow.lineName) === lineName
				? undefined
				: line.productName;
		return {
			linePrefix,
			lineName: matchedRow.lineName,
			background: matchedRow.background,
			text: matchedRow.text,
			border: matchedRow.border,
			shape: matchedRow.shape,
		};
	};
}
