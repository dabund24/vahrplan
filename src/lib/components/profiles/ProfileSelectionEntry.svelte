<script lang="ts">
	import type { ProfileConfig } from "$lib/server/profiles/profile";
	import BookmarkToggle from "$lib/components/bookmarks/BookmarkToggle.svelte";
	import IconRightArrow from "$lib/components/icons/IconRightArrow.svelte";
	import { page } from "$app/state";
	import IconCheckmark from "$lib/components/icons/IconCheckmark.svelte";
	import { goto } from "$app/navigation";
	import { toast } from "$lib/state/toastStore";
	import Warning from "$lib/components/Warning.svelte";
	import { resolve } from "$app/paths";

	type Props = {
		profileConfig: ProfileConfig;
	};

	const { profileConfig }: Props = $props();

	function selectProfile(): void {
		if (profileConfig.disabledNotice !== undefined) {
			toast(`Datenquelle nicht auswählbar. ${profileConfig.disabledNotice.name}`, "red");
			return;
		}
		if (profileConfig.id !== page.data.profileConfig.id) {
			void goto(resolve(`/${page.data.lang}/${profileConfig.id}`));
		} else {
			history.back();
		}
	}
</script>

<div class="regular-row flex-row">
	<header class="flex-column">
		<strong>{profileConfig.name}</strong>
		<i>{profileConfig.id}</i>
	</header>
	<BookmarkToggle type="profile" iconType="star" value={profileConfig} />
	{#if profileConfig.disabledNotice === undefined}
		<button
			class="hoverable hoverable--visible"
			class:hoverable--accent={profileConfig.id !== page.data.profileConfig.id}
			title="Profil {profileConfig.name} auswählen"
			onclick={selectProfile}
		>
			{#if profileConfig.id === page.data.profileConfig.id}
				<IconCheckmark />
			{:else}
				<IconRightArrow />
			{/if}
		</button>
	{/if}
</div>
{#if profileConfig.disabledNotice !== undefined}
	<Warning color="red">
		Datenquelle {profileConfig.name} nicht auswählbar. {profileConfig.disabledNotice.name}
	</Warning>
{/if}

<style>
	.regular-row {
		gap: 0.5rem;
		align-items: center;
		width: 100%;
	}
	button.hoverable--visible:not(.hoverable--accent) {
		border-color: var(--accent-color);
	}
	header {
		margin-right: auto;
	}
</style>
