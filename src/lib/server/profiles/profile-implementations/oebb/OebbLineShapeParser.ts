import type { Line } from "hafas-client";
import {
	type LineShape,
	LineShapeParser,
} from "$lib/server/journey-data/line-shapes/LineShapeParser";

export class OebbLineShapeParser extends LineShapeParser<Line> {
	private readonly matchIdInfixWithShortOperatorName: [string, string][] = [
		["-obb-vor-", "vor-oebb"],
		["vor-21-", "vor-wl"],
		["ktn-1-", "vvk-kmg"],
	];

	private readonly findTraewellingLineShape = ({
		name: lineName = "",
		productName = "",
		id: lineId = "",
	}: Line): LineShape | undefined => {
		const [_, foundShortOperatorName] = this.matchIdInfixWithShortOperatorName.find(
			([idInfix, _]) => lineId.includes(idInfix),
		) ?? [undefined, undefined];

		if (foundShortOperatorName === undefined) {
			return undefined;
		}
		const normalizedLineName = this.stringToNormalForm(lineName);
		const lineNumber = this.lineNumberFromLineNameAndProduct(lineName, productName ?? "");

		const matchedRow = OebbLineShapeParser.traewellingLineShapesAt
			.filter(({ shortOperatorName }) => foundShortOperatorName === shortOperatorName)
			.find(({ lineName: shapeLineName }) => {
				const normalizedShapeLineName = this.stringToNormalForm(shapeLineName);
				return (
					normalizedLineName === normalizedShapeLineName ||
					lineNumber === normalizedShapeLineName
				);
			});

		if (matchedRow === undefined) {
			return undefined;
		}

		const linePrefix =
			this.stringToNormalForm(matchedRow.lineName) === normalizedLineName
				? undefined
				: productName;

		return {
			linePrefix,
			lineName: matchedRow.lineName,
			background: matchedRow.background,
			text: matchedRow.text,
			border: matchedRow.border,
			shape: matchedRow.shape,
		};
	};

	public override getLineShape = (line?: Line): LineShape | undefined => {
		if (line === undefined) {
			return undefined;
		}

		// Fix weird line names
		const lineName = line.name?.split("(Zug-Nr.")?.[0]?.trim() ?? "";

		if (
			line.product === "nationalExpress" &&
			(line.productName === "RJ" || line.productName === "RJX")
		) {
			return this.getCustomLineShape(lineName, "oebbRailjet");
		}

		if (line.product === "national" && line.productName === "EC") {
			return this.getCustomLineShape(lineName, "eurocity");
		}

		if (line.product === "nationalExpress" || line.product === "national") {
			return this.getProductLineShape(lineName, { shape: "pill", type: "outlined" });
		}

		if (line.product === "interregional" && line.productName === "NJ") {
			return this.getCustomLineShape(lineName, "oebbNightjet");
		}
		if (line.product === "interregional" && line.productName === "EN") {
			return this.getCustomLineShape(lineName, "eurocity");
		}
		if (line.product === "interregional" && line.productName === "WB") {
			return this.getCustomLineShape(lineName, "westbahn");
		}

		const matchedTraevellingLineShape = this.findTraewellingLineShape(line);
		if (matchedTraevellingLineShape !== undefined) {
			return matchedTraevellingLineShape;
		}

		if (line.product === "suburban") {
			return {
				shape: "rectangle-rounded-corner",
				lineName,
				text: { type: "fixed", value: "#fff" },
				background: { type: "fixed", value: "#0097d5" },
			};
		}

		if (
			line.product === "regional" &&
			(line.productName === "CJX" || line.productName === "REX")
		) {
			return this.getProductLineShape(lineName, { shape: "rectangle", type: "outlined" });
		}

		return this.getProductLineShape(lineName, { shape: "rectangle", type: "filled" });
	};
}
