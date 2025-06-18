<script lang="ts">
	type Props = {
		amountOfPositions: number;
		newPosition: number;
		isShort?: boolean;
	};

	let { amountOfPositions, newPosition = $bindable(), isShort = false }: Props = $props();

	let position = $state(newPosition);
	let oldPosition = $state(newPosition);
	$effect(() => updatePosition(newPosition));
	function updatePosition(newPosition: number): void {
		if (newPosition === position) {
			return;
		}
		oldPosition = position;
		position = newPosition;
	}
</script>

<div
	class="line--accent"
	class:slides-to-right={newPosition > oldPosition}
	class:short={isShort}
	style:--position={`calc(${100 * position + 50}% / ${amountOfPositions})`}
></div>

<style>
	.line--accent {
		--line-length: 2rem;
		margin: calc(var(--line-width) * -1) calc(100% - var(--position) - var(--line-length) / 2) 0
			calc(var(--position) - var(--line-length) / 2);
		height: var(--line-width);
		transition:
			background-color 0.4s var(--cubic-bezier--regular),
			margin-left 0.4s var(--cubic-bezier--regular),
			margin-right 0.4s var(--cubic-bezier--regular) 0.1s;
	}
	.line--accent.slides-to-right {
		transition:
			background-color 0.4s var(--cubic-bezier--regular),
			margin-left 0.4s var(--cubic-bezier--regular) 0.1s,
			margin-right 0.4s var(--cubic-bezier--regular);
	}

	.short {
		--line-length: 1rem;
	}
</style>
