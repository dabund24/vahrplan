<script lang="ts">
	import Duration from "$lib/components/Duration.svelte";

	export let date: string | undefined;
	export let duration: number | undefined;

	$: dateString =
		date === undefined
			? ""
			: new Date(date).toLocaleDateString("de-DE", {
					weekday: "short",
					day: "numeric",
					month: "short",
					year: "numeric"
				});
</script>

<div class="flex-row padded-top-bottom">
	<div>{dateString}&#8203;</div>
	<Duration {duration} />
</div>

<style>
	.flex-row {
		justify-content: space-between;
	}
</style>
