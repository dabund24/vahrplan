<script lang="ts">
	import type { TransitData } from "$lib/types";

	export let transitData: TransitData;
	export let nameIsStrong = false;

	$: stationOuterTag = nameIsStrong ? "strong" : "span";

	$: stationInnerTag = transitData.attribute === "cancelled" ? "s" : "span";

	let delayTextA = "";
	$: if (transitData.time.arrival?.delay !== undefined) {
		delayTextA = ` (+${transitData.time.arrival.delay})`;
	}
	let delayTextB = "";
	$: if (transitData.time.departure?.delay !== undefined) {
		delayTextB = ` (+${transitData.time.departure.delay})`;
	}
</script>

<div class="flex-row name-delay-platform">
	<svelte:element
		this={stationOuterTag}
		class="station"
		class:text--red={transitData.attribute === "cancelled"}
		class:text--blue={transitData.attribute === "additional"}
	>
		<svelte:element this={stationInnerTag}>
			{transitData.location.name}
		</svelte:element>
	</svelte:element>
	<div class="flex-column">
		{#if transitData.time.arrival?.delay !== undefined}
			<span class="delay text--{transitData.time.arrival.color}">{delayTextA}</span>
		{/if}
		{#if transitData.time.departure?.delay !== undefined}
			<span class="delay text--{transitData.time.departure.color}">{delayTextB}</span>
		{/if}
	</div>

	<div class="platform flex-column">
		{#if transitData.platform !== undefined}
			<div class:text--red={transitData.platformChanged}>
				Gl. {transitData.platform}
			</div>
		{/if}
		{#if transitData.platform2 !== undefined}
			<div class:text--red={transitData.platform2Changed}>
				Gl. {transitData.platform2}
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
	.delay {
		padding-left: 4px;
	}
	.flex-row {
		align-items: center;
	}
	.platform {
		margin-left: auto;
		padding-left: 0.5rem;
		white-space: nowrap;
		text-align: right;
	}
</style>
