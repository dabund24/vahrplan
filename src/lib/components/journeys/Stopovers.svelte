<script lang="ts">
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/icons/IconStationLocation.svelte";
	import NameDelayPlatform from "$lib/components/journeys/NameDelayPlatform.svelte";
	import type { TransitData } from "$lib/types";

	type Props = {
		stopovers: TransitData[];
	};

	let { stopovers }: Props = $props();
</script>

<ol>
	{#each stopovers as stopover}
		<li class="flex-row padded-top-bottom">
			<div class="time">
				<Time time={stopover.time} hasVariableWidth={false} />
			</div>
			<IconStationLocation
				iconType={stopover.location.type}
				color="product"
				isSmallIcon={true}
				isCancelled={stopover.attribute === "cancelled"}
			/>
			<NameDelayPlatform transitData={stopover} />
		</li>
	{/each}
</ol>

<style>
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
