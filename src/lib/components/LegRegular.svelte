<script lang="ts">
	import Time from "$lib/components/Time.svelte";
	import { dateDifferenceString } from "$lib/util";
	import IconStationLocation from "$lib/components/IconStationLocation.svelte";
	import NameDelayPlatform from "$lib/components/NameDelayPlatform.svelte";
	import Stopovers from "./Stopovers.svelte";
	import type { LegBlock } from "$lib/types";

	export let block: LegBlock;
</script>

<div class="flex-row padded-top-bottom leg product--{block.line?.product}">
	<div class="flex-column">
		<div class="top-or-bottom flex-column">
			<Time time={block.departureData.time} />
		</div>
		<div class="middle">
			<i class="duration"
				>{block.duration}</i
			>
		</div>
		<div class="top-or-bottom flex-column">
			<Time time={block.arrivalData.time} />
		</div>
	</div>
	<div class="line-container flex-column">
		<IconStationLocation color="product" iconType="station" />
		<div class="line--product line--vertical"></div>
		<IconStationLocation color="product" iconType="station" />
	</div>
	<div class="right-to-line flex-column">
		<div class="top-or-bottom flex-row">
			<NameDelayPlatform transitData={block.departureData} nameIsStrong={true} />
		</div>
		<div class="middle padded-top-bottom flex-column">
			<details>
				<summary class="hoverable">
					{block.line?.name} &rightarrow; {block.direction}
				</summary>
				<div>
					<Stopovers stopovers={block.stopovers} />
				</div>
			</details>
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
	.line-container {
		padding: calc(1.5rem - var(--height--icon--small) / 2) 0;
		margin: 0 0.5rem;
	}
	.line--vertical {
		margin: calc(var(--height--icon--small) / -2) auto;
	}
	.right-to-line {
		width: 100%;
	}

	.duration {
		margin: auto 0 auto auto;
		width: 0;
		display: block;
		direction: rtl;
	}

	summary {
		padding: 0.5rem;
		margin-left: calc(-0.5rem - var(--line-width));
		width: fit-content;
	}
	.leg:has(details[open]) .duration {
		visibility: hidden;
	}
</style>
