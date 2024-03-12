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
	let delayText = "";
	if (transitData.time.a.delay !== undefined) {
		delayText = ` (+${transitData.time.a.delay})`;
	}
</script>

<div>
	{#if nameIsStrong}
		<strong class="station {stationClass}">{transitData.location.name}</strong>
	{:else}
		<span class="station {stationClass}">{transitData.location.name}</span>
	{/if}
	{#if transitData.time.a.delay !== undefined}
		<span class="delay text--{transitData.time.a.color}">{delayText}</span>
	{/if}
</div>
{#if transitData.platform !== undefined}
	<div class="platform {transitData.platformChanged ? 'text--red' : ''}">
		Gl. {transitData.platform}
	</div>
{/if}

<style>
	.platform {
		margin-left: auto;
		padding-left: 0.5rem;
	}
</style>
