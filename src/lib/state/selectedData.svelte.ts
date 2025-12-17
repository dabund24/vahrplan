import { browser } from "$app/environment";

export type SelectedData = {
	selectedJourneys: number[];
	isFullJourneySelected: boolean;
	isNoneSelected: boolean;
};

/**
 * stores for each column the index of the selected row or `-1`, if nothing is selected here
 */
const selectedData: SelectedData = $state({
	selectedJourneys: [],
	isFullJourneySelected: false,
	isNoneSelected: true,
});

export function getSelectedData(): SelectedData {
	if (!browser) {
		return { selectedJourneys: [], isFullJourneySelected: false, isNoneSelected: true };
	}
	return selectedData;
}

export function setSelectedData(rowIndices: number[]): void {
	selectedData.selectedJourneys = rowIndices;
	selectedData.isFullJourneySelected =
		rowIndices.length > 0 && rowIndices.every((rowIndex) => rowIndex !== -1);
	selectedData.isNoneSelected = rowIndices.every((rowIndex) => rowIndex === -1);
}

/**
 * updates the {@linkcode selectedData}:
 * - if the row with the passed `rowindex` in the column with the passed `columnIndex` is selected, unselect it
 * - otherwise, select it
 * @param columnIndex
 * @param rowIndex
 * @returns if the row with the passed `rowindex` in the column with the passed `columnIndex` is selected after this function returns
 */
export function toggleJourneySelection(columnIndex: number, rowIndex: number): boolean {
	if (selectedData.selectedJourneys[columnIndex] === rowIndex) {
		// journey is already selected => unselect
		selectedData.selectedJourneys[columnIndex] = -1;
		selectedData.isFullJourneySelected = false;
		selectedData.isNoneSelected = selectedData.selectedJourneys.every(
			(rowIndex) => rowIndex === -1,
		);
		return false;
	}

	selectedData.selectedJourneys[columnIndex] = rowIndex;
	selectedData.isFullJourneySelected = selectedData.selectedJourneys.every(
		(rowIndex) => rowIndex !== -1,
	);
	selectedData.isNoneSelected = false;
	return true;
}
