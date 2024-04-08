<!-- shamelessly stolen from https://svelte.dev/examples/modal -->

<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} on:close={() => void (showModal = false)}>
	<div>
		<header class="flex-row">
			<slot name="title" />
			<div class="buttons flex-row">
				<button
					on:click={() => void dialog.close()}
					class="button--small hoverable"
					type="button"
				>
					<svg width="16px" height="16px">
						<g stroke="var(--foreground-color)" stroke-width="3" stroke-linecap="round">
							<line x1="3" y1="3" x2="13" y2="13" />
							<line x1="3" y1="13" x2="13" y2="3" />
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
		background: var(--background-color--opaque, #ffffffe0);
		backdrop-filter: var(--blur, blur(3px));
		-webkit-backdrop-filter: var(--blur, blur(3px));
	}
	:global([data-theme="dark"]) dialog::backdrop {
        background: var(--background-color--opaque, #121212e0);
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
		background-color: var(--background-color--opaque);
		backdrop-filter: var(--blur);
		-webkit-backdrop-filter: var(--blur);
		border-bottom: var(--border);
		position: sticky;
        top: 0;
        z-index: 500;
	}
	.buttons {
		margin-left: auto;
	}
</style>
