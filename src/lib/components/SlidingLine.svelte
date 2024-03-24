<script lang="ts">
	export let amountOfPositions: number;
	export let newPosition: number;
	let position = 0
	let oldPosition = 0;

	$: updatePosition(newPosition)
	function updatePosition(newPosition: number): void {
		oldPosition = position
		setTimeout(() => {
			position = newPosition
		}, 10)

	}

</script>

<div
	class="line--accent"
	class:slide-to-right={position > oldPosition}
	class:slide-to-left={position < oldPosition}
	style:--animation-start={`calc(${100 * oldPosition + 50}% / ${amountOfPositions})`}
	style:--animation-end={`calc(${100 * position + 50}% / ${amountOfPositions})`}
></div>

<style>
	.line--accent {
        margin: calc(var(--line-width) * -1) calc(100% - var(--animation-end) - 1rem) 0 calc(var(--animation-end) - 1rem);
        height: var(--line-width);
		animation-fill-mode: both;
	}

	.slide-to-right {
		animation: animation--to-right 0.5s ease-in-out 0s alternate both;
	}

	.slide-to-left {
		animation: animation--to-left 0.5s ease-in-out 0s alternate both;
	}

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
