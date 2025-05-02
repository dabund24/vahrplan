// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DisplayedFormData } from "$lib/stores/journeyStores";
import type { JourneyNode } from "$lib/types";

/**
 * can be used for modals showing trip info. suffix is id of block
 */
type TripInfoModalKeys = Record<`${"showTripInfoModal"}${string}`, boolean | undefined>;

type ServerNewsModalKeys = Record<`${"serverNewsModal"}${string}`, boolean | undefined>;

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface PageData {
			formData?: DisplayedFormData | undefined;
			treeNodes?: JourneyNode[] | undefined;
		}
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface PageState extends TripInfoModalKeys, ServerNewsModalKeys {
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
