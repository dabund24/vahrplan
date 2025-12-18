import { type LineShape } from "$lib/server/journey-data/line-shapes/LineShapeParser";
import type { Line } from "hafas-client";
import { ScopedLineShapeParser } from "$lib/server/journey-data/ScopedLineShapeParser";

type OverrideColorProducts = Record<
	string,
	{
		shape: LineShape["shape"];
		type: "filled" | "outlined";
	}
>;

export class ScopedHafasClientLineShapeParser extends ScopedLineShapeParser<Line> {
	private readonly overrideColorProducts: OverrideColorProducts;

	constructor(operatorPrefix: string, overrideColorProducts: OverrideColorProducts) {
		super(operatorPrefix);

		this.overrideColorProducts = overrideColorProducts;
	}

	public override getLineShape(line?: Line): LineShape | undefined {
		if (line === undefined) {
			return undefined;
		}

		const customShape = this.overrideColorProducts[line.product ?? ""];
		if (customShape !== undefined) {
			return this.getProductLineShape(line.name ?? line.productName ?? "", customShape);
		}

		const matchedLineShape = this.scopedLineShapes[this.stringToNormalForm(line.name ?? "")];
		if (matchedLineShape === undefined) {
			return undefined;
		}

		return {
			lineName: matchedLineShape.lineName,
			linePrefix: matchedLineShape.linePrefix,
			background: matchedLineShape.background,
			text: matchedLineShape.text,
			border: matchedLineShape.border,
			shape: matchedLineShape.shape,
		};
	}
}
