<script lang="ts">
	import { page } from "$app/state";
	import IconPencil from "$lib/components/icons/IconPencil.svelte";
	import Modal from "$lib/components/Modal.svelte";
	import ModalToggle from "$lib/components/ModalToggle.svelte";
</script>

<div class="scrollable flex-row">
	<div class="flex-row padded-top-bottom scrollable-content">
		<ModalToggle showModalKey="showProfileModal">
			<span class="flex-row button-content">
				<strong>{page.data.profileConfig.name}</strong>
				<IconPencil />
			</span>
		</ModalToggle>
		<Modal showModalKey="showProfileModal" title="Auswahl Datenquelle">z</Modal>
		<span class="hoverable hoverable--visible">Berlin</span>
		<span class="hoverable hoverable--visible">Österreich</span>
	</div>
</div>

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
		padding: 0.5rem 0.75rem;
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

	@media screen and (min-width: 1000px) {
		.scrollable {
			margin: 0;
			width: 100%;
		}
	}
</style>
