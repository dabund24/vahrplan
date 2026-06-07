import { expect, test, vi } from "vitest";
import { TransitiousLineShapeParser } from "$lib/server/profiles/profile-implementations/transitious/TransitiousLineShapeParser";

const lineShapeParser = new TransitiousLineShapeParser();

vi.mock("$app/server", async () => {
	const fs = await import("fs");
	return {
		read: (route: string): object => ({
			text: () =>
				fs.readFileSync(`tests/unit/fixtures/${route.split("/").at(-1)}`).toString(),
		}),
	};
});

test("RE25 DE", () => {
	const fptfLine = {
		type: "line",
		id: "20260608-10-23-de-delfi-3224972367",
		fahrtNr: "de-DELFI_3224972367",
		name: "RE25",
		public: true,
		mode: "train",
		product: "regional",
		productName: "RE",
		operator: {
			type: "operator",
			id: "10837",
			name: "alex - Die Länderbahn GmbH DLB",
		},
	} as const;
	const expected = {
		lineName: "RE 25",
		text: { type: "fixed", value: "#ffffff" },
		background: { type: "fixed", value: "#006666" },
		border: undefined,
		shape: "rectangle",
	};
	const actual = lineShapeParser.getLineShape(fptfLine);
	expect(actual).toEqual(expected);
});

test("U1 AT", () => {
	const fptfLine = {
		type: "line",
		id: "20260608-06-19-at-pta-eastern-region-flex-2026-12305-t8-21-u1-j26-1-5-r",
		fahrtNr: "at-PTA-Eastern-Region-Flex-2026_12305.T8.21-U1-j26-1.5.R",
		name: "U1",
		public: true,
		mode: "train",
		product: "subway",
		productName: "U",
		operator: { type: "operator", id: "04", name: "Wiener Linien GmbH & Co KG" },
	} as const;
	const expected = {
		lineName: "U1",
		text: { type: "fixed", value: "#ffffff" },
		background: { type: "fixed", value: "#e3000f" },
		border: undefined,
		shape: "rectangle",
	};
	const actual = lineShapeParser.getLineShape(fptfLine);
	expect(actual).toEqual(expected);
});

test("S31 CH", () => {
	const fptfLine = {
		type: "line",
		id: "20260608-05-53-ch-opentransportdataswiss26-ojp-91-31-1-ta-225-j26",
		fahrtNr: "ch-opentransportdataswiss26_.ojp-91-31.1.TA.225.j26",
		name: "S31",
		public: true,
		mode: "train",
		product: "suburban",
		productName: "S",
		operator: { type: "operator", id: "33", name: "BLS AG (bls)" },
	} as const;
	const expected = {
		lineName: "S 31",
		text: { type: "fixed", value: "#ffffff" },
		background: { type: "fixed", value: "#b0aa38" },
		border: undefined,
		shape: "rectangle",
	};
	const actual = lineShapeParser.getLineShape(fptfLine);
	expect(actual).toEqual(expected);
});

test("x5 SE", () => {
	const fptfLine = {
		type: "line",
		id: "20260608-06-12-se-trafiklab-22795001010040",
		fahrtNr: "se-Trafiklab_22795001010040",
		name: "1",
		public: true,
		mode: "train",
		product: "tram",
		productName: "Tram",
		operator: { type: "operator", id: "279", name: "Västtrafik" },
	} as const;
	const expected = {
		lineName: "1",
		text: { type: "fixed", value: "#ffffff" },
		background: { type: "fixed", value: "#ed3e44" },
		border: undefined,
		shape: "rectangle-rounded-corner",
	};
	const actual = lineShapeParser.getLineShape(fptfLine);
	expect(actual).toEqual(expected);
});

test("27 VBN", () => {
	const fptfLine = {
		type: "line",
		id: "20260608-06-44-de-vbn-496368785",
		fahrtNr: "de-VBN_496368785",
		name: "8",
		public: true,
		mode: "train",
		product: "tram",
		productName: "Tram",
		operator: { type: "operator", id: "326", name: "Bremer Straßenbahn AG" },
	} as const;
	const expected = {
		lineName: "8",
		text: { type: "fixed", value: "#ffffff" },
		background: { type: "fixed", value: "#8bc63e" },
		border: undefined,
		shape: "rectangle",
	};
	const actual = lineShapeParser.getLineShape(fptfLine);
	expect(actual).toEqual(expected);
});

test("RJX", () => {
	const fptfLine = {
		type: "line",
		id: "20260608-17-29-at-railway-current-reference-data-2026-82-ta-10-d9-j26-1-38-r",
		fahrtNr: "at-Railway-Current-Reference-Data-2026_82.TA.10-D9-j26-1.38.R",
		name: "RJX 261",
		public: true,
		mode: "train",
		product: "nationalExpress",
		productName: "RJX",
		operator: { type: "operator", id: "04", name: "Deutsche Bahn AG" },
	} as const;
	const expected = {
		lineName: "RJX 261",
		text: { type: "fixed", value: "#fff" },
		background: { type: "fixed", value: "#ab0020" },
		border: undefined,
		shape: "pill",
	};
	const actual = lineShapeParser.getLineShape(fptfLine);
	expect(actual).toEqual(expected);
});
