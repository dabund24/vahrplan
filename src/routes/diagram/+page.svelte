<script lang="ts">
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import {
		type DisplayedFormData,
		displayedFormData,
		displayedTree,
		refreshJourney,
		setDisplayedFormDataAndTree
	} from "$lib/stores/journeyStores";
	import MainForm from "../MainForm.svelte";
	import SplitPane from "$lib/components/splitPane/SplitPane.svelte";
	import JourneyDiagramSkeleton from "./JourneyDiagramSkeleton.svelte";
	import JourneySummary from "./JourneySummary.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import { getDiagramUrlFromFormData, getJourneyUrl } from "$lib/urls.js";
	import { onMount, type Snippet } from "svelte";
	import MiniTabs from "$lib/components/MiniTabs.svelte";
	import IconMap from "$lib/components/icons/IconMap.svelte";
	import IconJourneyInfo from "$lib/components/icons/IconJourneyInfo.svelte";
	import { selectedJourneys } from "$lib/stores/journeyStores";
	import IconBookmark from "$lib/components/icons/IconBookmark.svelte";
	import IconRefresh from "$lib/components/icons/IconRefresh.svelte";
	import { scale } from "svelte/transition";
	import { getBookmarks, type JourneyBookmark, toggleJourneyBookmark } from "$lib/bookmarks";
	import IconShare from "$lib/components/icons/IconShare.svelte";
	import { shareJourney } from "../journey/share";

	let windowWidth: number = $state(0);

	let showSplitPane = $derived(windowWidth >= 1000);

	$effect(() => resetDiagram($page.data.formData));

	function resetDiagram(initialFormData: DisplayedFormData | undefined): void {
		if (
			browser &&
			initialFormData !== undefined &&
			location.href !== getDiagramUrlFromFormData($displayedFormData).href
		) {
			// this happens when the user navigates here without the app context
			setDisplayedFormDataAndTree(initialFormData);
		}
		const pageData = $page.data;
		pageData.formData = undefined;
	}

	let journeyBookmarks: JourneyBookmark[] = $state([]);
	onMount(() => (journeyBookmarks = getBookmarks("journey")));

	let isBookmarked = $derived(
		browser &&
			journeyBookmarks.some(
				(bookmark) => bookmark.link === getJourneyUrl($selectedJourneys).href
			)
	);

	let allSelected = $derived($selectedJourneys.every((journey) => journey.selectedBy !== -1));

	function handleJourneyBookmarkClick(): void {
		journeyBookmarks = toggleJourneyBookmark($selectedJourneys, $displayedFormData);
	}
</script>

<svelte:head>
	<title>Start</title>
	<meta name="description" content="Verbindungszusammenstellung für Fortgeschrittene" />
</svelte:head>

<div class="split-container" bind:clientWidth={windowWidth}>
	<SplitPane
		type={"horizontal"}
		min="360px"
		max={showSplitPane ? "-360px" : "100%"}
		pos={showSplitPane ? "-30rem" : "100%"}
		disabled={!showSplitPane}
	>
		<div
			class="main-application flex-column"
			style:--connection-count={($displayedFormData?.locations.length ?? 1) - 1}
			slot="a"
		>
			<section class="form">
				<MainForm initialFormData={$displayedFormData} />
			</section>
			<section class="diagram">
				{#if $displayedFormData !== undefined}
					<JourneySummary {allSelected} />
					{#await $displayedTree}
						<JourneyDiagramSkeleton depth={$displayedFormData.locations.length - 1} />
					{:then tree}
						<JourneyDiagram nodes={tree} />
					{:catch err}
						{err}
					{/await}
				{/if}
			</section>
		</div>
		<div slot="b" class="journey-preview">
			{#if showSplitPane}
				{#snippet topBar(miniTabSelector: Snippet)}
					<div class="preview--top-bar">
						<div class="flex-row">
							{@render miniTabSelector()}
							{#if allSelected}
								<div class="flex-row preview--top-bar--buttons" transition:scale>
									<button
										class="hoverable hoverable--visible"
										onclick={() => void shareJourney($selectedJourneys)}
									>
										<IconShare />
									</button>
									<button
										class="hoverable hoverable--visible"
										onclick={handleJourneyBookmarkClick}
									>
										<IconBookmark {isBookmarked} />
									</button>
									<button
										class="hoverable hoverable--visible"
										onclick={refreshJourney}
									>
										<IconRefresh />
									</button>
								</div>
							{/if}
						</div>
						<div class="transition"></div>
					</div>
				{/snippet}
				{#snippet detailsIcon()}
					<IconJourneyInfo />
				{/snippet}
				{#snippet journeyOverview()}
					<Journeys />
				{/snippet}
				{#snippet mapIcon()}
					<IconMap />
				{/snippet}
				{#snippet map()}
					{#await import("$lib/components/leaflet/Leaflet.svelte") then Leaflet}
						<Leaflet.default />
					{/await}
				{/snippet}
				<MiniTabs
					tabEnvironment={topBar}
					tabs={[
						{
							title: "Klassische Ansicht",
							icon: detailsIcon,
							content: journeyOverview
						},
						{ title: "Karte", icon: mapIcon, content: map }
					]}
				/>
				<!--Tabs tabs={tabContent} /-->
			{/if}
		</div>
	</SplitPane>
</div>

<style>
	.form {
		position: sticky;
		left: 0.75rem;
		z-index: 100;
		max-width: calc(100vw - 1.5rem);
	}
	.diagram {
		margin: 0 auto;
	}
	.split-container {
		height: 100%;
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.journey-preview {
		position: relative;
	}

	/*
		TODO automatic font sizing: font-size: min(1rem, .09 * var(--display-width) / var(--connection-count));
	*/

	.main-application {
		padding: calc(0.5rem + env(safe-area-inset-top)) 0.5rem 0.5rem;
		overscroll-behavior-x: none;
		box-sizing: border-box;
		--connection-width--min-threshold: 11em;
		--connection-width--max-threshold: 40em;
		--display-width: calc(100vw - 2rem - 8px);
		--connection-width: clamp(
			var(--connection-width--min-threshold),
			calc(var(--display-width) / var(--connection-count)),
			var(--connection-width--max-threshold)
		);
		--diagram-width: clamp(
			calc(var(--connection-width--min-threshold) * (var(--connection-count))),
			var(--display-width),
			calc(var(--connection-width--max-threshold) * (var(--connection-count)))
		);
		width: fit-content;
		min-width: fit-content;
		margin: auto;
	}

	.preview--top-bar {
		position: sticky;
		top: 0;
		z-index: 500;
	}

	.preview--top-bar > :first-child {
		padding: var(--line-width) 0.75rem;
		background-color: var(--background-color--transparent);
		justify-content: space-between;
	}

	.preview--top-bar--buttons {
		gap: var(--line-width);
	}

	@media screen and (min-width: 1000px) {
		.form {
			left: 0;
		}
		.main-application {
			padding: 0.5rem;
			container-type: inline-size;
			--display-width: calc(100cqw - 1.5rem);
			width: auto;
			min-width: 0;
		}
	}
</style>
