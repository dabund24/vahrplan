import { expect, test, vi } from "vitest";
import { OebbLineShapeParser } from "$lib/server/profiles/profile-implementations/oebb/OebbLineShapeParser";

const lineShapeParser = new OebbLineShapeParser();

vi.mock("$app/server", async () => {
	const fs = await import("fs");
	return {
		read: (): object => ({
			text: () => fs.readFileSync("tests/unit/fixtures/line-shapes-at.csv").toString(),
		}),
	};
});

test("klagenfurt c", () => {
	const hafasLine = {
		type: "line",
		id: "ktn-1-a",
		fahrtNr: "903960",
		name: "Bus A",
		public: true,
		adminCode: "k0100_",
		productName: "Bus",
		mode: "bus",
		product: "bus",
		operator: {
			type: "operator",
			id: "kmg-klagenfurt-mobil-gmbh",
			name: "KMG | Klagenfurt Mobil GmbH",
		},
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "#157450",
		},
		border: undefined,
		lineName: "A",
		linePrefix: "Bus",
		shape: "circle",
		text: {
			type: "fixed",
			value: "#ffffff",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("s bahn", () => {
	const hafasLine = {
		type: "line",
		id: "at-obb-ktn-s4",
		fahrtNr: "4230",
		name: "S 4 (Zug-Nr. 4230)",
		public: true,
		adminCode: "81____",
		productName: "S",
		mode: "train",
		product: "suburban",
		operator: { type: "operator", id: "nahreisezug", name: "Nahreisezug" },
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "#0097d5",
		},
		lineName: "S 4",
		shape: "rectangle-rounded-corner",
		text: {
			type: "fixed",
			value: "#fff",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("vienna u6", () => {
	const hafasLine = {
		type: "line",
		id: "vor-21-u6",
		fahrtNr: "919824",
		name: "U6",
		public: true,
		adminCode: "v04WL_",
		productName: "U",
		mode: "train",
		product: "subway",
		operator: {
			type: "operator",
			id: "wiener-linien-gmbh-co-kg",
			name: "Wiener Linien GmbH & Co KG",
		},
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "#9d6830",
		},
		border: undefined,
		lineName: "U6",
		linePrefix: undefined,
		shape: "rectangle",
		text: {
			type: "fixed",
			value: "#ffffff",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("rjx", () => {
	const hafasLine = {
		type: "line",
		id: "rjx-762",
		fahrtNr: "762",
		name: "RJX 762",
		public: true,
		adminCode: "81____",
		productName: "RJX",
		mode: "train",
		product: "nationalExpress",
		operator: { type: "operator", id: "nahreisezug", name: "Nahreisezug" },
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "#ab0020",
		},
		lineName: "RJX 762",
		shape: "pill",
		text: {
			type: "fixed",
			value: "#fff",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("rex", () => {
	const hafasLine = {
		type: "line",
		id: "at-obb-oov-rex33",
		fahrtNr: "6376",
		name: "REX 33 (Zug-Nr. 6376)",
		public: true,
		adminCode: "81____",
		productName: "REX",
		mode: "train",
		product: "regional",
		operator: { type: "operator", id: "nahreisezug", name: "Nahreisezug" },
	} as const;
	const expected = {
		background: {
			type: "preset",
			value: "background",
		},
		border: {
			type: "preset",
			value: "product",
		},
		lineName: "REX 33",
		shape: "rectangle",
		text: {
			type: "preset",
			value: "product",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});
