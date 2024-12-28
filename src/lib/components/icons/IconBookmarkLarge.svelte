<svg width="26px" height="26px" xmlns="http://www.w3.org/2000/svg">
	<title>Lesezeichen</title>
	<mask id="bookmark-mask">
		<g stroke-width="8">
			<polyline points="21,24 21,2 5,2 5,24" stroke="white" />
			<polyline points="5,24 13,16 21,24" stroke="black" stroke-linecap="round" />
		</g>
	</mask>
	<g fill="none" stroke-linejoin="round">
		<polyline
			points="21,24 21,2 5,2 5,24"
			stroke-width="3"
			stroke="var(--foreground-color)"
			mask="url(#bookmark-mask)"
		/>
		<polyline
			points="5,24 13,16 21,24"
			stroke-width="4"
			stroke="var(--accent-color)"
			stroke-linecap="round"
		/>
	</g>
</svg>
