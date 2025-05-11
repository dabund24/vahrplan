<script lang="ts">
	import type { ServerNews } from "../server/news.server";
	import StaticToast from "$lib/components/StaticToast.svelte";
	import ModalToggle from "$lib/components/ModalToggle.svelte";
	import Modal from "$lib/components/Modal.svelte";

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
		{@html title}
	{/snippet}
	{#snippet buttons()}
		{#if message !== undefined}
			<ModalToggle showModalKey={`serverNewsModal${id}`}>
				<div class="padded-top-bottom">Mehr lesen</div>
			</ModalToggle>
			<Modal {title} showModalKey={`serverNewsModal${id}`}>
				<div class="modal-content">
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					{@html message}
				</div>
				<div class="flex-row">
					<button
						class="hoverable hoverable--visible hoverable--accent"
						onclick={hideNews}
					>
						Okay
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
