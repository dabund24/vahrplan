// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DisplayedFormData } from "$lib/stores/journeyStores";

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			formData?: DisplayedFormData | undefined;
		}
		interface PageState {
			showFilterModal?: boolean;
			showLegModal?: boolean;
		}
		// interface Platform {}
	}
}

export {};
