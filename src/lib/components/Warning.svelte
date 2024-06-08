<script lang="ts">
	export let message: string;
	export let color: string;
</script>

<div class="padded-top-bottom text--{color} flex-row">
	<svg width="17px" height="17px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
		<g stroke="var(--accent-{color})" stroke-width="3" stroke-linecap="round" fill="none">
			<circle cx="10" cy="10" r="8.5"/>
			<line x1="10" y1="12" x2="10" y2="14" stroke-width="4"/>
			<line x1="10" y1="6.5" x2="10" y2="6.5" stroke-width="4"/>
		</g>
	</svg>
	<span>{message}</span>
</div>

<style>
	.flex-row {
		align-items: center;
		gap: .5rem;
	}
</style>