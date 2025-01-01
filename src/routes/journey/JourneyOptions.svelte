<script lang="ts">
	import { type ComponentProps, onMount } from "svelte";
	import Options from "$lib/components/Options.svelte";
	import { displayedFormData, refreshJourney, selectedJourneys } from "$lib/stores/journeyStores";
	import { shareJourney } from "./share";
	import { getBookmarks, type JourneyBookmark, toggleJourneyBookmark } from "$lib/bookmarks";
	import { browser } from "$app/environment";
	import { getJourneyUrl } from "$lib/urls";
	import IconTickets from "$lib/components/icons/IconTickets.svelte";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import IconRefresh from "$lib/components/icons/IconRefresh.svelte";
	import ResponsiveOptions from "$lib/components/ResponsiveOptions.svelte";

	let isAllSelected = $derived($selectedJourneys.every((journey) => journey.selectedBy !== -1));

	let journeyBookmarks: JourneyBookmark[] = $state([]);

	onMount(() => (journeyBookmarks = getBookmarks("journey")));

	let isBookmarked = $derived(
		browser &&
			journeyBookmarks.some(
				(bookmark) => bookmark.link === getJourneyUrl($selectedJourneys).href
			)
	);

	function handleJourneyBookmarkClick(): void {
		journeyBookmarks = toggleJourneyBookmark($selectedJourneys, $displayedFormData);
	}

	const options: ComponentProps<typeof Options>["options"] = [
		{
			type: "function",
			name: "Aktualisieren",
			icon: iconRefresh,
			onClick: refreshJourney
		},
		{
			type: "function",
			name: "Teilen",
			icon: iconShare,
			onClick: () => shareJourney($selectedJourneys)
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

{#if isAllSelected && $selectedJourneys.length > 0}
	<ResponsiveOptions id="journey-options" {options} />
{/if}
