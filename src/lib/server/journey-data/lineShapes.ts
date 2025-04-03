import type { Line } from "hafas-client";
import lineShapesCsv from "/assets/line-shapes.csv?url";
import { read } from "$app/server";

export type LineShape = {
	linePrefix?: string;
	lineName: string;
	backgroundColor: string;
	textColor: string;
	borderColor?: string;
	shape: "circle" | "hexagon" | "rectangle" | "rectangle-rounded-corner" | "pill" | "trapezoid";
};

const lineShapes: (LineShape & { operatorCode?: string; lineId: string })[] =
	await buildLineShapes();

async function buildLineShapes(): Promise<typeof lineShapes> {
	const result: typeof lineShapes = [];

	const csvLines = await lineShapeCsvIterator();

	for (const line of csvLines) {
		const [
			_shortOperatorName,
			lineName,
			operatorCode,
			lineId,
			backgroundColor,
			textColor,
			borderColor,
			shape,
			_wikidataQid
		] = line.split(",");

		const lineCodeEntry = {
			lineName,
			operatorCode: operatorCode === "" ? undefined : operatorCode,
			lineId,
			backgroundColor,
			textColor,
			borderColor: borderColor === "" ? undefined : borderColor,
			shape: shape as LineShape["shape"]
		};
		result.push(lineCodeEntry);
	}

	return result;
}

async function lineShapeCsvIterator(): Promise<Iterable<string>> {
	const fileContent = await read(lineShapesCsv).text();
	const lines = fileContent.split("\n");
	lines.shift(); // remove first element
	lines.pop(); // remove last element
	return lines;
}

export function getLineShape(line?: Line): LineShape | undefined {
	if (line?.name === undefined) {
		return undefined;
	}
	const lineName = line.name.toLowerCase().replaceAll(" ", "");
	const lineNumber = lineName.replace(line.productName?.toLowerCase() ?? "", "");

	const matchedRow = lineShapes.find((lineShapeEntry) => {
		const entryLineName = lineShapeEntry.lineName.toLowerCase().replaceAll(" ", "");
		const isLineNameMatch = entryLineName === lineName || entryLineName === lineNumber;
		if (!isLineNameMatch) {
			return false;
		}

		const isAdminCodeMatch =
			line.adminCode !== undefined &&
			lineShapeEntry.lineId.includes(`-${line.adminCode.toLowerCase()}-`);
		const isOperatorCodeMatch =
			line.operator?.id !== undefined && lineShapeEntry.operatorCode === line.operator?.id;

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
}
