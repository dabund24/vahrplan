import { expect, test } from "vitest";
import type { TransitType } from "$lib/types";
import {
	buildTree,
	unfoldTree,
} from "../../src/routes/[lang=lang]/[profile=profileId]/api/diagram/treePlantation.server";

function mockTime(date: number): string {
	return new Date(date).toISOString();
}

const simpleInput = [
	[
		{ departure: mockTime(0), arrival: mockTime(1) },
		{ departure: mockTime(1), arrival: mockTime(2) },
		{ departure: mockTime(2), arrival: mockTime(3) },
	],
];

const complicatedInput: Record<TransitType, string>[][] = [
	[
		{ departure: mockTime(0), arrival: mockTime(5) },
		{ departure: mockTime(1), arrival: mockTime(6) },
		{ departure: mockTime(2), arrival: mockTime(7) },
		{ departure: mockTime(3), arrival: mockTime(8) },
		{ departure: mockTime(4), arrival: mockTime(8) },
	],
	[
		{ departure: mockTime(4), arrival: mockTime(10) },
		{ departure: mockTime(7), arrival: mockTime(9) },
		{ departure: mockTime(7), arrival: mockTime(11) },
	],
	[
		{ departure: mockTime(10), arrival: mockTime(10) },
		{ departure: mockTime(10), arrival: mockTime(15) },
		{ departure: mockTime(11), arrival: mockTime(11) },
	],
];

test("build tree simple", () => {
	const tree = buildTree(simpleInput);
	const expected = [
		{ type: "emptyNode", children: [] },
		{
			type: "journeyNode",
			timeData: {
				departure: mockTime(0),
				arrival: mockTime(1),
			},
			columnIndex: 0,
			rowIndex: 0,
			children: [],
		},
		{
			type: "journeyNode",
			timeData: {
				departure: mockTime(1),
				arrival: mockTime(2),
			},
			columnIndex: 0,
			rowIndex: 1,
			children: [],
		},
		{
			type: "journeyNode",
			timeData: {
				departure: mockTime(2),
				arrival: mockTime(3),
			},
			columnIndex: 0,
			rowIndex: 2,
			children: [],
		},
	];

	expect(tree).toEqual(expected);
});

test("build complicated tree", () => {
	const tree = buildTree(complicatedInput);
	const expected = [
		{
			type: "emptyNode",
			children: [
				{ type: "emptyNode", children: [{ type: "emptyNode", children: [] }] },
				{
					type: "journeyNode",
					timeData: {
						departure: mockTime(4),
						arrival: mockTime(10),
					},
					columnIndex: 1,
					rowIndex: 0,
					children: [],
				},
			],
		},
		{
			type: "journeyNode",
			timeData: {
				departure: mockTime(0),
				arrival: mockTime(5),
			},
			columnIndex: 0,
			rowIndex: 0,
			children: [],
		},
		{
			type: "journeyNode",
			timeData: {
				departure: mockTime(1),
				arrival: mockTime(6),
			},
			columnIndex: 0,
			rowIndex: 1,
			children: [],
		},
		{
			type: "journeyNode",
			timeData: {
				departure: mockTime(2),
				arrival: mockTime(7),
			},
			columnIndex: 0,
			rowIndex: 2,
			children: [
				{
					type: "journeyNode",
					timeData: {
						departure: mockTime(7),
						arrival: mockTime(9),
					},
					columnIndex: 1,
					rowIndex: 1,
					children: [
						{
							type: "journeyNode",
							timeData: {
								departure: mockTime(10),
								arrival: mockTime(10),
							},
							columnIndex: 2,
							rowIndex: 0,
							children: [],
						},
						{
							type: "journeyNode",
							timeData: {
								departure: mockTime(10),
								arrival: mockTime(15),
							},
							columnIndex: 2,
							rowIndex: 1,
							children: [],
						},
					],
				},
				{
					type: "journeyNode",
					timeData: {
						departure: mockTime(7),
						arrival: mockTime(11),
					},
					columnIndex: 1,
					rowIndex: 2,
					children: [
						{
							type: "journeyNode",
							timeData: {
								departure: mockTime(11),
								arrival: mockTime(11),
							},
							columnIndex: 2,
							rowIndex: 2,
							children: [],
						},
					],
				},
			],
		},
		{
			type: "journeyNode",
			timeData: {
				departure: mockTime(3),
				arrival: mockTime(8),
			},
			columnIndex: 0,
			rowIndex: 3,
			children: [],
		},
		{
			type: "journeyNode",
			timeData: {
				departure: mockTime(4),
				arrival: mockTime(8),
			},
			columnIndex: 0,
			rowIndex: 4,
			children: [],
		},
	];

	expect(tree).toEqual(expected);
});

test("unfold tree simple", () => {
	const tree = buildTree(simpleInput);
	const unfoldedTree = unfoldTree(tree, simpleInput.length);
	expect(unfoldedTree).toEqual(simpleInput);
});

test("unfold tree complicated", () => {
	const tree = buildTree(complicatedInput);
	const unfoldedTree = unfoldTree(tree, complicatedInput.length);
	expect(unfoldedTree).toEqual(complicatedInput);
});
