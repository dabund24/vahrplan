<script lang="ts">
	import type { TransitData } from "$lib/types";
	import { getGeolocationString } from "$lib/geolocation.svelte";
	import { displayedFormData } from "$lib/stores/journeyStores";

	type Props = {
		transitData: TransitData;
		hasStrongName?: boolean;
	};

	let { transitData, hasStrongName = false }: Props = $props();

	let stationOuterTag = $derived(hasStrongName ? "strong" : "span");

	let stationInnerTag = $derived(transitData.attribute === "cancelled" ? "s" : "span");

	let asAt = $derived(
		transitData.location.type === "currentLocation"
			? transitData.location.asAt
			: ($displayedFormData?.geolocationDate ?? new Date())
	);

	let locationName = $derived(
		transitData.location.type === "currentLocation" || transitData.location.name === "Standort"
			? getGeolocationString(asAt, transitData.location.name)
			: transitData.location.name
	);

	let delayTextA = $derived(
		transitData.time.arrival?.delay !== undefined ? `(+${transitData.time.arrival.delay})` : ""
	);

	let delayTextB = $derived(
		transitData.time.departure?.delay !== undefined
			? `(+${transitData.time.departure.delay})`
			: ""
	);

	let platformData = $derived(transitData.platformData);
	let platformData2 = $derived(transitData.platformData2);
</script>

<div class="flex-row name-delay-platform">
	<svelte:element
		this={stationOuterTag}
		class="station"
		class:text--red={transitData.attribute === "cancelled"}
		class:text--blue={transitData.attribute === "additional"}
	>
		<svelte:element this={stationInnerTag} class:limit-lines={hasStrongName}>
			{locationName}
		</svelte:element>
	</svelte:element>
	<div class="flex-column">
		{#if transitData.time.arrival !== undefined}
			<span class="delay text--{transitData.time.arrival?.status}">&#8203;{delayTextA}</span>
		{/if}
		{#if transitData.time.departure !== undefined}
			<span class="delay text--{transitData.time.departure?.status}">&#8203;{delayTextB}</span
			>
		{/if}
	</div>

	<div class="platform flex-column">
		{#if platformData === null}
			<div>&#8203;</div>
		{:else}
			<div class="platform-text" class:text--red={platformData.platformChanged}>
				Gl. {platformData.platform}
			</div>
		{/if}
		{#if platformData2 === null}
			<div>&#8203;</div>
		{:else if platformData2 !== undefined}
			<div class="platform-text" class:text--red={platformData2.platformChanged}>
				Gl. {platformData2.platform}
			</div>
		{/if}
	</div>
</div>

<style>
	.name-delay-platform {
		width: 100%;
	}
	.station {
		text-overflow: ellipsis;
		overflow-x: hidden;
	}

	.limit-lines {
		-webkit-line-clamp: 2;
	}

	:global(.popup__content) .station {
		text-wrap: unset;
		word-wrap: normal;
	}

	.delay {
		padding-left: 4px;
		white-space: nowrap;
	}
	.flex-row {
		align-items: center;
	}
	.platform {
		margin-left: auto;
		white-space: nowrap;
		text-align: right;
	}
	.platform-text {
		padding-left: 0.5rem;
	}
</style>
