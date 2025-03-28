<script lang="ts">
	import JourneyDiagram from "./JourneyDiagram.svelte";
	import MainForm from "../MainForm.svelte";
	import SplitPane from "$lib/components/splitPane/SplitPane.svelte";
	import JourneyDiagramSkeleton from "./JourneyDiagramSkeleton.svelte";
	import JourneySummary from "./JourneySummary.svelte";
	import Journeys from "$lib/components/journeys/Journeys.svelte";
	import { page } from "$app/stores";
	import { browser } from "$app/environment";
	import { type Snippet } from "svelte";
	import MiniTabs from "$lib/components/MiniTabs.svelte";
	import IconMap from "$lib/components/icons/IconMap.svelte";
	import IconJourneyInfo from "$lib/components/icons/IconJourneyInfo.svelte";
	import TitlelessHeader from "$lib/components/TitlelessHeader.svelte";
	import { dateToString } from "$lib/util";
	import { timeToString } from "$lib/util.js";
	import { settings } from "$lib/state/settingStore";
	import JourneyOptions from "../journey/JourneyOptions.svelte";
	import TicketModal from "$lib/components/TicketModal.svelte";
	import {
		getDisplayedFormData,
		searchDiagram,
		type DisplayedFormData
	} from "$lib/state/displayedFormData.svelte.js";
	import { getDiagramData } from "$lib/state/diagramData.svelte";

	let displayedFormData = $derived($page.data.formData ?? getDisplayedFormData());
	const diagramData = $derived(getDiagramData());

	let { pageTitle, pageDescription } = $derived.by(() => {
		const formData = $page.data.formData ?? getDisplayedFormData();
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
				` am ${dateToString(formData.timeData.time)} mit ${formData.timeData.scrollDirection === "earlier" ? "Ankunft" : "Abfahrt"} ${timeToString(formData.timeData.time)} Uhr`
		};
	});

	let windowWidth: number = $state(0);

	let isShowSplitPane = $derived(windowWidth >= 1000);

	$effect.pre(() => resetDiagram($page.data.formData));

	function resetDiagram(initialFormData: DisplayedFormData | undefined): void {
		if (browser && initialFormData !== undefined) {
			const pageData = $page.data;
			pageData.formData = undefined;
			// initialize the diagram
			void searchDiagram(initialFormData);
		}
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
		max={isShowSplitPane ? "-360px" : "100%"}
		pos={isShowSplitPane ? "-30rem" : "100%"}
		isDisabled={!isShowSplitPane}
	>
		{#snippet leftPane()}
			<div
				class="main-application flex-column"
				style:--connection-count={(displayedFormData?.locations.length ?? 1) - 1}
			>
				<section class="form">
					<MainForm initialFormData={displayedFormData} />
				</section>
				<section class="diagram">
					{#if displayedFormData !== undefined}
						<JourneySummary />
						{#await diagramData}
							<JourneyDiagramSkeleton
								depth={displayedFormData.locations.length - 1}
							/>
						{:then { tree, columns }}
							<JourneyDiagram nodes={tree} {columns} />
						{:catch err}
							{err}
						{/await}
					{/if}
				</section>
			</div>
		{/snippet}
		{#snippet rightPane()}
			<div class="journey-preview">
				{#if isShowSplitPane}
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
						{#await import("$lib/components/leaflet/Leaflet.svelte") then { default: Leaflet }}
							<Leaflet />
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
						startingTab={$settings.general.journeyDetailsStandardView === "classic"
							? 0
							: 1}
					>
						{#snippet tabEnvironment(miniTabSelector: Snippet, tabContent: Snippet)}
							<TitlelessHeader>
								<div class="flex-row journey-actions">
									{@render miniTabSelector()}
									<JourneyOptions />
									<TicketModal />
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
		/* vertical lines separating sub-journeys */
		background-image: linear-gradient(
			to right,
			var(--foreground-color--very-transparent) 1px,
			var(--background-color) 1px calc(100% - 1px),
			var(--foreground-color--very-transparent) calc(100% - 1px)
		);
		background-size: calc(var(--connection-width)) 100%;
		background-repeat: repeat;
		/* cover vertical lines at very right and at very left */
		outline: var(--background-color) solid 4px;
		outline-offset: -3px;
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
		padding: 0 1rem 1rem;
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

	@media screen and (min-width: 1000px) {
		.form {
			left: 0;
		}
		.main-application {
			padding: 0 0.5rem calc(env(safe-area-inset-bottom) + 1rem);
			container-type: inline-size;
			--display-width: calc(100cqw - 1.5rem);
			width: auto;
			min-width: 0;
		}
		.journey-preview {
			padding-bottom: calc(env(safe-area-inset-bottom) + 1rem);
		}
	}
</style>
