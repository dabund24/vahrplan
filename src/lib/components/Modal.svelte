<!-- shamelessly stolen from https://svelte.dev/examples/modal -->

<script lang="ts">
	export let showModal: boolean;
	export let title: string;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} on:close={() => void (showModal = false)}>
	<div>
		<header class="flex-row">
			<strong>
				{title}
			</strong>
			<div class="buttons flex-row">
				<button
					on:click={() => void dialog.close()}
					class="button--small hoverable"
					type="button"
				>
					<svg width="17px" height="17px" viewBox="0 0 20 20">
						<g stroke="var(--foreground-color)" stroke-width="3" stroke-linecap="round">
							<line x1="4" y1="4" x2="16" y2="16" />
							<line x1="4" y1="16" x2="16" y2="4" />
						</g>
					</svg>
				</button>
			</div>
		</header>
		<slot />
	</div>
</dialog>

<style>
	dialog {
		width: 30rem;
		border-radius: var(--border-radius--large);
		border: var(--border);
		background-color: var(--background-color);
		padding: 0;
	}
	dialog::backdrop {
		background-color: var(--background-color--opaque);
		backdrop-filter: var(--blur);
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
	header {
		align-items: center;
		padding: .5rem .5rem .5rem 1rem;
		border-bottom: var(--border);
	}
	.buttons {
		margin-left: auto;
	}
</style>
