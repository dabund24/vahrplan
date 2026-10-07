<script lang="ts">
	import type { ServerNews } from "../server/news.server";
	import StaticToast from "$lib/components/StaticToast.svelte";
	import ModalToggle from "$lib/components/ModalToggle.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import { page } from "$app/state";
	import { m } from "$lib/paraglide/messages";

	type Props = {
		news: ServerNews;
	};
	const { news }: Props = $props();

	const { id, title, message } = $derived(news);

	let isVisible = $state(true);

	function hideNews(): void {
		history.back();
		isVisible = false;
	}
</script>

<StaticToast {isVisible} isCloseButtonHidden={message !== undefined}>
	{#snippet text()}
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html title[page.data.lang]}
	{/snippet}
	{#snippet buttons()}
		{#if message !== undefined}
			<ModalToggle showModalKey={`serverNewsModal${id}`}>
				<div class="padded-top-bottom">{m.read_more()}</div>
			</ModalToggle>
			<Modal title={title[page.data.lang]} showModalKey={`serverNewsModal${id}`}>
				<div class="modal-content">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html message[page.data.lang]}
				</div>
				<div class="flex-row">
					<button
						class="hoverable hoverable--visible hoverable--accent"
						onclick={hideNews}
					>
						{m.okay()}
					</button>
				</div>
			</Modal>
		{/if}
	{/snippet}
</StaticToast>

<style>
	.modal-content {
		padding: 1rem 0;
	}

	.hoverable--accent {
		padding: 0.5rem 1rem;
	}
	.flex-row {
		justify-content: end;
		gap: 0.5rem;
	}
</style>
