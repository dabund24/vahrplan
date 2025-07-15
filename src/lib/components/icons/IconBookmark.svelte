<script lang="ts">
	type Props = { isBookmarked: boolean };

	let { isBookmarked }: Props = $props();
</script>

<svg class:bookmarked={isBookmarked} width="1rem" height="1rem" viewBox="0 0 16 16">
	<polyline
		class="skeleton-stroke"
		points="4,1 12,1 12,15 8,11 4,15 4,1"
		stroke-width="2"
		stroke="var(--foreground-color)"
		stroke-linejoin="round"
		stroke-linecap="round"
		fill="transparent"
	/>
</svg>

<style>
	.bookmarked polyline {
		fill: var(--accent-color);
		stroke: var(--accent-color);
	}
</style>
