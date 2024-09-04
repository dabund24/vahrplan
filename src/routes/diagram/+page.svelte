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
	import TitlelessHeader from "$lib/components/TitlelessHeader.svelte";
	import { dateToString } from "$lib/util";
	import { timeToString } from "$lib/util.js";

	let { pageTitle, pageDescription } = $derived.by(() => {
		const formData = $page.data.formData ?? $displayedFormData;
		if (formData === undefined) {
			return {
				pageTitle: "Diagramm",
				pageDescription: "Verbindungsdiagramm in Vahrplan"
			};
		}
		const viaString =
			formData.locations.length <= 2
				? ""
				: ` über ${formData.locations
						.slice(1, -1)
						.map((location) => location.value.name)
						.reduce(
							(acc, name, i, array) =>
								`${acc}${i === array.length - 1 ? " und" : ","} ${name}`
						)}`;
		return {
			pageTitle:
				"Diagramm: " +
				formData.locations
					.map((location) => location.value.name)
					.reduce((acc, name) => `${acc} – ${name}`),
			pageDescription:
				`Verbindungsdiagramm für eine Fahrt von ${formData.locations[0].value.name}${viaString} nach ${formData.locations.at(-1)?.value.name}` +
				` am ${dateToString(formData.time)} mit ${formData.timeRole === "arrival" ? "Ankunft" : "Abfahrt"} ${timeToString(formData.time)} Uhr`
		};
	});

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
	<title>Vahrplan - {pageTitle}</title>
	<meta name="title" content="Vahrplan - {pageTitle}" />
	<meta name="description" content={pageDescription} />
</svelte:head>

<div class="split-container" bind:clientWidth={windowWidth}>
	<SplitPane
		min="360px"
		max={showSplitPane ? "-360px" : "100%"}
		pos={showSplitPane ? "-30rem" : "100%"}
		disabled={!showSplitPane}
	>
		{#snippet leftPane()}
			<div
				class="main-application flex-column"
				style:--connection-count={($displayedFormData?.locations.length ?? 1) - 1}
			>
				<section class="form">
					<MainForm initialFormData={$displayedFormData} />
				</section>
				<section class="diagram">
					{#if $displayedFormData !== undefined}
						<JourneySummary {allSelected} />
						{#await $displayedTree}
							<JourneyDiagramSkeleton
								depth={$displayedFormData.locations.length - 1}
							/>
						{:then tree}
							<JourneyDiagram nodes={tree} />
						{:catch err}
							{err}
						{/await}
					{/if}
				</section>
			</div>
		{/snippet}
		{#snippet rightPane()}
			<div class="journey-preview">
				{#if showSplitPane}
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
						tabs={[
							{
								title: "Klassische Ansicht",
								icon: detailsIcon,
								content: journeyOverview
							},
							{ title: "Karte", icon: mapIcon, content: map }
						]}
					>
						{#snippet tabEnvironment(miniTabSelector: Snippet, tabContent: Snippet)}
							<TitlelessHeader>
								<div class="flex-row journey-actions">
									{@render miniTabSelector()}
									{#if allSelected}
										<div
											class="flex-row journey-actions--buttons"
											transition:scale
										>
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
							</TitlelessHeader>
							{@render tabContent()}
						{/snippet}
					</MiniTabs>
				{/if}
			</div>
		{/snippet}
	</SplitPane>
</div>

<style>
	.form {
		position: sticky;
		left: 0.75rem;
		z-index: 600;
		max-width: calc(100vw - 1.5rem);
	}
	.diagram {
		margin: 0 auto;
		gap: 0.5rem;
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
		padding: 0 0.5rem 0.5rem;
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

	.journey-actions {
		padding: var(--line-width) 0.75rem;
		justify-content: space-between;
	}

	.journey-actions--buttons {
		gap: var(--line-width);
	}

	@media screen and (min-width: 1000px) {
		.form {
			left: 0;
		}
		.main-application {
			padding: 0 0.5rem 0.5rem;
			container-type: inline-size;
			--display-width: calc(100cqw - 1.5rem);
			width: auto;
			min-width: 0;
		}
	}
</style>
