<script lang="ts">
	type Props = { orientation: number };

	let { orientation }: Props = $props();
</script>

<div class="flashlight-container">
	<svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<radialGradient id="flashlight-gradient" cx="50%" cy="50%" r="50%">
				<stop offset="0%" style="stop-color:var(--accent-color);stop-opacity:0" />
				<stop offset="16%" style="stop-color:var(--accent-color);stop-opacity:0" />
				<stop offset="25%" style="stop-color:var(--accent-color);stop-opacity:1" />
				<stop offset="100%" style="stop-color:var(--accent-color);stop-opacity:0" />
			</radialGradient>
			<mask id="flashlight-mask">
				<polyline
					points="0,0 -50,-50 50,-50 0,0"
					fill="white"
					transform="translate(50,50) rotate({orientation})"
				/>
			</mask>
		</defs>
		<circle
			cx="50%"
			cy="50%"
			r="50%"
			fill="url(#flashlight-gradient)"
			mask="url(#flashlight-mask)"
		/>
	</svg>
</div>

<style>
	.flashlight-container {
		width: 0;
		height: 0;
		position: relative;
	}

	svg {
		position: absolute;
		translate: calc(-50% + 8px) calc(-50% - 8px);
	}
</style>
