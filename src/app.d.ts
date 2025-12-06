// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { DisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
import type { DiagramData } from "$lib/state/diagramData.svelte";
import { type VahrplanError } from "$lib/VahrplanError";
import type { Language } from "./params/lang";
import type { ProfileConfig } from "$lib/server/profiles/profile";

/**
 * can be used for modals showing trip info. suffix is id of block
 */
type TripInfoModalKeys = Record<`${"showTripInfoModal"}${string}`, boolean | undefined>;

type ServerNewsModalKeys = Record<`${"serverNewsModal"}${string}`, boolean | undefined>;

declare global {
	namespace App {
		// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions
		interface Error extends VahrplanError {}
		// interface Locals {}
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface PageData {
			profileConfig: ProfileConfig;
			lang: Language;
			formData?: DisplayedFormData | undefined;
			diagramData?: DiagramData;
		}
		// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
		interface PageState extends TripInfoModalKeys, ServerNewsModalKeys {
			showProfileModal?: boolean;
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
