<script lang="ts">
	export let title: string;
	export let mobileOnly: boolean = false;
	export let fullScreen: boolean = false;
</script>

<header class="flex-row" class:mobile-only={mobileOnly} class:full-screen={fullScreen}>
	<strong class="limit-lines">{title}</strong>
	<div class="buttons flex-row">
		<slot />
	</div>
</header>

<style>
	header {
		align-items: center;
		padding: 0.5rem 0.5rem 0.5rem 1rem;
		background-color: var(--background-color--transparent);
		backdrop-filter: var(--blur);
		-webkit-backdrop-filter: var(--blur);
		border-bottom: var(--border);
		position: sticky;
		top: 0;
		z-index: 500;
		height: 2.5rem;
		transition:
			background-color 0.4s var(--cubic-bezier),
			border-bottom-color 0.4s var(--cubic-bezier);
		& > strong {
			-webkit-line-clamp: 2;
		}
	}

	.buttons {
		margin-left: auto;
	}

	.mobile-only {
		padding-top: calc(0.5rem + env(safe-area-inset-top));
	}

	@media screen and (min-width: 1000px) {
		.mobile-only {
			display: none;
		}
	}
</style>
