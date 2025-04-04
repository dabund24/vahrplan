import { setDiagramDataFromFormData } from "$lib/state/diagramData.svelte";
import { setSelectedData } from "$lib/state/selectedData.svelte";
import { toast } from "$lib/state/toastStore";
import type { JourneysOptions, KeyedItem, ParsedLocation, TimeData } from "$lib/types";
import { browser } from "$app/environment";
import { goto } from "$app/navigation";
import { apiClient } from "$lib/api-client/apiClientFactory";
import { DIAGRAM_MAX_COLUMNS, DIAGRAM_MIN_COLUMNS } from "$lib/constants";

export type DisplayedFormData = {
	locations: KeyedItem<ParsedLocation, number>[];
	timeData: TimeData;
	options: JourneysOptions;
	geolocationDate: Date;
};

/**
 * stores the form data used to display the currently displayed diagram
 */
let displayedFormData: DisplayedFormData | undefined = $state.raw(undefined);

export function getDisplayedFormData(): typeof displayedFormData {
	if (!browser) {
		return undefined;
	}
	return displayedFormData;
}

export function setDisplayedFormData(newFormData: DisplayedFormData): void {
	displayedFormData = newFormData;
}

/**
 * - updates the {@linkcode displayedFormData} store to the passed form data
 * - navigates to the url corresponding to the new form data if the url is outdated
 * - fetches the diagram for the passed form data and updates the `diagramData` store to the result
 * - unselects all columns
 * @param newFormData
 * @returns a promise that resolves once the page has navigated to the correct url
 */
export async function searchDiagram(newFormData: DisplayedFormData): Promise<void> {
	const diagramApiClient = apiClient("GET", "/api/diagram");
	const diagramUrl = diagramApiClient.formatNonApiUrl(
		diagramApiClient.formDataToRequestData(newFormData)
	);
	displayedFormData = { ...newFormData };
	if (location.href !== diagramUrl.href) {
		await goto(diagramUrl);
	}

	void setDiagramDataFromFormData(newFormData);
	setSelectedData(Array.from({ length: newFormData.locations.length - 1 }, () => -1)); // unselect every column
}

/**
 * invokes the {@linkcode searchDiagram} function with the {@linkcode displayedFormData} locations updated according to the passed callback
 * @param updateLocationsFn
 */
export function updateDisplayedLocations(
	updateLocationsFn: (formData: DisplayedFormData) => DisplayedFormData["locations"]
): void {
	if (displayedFormData === undefined) {
		return;
	}

	const newFormData: DisplayedFormData = { ...displayedFormData };
	newFormData.locations = updateLocationsFn(newFormData);
	if (newFormData.locations.length - 1 < DIAGRAM_MIN_COLUMNS) {
		toast(`Station konnte nicht entfernt werden.`, "red");
		return;
	}
	if (newFormData.locations.length - 1 > DIAGRAM_MAX_COLUMNS) {
		toast(`Es sind maximal ${DIAGRAM_MAX_COLUMNS - 1} Zwischenstationen möglich.`, "red");
		return;
	}

	void searchDiagram(newFormData);
}

/**
 * calls {@linkcode searchDiagram} with the {@linkcode displayedFormData} updated by adding the passed location at the passed index
 * @param location
 * @param index
 */
export function addDisplayedLocation(location: ParsedLocation, index: number): void {
	updateDisplayedLocations((formData) => [
		...formData.locations.slice(0, index),
		{ value: location, key: Math.random() },
		...formData.locations.slice(index)
	]);
}

/**
 * calls {@linkcode searchDiagram} with the {@linkcode displayedFormData} updated by removing the location at the passed index
 * @param index
 */
export function removeDisplayedLocation(index: number): void {
	updateDisplayedLocations((formData) => [
		...formData.locations.slice(0, index),
		...formData.locations.slice(index + 1)
	]);
}
