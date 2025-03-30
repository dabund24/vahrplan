<script lang="ts">
	import { type ComponentProps, onMount } from "svelte";
	import Options from "$lib/components/Options.svelte";
	import { shareJourney } from "./share";
	import { getBookmarks, type JourneyBookmark, toggleJourneyBookmark } from "$lib/bookmarks";
	import { browser } from "$app/environment";
	import IconTickets from "$lib/components/icons/IconTickets.svelte";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import IconRefresh from "$lib/components/icons/IconRefresh.svelte";
	import ResponsiveOptions from "$lib/components/ResponsiveOptions.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte";
	import { getDisplayedJourney } from "$lib/state/displayedJourney.svelte";
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import { refreshDiagramData } from "$lib/state/diagramData.svelte";

	const selectedData = $derived(getSelectedData());
	const displayedJourney = $derived(getDisplayedJourney());

	let journeyBookmarks: JourneyBookmark[] = $state([]);

	onMount(() => (journeyBookmarks = getBookmarks("journey")));

	const isBookmarked = $derived.by(() => {
		const currentJourneyUrl = apiClient("GET", "/api/journey").formatNonApiUrl(
			displayedJourney.selectedSubJourneys.map((j) => j?.refreshToken ?? "")
		).href;
		return browser && journeyBookmarks.some((bookmark) => bookmark.link === currentJourneyUrl);
	});

	function handleJourneyBookmarkClick(): void {
		journeyBookmarks = toggleJourneyBookmark(displayedJourney);
	}

	const options: ComponentProps<typeof Options>["options"] = [
		{
			type: "function",
			name: "Aktualisieren",
			icon: iconRefresh,
			onClick: () => refreshDiagramData(selectedData)
		},
		{
			type: "function",
			name: "Teilen",
			icon: iconShare,
			onClick: async () => shareJourney(displayedJourney, selectedData)
		},
		{
			type: "function",
			name: "Merken",
			icon: iconBookmark,
			onClick: handleJourneyBookmarkClick
		},
		{
			type: "modal",
			name: "Tickets",
			icon: iconTickets,
			showModalKey: "showTicketModal"
		}
	];
</script>

{#snippet iconRefresh()}
	<IconRefresh />
{/snippet}
{#snippet iconBookmark()}
	<IconBookmark {isBookmarked} />
{/snippet}
{#snippet iconShare()}
	<IconShare />
{/snippet}
{#snippet iconTickets()}
	<IconTickets />
{/snippet}

{#if selectedData.isFullJourneySelected}
	<ResponsiveOptions id="journey-options" {options} />
{/if}
