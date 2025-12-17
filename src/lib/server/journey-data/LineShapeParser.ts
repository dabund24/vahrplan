import { read } from "$app/server";
import lineShapesCsv from "../../../../assets/line-shapes.csv?url";
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

/**
 * extend to parse line shapes
 * @typeParam T - the type line details should be parsed from
 */
export abstract class LineShapeParser<T> {
	private static readonly buildTraewellingLineShapes = async (): Promise<
		typeof this.traewellingLineShapes
	> => {
		const result: typeof this.traewellingLineShapes = [];

		const csvLines = await this.lineShapeCsvIterator(lineShapesCsv);

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
				_wikidataQid,
				delfiAgencyId,
				delfiAgencyName,
			] = line.split(",");

			const lineCodeEntry = {
				lineName,
				operatorCode: operatorCode === "" ? undefined : operatorCode,
				lineId,
				background: { type: "fixed", value: backgroundColor },
				text: { type: "fixed", value: textColor },
				border:
					borderColor === ""
						? undefined
						: ({ type: "fixed", value: borderColor } as const),
				["delfiAgencyID"]: delfiAgencyId,
				delfiAgencyName,
				shape: shape as LineShape["shape"],
			} as const;
			result.push(lineCodeEntry);
		}

		return result;
	};

	/**
	 * iterate over csv
	 * @param route
	 */
	private static lineShapeCsvIterator = async (route: string): Promise<Iterable<string>> => {
		const fileContent = await read(route).text();
		const lines = fileContent.split("\n");
		lines.shift(); // remove first element
		lines.pop(); // remove last element
		return lines;
	};

	protected static traewellingLineShapes: (LineShape & {
		operatorCode?: string;
		lineId: string;
		["delfiAgencyID"]: string;
		delfiAgencyName: string;
	})[] = [];

	static {
		void this.buildTraewellingLineShapes().then(
			(lineShapes) => (this.traewellingLineShapes = lineShapes),
		);
	}

	protected readonly getLongDistanceLineShape = (lineName: string): LineShape => ({
		lineName,
		background: { type: "preset", value: "background" },
		text: { type: "preset", value: "product" },
		border: { type: "preset", value: "product" },
		shape: "pill",
	});

	protected readonly getProductLineShape = (
		lineName: string,
		shape: LineShape["shape"],
	): LineShape => ({
		lineName,
		background: { type: "preset", value: "product" },
		text: { type: "preset", value: "background" },
		shape,
	});

	/**
	 * parse line shape details from an object
	 */
	public abstract readonly getLineShape: (lineDetails: T | undefined) => LineShape | undefined;
}
