<script lang="ts">
	import { page } from "$app/state";
	import { getBookmarks } from "$lib/bookmarks.svelte";
	import ProfileSelectionEntry from "$lib/components/profiles/ProfileSelectionEntry.svelte";

	const bookmarks = $derived(getBookmarks("profile"));
</script>

<p>
	Wähle hier aus, woher die Verbindungsdaten kommen sollen. Eine regionalere Quelle bedeutet in
	der Regel eine bessere Datenqualität.
</p>

<ul class="flex-column">
	{#each page.data.allProfileConfigs.filter( ({ id }) => bookmarks.some(({ id: bookmarkId }) => bookmarkId === id) ) as profileConfig (profileConfig.id)}
		<ProfileSelectionEntry {profileConfig} />
	{/each}
</ul>

{#if bookmarks.length > 0}
	<hr />
{/if}

<ul class="flex-column">
	{#each page.data.allProfileConfigs.filter(({ id }) => !bookmarks.some(({ id: bookmarkId }) => bookmarkId === id)) as profileConfig (profileConfig.id)}
		<ProfileSelectionEntry {profileConfig} />
	{/each}
</ul>

<style>
	ul {
		gap: 0.5rem;
	}
</style>
