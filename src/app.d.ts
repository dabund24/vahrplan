// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import type { DiagramData } from "$lib/state/diagramData.svelte";
import { type VahrplanError } from "$lib/VahrplanError";

/**
 * can be used for modals showing trip info. suffix is id of block
 */
type TripInfoModalKeys = Record<`${"showTripInfoModal"}${string}`, boolean | undefined>;

declare global {
	namespace App {
		type Error = VahrplanError;
		// interface Locals {}
		type PageData = {
			formData?: DisplayedFormData | undefined;
			diagramData?: DiagramData;
		};
		type PageState = TripInfoModalKeys & {
			showFilterModal?: boolean;
			showLegModal?: boolean;
			showRecommendationModal?: boolean;
			showTicketModal?: boolean;
			showPrivacyLinkModal?: boolean;
			showPrivacyStoreModal?: boolean;
		};
		// interface Platform {}
	}
}

export {};
