// Stolen and adapted from here: https://github.com/Rich-Harris/svelte-split-pane

import type { Length } from "$lib/components/splitPane/types";

export function constrain(
	element: HTMLElement | undefined,
	size: number,
	min: Length,
	max: Length,
	pos: Length,
	priority: "min" | "max",
): Length {
	if (element === undefined) {
		return "100%";
	}
	let minPx = normalize(min, element, size);
	let maxPx = normalize(max, element, size);
	let posPx = normalize(pos, element, size);

	if (minPx < 0) minPx += size;
	if (maxPx < 0) maxPx += size;
	if (posPx < 0) posPx += size;

	posPx =
		priority === "min"
			? Math.max(minPx, Math.min(maxPx, posPx))
			: Math.min(maxPx, Math.max(minPx, posPx));

	return pos.endsWith("%") ? (size ? `${(100 * posPx) / size}%` : "0%") : `${posPx}px`;
}

function normalize(str: string, element: HTMLElement, size: number): number {
	const num = parseFloat(str);

	if (str.endsWith("px")) {
		return num;
	}

	if (str.endsWith("%")) {
		return (size * num) / 100;
	}

	if (str.endsWith("rem")) {
		return num * parseFloat(getComputedStyle(document.documentElement).fontSize);
	}

	if (str.endsWith("em")) {
		return num * parseFloat(getComputedStyle(element).fontSize);
	}

	throw new Error(`Invalid length: ${str}`);
}
