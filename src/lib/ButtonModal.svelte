<script lang="ts">
	import type { Snippet } from "svelte";
	import Modal from "$lib/components/Modal.svelte";
	import { pushState } from "$app/navigation";
	import { page } from "$app/stores";

	type Props = {
		buttonContent: Snippet;
		children: Snippet;
		modalTitle: string;
		showModalKey: Exclude<keyof App.PageState, "showTripInfoModal">;
	};

	let { buttonContent, children, modalTitle, showModalKey }: Props = $props();

	function handleButtonClick(): void {
		pushState("", {
			[showModalKey]: true
		});
	}
</script>

<button type="button" class="hoverable hoverable--visible" onclick={handleButtonClick}>
	{@render buttonContent()}
</button>

{#if $page.state[showModalKey]}
	<Modal title={modalTitle} showModal={$page.state[showModalKey]}>
		{@render children()}
	</Modal>
{/if}

<style>
	button {
		padding: 0 0.5rem;
	}
</style>
