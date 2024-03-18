<script lang="ts">
	import type { TransitData } from "$lib/types";

	export let transitData: TransitData;
	export let nameIsStrong = false;

	let stationClass = "";
	if (transitData.attribute === "cancelled") {
		stationClass = "text--red";
	} else if (transitData.attribute === "additional") {
		stationClass = "text--blue";
	}
	let delayTextA = "";
	if (transitData.time.a?.delay !== undefined) {
		delayTextA = ` (+${transitData.time.a.delay})`;
	}
	let delayTextB = "";
	if (transitData.time.b?.delay !== undefined) {
		delayTextB = ` (+${transitData.time.b.delay})`;
	}
</script>

<div class="flex-row">
	{#if nameIsStrong}
		<strong class="station {stationClass}">{transitData.location.name}</strong>
	{:else}
		<span class="station {stationClass}">{transitData.location.name}</span>
	{/if}
	<div class="flex-column">
		{#if transitData.time.a?.delay !== undefined}
			<span class="delay text--{transitData.time.a.color}">{delayTextA}</span>
		{/if}
		{#if transitData.time.b?.delay !== undefined}
			<span class="delay text--{transitData.time.b.color}">{delayTextB}</span>
		{/if}
	</div>

	<div class="flex-column">
		{#if transitData.platform !== undefined}
			<div class="platform {transitData.platformChanged ? 'text--red' : ''}">
				Gl. {transitData.platform}
			</div>
		{/if}
		{#if transitData.platform2 !== undefined}
			<div class="platform {transitData.platform2Changed ? 'text--red' : ''}">
				Gl. {transitData.platform2}
			</div>
		{/if}
	</div>
</div>

<style>
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
