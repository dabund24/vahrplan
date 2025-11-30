import { read } from "$app/server";
import lineShapesCsv from "*?url";

export type LineShape = {
	linePrefix?: string;
	lineName: string;
	backgroundColor: string;
	textColor: string;
	borderColor?: string;
	shape: "circle" | "hexagon" | "rectangle" | "rectangle-rounded-corner" | "pill" | "trapezoid";
};

export abstract class LineShapeParser {
	private static readonly buildLineShapes = async (): Promise<
		typeof this.traewellingLineShapes
	> => {
		const result: typeof this.traewellingLineShapes = [];

		const csvLines = await this.lineShapeCsvIterator();

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
	};

	private static lineShapeCsvIterator = async (): Promise<Iterable<string>> => {
		const fileContent = await read(lineShapesCsv).text();
		const lines = fileContent.split("\n");
		lines.shift(); // remove first element
		lines.pop(); // remove last element
		return lines;
	};

	protected static traewellingLineShapes: (LineShape & {
		operatorCode?: string;
		lineId: string;
	})[] = [];

	static {
		void this.buildLineShapes().then((lineShapes) => (this.traewellingLineShapes = lineShapes));
	}

	public abstract readonly getLineShape: (lineDetails: never) => LineShape | undefined;
}
