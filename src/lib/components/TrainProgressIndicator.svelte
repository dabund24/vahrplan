<script lang="ts">
	import IconTrainLocation from "$lib/components/IconTrainLocation.svelte";
	import type { Product } from "$lib/stores/settingStore";
	import { onDestroy, onMount } from "svelte";

	type Props = {
		departureTime: number; // Unix timestamp of departure
		arrivalTime: number;
		product: Product;
		orientation: "horizontal" | "vertical";
	};

	let { departureTime, arrivalTime, product, orientation }: Props = $props();

	let animationOffset = $derived(departureTime - new Date().getTime());
	let animationDuration = $derived(arrivalTime - departureTime);

	let indicatorContainer: HTMLElement;

	onMount(() => document.addEventListener("visibilitychange", synchronizeAnimation));

	onDestroy(() => document.removeEventListener("visibilitychange", synchronizeAnimation));

	/**
	 * synchronizes the progress animation
	 */
	function synchronizeAnimation(): void {
		if (document.visibilityState === "visible") {
			departureTime = departureTime + 1;
			departureTime = departureTime - 1; // update animation start by invalidating departure time
			indicatorContainer.style.animation = "none"; // set animation to none
			indicatorContainer.offsetHeight; // element reflow
			indicatorContainer.style.animation = ""; // re-apply css animation
		}
	}
</script>

<div
	bind:this={indicatorContainer}
	class="indicator-container"
	class:horizontal={orientation === "horizontal"}
	style:--animation-offset={`${animationOffset}ms`}
	style:--animation-duration={`${animationDuration}ms`}
>
	<div>
		<IconTrainLocation {product} />
	</div>
</div>

<style>
	.indicator-container {
		position: absolute;
		translate: 0 -50%;
		z-index: 10;
		visibility: hidden;
		animation: current-position-animation--vertical var(--animation-duration) linear
			var(--animation-offset);
		&.horizontal {
			translate: -50% 0;
			animation: current-position-animation--horizontal var(--animation-duration) linear
				var(--animation-offset);
		}
	}

	@keyframes current-position-animation--vertical {
		from {
			visibility: visible;
			top: 0;
		}
		to {
			visibility: visible;
			top: 100%;
		}
	}

	@keyframes current-position-animation--horizontal {
		from {
			visibility: visible;
			left: 0;
		}
		to {
			visibility: visible;
			left: 100%;
		}
	}
</style>
