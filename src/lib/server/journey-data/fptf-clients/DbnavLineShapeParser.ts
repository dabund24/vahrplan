import { type LineShape, LineShapeParser } from "$lib/server/journey-data/LineShapeParser";
import type { Line } from "hafas-client";

export class DbnavLineShapeParser extends LineShapeParser<Line> {
	public getWestbahnLineShape = (lineName: string): LineShape => ({
		shape: "pill",
		lineName,
		text: { type: "fixed", value: "#fff" },
		background: { type: "fixed", value: "#0085ca" },
		border: { type: "fixed", value: "#c4d600" },
	});

	public getFlixtrainLineShape = (lineName: string): LineShape => ({
		shape: "pill",
		lineName,
		text: { type: "fixed", value: "#000" },
		background: { type: "fixed", value: "#97d700" },
	});

	public override getLineShape = (line?: Line): LineShape | undefined => {
		if (line?.name === undefined) {
			return undefined;
		}

		if (line.product === "national" || line.product === "nationalExpress") {
			return this.getLongDistanceLineShape(line.name);
		}
		if (line.productName === "WB") {
			return this.getWestbahnLineShape(line.name ?? "WB");
		}
		if (line.productName === "FLX") {
			return this.getFlixtrainLineShape(line.name ?? "FLX");
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
			background: matchedRow.background,
			text: matchedRow.text,
			border: matchedRow.border,
			shape: matchedRow.shape,
		};
	};
}
