<script lang="ts">
	import type { Snippet } from "svelte";

	type Props = {
		title: string;
		children: Snippet;
	};

	let { title, children }: Props = $props();
</script>

<details class="padded-top-bottom">
	<summary class="flex-row hoverable hoverable--visible">
		{title}
		<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg">
			<g stroke="var(--foreground-color)" stroke-width="3" fill="none" stroke-linecap="round">
				<line x1="8" y1="11" x2="4" y2="7" />
				<line x1="8" y1="11" x2="12" y2="7" />
			</g>
		</svg>
	</summary>
	{@render children()}
</details>

<style>
	details[open] svg {
		transform: scaleY(-1);
	}
	summary {
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}
</style>
