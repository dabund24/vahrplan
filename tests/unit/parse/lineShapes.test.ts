import type { Line } from "hafas-client";
import { expect, test, vi } from "vitest";
import { DbnavLineShapeParser } from "$lib/server/journey-data/hafas-client/DbnavLineShapeParser";
import type { LineShape } from "$lib/server/journey-data/LineShapeParser";

const lineShapeParser = new DbnavLineShapeParser();

async function readLinesCsv(): Promise<string> {
	return (await import("fs")).readFileSync("tests/unit/fixtures/line-shapes.csv").toString();
}

vi.mock("$app/server", () => ({
	read: (): object => ({ text: readLinesCsv })
}));

test("line shapes first entry", () => {
	const hafasLine = {
		type: "line",
		id: "ag-84293",
		fahrtNr: "84293",
		name: "ag RB15",
		public: true,
		adminCode: "A9____",
		productName: "ag",
		mode: "train",
		product: "regional",
		operator: { type: "operator", id: "agilis", name: "agilis" }
	} as const;
	const expected = {
		linePrefix: "ag",
		lineName: "RB 15",
		backgroundColor: "#24b27d",
		textColor: "#ffffff",
		borderColor: undefined,
		shape: "rectangle"
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("line shapes last entry", () => {
	const hafasLine = {
		type: "line",
		id: "str-13575",
		fahrtNr: "13575",
		name: "STR N17",
		public: true,
		adminCode: "nasLVT",
		productName: "STR",
		mode: "train",
		product: "tram",
		operator: undefined
	} as const;
	const expected = {
		linePrefix: "STR",
		lineName: "N17",
		backgroundColor: "#67b337",
		textColor: "#ffffff",
		borderColor: undefined,
		shape: "rectangle"
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test("line shapes all RE 1", () => {
	const values: { hafasLine: Line; expected: LineShape }[] = [
		{
			hafasLine: {
				type: "line",
				id: "re-4102",
				fahrtNr: "4102",
				name: "RE 1",
				public: true,
				adminCode: "800640",
				productName: "RE",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "db-regio-ag-mitte-suwex",
					name: "DB Regio AG Mitte SÜWEX"
				}
			},
			expected: {
				linePrefix: undefined,
				lineName: "RE1",
				backgroundColor: "#be1b40",
				textColor: "#ffffff",
				borderColor: undefined,
				shape: "rectangle-rounded-corner"
			}
		},
		{
			hafasLine: {
				type: "line",
				id: "re-4315",
				fahrtNr: "4315",
				name: "RE 1",
				public: true,
				adminCode: "800155",
				productName: "RE",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "db-regio-ag-nordost",
					name: "DB Regio AG Nordost"
				}
			},
			expected: {
				linePrefix: undefined,
				lineName: "RE1",
				backgroundColor: "#108449",
				textColor: "#ffffff",
				borderColor: undefined,
				shape: "rectangle"
			}
		},
		{
			hafasLine: {
				type: "line",
				id: "re-73736",
				fahrtNr: "73736",
				name: "RE 1",
				public: true,
				adminCode: "OWRE__",
				productName: "RE",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "ostdeutsche-eisenbahn-gmbh",
					name: "Ostdeutsche Eisenbahn GmbH"
				}
			},
			expected: {
				linePrefix: undefined,
				lineName: "RE1",
				backgroundColor: "#e2001a",
				textColor: "#ffffff",
				borderColor: undefined,
				shape: "rectangle"
			}
		},
		{
			hafasLine: {
				type: "line",
				id: "tlx-5681",
				fahrtNr: "5681",
				name: "TLX RE1",
				public: true,
				adminCode: "LDTLX_",
				productName: "TLX",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "trilex-express-die-landerbahn-gmbh-dlb",
					name: "trilex-express - Die Länderbahn GmbH DLB"
				}
			},
			expected: {
				linePrefix: "TLX",
				lineName: "RE1",
				backgroundColor: "#e97b3b",
				textColor: "#ffffff",
				borderColor: undefined,
				shape: "rectangle-rounded-corner"
			}
		},
		{
			hafasLine: {
				type: "line",
				id: "re-19019",
				fahrtNr: "19019",
				name: "RE 1",
				public: true,
				adminCode: "GARE__",
				productName: "RE",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "arverio-baden-wurttemberg",
					name: "Arverio Baden-Württemberg"
				}
			},
			expected: {
				lineName: "RE 1",
				backgroundColor: "#88c946",
				textColor: "#ffffff",
				borderColor: undefined,
				shape: "rectangle"
			}
		},
		{
			hafasLine: {
				type: "line",
				id: "re-4020",
				fahrtNr: "4020",
				name: "RE 1",
				public: true,
				adminCode: "800765",
				productName: "RE",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "db-regio-ag-bayern",
					name: "DB Regio AG Bayern"
				}
			},
			expected: {
				lineName: "RE 1",
				backgroundColor: "#e50000",
				textColor: "#ffffff",
				borderColor: undefined,
				shape: "rectangle"
			}
		},
		{
			hafasLine: {
				type: "line",
				id: "re-63817",
				fahrtNr: "63817",
				name: "RE 1",
				public: true,
				adminCode: "NXRE__",
				productName: "RE",
				mode: "train",
				product: "regional",
				operator: {
					type: "operator",
					id: "national-express",
					name: "National Express"
				}
			},
			expected: {
				lineName: "RE 1",
				backgroundColor: "#ff2d16",
				textColor: "#ffffff",
				borderColor: undefined,
				shape: "rectangle-rounded-corner"
			}
		}
	];
	for (const { hafasLine, expected } of values) {
		const actual = lineShapeParser.getLineShape(hafasLine);
		expect(actual).toEqual(expected);
	}
});

test("line shapes Bus X660", () => {
	const hafasLine = {
		type: "line",
		id: "bus-2315",
		fahrtNr: "2315",
		name: "Bus X660",
		public: true,
		adminCode: "mvvRBU",
		productName: "Bus",
		mode: "bus",
		product: "bus",
		operator: undefined
	} as const;
	const expected = {
		linePrefix: "Bus",
		lineName: "X660",
		backgroundColor: "#8e5c2e",
		textColor: "#ffffff",
		borderColor: undefined,
		shape: "rectangle"
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});

test.skip("line shapes Rufbus N4", () => {
	const hafasLine = {
		type: "line",
		id: "ruf-497",
		fahrtNr: "497",
		name: "RUF N4",
		public: true,
		adminCode: "nas001",
		productName: "RUF",
		mode: "taxi",
		product: "taxi",
		operator: undefined
	} as const;
	const expected = {
		lineName: "Rufbus N4",
		backgroundColor: "#000000",
		textColor: "#ffffff",
		borderColor: undefined,
		shape: "pill"
	};
	const actual = lineShapeParser.getLineShape(hafasLine);
	expect(actual).toEqual(expected);
});
