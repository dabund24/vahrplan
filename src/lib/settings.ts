import { writable } from "svelte/store";
import type { JourneysSettings } from "$lib/types";

export const journeysOptions = writable<JourneysSettings>({
	accessibility: "none",
	bike: false,
	products: {
		bus: true,
		ferry: true,
		national: true,
		nationalExpress: true,
		regional: true,
		regionalExpress: true,
		suburban: true,
		subway: true,
		taxi: true,
		tram: true
	},
	transfers: -1,
	transferTime: 0
});
