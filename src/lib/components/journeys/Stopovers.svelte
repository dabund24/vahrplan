<script lang="ts">
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import NameDelayPlatform from "$lib/components/journeys/NameDelayPlatform.svelte";
	import type { Product, TransitData, TransitType } from "$lib/types";
	import TrainProgressIndicator from "$lib/components/TrainProgressIndicator.svelte";

	type Props = {
		stopovers: TransitData[];
		departureTime: number;
		arrivalTime: number;
		product: Product;
		blockKey: string;
	};

	let { stopovers, departureTime, arrivalTime, blockKey, product }: Props = $props();

	function getStopoverTime(stopover: TransitData, transitType: TransitType): number {
		return new Date(stopover.time[transitType]?.time ?? 0).getTime();
	}
</script>

{#snippet trainProgressIndicatior(
	i1: number,
	progressDepartureTime: number,
	i2: number,
	progressArrivalTime: number
)}
	<div
		class="train-progress-container"
		style:top="anchor(--leg--{blockKey}{departureTime}-icon--{i1} center)"
		style:left="anchor(--leg--{blockKey}{departureTime}-icon--{i1} left)"
		style:bottom="anchor(--leg--{blockKey}{departureTime}-icon--{i2} center)"
	>
		<div>
			<TrainProgressIndicator
				departureTime={progressDepartureTime}
				arrivalTime={progressArrivalTime}
				{product}
				orientation="vertical"
			/>
		</div>
	</div>
{/snippet}

{@render trainProgressIndicatior(
	0,
	departureTime,
	1,
	stopovers.length === 0 ? arrivalTime : getStopoverTime(stopovers[0], "arrival")
)}

<ol>
	{#each stopovers as stopover, i}
		{@const thisStopoverArrival = getStopoverTime(stopover, "arrival")}
		{@const thisStopoverDeparture = getStopoverTime(stopover, "departure")}
		{@const nextStopoverArrival =
			i === stopovers.length - 1 ? arrivalTime : getStopoverTime(stopovers[i + 1], "arrival")}
		<li class="flex-row padded-top-bottom">
			<div class="time">
				<Time time={stopover.time} hasVariableWidth={false} />
			</div>
			<div style="anchor-name:--leg--{blockKey}{departureTime}-icon--{i + 1}">
				<IconStationLocation
					iconType={stopover.location.type}
					color="product"
					isSmallIcon={true}
					isCancelled={stopover.attribute === "cancelled"}
				/>
			</div>
			{@render trainProgressIndicatior(
				i + 1,
				thisStopoverArrival,
				i + 1,
				thisStopoverDeparture
			)}
			{@render trainProgressIndicatior(
				i + 1,
				thisStopoverDeparture,
				i + 2,
				nextStopoverArrival
			)}
			<NameDelayPlatform transitData={stopover} />
		</li>
	{/each}
</ol>

<style>
	.train-progress-container {
		position: absolute;
		width: 16px;
	}
	@supports not (top: anchor(center)) {
		.train-progress-container {
			display: none;
		}
	}
	ol {
		padding: 0;
		margin: 0 0 0 calc(-5rem - var(--height--icon--small));
		width: calc(100% + 5rem + var(--height--icon--small));
	}
	li {
		align-items: center;
		gap: 0.5rem;
	}
	.time {
		text-align: right;
	}
</style>
