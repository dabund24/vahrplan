<script lang="ts">
	export let title
	export let mobileOnly: boolean = false
</script>

<header class="flex-row" class:mobile-only={mobileOnly} >
	<strong>{title}</strong>
	<div class="buttons flex-row">
		<slot />
	</div>
</header>

<style>
    header {
        align-items: center;
        padding: .5rem .5rem .5rem 1rem;
        background-color: var(--background-color--opaque);
        backdrop-filter: var(--blur);
        -webkit-backdrop-filter: var(--blur);
        border-bottom: var(--border);
        position: sticky;
        top: 0;
        z-index: 500;
		min-height: 2.5rem;
		transition: background-color .4s var(--cubic-bezier);
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