<script lang="ts">
	import type { ProfileConfig } from "$lib/server/profiles/profile";
	import BookmarkToggle from "$lib/components/bookmarks/BookmarkToggle.svelte";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import { page } from "$app/state";
	import IconCheckmark from "$lib/components/icons/IconCheckmark.svelte";
	import type { ProfileId } from "../../../params/profileId";
	import { goto } from "$app/navigation";

	type Props = {
		profileConfig: ProfileConfig;
	};

	const { profileConfig }: Props = $props();

	function selectProfile(profileId: ProfileId): void {
		if (profileId !== page.data.profileConfig.id) {
			void goto(`/${page.data.lang}/${profileId}`);
		} else {
			history.back();
		}
	}
</script>

<li
	class="flex-row padded-top-bottom"
	aria-current={profileConfig.id === page.data.profileConfig.id}
>
	<header class="flex-column">
		<strong>{profileConfig.name}</strong>
		<i>{profileConfig.id}</i>
	</header>
	<BookmarkToggle type="profile" iconType="star" value={profileConfig} />
	<button
		class="hoverable hoverable--visible"
		class:hoverable--accent={profileConfig.id !== page.data.profileConfig.id}
		title="Profil {profileConfig.name} auswählen"
		onclick={() => void selectProfile(profileConfig.id)}
	>
		{#if profileConfig.id === page.data.profileConfig.id}
			<IconCheckmark />
		{:else}
			<IconRightArrow />
		{/if}
	</button>
</li>

<style>
	li {
		gap: 0.5rem;
		align-items: center;
	}
	button:not(.hoverable--accent) {
		border-color: var(--accent-color);
	}
	header {
		margin-right: auto;
	}
</style>
