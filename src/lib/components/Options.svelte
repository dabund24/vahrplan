<script lang="ts" generics="T extends BookmarkType">
	import IconOptions from "$lib/components/icons/IconOptions.svelte";
	import type { Snippet } from "svelte";
	import ModalToggle from "$lib/components/ModalToggle.svelte";
	import type { BookmarkData, BookmarkType } from "$lib/bookmarks.svelte";
	import BookmarkToggle from "$lib/components/bookmarks/BookmarkToggle.svelte";

	type OptionElement = {
		name: string;
		icon: Snippet;
	} & (OptionElementLink | OptionElementFunction | OptionElementModal | OptionElementBookmark);

	type OptionElementLink = {
		type: "link";
		url: string;
	};

	type OptionElementFunction = {
		type: "function";
		onClick: () => void;
	};

	type OptionElementModal = {
		type: "modal";
		showModalKey: keyof App.PageState;
	};

	type OptionElementBookmark = {
		type: "bookmark";
		bookmarkType: T;
		bookmarkValue: () => Promise<BookmarkData<T>> | BookmarkData<T>;
	};

	type Props = {
		id: string;
		options: OptionElement[];
		isExpandedToTop?: boolean;
		isAccent?: boolean;
	};

	let { id, options, isExpandedToTop = false, isAccent = false }: Props = $props();

	let popoverElement: HTMLElement;

	function handleOptionClick(optionFun: () => void): void {
		optionFun();
		popoverElement.hidePopover();
	}
</script>

<div class="container">
	<button
		id="{id}-popover-toggle"
		title="Optionen"
		popovertarget="{id}-popover"
		class="hoverable"
		class:hoverable--accent={isAccent}
		style="anchor-name: --{id}-popover-anchor;"
	>
		<IconOptions />
	</button>
	{#snippet optionsContent()}
		{#each options as option (option.name)}
			{#snippet buttonContent()}
				<span>
					{option.name}
				</span>
				{@render option.icon()}
			{/snippet}
			<li>
				{#if option.type === "link"}
					<a href={option.url} class="flex-row hoverable padded-top-bottom option-button">
						{@render buttonContent()}
					</a>
				{:else if option.type === "function"}
					<button
						onclick={() => void handleOptionClick(option.onClick)}
						class="flex-row hoverable padded-top-bottom option-button"
					>
						{@render buttonContent()}
					</button>
				{:else if option.type === "modal"}
					<ModalToggle showModalKey={option.showModalKey} children={buttonContent} />
				{:else if option.type === "bookmark"}
					{#await option.bookmarkValue() then value}
						<BookmarkToggle
							type={option.bookmarkType}
							{value}
							hasText={true}
							postCallback={() => void popoverElement.hidePopover()}
						/>
					{/await}
				{/if}
			</li>
		{/each}
	{/snippet}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		id="{id}-popover"
		popover="auto"
		class:expand-to-top={isExpandedToTop}
		style="position-anchor: --{id}-popover-anchor"
		bind:this={popoverElement}
		onclick={() => void popoverElement.hidePopover()}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="options-container" onclick={(e) => void e.stopPropagation()}>
			<!-- TODO Remove this button once anchor positioning is widely supported! -->
			<button
				title="Optionen schließen"
				aria-label="Optionen schließen"
				class="close-button padded-top-bottom"
				popovertarget="{id}-popover"
			>
				<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
					<polyline
						points="2,6 10,14 18,6"
						stroke="var(--foreground-color)"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
						fill="none"
					/>
				</svg>
			</button>
			<ul class="options">
				{@render optionsContent()}
			</ul>
		</div>
	</div>
</div>

<style>
	[popover] {
		background-color: transparent;
		padding: 0;
	}

	.hoverable--accent:not(:hover, :active) {
		background-color: transparent;
		border-color: transparent;
	}

	@supports (left: anchor(right)) {
		.close-button {
			display: none;
		}

		[popover] {
			border-radius: var(--border-radius--large);
			background-color: var(--background-color--transparent);
			border: var(--border);
			right: calc(anchor(right) - var(--line-width));
			top: calc(anchor(bottom) + var(--line-width));
			margin: 0 0 0 auto;
		}

		[popover].expand-to-top {
			top: auto;
			bottom: calc(anchor(top) + var(--line-width));
		}

		[popover]:popover-open {
			animation: zoom 0.2s var(--cubic-bezier--bounce);
		}
	}

	li > :global(:where(button, a)) {
		padding: 0.5rem;
		gap: 1rem;
		width: 100%;
		min-width: max-content;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		text-decoration: none;
		border-color: transparent;
		background-color: transparent;
	}

	/*
    	TODO Remove these rules once anchor positioning is widely supported!
     */
	@supports not (left: anchor(right)) {
		[popover] {
			width: 100vw;
			height: 100vh;
			border: none;
			background-color: var(--background-color--transparent);
			animation: fade-in 0.4s var(--cubic-bezier--regular);
		}

		:global(body):has(:popover-open) {
			overflow: hidden;
		}

		[popover]:popover-open .options-container {
			animation: slide-in 0.4s var(--cubic-bezier--regular);
		}

		.close-button {
			width: 100%;
			display: flex;
			justify-content: center;
		}

		.options-container {
			background-color: var(--background-color);
			border-top: var(--border);
			position: fixed;
			bottom: 0;
			box-sizing: border-box;
			width: 100%;
		}

		.options {
			padding: 0 0 calc(0.5rem + env(safe-area-inset-bottom));
		}

		li > :global(:where(button, a)) {
			padding: 0.5rem 1rem;
		}

		@media screen and (min-width: 500px) {
			.options-container {
				border-left: var(--border);
				border-right: var(--border);
				border-top-left-radius: var(--border-radius--large);
				border-top-right-radius: var(--border-radius--large);
				width: 20rem;
				left: calc(50vw - 10rem);
			}
		}
	}

	@keyframes slide-in {
		from {
			transform: translateY(50%);
		}
		to {
			transform: translateY(0);
		}
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
