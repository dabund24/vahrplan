// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DisplayedFormData } from "$lib/stores/journeyStores";
import type { JourneyNode } from "$lib/types";

/**
 * can be used for modals showing trip info. suffix is id of block
 */
interface TripInfoModalKeys {
	[key: `${"showTripInfoModal"}${string}`]: boolean | undefined;
}

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			formData?: DisplayedFormData | undefined;
			treeNodes?: JourneyNode[] | undefined;
		}
		interface PageState extends TripInfoModalKeys {
			showFilterModal?: boolean;
			showLegModal?: boolean;
			showRecommendationModal?: boolean;
			showTicketModal?: boolean;
			showPrivacyLinkModal?: boolean;
			showPrivacyStoreModal?: boolean;
		}
		// interface Platform {}
	}
}

export {};
