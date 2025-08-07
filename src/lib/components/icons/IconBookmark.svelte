<script lang="ts">
	type Props = { isBookmarked: boolean; type?: "bookmark" | "star" };

	let { isBookmarked, type = "bookmark" }: Props = $props();
</script>

<svg class:bookmarked={isBookmarked} width="1rem" height="1rem" viewBox="0 0 16 16">
	<polyline
		class="skeleton-stroke"
		points={type === "bookmark"
			? "4,1 12,1 12,15 8,11 4,15 4,1"
			: "8,1 6.5,6.25 1,6.25 5.4,9.4 3.75,14.5 8,11.25 12.25,14.5 10.6,9.4 15,6.25 9.5,6.25 8,1"}
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
