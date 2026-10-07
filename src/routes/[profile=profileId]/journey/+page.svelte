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
	import { getDisplayedJourney } from "$lib/state/displayedJourney.svelte.js";
	import JourneyOptions from "./JourneyOptions.svelte";
	import { m } from "$lib/paraglide/messages";

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
				pageDescription: m.journey_subtitle(),
			};
		}
		return {
			pageTitle: `${formData1.locations[0].value.name} — ${formData1.locations.at(-1)?.value.name}`,
			pageDescription: m.journey_subtitle_long({
				startLocation: formData1.locations[0]?.value.name ?? "",
				destination: formData1.locations.at(-1)?.value.name ?? "",
				date: dateToString(formData1.timeData.time, page.data.lang),
				departure: timeToString(formData1.timeData.time),
			}),
		};
	});

	if (browser && formData !== undefined && diagramData !== undefined) {
		setDisplayedFormData(formData);
		setSelectedData(Array.from({ length: diagramData.columns.length }, () => 0));
		setDiagramData(Promise.resolve(diagramData));
	}

	const diagramUrl = $derived.by(() => {
		if (displayedFormData === undefined) {
			return "/";
		}

		return diagramApiClient.formatNonApiUrl(
			diagramApiClient.formDataToRequestData(displayedFormData),
			{ profileConfig: page.data.profileConfig },
		).href;
	});
</script>

<svelte:head>
	<title>Vahrplan - {m.journey()}{pageTitle.length > 0 ? ": " : ""}{pageTitle}</title>
	<meta
		name="title"
		content="Vahrplan - {m.journey()}{pageTitle.length > 0 ? ': ' : ''}{pageTitle}"
	/>
	<meta
		name="description"
		content={pageDescription.length > 0 ? m.journey_subtitle() : pageDescription}
	/>
</svelte:head>

<JourneyDetailsWithMap {displayedFormData} {displayedJourney} {selectedData}>
	{#snippet header()}
		<h1>Reisedetails</h1>
		{#if formData === undefined && displayedFormData === undefined}
			<Warning>
				{m.journey_none_selected()}
			</Warning>
		{/if}
	{/snippet}
	{#snippet backButton()}
		<a href={diagramUrl} class="hoverable hoverable--visible">
			<IconLeftArrow />
			{m.diagram()}
		</a>
	{/snippet}
	{#snippet options()}
		<JourneyOptions />
	{/snippet}
</JourneyDetailsWithMap>
