<script lang="ts">
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import { page } from "$app/state";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import type { LegBlock } from "$lib/types";

	type Props = {
		leg: LegBlock;
	};

	const { leg }: Props = $props();

	const { tripId, departureData, arrivalData } = $derived(leg);

	const tripApiClient = apiClient("GET", "trip/[tripId]");

	const { href } = $derived(
		tripApiClient.formatNonApiUrl(
			{
				tripId,
				highlightData: {
					fromStop: departureData.location.id,
					toStop: arrivalData.location.id,
				},
			},
			{ profileConfig: page.data.profileConfig },
		),
	);
</script>

<a {href} data-sveltekit-preload-data="off" class="flex-row hoverable hoverable--visible">
	Ganze Fahrt <IconRightArrow />
</a>

<style>
	a {
		margin: 0.5rem 0;
		width: fit-content;
		gap: 0.5rem;
		text-decoration: none;
		align-items: center;
	}
</style>
