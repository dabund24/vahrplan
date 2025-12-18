import { read } from "$app/server";
import lineShapesCsv from "../../../../../assets/line-shapes.csv?url";
import type { Settings } from "$lib/state/settingStore";

type PresetColor = "product" | "background" | "foreground" | Settings["general"]["color"];

export type LineShape = {
	linePrefix?: string;
	lineName: string;
	background: { type: "fixed" | "svg"; value: string } | { type: "preset"; value: PresetColor };
	text: { type: "fixed"; value: string } | { type: "preset"; value: PresetColor };
	border?: { type: "fixed"; value: string } | { type: "preset"; value: PresetColor };
	shape: "circle" | "hexagon" | "rectangle" | "rectangle-rounded-corner" | "pill" | "trapezoid";
};

type TraewellingLineShape = LineShape & {
	shortOperatorName: string;
	operatorCode?: string;
	lineId: string;
	["delfiAgencyID"]: string;
	delfiAgencyName: string;
};

const traewellingLineShapes = await buildTraewellingLineShapes();

async function buildTraewellingLineShapes(): Promise<TraewellingLineShape[]> {
	const result: TraewellingLineShape[] = [];

	const csvLines = await lineShapeCsvIterator(lineShapesCsv);

	for (const line of csvLines) {
		const [
			shortOperatorName,
			lineName,
			operatorCode,
			lineId,
			backgroundColor,
			textColor,
			borderColor,
			shape,
			_wikidataQid,
			delfiAgencyId,
			delfiAgencyName,
		] = line.split(",");

		const lineCodeEntry = {
			shortOperatorName,
			lineName,
			operatorCode: operatorCode === "" ? undefined : operatorCode,
			lineId,
			background: { type: "fixed", value: backgroundColor },
			text: { type: "fixed", value: textColor },
			border:
				borderColor === "" ? undefined : ({ type: "fixed", value: borderColor } as const),
			["delfiAgencyID"]: delfiAgencyId,
			delfiAgencyName,
			shape: shape as LineShape["shape"],
		} as const;
		result.push(lineCodeEntry);
	}

	return result;
}

/**
 * iterate over csv
 * @param route
 */
async function lineShapeCsvIterator(route: string): Promise<Iterable<string>> {
	const fileContent = await read(route).text();
	const lines = fileContent.split("\n");
	lines.shift(); // remove first element
	lines.pop(); // remove last element
	return lines;
}

/**
 * extend to parse line shapes
 * @typeParam T - the type line details should be parsed from
 */
export abstract class LineShapeParser<T> {
	protected static traewellingLineShapes: TraewellingLineShape[] = traewellingLineShapes;

	protected readonly stringToNormalForm = (str: string): string =>
		str.toLowerCase().replaceAll(" ", "");

	protected readonly getProductLineShape = (
		lineName: string,
		conf: {
			shape: LineShape["shape"];
			type: "filled" | "outlined";
		},
	): LineShape =>
		conf.type === "filled"
			? {
					lineName,
					background: { type: "preset", value: "product" },
					text: { type: "preset", value: "background" },
					shape: conf.shape,
				}
			: {
					lineName,
					background: { type: "preset", value: "background" },
					text: { type: "preset", value: "product" },
					border: { type: "preset", value: "product" },
					shape: conf.shape,
				};

	/**
	 * parse line shape details from an object
	 */
	// eslint-disable-next-line no-restricted-syntax
	public abstract getLineShape(lineDetails: T | undefined): LineShape | undefined;
}
