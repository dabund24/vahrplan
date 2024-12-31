<svg class="other-os" width="1rem" height="1rem" viewBox="0 0 16 16">
	<g stroke="var(--foreground-color)" stroke-width="1.5" stroke-linecap="round">
		<line x1="13" y1="3" x2="3" y2="8" />
		<line x1="3" y1="8" x2="13" y2="13" />
	</g>
	<g fill="var(--foreground-color)">
		<circle r="2.5" cx="13" cy="3" />
		<circle r="2.5" cx="3" cy="8" />
		<circle r="2.5" cx="13" cy="13" />
	</g>
</svg>

<svg class="safari-only" width="1rem" height="1rem" viewBox="0 0 16 16">
	<g
		stroke-width="2"
		stroke="var(--foreground-color)"
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	>
		<polyline points="5,8 4,8 4,15 12,15 12,8 11,8" />
		<line x1="8" y1="11" x2="8" y2="1" />
		<polyline points="5,4 8,1 11,4" />
	</g></svg
>

<style>
	.safari-only {
		display: none;
	}

	:global(_::-webkit-full-page-media),
	:global(_:future),
	:global(:root) .safari-only {
		display: block;
	}

	:global(_::-webkit-full-page-media),
	:global(_:future),
	:global(:root .inline-icons) .safari-only {
		display: inline-block;
	}

	:global(_::-webkit-full-page-media),
	:global(_:future),
	:global(:root) .other-os {
		display: none;
	}
</style>
