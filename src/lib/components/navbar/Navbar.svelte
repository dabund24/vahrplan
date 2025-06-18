<script lang="ts">
	import { page } from "$app/state";
	import { browser } from "$app/environment";
	import { getDisplayedFormData } from "$lib/state/displayedFormData.svelte.js";
	import { getSelectedData } from "$lib/state/selectedData.svelte.js";
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import { getDisplayedJourney } from "$lib/state/displayedJourney.svelte.js";
	import MobileNavbar from "$lib/components/navbar/MobileNavbar.svelte";
	import type { Route } from "$lib/components/navbar/util";

	const displayedFormData = $derived(getDisplayedFormData());
	const selectedData = $derived(getSelectedData());
	const displayedJourney = $derived(getDisplayedJourney());

	const diagramApiClient = apiClient("GET", "diagram");
	const journeyApiClient = apiClient("GET", "journey");

	let diagramUrl = $derived.by(() => {
		if (!browser || displayedFormData === undefined) {
			return undefined;
		}
		const reqData = diagramApiClient.formDataToRequestData(displayedFormData);
		return diagramApiClient.formatNonApiUrl(reqData).href;
	});

	let journeyUrl = $derived.by(() => {
		if (!browser || !selectedData.isFullJourneySelected) {
			return undefined;
		}
		const tokens = displayedJourney.selectedSubJourneys.map((j) => j?.refreshToken ?? "");
		return journeyApiClient.formatNonApiUrl(tokens).href;
	});
</script>

<nav>
	<MobileNavbar currentRoute={page.route.id as Route | null} {diagramUrl} {journeyUrl} />
</nav>

<style>
	nav {
		border-bottom: var(--border);
		padding: max(0.5rem, env(safe-area-inset-top) + 0.2rem) 0.5rem 0.5rem;
		transition:
			background-color 0.4s var(--cubic-bezier),
			border-color 0.4s var(--cubic-bezier);
	}

	@media screen and (max-width: 999px) {
		nav {
			padding: max(0.25rem, env(safe-area-inset-top) + 0.2rem) 0.25rem 0.25rem;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			box-sizing: border-box;
			z-index: 1000;
			background-color: var(--background-color--transparent);
		}
	}
</style>
