<script lang="ts">
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import { type DiagramBookmark, getBookmarks, toggleDiagramBookmark } from "$lib/bookmarks";
	import { browser } from "$app/environment";
	import { getDisplayedFormData } from "$lib/state/displayedFormData.svelte";
	import { type ComponentProps, onMount } from "svelte";
	import { shareDiagram } from "./share";
	import ViaRecommendations from "./ViaRecommendations.svelte";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import { getDiagramData } from "$lib/state/diagramData.svelte";
	import Options from "$lib/components/Options.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import ResponsiveOptions from "$lib/components/ResponsiveOptions.svelte";

	const displayedFormData = $derived(getDisplayedFormData());

	const diagramApiClient = apiClient("GET", "diagram");
	let diagramBookmarks: DiagramBookmark[] = $state([]);
	let isBookmarked = $derived(
		browser &&
			displayedFormData !== undefined &&
			diagramBookmarks.some(
				(bookmark) =>
					bookmark.link ===
					diagramApiClient.formatNonApiUrl(
						diagramApiClient.formDataToRequestData(displayedFormData)
					).href
			)
	);

	onMount(() => (diagramBookmarks = getBookmarks("diagram")));

	const diagramData = $derived(getDiagramData());

	function handleDiagramBookmarkClick(): void {
		diagramBookmarks = toggleDiagramBookmark(displayedFormData);
	}

	const basicOptions: ComponentProps<typeof Options>["options"] = [
		{
			type: "function",
			name: "Diagramm teilen",
			onClick: () => shareDiagram(displayedFormData),
			icon: iconShare
		},
		{
			type: "function",
			name: "Diagram merken",
			onClick: handleDiagramBookmarkClick,
			icon: iconBookmark
		}
	];

	let hasViaRecommendations = $state(false);

	const options = $derived.by((): ComponentProps<typeof Options>["options"] => {
		if (hasViaRecommendations) {
			return [
				{
					type: "modal",
					name: "Auswahl Zwischenstationen",
					showModalKey: "showRecommendationModal",
					icon: iconStation
				},
				...basicOptions
			];
		}
		return basicOptions;
	});
</script>

{#await diagramData}
	<ViaRecommendations recommendedVias={[]} bind:isDisplayed={hasViaRecommendations} />
{:then { recommendedVias }}
	<ViaRecommendations {recommendedVias} bind:isDisplayed={hasViaRecommendations} />
{/await}

<ResponsiveOptions id="diagram-options" {options} />

{#snippet iconStation()}
	<IconStationLocation iconType="station" color="foreground" />
{/snippet}
{#snippet iconBookmark()}
	<IconBookmark {isBookmarked} />
{/snippet}
{#snippet iconShare()}
	<IconShare />
{/snippet}
