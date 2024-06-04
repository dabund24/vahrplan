<script lang="ts">
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import NameDelayPlatform from "$lib/components/journeys/NameDelayPlatform.svelte";
	import Stopovers from "./Stopovers.svelte";
	import type { LegBlock } from "$lib/types";
	import Duration from "$lib/components/Duration.svelte";

	export let block: LegBlock;
	export let compact = false;
</script>

<div
	class="flex-row leg product--{block.line?.product}"
	class:hide-top={block.precededBy === "stopover" && !compact}
	class:hide-bottom={block.succeededBy === "stopover" && !compact}
>
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
		<IconStationLocation color="product" iconType="station" cancelled={block.departureData.attribute === "cancelled"}/>
		<div class="line--product line--vertical"></div>
		<IconStationLocation color="product" iconType="station" cancelled={block.arrivalData.attribute === "cancelled"}/>
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
					<summary class="hoverable flex-row">
						<span>{block.line?.name} &rightarrow; {block.direction}</span>
						<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
							<g
								stroke="var(--foreground-color)"
								stroke-width="3"
								fill="none"
								stroke-linecap="round"
							>
								<line class="expand-line--left" x1="8" y1="11" x2="4" y2="7" />
								<line class="expand-line--right" x1="8" y1="11" x2="12" y2="7" />
							</g>
						</svg>
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
		margin-left: calc(-0.5rem - var(--line-width));
		width: fit-content;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
	}

	svg {
		transition: transform 0.4s var(--cubic-bezier);
		perspective: 3rem;
		flex-shrink: 0;
	}

	details[open] svg {
		transform: scaleY(-1);
	}

	.duration-container {
		visibility: hidden;
	}

	.leg:has(details:not([open])) .duration-container {
		visibility: visible;
	}

	.hide-top {
		& .top-or-bottom:first-child, & .desktop-line-container > :first-child {
			opacity: 0;
		}
	}
	.hide-bottom {
        & .top-or-bottom:last-child, & .desktop-line-container > :last-child {
            opacity: 0;
        }
    }
</style>
