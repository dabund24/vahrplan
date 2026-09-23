<script lang="ts">
	import { dateToString } from "$lib/util";

	type Props = {
		time: string;
	};

	const { time }: Props = $props();
</script>

<div class="date-indicator flex-column">
	<div class="line--regular"></div>
	{dateToString(time)}
</div>

<style>
	.line--regular {
		background-color: var(--foreground-color--transparent);
        width: 2rem;
	}

	.date-indicator {
		margin-top: auto;
		padding: var(--line-width) 0 var(--line-width) calc(8px + calc(var(--line-width) / 2));
		gap: var(--line-width);
	}
</style>
