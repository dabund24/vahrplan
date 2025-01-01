<script lang="ts">
	import { browser } from "$app/environment";
	import { scale } from "svelte/transition";
	import IconClose from "$lib/components/icons/IconClose.svelte";

	let isUpdatable = $state(false);
	let updateFn: () => void = $state(() => void {}); // the function to run when user clicks "update"

	/**
	 * sets `isUpdatable` to `true` if a new service worker (and thus a new app) version is available
	 * see https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68 for details
	 * @param reg object received by `serviceWorker.register()` call
	 * @param isFirstVisit user has never visited this page before => don't show update popup
	 */
	function listenForWaitingServiceWorker(
		reg: ServiceWorkerRegistration,
		isFirstVisit: boolean
	): void {
		const showUpdateButton = (): void => {
			isUpdatable = true;
			updateFn = () => void reg.waiting?.postMessage("skipWaiting");
		};

		const awaitStateChange = (): void => {
			reg.installing?.addEventListener("statechange", function () {
				if (this.state === "installed" && !isFirstVisit) {
					showUpdateButton();
				}
			});
		};
		if (reg === null) return;
		if (reg.waiting !== null) {
			showUpdateButton();
			return;
		}
		if (reg.installing !== null) awaitStateChange();
		reg.addEventListener("updatefound", awaitStateChange);
	}

	if (browser && "serviceWorker" in navigator) {
		let refreshing: boolean;
		const isFirstVisit = navigator.serviceWorker.controller === null; // no service worker yet?
		let reg = navigator.serviceWorker.register("./service-worker.js");

		navigator.serviceWorker.addEventListener("controllerchange", () => {
			if (refreshing) return; // prevent infinite reloads when debugging
			refreshing = true;
			window.location.reload();
		});

		void reg.then((registration) => listenForWaitingServiceWorker(registration, isFirstVisit));
	}
</script>

{#if isUpdatable}
	<div transition:scale class="flex-row">
		<span> Eine neue Version ist verfügbar! </span>
		<div class="flex-row">
			<button class="hoverable hoverable--visible hoverable--accent" onclick={updateFn}>
				Aktualisieren
			</button>
			<button class="hoverable hoverable--visible" onclick={() => void (isUpdatable = false)}>
				<IconClose />
			</button>
		</div>
	</div>
{/if}

<style>
	.flex-row {
		width: max-content;
		max-width: calc(100vw - 1.5rem);
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.hoverable--accent {
		padding: 0.5rem 1rem;
	}
</style>
