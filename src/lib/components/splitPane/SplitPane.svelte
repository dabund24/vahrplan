<!-- Stolen and adapted from here: https://github.com/Rich-Harris/svelte-split-pane -->
<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { constrain } from "./utils";
	import type { Length } from "$lib/components/splitPane/types";

	type Props = {
		id?: string;
		pos?: Length;
		min?: Length;
		max?: Length;
		disabled?: boolean;
		priority?: "min" | "max";
		leftPane: Snippet;
		rightPane: Snippet;
	};

	let {
		id = undefined,
		pos = "50%",
		min = "0%",
		max = "100%",
		disabled = false,
		priority = "min",
		leftPane,
		rightPane
	}: Props = $props();

	let container: HTMLElement | undefined;

	let dragging = $state(false);
	let size = $state(0);

	let desiredPosition = $state(pos);
	let position = $derived(constrain(container, size, min, max, desiredPosition, priority));
	let loading = $state(true);

	onMount(() => setTimeout(() => (loading = false), 500));

	function update(x: number): void {
		if (disabled || container === undefined) return;

		const { left } = container.getBoundingClientRect();

		const pos_px = x - left;

		desiredPosition = pos.endsWith("%") ? `${(100 * pos_px) / size}%` : `${pos_px}px`;
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
	class="container"
	class:loading
	bind:this={container}
	bind:clientWidth={size}
	style="--pos: {position}"
>
	<div class="pane">
		{@render leftPane()}
	</div>

	{#if !disabled}
		<div class="pane">
			{@render rightPane()}
		</div>
		<div
			class="divider"
			class:disabled
			class:dragging
			use:drag={(e) => void update(e.clientX)}
		></div>
	{/if}
</div>

{#if dragging}
	<div class="mousecatcher"></div>
{/if}

<style>
	.container {
		--sp-thickness: calc(3 * var(--line-width));
		display: grid;
		position: relative;
		width: 100%;
		height: 100%;
		transition: 0.4s var(--cubic-bezier);
		grid-template-columns: var(--pos) 1fr;
	}

	.container:has(.divider:hover, .divider:active, .divider.dragging) {
		transition: 0s;
	}

	.container.loading {
		transition: 0s;
	}

	.pane {
		width: 100%;
		max-width: 100vw;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
		&:first-child {
			padding-right: calc(var(--sp-thickness) / 2);
		}
		&:nth-child(2) {
			padding-left: calc(var(--sp-thickness) / 2);
		}
	}

	.pane > :global(*) {
		width: 100%;
		height: 100%;
		overflow: auto;
		box-sizing: border-box;
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
		transition: left 0.4s var(--cubic-bezier);
		width: 0;
		height: 100%;
		cursor: ew-resize;
		left: var(--pos);
		transform: translate(calc(-50% * var(--sp-thickness)), 0);
	}

	.loading .divider {
		transition: none;
	}

	.divider::after {
		content: "";
		position: absolute;
		background-color: var(--background-color);
		background-image: linear-gradient(
			0deg,
			var(--foreground-color--transparent),
			var(--foreground-color--transparent)
		);
		translate: -50% 0;
		transition: width 0.2s ease-out;
		border-left: transparent solid calc(1rem - 8px);
		border-right: transparent solid calc(1rem - 8px);
		background-clip: padding-box;
		left: 50%;
		top: 0;
		width: var(--sp-thickness);
		height: 100%;
		z-index: 100;
	}

	.divider::before {
		content: "";
		position: absolute;
		z-index: 700;
		width: var(--line-width);
		height: var(--line-length);
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
			height: calc(1.5 * var(--line-length));
		}
	}

	.divider.dragging::before {
		background-color: var(--accent-color);
	}

	.divider.disabled {
		cursor: default;
		visibility: hidden;
		width: 0;
		&::before,
		&::after {
			width: 0;
			border: none;
		}
	}

	@media screen and (max-width: 999px) {
		.pane {
			overflow: unset;
		}
		.pane > :global(*) {
			overflow: unset;
		}
	}

	@media screen and (pointer: fine) {
		.divider::after {
			border-width: 0;
		}
	}
</style>
