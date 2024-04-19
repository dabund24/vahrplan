<!-- shamelessly stolen from https://svelte.dev/examples/modal -->

<script lang="ts">
	import Header from "$lib/components/Header.svelte";

	export let showModal: boolean;
	export let title: string;
	export let height: string = "fit-content"


	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<dialog bind:this={dialog} style:height={height}>
	<div>
		<Header {title}>
			<button
				on:click={() => void history.back()}
				class="button--small hoverable"
				type="button"
				title="Dialog schließen"
			>
				<svg width="16px" height="16px">
					<g stroke="var(--foreground-color)" stroke-width="3" stroke-linecap="round">
						<line x1="3" y1="3" x2="13" y2="13" />
						<line x1="3" y1="13" x2="13" y2="3" />
					</g>
				</svg>
			</button>
		</Header>
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
		scrollbar-width: thin;
		max-height: calc(100% - 5rem);
	}
	dialog::backdrop {
		background: var(--background-color--opaque, #ffffffe0);
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
</style>
