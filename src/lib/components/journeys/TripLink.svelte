<script lang="ts">
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import { page } from "$app/state";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";

	type Props = {
		tripId: string;
	};

	const { tripId }: Props = $props();

	const tripApiClient = apiClient("GET", "trip/[tripId]");

	const { href } = $derived(
		tripApiClient.formatNonApiUrl({ tripId }, { profileConfig: page.data.profileConfig }),
	);
</script>

<a {href} data-sveltekit-preload-data="off" class="flex-row hoverable hoverable--visible">Ganze Reise <IconRightArrow /></a>

<style>
	a {
		margin: 0.5rem 0;
		width: fit-content;
		gap: 0.5rem;
		text-decoration: none;
		align-items: center;
	}
</style>
