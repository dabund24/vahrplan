import { ScopedHafasClientLineShapeParser } from "$lib/server/journey-data/line-shapes/ScopedHafasClientLineShapeParser";
import type { Line } from "hafas-client";
import type { LineShape } from "$lib/server/journey-data/line-shapes/LineShapeParser";

export class BvgLineShapeParser extends ScopedHafasClientLineShapeParser {
	public constructor() {
		super("vbb", {
			express: { shape: "pill", type: "outlined" },
			regional: { shape: "rectangle", type: "filled" },
			bus: { shape: "pill", type: "filled" },
		});
	}

	public override getLineShape = (line?: Line): LineShape | undefined => {
		if (line?.product === "bus" && (line.name?.startsWith("N") || line.name?.startsWith("X"))) {
			return this.getProductLineShape(line.name, { shape: "pill", type: "outlined" });
		}
		return super.getLineShape(line);
	};
}
