<script lang="ts">
	import type { Snippet } from "svelte";
	import type { Route } from "$lib/components/navbar/util";

	type Props = {
		currentRoute: Route | null;
		icon?: Snippet;
		pageName: string;
		link: string;
		route: Route;
	};

	const { currentRoute, icon, pageName, link, route }: Props = $props();
</script>

<li>
	<a href={link} class="hoverable" aria-current={currentRoute === route}>
		{#if icon !== undefined}
			{@render icon()}
		{/if}
		{pageName}
	</a>
</li>

<style>
	a {
		text-decoration: none;
		align-items: center;
		gap: 1rem;
		width: 100%;
		box-sizing: border-box;
		padding: 0.5rem 1rem;
		font-weight: bold;
	}

	a[aria-current="true"]::before {
		width: var(--line-width);
		height: 2rem;
		content: "";
		position: absolute;
		translate: calc(-1rem - var(--line-width));
		background-color: var(--accent-color);
		border-radius: var(--border-radius--small);
	}
</style>
