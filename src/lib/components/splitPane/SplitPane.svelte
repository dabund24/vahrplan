<!-- Stolen and adapted from here: https://github.com/Rich-Harris/svelte-split-pane -->
<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { constrain } from "./utils";
	import type { Length } from "$lib/components/splitPane/types";

	const dispatch = createEventDispatcher();

	export let id: string | undefined = undefined;

	export let type: "horizontal" | "vertical";

	export let pos: Length = "50%";

	export let min: Length = "0%";

	export let max: Length = "100%";

	export let disabled = false;

	export let priority: "min" | "max" = "min";

	let container: HTMLElement;

	let dragging = false;
	let w = 0;
	let h = 0;

	$: position = pos;

	// constrain position
	$: if (container) {
		const size = type === "horizontal" ? w : h;
		position = disabled ? "100%" : constrain(container, size, min, max, position, priority);
	}

	function update(x: number, y: number): void {
		if (disabled) return;

		const { top, left } = container.getBoundingClientRect();

		const pos_px = type === "horizontal" ? x - left : y - top;
		const size = type === "horizontal" ? w : h;

		position = pos.endsWith("%") ? `${(100 * pos_px) / size}%` : `${pos_px}px`;

		dispatch("change");
	}

	function drag(
		node: HTMLElement,
		callback: (event: PointerEvent) => void
	): { destroy: () => void } {
		const pointerdown = (event: PointerEvent): void => {
			if (
				(event.pointerType === "mouse" && event.button === 2) ||
				(event.pointerType !== "mouse" && !event.isPrimary)
			)
				return;

			node.setPointerCapture(event.pointerId);

			event.preventDefault();

			dragging = true;

			const onpointerup = (): void => {
				dragging = false;

				node.setPointerCapture(event.pointerId);

				window.removeEventListener("pointermove", callback, false);
				window.removeEventListener("pointerup", onpointerup, false);
			};

			window.addEventListener("pointermove", callback, false);
			window.addEventListener("pointerup", onpointerup, false);
		};

		node.addEventListener("pointerdown", pointerdown, { capture: true, passive: false });

		return {
			destroy(): void {
				node.removeEventListener("pointerdown", pointerdown);
			}
		};
	}
</script>

<div
	data-pane={id}
	class="container {type}"
	bind:this={container}
	bind:clientWidth={w}
	bind:clientHeight={h}
	style="--pos: {position}"
>
	<div class="pane">
		<slot name="a" />
	</div>

	{#if !disabled}
		<div class="pane">
			<slot name="b" />
		</div>
	{/if}

		<div
			class="{type} divider"
			class:disabled
			class:dragging
			use:drag={(e) => void update(e.clientX, e.clientY)}
		/>
</div>

{#if dragging}
	<div class="mousecatcher" />
{/if}

<style>
	.container {
		--sp-thickness: var(--line-width);
		display: grid;
		position: relative;
		width: 100%;
		height: 100%;
		transition: .3s;
	}

	.container:has(.divider:hover, .divider:active, .divider.dragging) {
		--sp-thickness: calc(3 * var(--line-width));
		transition: 0s;
	}

	.container.vertical {
		grid-template-rows: var(--pos) 1fr;
	}

	.container.horizontal {
		grid-template-columns: var(--pos) 1fr;
	}

	.pane {
		width: 100%;
		height: 100%;
		overflow: auto;
	}

	.pane > :global(*) {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.mousecatcher {
		position: absolute;
		z-index: 600;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.0001);
	}

	.divider {
		position: absolute;
		z-index: 500;
		touch-action: none !important;
		transition: left .2s ease-out;
	}

	.divider::after {
		content: "";
		position: absolute;
		background-color: var(--background-color);
		background-image: linear-gradient(
			0deg,
			var(--foreground-color--opaque),
			var(--foreground-color--opaque)
		);
		translate: -50% 0;
		transition: width 0.2s ease-out;
		border-left: transparent solid calc(1rem - 8px);
		border-right: transparent solid calc(1rem - 8px);
		background-clip: padding-box;
	}

	.divider::before {
		content: "";
		position: absolute;
		z-index: 700;
		width: var(--line-width);
		height: 0;
		background-color: var(--foreground-color);
		border-radius: var(--border-radius--small);
		translate: -50% -50%;
		top: 50%;
		transition: height 0.2s ease-out;
	}

	.divider:hover,
	.divider:active,
	.divider.dragging {
		transition: none;
		&::before {
			height: var(--line-length);
		}
	}

	.divider.dragging::before {
		background-color: var(--accent-color);
	}

	.horizontal > .divider {
		width: 0;
		height: 100%;
		cursor: ew-resize;
		left: var(--pos);
		transform: translate(calc(-50% * var(--sp-thickness)), 0);
	}

	.horizontal > .divider::after {
		left: 50%;
		top: 0;
		width: var(--sp-thickness);
		height: 100%;
		z-index: 100;
	}

    .divider.disabled {
        cursor: default;
        visibility: hidden;
        width: 0;
        &::before, &::after {
            width: 0;
			border: none;
        }
    }

	.vertical > .divider {
		padding: calc(0.5 * var(--sp-thickness)) 0;
		width: 100%;
		height: 0;
		cursor: ns-resize;
		top: var(--pos);
		transform: translate(0, calc(-50% * var(--sp-thickness)));
	}

	.vertical > .divider.disabled {
		cursor: default;
	}

	.vertical > .divider::after {
		top: 50%;
		left: 0;
		width: 100%;
		height: 1px;
	}
</style>
