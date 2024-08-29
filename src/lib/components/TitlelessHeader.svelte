<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		isBelowHeaderMobile?: boolean;
		isBelowHeaderDesktop?: boolean;
		children: Snippet;
	};

	let { isBelowHeaderMobile = false, isBelowHeaderDesktop = false, children }: Props = $props();
</script>

<div
	class="titleless-header"
	class:below-header--mobile={isBelowHeaderMobile}
	class:below-header--desktop={isBelowHeaderDesktop}
>
	{@render children()}
	<div class="transition"></div>
</div>

<style>
	.titleless-header {
		width: var(--header-width, 100%);
		position: sticky;
		top: 0;
        z-index: 500;
		transition: width 0.4s var(--cubic-bezier);
		& > :global(:not(:last-child)) {
			background-color: var(--background-color--transparent);
            transition: background 0.4s var(--cubic-bezier);
        }
	}

    .transition {
        --background-color--transparent--transitionable: var(--background-color--transparent);
        background: linear-gradient(
                to bottom,
                var(--background-color--transparent--transitionable),
                transparent
        );
        transition: --background-color--transparent--transitionable 0.4s var(--cubic-bezier);
    }

    @property --background-color--transparent--transitionable {
        syntax: "<color>";
        initial-value: #ffffffe0;
        inherits: false;
    }

    @media screen and (min-width: 1000px) {
        .below-header--desktop {
            top: calc(3.5rem + 4px);
        }
    }

    @media screen and (max-width: 999px) {
        .below-header--mobile {
            top: calc(3.5rem + 4px);
        }
    }
</style>
