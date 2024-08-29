import type { Leg } from "hafas-client";
import type { LegBlock } from "$lib/types";

export function parseLegInfo(leg: Leg): LegBlock["info"] {
	const info = parseGenericLegInfo(leg);
	info.hints.push(...parseStaticLegHints(leg));
	return info;
}

function parseGenericLegInfo(leg: Leg): LegBlock["info"] {
	const genericInfo: LegBlock["info"] = {
		statuses: [],
		hints: []
	};

	const remarks = leg.remarks?.concat() ?? [];
	remarks.push(...(leg.stopovers?.at(0)?.remarks ?? []));
	remarks.push(...(leg.stopovers?.at(-1)?.remarks ?? []));

	for (const remark of remarks ?? []) {
		if (remark.type === "hint") {
			genericInfo.hints.push(remark.text);
		} else if (remark.text !== undefined) {
			genericInfo.statuses.push(remark.text);
		}
	}

	return genericInfo;
}

function parseStaticLegHints(leg: Leg): string[] {
	const hints = [];

	// load factor:
	if (leg.loadFactor !== undefined) {
		hints.push(parseLoadFactor(leg.loadFactor));
	}

	// operator:
	if (leg.line?.operator !== undefined) {
		hints.push(`Betreiber: ${leg.line.operator.name}`);
	}

	// cycle:
	if (leg.cycle?.min !== undefined && leg.cycle.max !== undefined) {
		hints.push(parseCycle(leg.cycle.min, leg.cycle.max));
	}

	// trip id
	if (leg.line?.fahrtNr !== undefined) {
		hints.push(`Fahrtnummer: ${leg.line.fahrtNr}`);
	}
	return hints;
}

function parseLoadFactor(loadFactor: string): string {
	let parsedLoadFactor: string;
	switch (loadFactor) {
		case "low-to-medium":
			parsedLoadFactor = "gering";
			break;
		case "high":
			parsedLoadFactor = "mittel";
			break;
		case "very-high":
			parsedLoadFactor = "hoch";
			break;
		case "exceptionally-high":
			parsedLoadFactor = "außergewöhnlich hoch";
			break;
		default:
			parsedLoadFactor = "unbekannt";
	}
	return `Auslastung: ${parsedLoadFactor}`;
}

function parseCycle(min: number, max: number): string {
	let xToY: string;
	if (min === max) {
		xToY = `${min / 60}`;
	} else {
		xToY = `${min / 60} bis ${max / 60}`;
	}
	return `Fährt alle ${xToY} Minuten`;
}
