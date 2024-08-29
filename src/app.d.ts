// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DisplayedFormData } from "$lib/stores/journeyStores";
import type { JourneyNode } from "$lib/types";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			formData?: DisplayedFormData | undefined;
			treeNodes?: JourneyNode[] | undefined;
		}
		interface PageState {
			showFilterModal?: boolean;
			showLegModal?: boolean;
		}
		// interface Platform {}
	}
}

export {};
