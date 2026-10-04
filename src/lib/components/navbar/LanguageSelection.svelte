<script lang="ts">
	import { type Locale, locales, localizeHref } from "$lib/paraglide/runtime";
	import { page } from "$app/state";

	const localeNames: Record<Locale, string> = {
		en: "English",
		de: "Deutsch",
	};
</script>

<button popovertarget="language-selection" class="hoverable">
	<strong>{page.data.lang.toUpperCase()}</strong>
</button>

<div id="language-selection" popover="auto">
	{#each locales as locale (locale)}
		<a
			href={localizeHref(page.url.pathname, { locale })}
			class="hoverable"
			data-sveltekit-reload
		>
			{localeNames[locale]}
		</a>
	{/each}
</div>

<style>
	button > * {
		width: 1.625rem;
		margin: auto;
		text-align: center;
	}

	[popover] {
		border-radius: var(--border-radius--large);
		border: var(--border);
		background-color: var(--background-color);
		color: var(--foreground-color);
		padding: 0.5rem 0;
		scrollbar-width: thin;
		inset: calc(var(--navbar-space--top) + 0.5rem) 0.5rem auto auto;
	}

	[popover]:popover-open {
		display: flex;
		flex-direction: column;
		animation: zoom 0.2s var(--cubic-bezier--bounce);
	}

	a {
		text-decoration: none;
	}

	@media screen and (min-width: 1000px) {
		[popover] {
			top: calc(
				max(0.25rem, env(safe-area-inset-top)) + 1.25rem + 26px + 3 * var(--line-width)
			);
		}
	}
</style>
