<script lang="ts">
	type Props = {
		amountOfPositions: number;
		newPosition: number;
		isShort?: boolean;
	};

	let { amountOfPositions, newPosition = $bindable(), isShort = false }: Props = $props();

	let oldPosition = $state(newPosition)
	let slidesToRight = $state(true);

	$effect(() => {
		if (oldPosition === newPosition) {
			return
		}
		slidesToRight = newPosition > oldPosition
		oldPosition = newPosition;
	});

</script>

<div
	class="line--accent"
	class:slides-to-right={slidesToRight}
	class:short={isShort}
	style:--position={`calc(${100 * newPosition + 50}% / ${amountOfPositions})`}
></div>

<style>
	.line--accent {
		--line-length: 2rem;
		margin: calc(var(--line-width) * -1) calc(100% - var(--position) - var(--line-length) / 2) 0
			calc(var(--position) - var(--line-length) / 2);
		height: var(--line-width);
        transition:
                background-color 0.4s var(--cubic-bezier),
                margin-left 0.4s var(--cubic-bezier),
                margin-right 0.4s var(--cubic-bezier) 0.1s;
    }
    .line--accent.slides-to-right {
        transition:
                background-color 0.4s var(--cubic-bezier),
                margin-left 0.4s var(--cubic-bezier) 0.1s,
                margin-right 0.4s var(--cubic-bezier);
    }

	.short {
		--line-length: 1rem;
	}

</style>
