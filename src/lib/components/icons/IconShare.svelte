<svg
	class="other-os"
	width="16px"
	height="16px"
	viewBox="0 0 20 20"
	xmlns="http://www.w3.org/2000/svg"
>
	<g stroke="var(--foreground-color)" stroke-width="3" stroke-linecap="round">
		<line x1="16" y1="4" x2="4" y2="10" />
		<line x1="4" y1="10" x2="16" y2="16" />
	</g>
	<g fill="var(--foreground-color)">
		<circle r="3.5" cx="16" cy="4" />
		<circle r="3.5" cx="4" cy="10" />
		<circle r="3.5" cx="16" cy="16" />
	</g>
</svg>

<svg
	class="safari-only"
	width="16px"
	height="16px"
	viewBox="0 0 20 20"
	xmlns="http://www.w3.org/2000/svg"
>
	<g
		stroke-width="3"
		stroke="var(--foreground-color)"
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
	>
		<polyline points="6,9 5,9 5,18 15,18 15,9 14,9" />
		<line x1="10" y1="12" x2="10" y2="2" />
		<polyline points="7,5 10,2 13,5" />
	</g>
</svg>

<style>
	.safari-only {
		display: none;
	}

	:global(_::-webkit-full-page-media), :global(_:future), :global(:root) .safari-only {
		display: block;
	}

    :global(_::-webkit-full-page-media), :global(_:future), :global(:root) .other-os {
		display: none;
	}
</style>
