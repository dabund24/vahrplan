<script lang="ts">
	import type { Snippet } from "svelte";
	import { pushState } from "$app/navigation";

	type Props = {
		children: Snippet;
		showModalKey: keyof App.PageState;
		title?: string;
	};

	let { children, showModalKey, title }: Props = $props();

	function handleButtonClick(): void {
		pushState("", {
			[showModalKey]: true,
		});
	}
</script>

<button type="button" {title} class="hoverable hoverable--visible" onclick={handleButtonClick}>
	{@render children()}
</button>

<style>
	button {
		padding: 0 0.5rem;
	}
</style>
