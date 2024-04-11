<script lang="ts">
	export let amountOfPositions: number;
	export let newPosition: number;
	let position = 0;
	let oldPosition = 0;

	$: updatePosition(newPosition);
	function updatePosition(newPosition: number): void {
		oldPosition = position;
		position = newPosition;
	}
</script>

<div
	class="line--accent"
	class:slide-to-right={position > oldPosition}
	class:slide-to-left={position < oldPosition}
	style:--position={`calc(${100 * position + 50}% / ${amountOfPositions})`}
></div>

<style>
	.line--accent {
		margin: calc(var(--line-width) * -1) calc(100% - var(--position) - 1rem) 0
			calc(var(--position) - 1rem);
		height: var(--line-width);
	}

	.slide-to-right {
		/*animation: animation--to-right 0.5s ease-in-out 0s alternate both;*/
		transition:
			margin-left 0.4s var(--cubic-bezier) 0.1s,
			margin-right 0.4s var(--cubic-bezier);
	}

	.slide-to-left {
		/*animation: animation--to-left 0.5s ease-in-out 0s alternate both;*/
		transition:
			margin-left 0.4s var(--cubic-bezier),
			margin-right 0.4s var(--cubic-bezier) 0.1s;
	}

	/* 
		TODO delete everything below when new transition mechanism prevails
	*/
	@keyframes animation--to-right {
		0% {
			margin-left: calc(var(--animation-start) - 1rem);
			margin-right: calc(100% - var(--animation-start) - 1rem);
		}
		25% {
			margin-left: calc(var(--animation-start) - 1rem);
		}
		75% {
			margin-right: calc(100% - var(--animation-end) - 1rem);
		}
		100% {
			margin-left: calc(var(--animation-end) - 1rem);
			margin-right: calc(100% - var(--animation-end) - 1rem);
		}
	}

	@keyframes animation--to-left {
		0% {
			margin-left: calc(var(--animation-start) - 1rem);
			margin-right: calc(100% - var(--animation-start) - 1rem);
		}
		25% {
			margin-right: calc(100% - var(--animation-start) - 1rem);
		}
		75% {
			margin-left: calc(var(--animation-end) - 1rem);
		}
		100% {
			margin-left: calc(var(--animation-end) - 1rem);
			margin-right: calc(100% - var(--animation-end) - 1rem);
		}
	}
</style>
