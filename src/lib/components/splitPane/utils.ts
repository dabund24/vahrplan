// Stolen and adapted from here: https://github.com/Rich-Harris/svelte-split-pane

import type { Length } from "$lib/components/splitPane/types";

export function constrain(
	element: HTMLElement | undefined,
	size: number,
	min: Length,
	max: Length,
	pos: Length,
	priority: "min" | "max"
): Length {
	if (element === undefined) {
		return "0px";
	}
	let min_px = normalize(min, element, size);
	let max_px = normalize(max, element, size);
	let pos_px = normalize(pos, element, size);

	if (min_px < 0) min_px += size;
	if (max_px < 0) max_px += size;
	if (pos_px < 0) pos_px += size;

	pos_px =
		priority === "min"
			? Math.max(min_px, Math.min(max_px, pos_px))
			: Math.min(max_px, Math.max(min_px, pos_px));

	return pos.endsWith("%") ? (size ? `${(100 * pos_px) / size}%` : "0%") : `${pos_px}px`;
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
