import { expect, test, vi } from "vitest";
import { BvgLineShapeParser } from "$lib/server/journey-data/line-shapes/BvgLineShapeParser";

const lineShapeParser = new BvgLineShapeParser();

vi.mock("$app/server", async () => {
	const fs = await import("fs");
	return {
		read: (): object => ({
			text: () => fs.readFileSync("tests/unit/fixtures/line-shapes.csv").toString(),
		}),
	};
});

test("metro bus", () => {
	const hafasLine = {
		type: "line",
		id: "de-vbb-11000000-bus-m19",
		fahrtNr: "104241",
		name: "M19",
		public: true,
		adminCode: "BVB---",
		productName: "Bus",
		mode: "bus",
		product: "bus",
		operator: {
			type: "operator",
			id: "berliner-verkehrsbetriebe",
			name: "Berliner Verkehrsbetriebe",
		},
	} as const;
	const expected = {
		lineName: "M19",
		background: { type: "preset", value: "product" },
		text: { type: "preset", value: "background" },
		shape: "pill",
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("express bus", () => {
	const hafasLine = {
		type: "line",
		id: "de-vbb-11000000-bus-x7",
		fahrtNr: "170757",
		name: "X7",
		public: true,
		adminCode: "BVB---",
		productName: "Bus",
		mode: "bus",
		product: "bus",
		operator: {
			type: "operator",
			id: "berliner-verkehrsbetriebe",
			name: "Berliner Verkehrsbetriebe",
		},
	} as const;
	const expected = {
		lineName: "X7",
		background: { type: "preset", value: "background" },
		text: { type: "preset", value: "product" },
		border: { type: "preset", value: "product" },
		shape: "pill",
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("s bahn", () => {
	const hafasLine = {
		type: "line",
		id: "de-vbb-11000000-s-bahn-s2",
		fahrtNr: "15478",
		name: "S2",
		public: true,
		adminCode: "DBS---",
		productName: "S",
		mode: "train",
		product: "suburban",
		operator: {
			type: "operator",
			id: "s-bahn-berlin-gmbh",
			name: "S-Bahn Berlin GmbH",
		},
	} as const;
	const expected = {
		lineName: "S2",
		background: { type: "fixed", value: "#047939" },
		text: { type: "fixed", value: "#ffffff" },
		shape: "pill",
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("regional", () => {
	const hafasLine = {
		type: "line",
		id: "de-vbb-11000000-r-bahn-fex",
		fahrtNr: "1142",
		name: "FEX",
		public: true,
		adminCode: "800165",
		productName: "RE",
		mode: "train",
		product: "regional",
		operator: { type: "operator", id: "db-regio-ag", name: "DB Regio AG" },
	} as const;
	const expected = {
		lineName: "FEX",
		background: { type: "preset", value: "product" },
		text: { type: "preset", value: "background" },
		shape: "rectangle",
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("long distance", () => {
	const hafasLine = {
		type: "line",
		id: "ice-1603",
		fahrtNr: "1603",
		name: "ICE 1603",
		public: true,
		adminCode: "N80---",
		productName: "ICE",
		mode: "train",
		product: "express",
		operator: { type: "operator", id: "db-regio-ag", name: "DB Regio AG" },
	} as const;
	const expected = {
		lineName: "ICE 1603",
		background: { type: "preset", value: "background" },
		text: { type: "preset", value: "product" },
		border: { type: "preset", value: "product" },
		shape: "pill",
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});
