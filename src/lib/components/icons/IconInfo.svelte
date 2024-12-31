<script lang="ts">
	type Props = {
		color?: string;
	};

	const { color }: Props = $props();
</script>

<svg width="1rem" height="1rem" viewBox="0 0 16 16">
	<g
		stroke={color === undefined ? "var(--foreground-color)" : `var(--accent--${color})`}
		stroke-width="2"
		stroke-linecap="round"
		fill="none"
	>
		<circle cx="8" cy="8" r="7" />
		<line x1="8" y1="8" x2="8" y2="11.5" />
		<line x1="8" y1="4.5" x2="8" y2="4.5" />
		<circle cx="8" cy="4.5" r="0" />
	</g>
</svg>
