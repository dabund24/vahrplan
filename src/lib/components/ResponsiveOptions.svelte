<script lang="ts">
	import type { ComponentProps } from "svelte";
	import Options from "$lib/components/Options.svelte";
	import ModalToggle from "$lib/components/ModalToggle.svelte";
	import BookmarkToggle from "$lib/components/bookmarks/BookmarkToggle.svelte";

	type Props = ComponentProps<typeof Options>;

	let { id, options, isExpandedToTop }: Props = $props();
</script>

<div class="mobile-only">
	<Options {id} {options} {isExpandedToTop} />
</div>
<div class="flex-row desktop-only options">
	{#each options as _, i (i)}
		{@const option = options[options.length - 1 - i]}
		{#if option.type === "link"}
			<a class="hoverable hoverable--visible" href={option.url} title={option.name}>
				{@render option.icon()}
			</a>
		{:else if option.type === "function"}
			<button
				title={option.name}
				class="hoverable hoverable--visible"
				onclick={option.onClick}
			>
				{@render option.icon()}
			</button>
		{:else if option.type === "modal"}
			<ModalToggle
				showModalKey={option.showModalKey}
				children={option.icon}
				title={option.name}
			/>
		{:else if option.type === "bookmark"}
			{#await option.bookmarkValue() then value}
				<BookmarkToggle type={option.bookmarkType} {value} hasBorder={true} />
			{/await}
		{/if}
	{/each}
</div>

<style>
	.options {
		gap: var(--line-width);
		justify-content: end;
	}

	.options > :global(*) {
		padding: 0.5rem;
	}
</style>
