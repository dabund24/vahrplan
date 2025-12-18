import { LineShapeParser } from "$lib/server/journey-data/line-shapes/LineShapeParser";

export abstract class ScopedLineShapeParser<T> extends LineShapeParser<T> {
	protected scopedLineShapes: Record<
		string,
		(typeof ScopedLineShapeParser.traewellingLineShapes)[number]
	> = {};

	protected constructor(operatorPrefix: string) {
		super();
		const filteredLineShapes = ScopedLineShapeParser.traewellingLineShapes.filter(
			({ shortOperatorName }) => shortOperatorName.startsWith(operatorPrefix),
		);

		for (const lineShape of filteredLineShapes) {
			this.scopedLineShapes[this.stringToNormalForm(lineShape.lineName)] = lineShape;
		}
	}
}
