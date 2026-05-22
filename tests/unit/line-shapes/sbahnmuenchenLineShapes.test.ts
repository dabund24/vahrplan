import { expect, test, vi } from "vitest";
import { SbahnmuenchenLineShapeParser } from "$lib/server/profiles/profile-implementations/sbahnmuenchen/SbahnmuenchenLineShapeParser";

const lineShapeParser = new SbahnmuenchenLineShapeParser();

vi.mock("$app/server", async () => {
	const fs = await import("fs");
	return {
		read: (): object => ({
			text: () => fs.readFileSync("tests/unit/fixtures/line-shapes-de.csv").toString(),
		}),
	};
});

test("bus", () => {
	const hafasLine = {
		type: "line",
		id: "5-mvvrbu-x660",
		fahrtNr: "2827",
		name: "Bus X660",
		public: true,
		adminCode: "mvvRBU",
		productName: "Bus",
		mode: "bus",
		product: "bus",
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "#8e5c2e",
		},
		border: undefined,
		lineName: "X660",
		linePrefix: "Bus",
		shape: "rectangle",
		text: {
			type: "fixed",
			value: "#ffffff",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("tram", () => {
	const hafasLine = {
		type: "line",
		id: "8-swm002-19",
		fahrtNr: "43793",
		name: "STR 19",
		public: true,
		adminCode: "swm002",
		productName: "STR",
		mode: "train",
		product: "tram",
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "#ee1c25",
		},
		border: undefined,
		lineName: "19",
		linePrefix: "STR",
		shape: "rectangle",
		text: {
			type: "fixed",
			value: "#ffffff",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("u6", () => {
	const hafasLine = {
		type: "line",
		id: "7-swm001-u6",
		fahrtNr: "25964",
		name: "U6",
		public: true,
		adminCode: "swm001",
		productName: "U",
		mode: "train",
		product: "ubahn",
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "#0065ae",
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

test("u7", () => {
	const hafasLine = {
		type: "line",
		id: "7-swm001-u7",
		fahrtNr: "33631",
		name: "U7",
		public: true,
		adminCode: "swm001",
		productName: "U",
		mode: "train",
		product: "ubahn",
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "linear-gradient(to top left, #C3022D 50%, #51832B 50%)",
		},
		lineName: "U7",
		shape: "rectangle",
		text: {
			type: "fixed",
			value: "#fff",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("u8", () => {
	const hafasLine = {
		type: "line",
		id: "7-swm001-u8",
		fahrtNr: "35615",
		name: "U8",
		public: true,
		adminCode: "swm001",
		productName: "U",
		mode: "train",
		product: "ubahn",
	} as const;
	const expected = {
		background: {
			type: "fixed",
			value: "linear-gradient(to top left, #ED6720 50%, #C3022D 50%)",
		},
		lineName: "U8",
		shape: "rectangle",
		text: {
			type: "fixed",
			value: "#fff",
		},
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});
