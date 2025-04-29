<script lang="ts">
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import { fade, fly } from "svelte/transition";
	import type { ParsedLocation } from "$lib/types";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import IconPlus from "$lib/components/icons/IconPlus.svelte";
	import {
		addDisplayedLocation,
		removeDisplayedLocation
	} from "$lib/state/displayedFormData.svelte.js";
	import { getDiagramData } from "$lib/state/diagramData.svelte";
	import { getLocationRepresentative } from "../api/diagram/locationRepresentativesUtils";

	type Props = {
		location: ParsedLocation;
		locationIndex: number;
		isStopover?: boolean;
		isDisplayedLocation: boolean;
		pressedStationId: number;
	};

	let {
		location,
		locationIndex,
		isStopover = false,
		isDisplayedLocation,
		pressedStationId = $bindable()
	}: Props = $props();

	const locationNamePromise = $derived.by(async () => {
		const { transferLocations } = await getDiagramData();
		return getLocationRepresentative(transferLocations, location).name;
	});

	let thisPressedId = $state(-1);
	let isPressed = $derived(thisPressedId === pressedStationId);

	function handleStationPress(): void {
		if (!isPressed) {
			thisPressedId = pressedStationId + 1;
		}
		pressedStationId++;
	}
</script>

{#if isPressed && !isDisplayedLocation}
	<div class="icon-neighbor location-name" transition:fade={{ duration: 200 }}>
		{#await locationNamePromise then locationName}
			{locationName}
		{/await}
	</div>
{/if}
<button
	class="icon-container hoverable"
	aria-pressed={isPressed}
	onclick={handleStationPress}
	title={location.name}
>
	<IconStationLocation color={"product"} iconType={location.type} isSmallIcon={isStopover} />
</button>
{#if isPressed && isDisplayedLocation}
	<button
		class="icon-neighbor action-button"
		onclick={() => void removeDisplayedLocation(locationIndex)}
		transition:fly={{ y: -36 }}
		title="Station als Zwischenstation entfernen"
	>
		<IconClose />
	</button>
{:else if isPressed}
	<button
		class="icon-neighbor action-button"
		transition:fly={{ y: -36 }}
		onclick={() => void addDisplayedLocation(location, locationIndex + 1)}
		title="Station als Zwischenstation hinzufügen"
	>
		<IconPlus />
	</button>
{/if}

<style>
	.icon-container {
		display: flex;
		padding: 4px;
		border-radius: 100%;
		cursor: pointer;
		position: relative;
		z-index: 1;
	}
	.icon-container[aria-pressed="true"] {
		border: var(--border);
		background-color: var(--background-color);
	}

	.location-name {
		border-radius: var(--border-radius--large);
		bottom: 36px;
		padding: 4px;
		width: max-content;
		max-width: calc(var(--connection-width) / 2);
	}
	.action-button {
		display: flex;
		border-radius: 50%;
		top: 36px;
		padding: 4px;
	}
	.icon-neighbor {
		position: absolute;
		border: var(--border);
		background-color: var(--background-color--transparent);
		translate: calc(16px - 50%) 0;
	}
</style>
