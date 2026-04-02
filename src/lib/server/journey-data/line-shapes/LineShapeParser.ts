import { read } from "$app/server";
import lineShapesDeCsv from "../../../../../assets/line-shapes-de.csv?url";
import lineShapesAtCsv from "../../../../../assets/line-shapes-at.csv?url";
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

type TraewellingLineShapeDe = LineShape & {
	shortOperatorName: string;
	operatorCode?: string;
	lineId: string;
	["delfiAgencyID"]: string;
	delfiAgencyName: string;
};

type TraewellingLineShapeAt = LineShape & {
	shortOperatorName: string;
	gtfsAgencyId: string;
	gtfsAgencyName: string;
};

const traewellingLineShapesDe = await buildTraewellingLineShapesDe();
const traewellingLineShapesAt = await buildTraewellingLineShapesAt();

async function buildTraewellingLineShapesDe(): Promise<TraewellingLineShapeDe[]> {
	const result: TraewellingLineShapeDe[] = [];

	const csvLines = await lineShapeCsvIterator(lineShapesDeCsv);

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

async function buildTraewellingLineShapesAt(): Promise<TraewellingLineShapeAt[]> {
	const result: TraewellingLineShapeAt[] = [];

	const csvLines = await lineShapeCsvIterator(lineShapesAtCsv);

	for (const line of csvLines) {
		const [
			shortOperatorName,
			lineName,
			backgroundColor,
			textColor,
			borderColor,
			shape,
			_wikidataQid,
			gtfsAgencyId,
			gtfsAgencyName,
		] = line.split(",");

		const lineCodeEntry = {
			shortOperatorName,
			lineName,
			background: { type: "fixed", value: backgroundColor },
			text: { type: "fixed", value: textColor },
			border:
				borderColor === "" ? undefined : ({ type: "fixed", value: borderColor } as const),
			gtfsAgencyId,
			gtfsAgencyName,
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
	protected static traewellingLineShapesDe: TraewellingLineShapeDe[] = traewellingLineShapesDe;
	protected static traewellingLineShapesAt: TraewellingLineShapeAt[] = traewellingLineShapesAt;

	private static readonly customLineShapes = {
		flix: {
			shape: "pill",
			text: { type: "fixed", value: "#000" },
			background: { type: "fixed", value: "#97d700" },
		},
		westbahn: {
			shape: "pill",
			text: { type: "fixed", value: "#fff" },
			background: { type: "fixed", value: "#0085ca" },
			border: { type: "fixed", value: "#c4d600" },
		},
		oebbRailjet: {
			shape: "pill",
			background: { type: "fixed", value: "#ab0020" },
			text: { type: "fixed", value: "#fff" },
		},
		oebbNightjet: {
			shape: "pill",
			border: { type: "fixed", value: "#e2002a" },
			background: { type: "fixed", value: "#221d47" },
			text: { type: "fixed", value: "#fff" },
		},
		eurocity: {
			shape: "pill",
			border: { type: "fixed", value: "#9d740f" },
			background: { type: "fixed", value: "#3333cc" },
			text: { type: "fixed", value: "#fff" },
		},
	} satisfies Record<string, Omit<LineShape, "lineName">>;

	protected readonly stringToNormalForm = (str: string): string =>
		str.toLowerCase().replaceAll(" ", "");

	protected readonly getProductLineShape = (
		lineName: string,
		conf: { shape: LineShape["shape"]; type: "filled" | "outlined" },
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

	protected readonly getCustomLineShape = (
		lineName: string,
		customProduct: keyof typeof LineShapeParser.customLineShapes,
	): LineShape => ({ ...LineShapeParser.customLineShapes[customProduct], lineName });

	/**
	 * parse line shape details from an object
	 */
	// eslint-disable-next-line no-restricted-syntax
	public abstract getLineShape(lineDetails: T | undefined): LineShape | undefined;
}
