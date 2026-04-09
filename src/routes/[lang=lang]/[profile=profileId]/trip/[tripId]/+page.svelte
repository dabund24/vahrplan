<script lang="ts">
	import type { PageProps } from "./$types";
	import LegRegular from "$lib/components/journeys/LegRegular.svelte";
	import LineNameDirection from "$lib/components/LineNameDirection.svelte";

	const { data }: PageProps = $props();

	const leg = $derived(data.trip.leg);
</script>

<div class="content-wrapper">
	<h1>
		<LineNameDirection
			lineName={leg.name}
			lineShape={leg.lineShape}
			product={leg.product}
			productName={leg.productName}
		/>
	</h1>
	<LegRegular block={leg} isCompact={true} />
</div>
