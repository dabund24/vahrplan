import type { Line } from "hafas-client";
import {
	type LineShape,
	LineShapeParser,
} from "$lib/server/journey-data/line-shapes/LineShapeParser";

export class OebbLineShapeParser extends LineShapeParser<Line> {
	public override getLineShape = (line?: Line): LineShape | undefined => {
		// Fix weird line names
		const lineName = line?.name?.split("(Zug-Nr.")[0].trim() ?? "";

		if (
			line?.product === "nationalExpress" &&
			(line.productName === "RJ" || line?.productName === "RJX")
		) {
			return this.getCustomLineShape(lineName, "oebbRailjet");
		}

		if (line?.product === "national" && line.productName === "EC") {
			return this.getCustomLineShape(lineName, "eurocity");
		}

		if (line?.product === "nationalExpress" || line?.product === "national") {
			return this.getProductLineShape(lineName, { shape: "pill", type: "outlined" });
		}

		if (line?.product === "interregional" && line.productName === "NJ") {
			return this.getCustomLineShape(lineName, "oebbNightjet");
		}
		if (line?.product === "interregional" && line.productName === "EN") {
			return this.getCustomLineShape(lineName, "eurocity");
		}
		if (line?.product === "interregional" && line.productName === "WB") {
			return this.getCustomLineShape(lineName, "westbahn");
		}

		const idWithShortOperatorName: [string, string][] = [
			["-obb-vor-", "vor-oebb"],
			["vor-21-", "vor-wl"],
		];

		const [_, shortOperatorName] = idWithShortOperatorName.find(([idInfix, _]) =>
			line?.id?.includes(idInfix),
		) ?? [undefined, undefined];
		const matchedTraevellingLineShape = this.findScopedLine(shortOperatorName, lineName);
		if (matchedTraevellingLineShape !== undefined) {
			return matchedTraevellingLineShape;
		}

		if (line?.product === "suburban") {
			return {
				shape: "rectangle-rounded-corner",
				lineName,
				text: { type: "fixed", value: "#fff" },
				background: { type: "fixed", value: "#0097d5" },
			};
		}

		if (
			line?.product === "regional" &&
			(line.productName === "CJX" || line.productName === "REX")
		) {
			return this.getProductLineShape(lineName, { shape: "rectangle", type: "outlined" });
		}

		return this.getProductLineShape(lineName, { shape: "rectangle", type: "filled" });
	};

	private findScopedLine = (
		shortOperatorName: string | undefined,
		lineName: string,
	): LineShape | undefined => {
		if (shortOperatorName === undefined) {
			return undefined;
		}
		const normalizedLineName = this.stringToNormalForm(lineName ?? "");

		const matchedTraevellingLineShape = OebbLineShapeParser.traewellingLineShapesAt.find(
			(shape) => {
				return (
					shortOperatorName === shape.shortOperatorName &&
					normalizedLineName === this.stringToNormalForm(shape.lineName)
				);
			},
		);

		if (matchedTraevellingLineShape === undefined) {
			return undefined;
		}

		return matchedTraevellingLineShape;
	};
}
