<script lang="ts">
	import Header from "$lib/components/Header.svelte";
	import type { Snippet } from "svelte";
	import IconClose from "$lib/components/icons/IconClose.svelte";
	import { page } from "$app/state";

	type Props = {
		title: string | Snippet;
		height?: string;
		children: Snippet;
		headerItems?: Snippet;
		showModalKey: keyof App.PageState;
	};

	let { title, height = "fit-content", children, headerItems, showModalKey }: Props = $props();

	let dialog: HTMLDialogElement | undefined = $state();

	$effect(() => {
		if (dialog) {
			dialog.showModal();
		}
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
{#if page.state[showModalKey]}
	<dialog
		bind:this={dialog}
		onclick={() => void dialog?.close()}
		onclose={() => void history.back()}
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div onclick={(e) => void e.stopPropagation()} style:height>
			<Header {title}>
				{@render headerItems?.()}
				<button
					onclick={() => void dialog?.close()}
					class="hoverable"
					type="button"
					title="Dialog schließen"
				>
					<IconClose />
				</button>
			</Header>
			<div class="content-wrapper">
				{@render children()}
			</div>
		</div>
	</dialog>
{/if}

<style>
	dialog {
		width: 30rem;
		border-radius: var(--border-radius--large);
		border: var(--border);
		background-color: var(--background-color);
		color: var(--foreground-color);
		padding: 0;
		scrollbar-width: thin;
		max-height: calc(100% - env(safe-area-inset-top) - env(safe-area-inset-bottom) - 5rem);
	}
	dialog::backdrop {
		background: var(--background-color--transparent);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.content-wrapper {
		padding-bottom: 0.5rem;
	}
</style>
