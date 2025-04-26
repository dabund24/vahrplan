<script lang="ts">
	import IconTrainLocation from "$lib/components/IconTrainLocation.svelte";
	import type { Product } from "$lib/types";
	import ProgressIndicator from "$lib/components/ProgressIndicator.svelte";

	type Props = {
		departureTime: number; // Unix timestamp of departure
		arrivalTime: number;
		product: Product;
		orientation: "horizontal" | "vertical";
	};

	let { departureTime, arrivalTime, product, orientation }: Props = $props();
</script>

<ProgressIndicator {departureTime} {arrivalTime} {orientation}>
	<IconTrainLocation {product} />
</ProgressIndicator>
