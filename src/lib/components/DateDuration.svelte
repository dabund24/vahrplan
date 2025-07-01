<script lang="ts">
	import Duration from "$lib/components/Duration.svelte";

	type Props = {
		date: string | undefined;
		duration: number | undefined;
	};

	let { date, duration }: Props = $props();

	let dateString = $derived(
		date === undefined
			? ""
			: new Date(date).toLocaleDateString("de-DE", {
					weekday: "short",
					day: "numeric",
					month: "short",
					year: "numeric"
				})
	);
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
