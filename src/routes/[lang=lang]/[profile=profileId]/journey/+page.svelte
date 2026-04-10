<script lang="ts">
	import { page } from "$app/state";
	import Warning from "$lib/components/Warning.svelte";
	import { dateToString, timeToString } from "$lib/util.js";
	import {
		type DisplayedFormData,
		getDisplayedFormData,
		setDisplayedFormData,
	} from "$lib/state/displayedFormData.svelte.js";
	import { getSelectedData, setSelectedData } from "$lib/state/selectedData.svelte.js";
	import { setDiagramData } from "$lib/state/diagramData.svelte.js";
	import { browser } from "$app/environment";
	import IconLeftArrow from "$lib/components/icons/IconLeftArrow.svelte";
	import { apiClient } from "$lib/api-client/apiClientFactory";
	import JourneyDetailsWithMap from "$lib/components/JourneyDetailsWithMap.svelte";
	import { getDisplayedJourney } from "$lib/state/displayedJourney.svelte";

	const diagramApiClient = apiClient("GET", "diagram");

	const displayedFormData = $derived(getDisplayedFormData());
	const displayedJourney = $derived(getDisplayedJourney());
	const selectedData = $derived(getSelectedData());

	const { formData, diagramData } = page.data;

	let { pageTitle, pageDescription } = $derived.by(() => {
		let formData1: DisplayedFormData;
		if (formData !== undefined) {
			formData1 = formData;
		} else if (displayedFormData !== undefined && selectedData.isFullJourneySelected) {
			formData1 = displayedFormData;
		} else {
			return {
				pageTitle: "",
				pageDescription: "Reisedetails in Vahrplan",
			};
		}
		return {
			pageTitle: `${formData1.locations[0].value.name} — ${formData1.locations.at(-1)?.value.name}`,
			pageDescription: `Details zur Reise von ${formData1.locations[0].value.name} nach ${formData1.locations.at(-1)?.value.name} am ${dateToString(formData1.timeData.time)} mit Abfahrt ${timeToString(formData1.timeData.time)} Uhr`,
		};
	});

	if (browser && formData !== undefined && diagramData !== undefined) {
		setDisplayedFormData(formData);
		setSelectedData(Array.from({ length: diagramData.columns.length }, () => 0));
		setDiagramData(Promise.resolve(diagramData));
	}

	const diagramUrl = $derived.by(() => {
		if (displayedFormData === undefined) {
			return "/de/dbnav";
		}

		return diagramApiClient.formatNonApiUrl(
			diagramApiClient.formDataToRequestData(displayedFormData),
			{ profileConfig: page.data.profileConfig },
		).href;
	});
</script>

<svelte:head>
	<title>Vahrplan - Reisedetails{pageTitle.length > 0 ? ": " : ""}{pageTitle}</title>
	<meta
		name="title"
		content="Vahrplan - Reisedetails{pageTitle.length > 0 ? ': ' : ''}{pageTitle}"
	/>
	<meta
		name="description"
		content={pageDescription.length > 0 ? "Reisedetails" : pageDescription}
	/>
</svelte:head>

<JourneyDetailsWithMap {displayedFormData} {displayedJourney} {selectedData}>
	{#snippet header()}
		<h1>Reisedetails</h1>
		{#if formData === undefined && displayedFormData === undefined}
			<Warning>
				Suche auf der Startseite nach Verbindungen und wähle anschließend in der
				Reiseauswahl für jeden Reiseabschnitt eine Verbindung aus. Die ausgewählte Reise
				wird dann hier angezeigt.
			</Warning>
		{/if}
	{/snippet}

	{#snippet backButton()}
		<a href={diagramUrl} class="hoverable hoverable--visible">
			<IconLeftArrow />
			Reiseauswahl
		</a>
	{/snippet}
</JourneyDetailsWithMap>
