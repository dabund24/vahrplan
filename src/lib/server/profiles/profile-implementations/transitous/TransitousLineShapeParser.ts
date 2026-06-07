import {
	type LineShape,
	LineShapeParser,
} from "$lib/server/journey-data/line-shapes/LineShapeParser";
import type { Line } from "hafas-client";
import { TransitousProfile } from "$lib/server/profiles/profile-implementations/transitous/transitousProfile";

export class TransitousLineShapeParser extends LineShapeParser<Line> {
	override getLineShape(lineDetails: Line | undefined): LineShape | undefined {
		if (lineDetails == undefined) {
			return undefined;
		}

		type CustomProductKey = Parameters<typeof this.getCustomLineShape>[1];
		const hardCodedProducts: {
			productNames: string[];
			operators?: (keyof typeof TransitousProfile.operatorNames)[];
			customProductKey: CustomProductKey;
		}[] = [
			{
				productNames: ["ICE"],
				operators: ["db", "oebb", "sbb", "ns"],
				customProductKey: "dbIce",
			},
			{
				productNames: ["IC"],
				operators: ["db"],
				customProductKey: "dbIce",
			},
			{
				productNames: ["RJ", "RJX"],
				operators: ["db", "oebb", "sbb"],
				customProductKey: "oebbRailjet",
			},
			{ productNames: ["EC", "ECE", "EN"], customProductKey: "eurocity" },
			{ productNames: ["NJ", "N"], operators: ["oebb"], customProductKey: "oebbNightjet" },
			{
				productNames: ["FLX", "FlixBus"],
				operators: ["flix"],
				customProductKey: "flix",
			},
			{ productNames: ["WB"], operators: ["westbahn"], customProductKey: "westbahn" },
		];
		for (const { productNames, operators, customProductKey } of hardCodedProducts) {
			if (
				productNames.includes(lineDetails.productName ?? "") &&
				(operators === undefined ||
					operators.some((operator) =>
						TransitousProfile.operatorNames[operator].includes(
							lineDetails.operator?.name ?? "",
						),
					))
			) {
				return this.getCustomLineShape(
					lineDetails.name ?? lineDetails.productName ?? "",
					customProductKey,
				);
			}
		}

		const res = Object.values(LineShapeParser.traewellingLineShapes)
			.flat()
			.find(
				({ gtfsAgencyId, gtfsAgencyName, lineName }) =>
					gtfsAgencyId === lineDetails.operator?.id &&
					gtfsAgencyName === lineDetails.operator?.name &&
					this.stringToNormalForm(lineName) ===
						this.stringToNormalForm(lineDetails.name ?? ""),
			);
		if (res === undefined) {
			return res;
		}

		return {
			lineName: res.lineName,
			text: res.text,
			background: res.background,
			border: res.border,
			shape: res.shape,
		};
	}
}
