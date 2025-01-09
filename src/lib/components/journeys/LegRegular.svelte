<script lang="ts">
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import NameDelayPlatform from "$lib/components/journeys/NameDelayPlatform.svelte";
	import Stopovers from "./Stopovers.svelte";
	import type { LegBlock } from "$lib/types";
	import Duration from "$lib/components/Duration.svelte";
	import JourneyInfo from "$lib/components/journeys/TripInfo.svelte";
	import TrainProgressIndicator from "$lib/components/TrainProgressIndicator.svelte";
	import IconExpand from "$lib/components/icons/IconExpand.svelte";

	type Props = {
		block: LegBlock;
		isCompact?: boolean;
	};

	let { block, isCompact = false }: Props = $props();

	const departureTime = $derived(
		new Date(block.departureData.time.departure?.time ?? 0).getTime()
	);
	const arrivalTime = $derived(new Date(block.arrivalData.time.arrival?.time ?? 0).getTime());
</script>

<div
	class="flex-row leg product--{block.product}"
	class:hide-top={block.precededBy === "stopover" && !isCompact}
	class:hide-bottom={block.succeededBy === "stopover" && !isCompact}
	style:anchor-name="--leg--{block.blockKey}"
>
	<div class="flex-column">
		<div class="top-or-bottom flex-column">
			<Time time={block.departureData.time} />
		</div>
		<div class="middle duration-container">
			<Duration duration={block.duration} isAlignedRight={true} />
		</div>
		<div class="top-or-bottom flex-column">
			<Time time={block.arrivalData.time} />
		</div>
	</div>
	<div class="line-container flex-column" class:hide-progress={isCompact}>
		<TrainProgressIndicator
			{departureTime}
			{arrivalTime}
			product={block.product}
			orientation="vertical"
		/>
		<div
			class="line__station-icon"
			style="anchor-name: --leg--{block.blockKey}{departureTime}-icon--0;"
		>
			<IconStationLocation
				color="product"
				iconType="station"
				isCancelled={block.departureData.attribute === "cancelled"}
			/>
		</div>
		<div class="line--product line--vertical"></div>
		<div
			class="line__station-icon"
			style:anchor-name="--leg--{block.blockKey}{departureTime}-icon--{block.stopovers
				.length + 1}"
		>
			<IconStationLocation
				color="product"
				iconType="station"
				isCancelled={block.arrivalData.attribute === "cancelled"}
			/>
		</div>
	</div>
	<div class="right-to-line flex-column">
		<div class="top-or-bottom flex-row">
			<NameDelayPlatform transitData={block.departureData} hasStrongName={true} />
		</div>
		<div class="middle padded-top-bottom flex-row">
			{#if isCompact}
				<Stopovers
					stopovers={block.stopovers}
					blockKey={block.blockKey}
					{departureTime}
					{arrivalTime}
					product={block.product}
				/>
			{:else}
				<details>
					<summary
						class="hoverable flex-row"
						style="anchor-name: --leg--{block.blockKey}{departureTime}__stopovers-summary"
					>
						<span class="limit-lines">{block.name} &rightarrow; {block.direction}</span>
						<IconExpand />
					</summary>
					<div>
						<Stopovers
							stopovers={block.stopovers}
							blockKey={block.blockKey}
							{departureTime}
							{arrivalTime}
							product={block.product}
						/>
					</div>
				</details>
				<JourneyInfo info={block.info} blockKey={block.blockKey} {departureTime} />
			{/if}
		</div>
		<div class="flex-row top-or-bottom">
			<NameDelayPlatform transitData={block.arrivalData} hasStrongName={true} />
		</div>
	</div>
</div>

<style>
	.middle {
		margin: auto 0;
		align-items: start;
		z-index: 10;
	}
	.top-or-bottom {
		height: 3rem;
		align-items: center;
	}
	.line-container {
		position: relative;
		margin: 1.5rem 0.5rem;
		align-items: center;
	}
	.leg:has(details[open]) .line-container > :global(:first-child),
	.line-container.hide-progress > :global(:first-child) {
		opacity: 0;
	}
	.line__station-icon {
		margin: -8px 0;
		z-index: 1;
	}
	.right-to-line {
		width: 100%;
	}
	details:not(:last-child) {
		width: 100%;
	}

	summary {
		margin: 0 var(--line-width) 0 calc(-0.5rem - var(--line-width));
		width: fit-content;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem;
		.limit-lines {
			-webkit-line-clamp: 2;
			line-clamp: 2;
		}
	}

	details:not(:last-child) > *:not(summary) {
		margin-right: calc(-16px - 1rem - 2 * var(--line-width));
	}

	details[open] summary > :global(svg) {
		transform: scaleY(-1);
	}

	.duration-container {
		visibility: hidden;
	}

	.leg:has(details:not([open])) .duration-container {
		visibility: visible;
	}

	.hide-top {
		& .top-or-bottom:first-child,
		& .line-container > .line__station-icon:nth-child(2) {
			opacity: 0;
		}
	}
	.hide-bottom {
		& .top-or-bottom:last-child,
		& .line-container > .line__station-icon:last-child {
			opacity: 0;
		}
	}
</style>
