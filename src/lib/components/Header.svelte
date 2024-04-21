<script lang="ts">
	export let title: string;
	export let mobileOnly: boolean = false;
	export let fullScreen: boolean = false;
</script>

<header class="flex-row" class:mobile-only={mobileOnly} class:full-screen={fullScreen}>
	<strong>{title}</strong>
	<div class="buttons flex-row">
		<slot />
	</div>
</header>

<style>
	header {
		align-items: center;
		padding: 0.5rem 0.5rem 0.5rem 1rem;
		background-color: var(--background-color--opaque);
		backdrop-filter: var(--blur);
		-webkit-backdrop-filter: var(--blur);
		border-bottom: var(--border);
		position: sticky;
		top: 0;
		z-index: 500;
		min-height: 2.5rem;
		transition:
			background-color 0.4s var(--cubic-bezier),
			border-bottom-color 0.4s var(--cubic-bezier);
	}

	header.full-screen {
		position: fixed;
		background-color: transparent;
		border: none;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;

		& > strong {
			margin: -4px auto -4px calc(-4px - 0.5rem);
		}

		& > strong,
		& button {
			background-color: var(--background-color);
			border: var(--border);
			border-radius: var(--border-radius--large);
			padding: 0.5rem;
		}
	}

	.buttons {
		margin-left: auto;
	}

	@media screen and (min-width: 1000px) {
		.mobile-only {
			display: none;
		}
	}
</style>
