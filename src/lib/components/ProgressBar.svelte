<script lang="ts">
	import { type LoadingStatus, loadingStatus } from "$lib/stores/loadingStore";

	let resetWidth = false;

	$: resetLoadingBar($loadingStatus);

	function resetLoadingBar(loadingStatus: LoadingStatus): void {
		if (loadingStatus.status === "loading") {
			resetWidth = true;
			setTimeout(() => (resetWidth = false), 100);
		}
	}
</script>

<div
	class="progress {$loadingStatus.status}"
	class:reset-width={resetWidth}
	style:--loading-est={$loadingStatus.status === "loading" ? $loadingStatus.estimatedDuration : 0}
	style:width={resetWidth ? 0 : ""}
></div>

<style>
	.progress {
		position: fixed;
		z-index: 10000;
		top: env(safe-area-inset-top);
		height: var(--line-width);
		border-radius: var(--border-radius--small);
		background-color: transparent;
		width: 100%;
		transition:
			width 0.4s var(--cubic-bezier),
			background-color 0.8s var(--cubic-bezier);
	}

	.loading {
		background-color: var(--accent-color);
		transition: width calc(1s * var(--loading-est)) var(--cubic-bezier);
		width: 80%;
	}

	.error {
        width: 0;
	}

	.reset-width {
		transition: none;
		width: 0;
	}
</style>
