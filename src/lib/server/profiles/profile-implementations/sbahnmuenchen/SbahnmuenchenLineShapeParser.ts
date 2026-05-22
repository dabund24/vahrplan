import { ScopedHafasClientLineShapeParser } from "$lib/server/journey-data/line-shapes/ScopedHafasClientLineShapeParser";
import type { Line } from "hafas-client";
import type { LineShape } from "$lib/server/journey-data/line-shapes/LineShapeParser";

export class SbahnmuenchenLineShapeParser extends ScopedHafasClientLineShapeParser {
	public constructor() {
		super("mvv", {
			ice: { shape: "pill", type: "outlined" },
			"ic-ec": { shape: "pill", type: "outlined" },
		});
	}

	public override getLineShape = (line?: Line): LineShape | undefined => {
		let isPrependProductName = false;
		if (line?.name?.startsWith("Bus ")) {
			line.name = line?.name?.replace("Bus ", "");
			isPrependProductName = true;
		} else if (line?.name?.startsWith("STR ")) {
			line.name = line?.name?.replace("STR ", "");
			isPrependProductName = true;
		}

		const lineShape = this.getLineShapeFromPreparedLine(line);

		if (isPrependProductName && lineShape !== undefined) {
			lineShape.linePrefix = line?.productName;
		}
		return lineShape;
	};

	private getLineShapeFromPreparedLine = (line?: Line): LineShape | undefined => {
		const matchedTraewellingLineShape = super.getLineShape(line);
		if (matchedTraewellingLineShape !== undefined) {
			return matchedTraewellingLineShape;
		}

		if (line?.product === "bus" && line.name?.startsWith("X")) {
			return {
				shape: "rectangle",
				background: { type: "fixed", value: "#4d9380" },
				text: { type: "fixed", value: "#fff" },
				lineName: line.name,
			};
		}
		if (line?.product === "bus" && line.name?.startsWith("N")) {
			return {
				shape: "rectangle",
				background: { type: "fixed", value: "#1c1c1b" },
				text: { type: "fixed", value: "#fab905" },
				lineName: line.name,
			};
		}
		if (line?.product === "bus") {
			return {
				shape: "rectangle",
				background: { type: "fixed", value: "#00556c" },
				text: { type: "fixed", value: "#fff" },
				lineName: line.name ?? "Bus",
			};
		}

		if (line?.name === "U7") {
			return {
				shape: "rectangle",
				background: {
					type: "fixed",
					value: "linear-gradient(to top left, #C3022D 50%, #51832B 50%)",
				},
				text: { type: "fixed", value: "#fff" },
				lineName: "U7"
			};
		}

		if (line?.name === "U8") {
			return {
				shape: "rectangle",
				background: {
					type: "fixed",
					value: "linear-gradient(to top left, #ED6720 50%, #C3022D 50%)",
				},
				text: { type: "fixed", value: "#fff" },
				lineName: "U7",
			};
		}

		if (line?.product === "region") {
			return {
				shape: "rectangle",
				background: { type: "fixed", value: "#1427c5" },
				text: { type: "fixed", value: "#fff" },
				lineName: line.name ?? "R",
			};
		}

		return super.getLineShape(line);
	};
}
