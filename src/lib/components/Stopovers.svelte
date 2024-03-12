<script lang="ts">
	import Time from "$lib/components/Time.svelte";
	import IconStationLocation from "$lib/components/IconStationLocation.svelte";
	import NameDelayPlatform from "$lib/components/NameDelayPlatform.svelte";
	import type { TransitData } from "$lib/types";

	export let stopovers: TransitData[];
</script>

<ol>
	{#each stopovers as stopover}
		<li class="flex-row padded-top-bottom">
			<div class="time">
				<Time time={stopover.time} variableWidth={false} />
			</div>
			<div class="icon">
				<IconStationLocation
					iconType={stopover.location.type}
					color="product"
					smallIcon={true}
				/>
			</div>
			<NameDelayPlatform transitData={stopover} />
		</li>
	{/each}
</ol>

<style>
	ol {
		padding: 0;
		margin: 0 0 0 calc(-5rem - var(--height--icon--small));
	}
	li {
		align-items: center;
	}
	.time {
		text-align: right;
	}
	.icon {
		margin: 0 0.5rem;
	}
</style>
