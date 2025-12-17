<script lang="ts">
	import { page } from "$app/state";
	import IconPencil from "$lib/components/icons/IconPencil.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import ModalToggle from "$lib/components/ModalToggle.svelte";
	import ProfileSelection from "$lib/components/profiles/ProfileSelection.svelte";
	import { getBookmarks } from "$lib/bookmarks.svelte";
	import Warning from "$lib/components/Warning.svelte";
	import { scale } from "svelte/transition";
	import { flip } from "svelte/animate";

	const bookmarkedProfiles = $derived(
		getBookmarks("profile").filter(({ id }) => page.data.profileConfig.id !== id),
	);
</script>

<div class="scrollable flex-row">
	<div class="flex-row scrollable-content">
		<ModalToggle showModalKey="showProfileModal">
			<span class="flex-row button-content">
				<strong>{page.data.profileConfig.name}</strong>
				<IconPencil />
			</span>
		</ModalToggle>
		<Modal showModalKey="showProfileModal" title="Auswahl Datenquelle">
			<ProfileSelection />
		</Modal>
		{#each bookmarkedProfiles as { name, id } (id)}
			<a
				href="/{page.data.lang}/{id}"
				class="hoverable hoverable--visible"
				transition:scale
				animate:flip={{ duration: 400 }}
			>
				{name}
			</a>
		{/each}
	</div>
</div>
{#if page.data.profileConfig.disabledNotice !== undefined}
	<div class="content-wrapper">
		<Warning color="red">
			{page.data.profileConfig.disabledNotice.name} Wähle eine andere Datenquelle aus.
		</Warning>
	</div>
{/if}

<style>
	.scrollable {
		margin: 0 -0.75rem;
		width: calc(100% + 1.5rem);
		position: relative;
		padding: 0.5rem 0;
		align-items: stretch;
		overflow-x: auto;
		&:after,
		&:before {
			content: "";
			position: sticky;
			right: 0;
			left: 0;
			box-shadow: var(--background-color) 0 0 0.5rem 0.5rem;
		}
	}

	.scrollable-content {
		width: 30rem;
		min-width: fit-content;
		margin: auto;
		padding: 0 0.75rem;
		gap: 0.5rem;
		> :global(:first-child) {
			border-color: var(--accent-color);
		}
		.button-content {
			white-space: nowrap;
			gap: 0.5rem;
			align-items: center;
			padding: 0.5rem;
		}
		> * {
			white-space: nowrap;
		}
	}

	a {
		text-decoration: none;
	}

	@media screen and (min-width: 1000px) {
		.scrollable {
			margin: 0;
			width: 100%;
		}
	}
</style>
