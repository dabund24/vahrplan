<script lang="ts">
	import { type ComponentProps } from "svelte";
	import Options from "$lib/components/Options.svelte";
	import { shareJourney } from "./share";
	import IconTickets from "$lib/components/icons/IconTickets.svelte";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import IconRefresh from "$lib/components/icons/IconRefresh.svelte";
	import ResponsiveOptions from "$lib/components/ResponsiveOptions.svelte";
	import { getSelectedData } from "$lib/state/selectedData.svelte.js";
	import { getDisplayedJourney } from "$lib/state/displayedJourney.svelte.js";
	import { refreshDiagramData } from "$lib/state/diagramData.svelte.js";

	const selectedData = $derived(getSelectedData());
	const displayedJourney = $derived(getDisplayedJourney());

	const options: ComponentProps<typeof Options<"journey">>["options"] = [
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
			type: "bookmark",
			name: "Merken",
			icon: iconRefresh,
			bookmarkType: "journey",
			bookmarkValue: () => displayedJourney
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
{#snippet iconShare()}
	<IconShare />
{/snippet}
{#snippet iconTickets()}
	<IconTickets />
{/snippet}

{#if selectedData.isFullJourneySelected}
	<ResponsiveOptions id="journey-options" {options} isExpandedToTop={true} />
{/if}
