<script lang="ts">
	import Duration from "$lib/components/Duration.svelte";

	type Props = {
		date: Date | undefined;
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
	<div class="flex-row padded-top-bottom">
		<div>{dateString}</div>
		<Duration {duration} />
	</div>
{/if}

<style>
	.flex-row {
		justify-content: space-between;
	}
</style>
