<script lang="ts">
	import { toasts } from "$lib/state/toastStore";
	import { flip } from "svelte/animate";
	import { scale } from "svelte/transition";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import IconInfo from "$lib/components/icons/IconInfo.svelte";
	import IconCheckmark from "$lib/components/icons/IconCheckmark.svelte";
	import ServiceWorkerUpdates from "$lib/components/ServiceWorkerUpdates.svelte";
</script>

<div popover="manual" class="toasts flex-column">
	{#each $toasts as toast (toast.id)}
		<div
			class="toast"
			transition:scale
			animate:flip={{ duration: 400 }}
			style="--color: var(--accent--{toast.color})"
		>
			<div class="flex-row">
				{#if toast.color === "red"}
					<IconClose />
				{:else if toast.color === "green"}
					<IconCheckmark />
				{:else}
					<IconInfo />
				{/if}
				<div>{toast.message}</div>
			</div>
			<div class="line--regular line--{toast.color}"></div>
		</div>
	{/each}
	<ServiceWorkerUpdates />
</div>

<style>
	.toasts {
		position: fixed;
		z-index: 800;
		inset: unset;
		bottom: calc(max(var(--navbar-space--bottom), env(safe-area-inset-bottom)) + 0.5rem);
		border: none;
		left: 50%;
		width: 0;
		align-items: center;
		gap: 0.5rem;
		overflow: visible;
		padding: 0;
	}

	.toasts > :global(*) {
		padding: 0.5rem 1rem;
		border-radius: var(--border-radius--large);
		border: var(--border);
		background-color: var(--background-color--transparent);
		box-sizing: border-box;
	}

	.toast {
		width: min(25rem, 100vw - 1.5rem);
	}

	.flex-row {
		gap: 1rem;
		align-items: center;
	}

	.line--regular {
		margin: 0 -0.5rem calc(-1 * var(--line-width));
		width: calc(100% + 1rem);
		translate: 0 0.5rem;
		transition: width 3s var(--cubic-bezier);
		background-color: var(--color);
	}

	@starting-style {
		.line--regular {
			width: 0;
		}
	}
</style>
