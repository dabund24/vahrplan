<script lang="ts">
	export let isBookmarked: boolean;
</script>

<svg class:bookmarked={isBookmarked} width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
	<polyline points="4,2 12,2 12,14 8,10 4,14 4,2" stroke-width="2.5" stroke="var(--foreground-color)" stroke-linejoin="round" stroke-linecap="round" fill="transparent" />
</svg>

<style>
	.bookmarked polyline {
        fill: var(--accent-color);
        stroke: var(--accent-color);
	}
</style>