<script lang="ts">
	import type { ParsedLocation } from "$lib/types";
	import {
		type DisplayedFormData,
		displayedFormData,
		updateDisplayedLocations
	} from "$lib/stores/journeyStores";
	import type { KeyedItem } from "$lib/types.js";
	import ButtonModal from "$lib/ButtonModal.svelte";
	import Setting from "$lib/components/Setting.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import Warning from "$lib/components/Warning.svelte";

	type Props = {
		recommendedVias: ParsedLocation[][];
	};

	let { recommendedVias }: Props = $props();

	let suggestedLocations: {
		location: KeyedItem<ParsedLocation, number>;
		isDisplayed: boolean;
		isSelected: boolean;
	}[] = $derived(initSuggestedLocations($displayedFormData, recommendedVias));

	function initSuggestedLocations(
		displayedFormData: DisplayedFormData | undefined,
		recommendedVias: ParsedLocation[][]
	): typeof suggestedLocations {
		if (displayedFormData === undefined) {
			return [];
		}
		let suggestions: typeof suggestedLocations = [];

		const viaRecommendations: KeyedItem<ParsedLocation, number>[][] = recommendedVias.map(
			(subJourneyRecommendations) =>
				subJourneyRecommendations.map((subJourneyRecommendation) => ({
					value: subJourneyRecommendation,
					key: Math.random()
				}))
		);
		for (let i = 0; i < viaRecommendations.length; i++) {
			suggestions.push({
				location: displayedFormData.locations[i],
				isSelected: true,
				isDisplayed: true
			});
			suggestions.push(
				...viaRecommendations[i].map((viaRecommendation) => ({
					location: viaRecommendation,
					isSelected: false,
					isDisplayed: false
				}))
			);
		}
		suggestions.push({
			location: displayedFormData.locations[displayedFormData.locations.length - 1],
			isSelected: true,
			isDisplayed: true
		});

		return suggestions;
	}

	function handleFormSubmit(e: SubmitEvent): void {
		e.preventDefault();

		if (suggestedLocations.every((s) => s.isSelected === s.isDisplayed)) {
			history.back();
			return;
		}

		updateDisplayedLocations(() =>
			suggestedLocations.filter((l) => l.isSelected).map((l) => l.location)
		);
	}
</script>

{#if suggestedLocations.length > 2}
	<ButtonModal modalTitle="Auswahl Zwischenstationen" showModalKey="showRecommendationModal">
		{#snippet buttonContent()}
			<div class="padded-top-bottom" class:hide={suggestedLocations.length <= 2}>
				<IconStationLocation iconType="station" color="foreground" />
			</div>
		{/snippet}
		<form onsubmit={handleFormSubmit}>
			{#if recommendedVias.flat().length > 0}
				<Warning>
					Für die hier zusätzlich angezeigten Zwischenstationen lohnt es sich
					möglicherweise, sie auch im Diagramm zu berücksichtigen.
				</Warning>
			{/if}
			<div>
				{#each suggestedLocations as suggestedLocation, i}
					<div class="station-row" class:displayed={suggestedLocation.isDisplayed}>
						<div class="icon flex-column">
							<IconStationLocation
								color={suggestedLocation.isDisplayed ? "accent" : "foreground"}
								iconType={suggestedLocation.location.value.type}
							/>
						</div>
						{#if i === 0 || i === suggestedLocations.length - 1}
							<strong class="station-name"
								>{suggestedLocation.location.value.name}</strong
							>
						{:else}
							<Setting
								settingName={suggestedLocation.location.value.name}
								settingInfo={{ type: "boolean" }}
								bind:setting={suggestedLocation.isSelected}
							/>
						{/if}
					</div>
				{/each}
			</div>
			<div class="flex-row buttons">
				<button
					class="hoverable hoverable--visible"
					type="button"
					onclick={() => void history.back()}>Abbrechen</button
				>
				<button class="hoverable hoverable--accent" type="submit">Übernehmen</button>
			</div>
		</form>
	</ButtonModal>
{/if}

<style>
	form {
		padding: 0.5rem 0 1rem;
	}

	.station-row {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 0.5rem;
		align-items: center;
		width: 100%;
		&.displayed {
			font-weight: bolder;
		}
	}

	.station-name {
		padding: calc(0.5rem + var(--line-width)) 0;
	}

	.buttons {
		gap: 0.5rem;
		justify-content: end;
		padding-top: 0.5rem;
		& > * {
			padding: 0.5rem 0.75rem;
		}
	}
	.icon::before,
	.icon::after {
		content: "";
		width: 4px;
		height: 3rem;
		background-color: var(--foreground-color);
	}

	.station-row:first-child .icon::before {
		background-color: transparent;
	}

	.station-row:last-child .icon::after {
		background-color: transparent;
	}

	.icon::before {
		margin: -3rem auto -8px;
	}
	.icon::after {
		margin: -8px auto -3rem;
	}
</style>
