<script lang="ts">
	type Props = { isBookmarked: boolean };

	let { isBookmarked }: Props = $props();
</script>

<svg
	class:bookmarked={isBookmarked}
	width="16px"
	height="16px"
	viewBox="0 0 20 20"
	xmlns="http://www.w3.org/2000/svg"
>
	<polyline
		points="5,2 15,2 15,18 10,13 5,18 5,2"
		stroke-width="3"
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
