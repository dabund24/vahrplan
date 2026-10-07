<script lang="ts">
	import Duration from "$lib/components/Duration.svelte";
	import { dateToString } from "$lib/util";
	import { page } from "$app/state";

	type Props = {
		date: string | undefined;
		duration: number | undefined;
	};

	let { date, duration }: Props = $props();

	let dateString = $derived(dateToString(date, page.data.lang));
</script>

{#if date !== undefined || duration !== undefined}
	<p class="flex-row">
		<span>{dateString}</span>
		<Duration {duration} />
	</p>
{/if}

<style>
	.flex-row {
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
</style>
