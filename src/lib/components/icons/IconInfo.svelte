<script lang="ts">
	type Props = {
		color?: string;
	};

	const { color }: Props = $props();
</script>

<svg width="16px" height="16px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
	<g
		stroke={color === undefined ? "var(--foreground-color)" : `var(--accent--${color})`}
		stroke-width="3"
		stroke-linecap="round"
		fill="none"
	>
		<circle cx="10" cy="10" r="8.5" />
		<line x1="10" y1="12" x2="10" y2="14" stroke-width="4" />
		<line x1="10" y1="6.5" x2="10" y2="6.5" stroke-width="4" />
	</g>
</svg>
