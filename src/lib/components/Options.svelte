<script lang="ts">
	import IconOptions from "$lib/components/icons/IconOptions.svelte";
	import type { Snippet } from "svelte";

	type Props = {
		id: string;
		options: {
			name: string;
			icon: Snippet;
			onClick: () => void;
		}[];
	};

	let { id, options }: Props = $props();

	let popoverElement: HTMLElement;

	function handleOptionClick(optionFun: () => void): void {
		optionFun();
		popoverElement.hidePopover();
	}
</script>

<div class="container">
	<button
		id="{id}-popover-toggle"
		popovertarget="{id}-popover"
		class="hoverable"
		style="anchor-name: --{id}-popover-anchor;"
	>
		<IconOptions />
	</button>
	{#snippet optionsContent()}
		{#each options as option}
			<li>
				<button
					onclick={() => void handleOptionClick(option.onClick)}
					class="flex-row padded-top-bottom option-button"
				>
					<span>
						{option.name}
					</span>
					{@render option.icon()}
				</button>
			</li>
		{/each}
	{/snippet}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<dialog
		id="{id}-popover"
		popover="auto"
		style="position-anchor: --{id}-popover-anchor"
		bind:this={popoverElement}
		onclick={() => void popoverElement.hidePopover()}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="options-container" onclick={(e) => void e.stopPropagation()}>
			<!-- TODO Remove this button once anchor positioning is widely supported! -->
			<button class="close-button padded-top-bottom" popovertarget="{id}-popover">
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
	</dialog>
</div>

<style>
	[popover] {
		background-color: transparent;
		padding: 0;
	}

	button:hover, button:active {
		background-color: var(--foreground-color--very-transparent);
	}

	@supports (left: anchor(right)) {
		.close-button {
			display: none;
		}

		[popover] {
			border-radius: var(--border-radius--large);
			background-color: var(--background-color--transparent);
			border: var(--border);
			right: anchor(right);
			top: calc(anchor(bottom) + 4px);
			margin: 0 0 0 auto;
		}

		[popover]:popover-open {
			animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		}
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
			animation: fade-in 0.4s var(--cubic-bezier);
		}

		:global(body):has(:popover-open) {
			overflow: hidden;
		}

		[popover]:popover-open .options-container {
			animation: slide-in 0.4s var(--cubic-bezier);
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

		.options :global(button) {
			padding: .5rem 1rem;
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

	.option-button {
		padding: 0.5rem;
		gap: 1rem;
		width: 100%;
		min-width: max-content;
		justify-content: space-between;
		align-items: center;
	}

	@keyframes zoom {
		from {
			transform: scale(0.2);
		}
		to {
			transform: scale(1);
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
