<script lang="ts">
	import Time from "$lib/components/journeys/Time.svelte";
	import IconStationLocation from "$lib/components/journeys/IconStationLocation.svelte";
	import NameDelayPlatform from "$lib/components/journeys/NameDelayPlatform.svelte";
	import Stopovers from "./Stopovers.svelte";
	import type { LegBlock } from "$lib/types";
	import Duration from "$lib/components/Duration.svelte";

	export let block: LegBlock;
	export let compact = false;
</script>

<div class="flex-row leg product--{block.line?.product}">
	<div class="flex-column">
		<div class="top-or-bottom flex-column">
			<Time time={block.departureData.time} />
		</div>
		<div class="middle duration-container">
			<Duration duration={block.duration} alignRight={true} />
		</div>
		<div class="top-or-bottom flex-column">
			<Time time={block.arrivalData.time} />
		</div>
	</div>
	<div class="desktop-line-container flex-column">
		<IconStationLocation color="product" iconType="station" />
		<div class="line--product line--vertical"></div>
		<IconStationLocation color="product" iconType="station" />
	</div>
	<div class="right-to-line flex-column">
		<div class="top-or-bottom flex-row">
			<NameDelayPlatform transitData={block.departureData} nameIsStrong={true} />
		</div>
		<div class="middle padded-top-bottom flex-column">
			{#if compact}
				<Stopovers stopovers={block.stopovers} />
			{:else}
				<details>
					<summary class="hoverable">
						{block.line?.name} &rightarrow; {block.direction}
					</summary>
					<div>
						<Stopovers stopovers={block.stopovers} />
					</div>
				</details>
			{/if}
		</div>
		<div class="flex-row top-or-bottom">
			<NameDelayPlatform transitData={block.arrivalData} nameIsStrong={true} />
		</div>
	</div>
</div>

<style>
	.middle {
		margin: auto 0;
	}
	.top-or-bottom {
		height: 3rem;
		align-items: center;
	}
	.desktop-line-container {
		padding: calc(1.5rem - var(--height--icon--small) / 2) 0;
		margin: 0 0.5rem;
	}
	.line--vertical {
		margin: calc(var(--height--icon--small) / -2) auto;
	}
	.right-to-line {
		width: 100%;
	}

	summary {
		padding: 0.5rem;
		margin-left: calc(-0.5rem - var(--line-width));
		width: fit-content;
	}

	.duration-container {
		visibility: hidden;
	}

	.leg:has(details:not([open])) .duration-container {
		visibility: visible;
	}
</style>
