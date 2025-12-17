<script lang="ts">
	import { page } from "$app/state";
	import { getBookmarks } from "$lib/bookmarks.svelte";
	import ProfileSelectionEntry from "$lib/components/profiles/ProfileSelectionEntry.svelte";
	import { flip } from "svelte/animate";
	import { crossfade } from "svelte/transition";
	const [send, receive] = crossfade({ duration: 400 });

	const bookmarks = $derived(getBookmarks("profile"));
</script>

<p>
	Wähle hier aus, woher die Verbindungsdaten kommen sollen. Eine regionalere Quelle bedeutet in
	der Regel eine bessere Datenqualität.
</p>

<ul class="flex-column">
	{#each page.data.allProfileConfigs.filter( ({ id }) => bookmarks.some(({ id: bookmarkId }) => bookmarkId === id), ) as profileConfig (profileConfig.id)}
		<li
			class="flex-column padded-top-bottom"
			aria-current={profileConfig.id === page.data.profileConfig.id}
			animate:flip={{ duration: 400 }}
			in:receive={{ key: profileConfig.id }}
			out:send={{ key: profileConfig.id }}
		>
			<ProfileSelectionEntry {profileConfig} />
		</li>
	{/each}
</ul>

{#if bookmarks.length > 0}
	<hr />
{/if}

<ul class="flex-column">
	{#each page.data.allProfileConfigs.filter(({ id }) => !bookmarks.some(({ id: bookmarkId }) => bookmarkId === id)) as profileConfig (profileConfig.id)}
		<li
			class="flex-column padded-top-bottom"
			aria-current={profileConfig.id === page.data.profileConfig.id}
			animate:flip={{ duration: 400 }}
			in:receive={{ key: profileConfig.id }}
			out:send={{ key: profileConfig.id }}
		>
			<ProfileSelectionEntry {profileConfig} />
		</li>
	{/each}
</ul>

<p>
	<i>Mehr Datenquellen folgen in Zukunft...</i>
</p>

<style>
	ul,
	li {
		gap: 0.5rem;
	}
</style>
