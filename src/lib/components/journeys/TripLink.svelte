<script lang="ts">
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import { page } from "$app/state";

	type Props = {
		tripId: string;
	};

	const { tripId }: Props = $props();

	const tripApiClient = apiClient("GET", "trip/[tripId]");

	const { href } = $derived(
		tripApiClient.formatNonApiUrl({ tripId }, { profileConfig: page.data.profileConfig }),
	);
</script>

<a {href} class="hoverable hoverable--visible">Ganze Reise</a>
