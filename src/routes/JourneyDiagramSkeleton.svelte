<script lang="ts">
	import Time from "$lib/components/journeys/Time.svelte";

	export let depth: number;
</script>

<div class="flex-column skeleton">
	{#each { length: 12 } as _}
		<div class="flex-row">
			{#each { length: depth } as _}
				<div class="flex-row diagram-element">
					<span class="time">
						<Time time={{ departure: { time: new Date(0) } }} />
					</span>
					<span class="flex-row legs">
						{#each { length: Math.floor(Math.random() * 5) + 1 } as _}
							<span
								class="leg skeleton-text"
								style="--duration: {Math.random() * 2 + 2}"
							></span>
						{/each}
					</span>
					<span class="time">
						<Time time={{ arrival: { time: new Date(0) } }} />
					</span>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.skeleton {
		mask-image: linear-gradient(to bottom, #ffff, #0000);
	}

	.time {
		border: transparent solid 1px;
		padding: 0 8px;
	}

	.diagram-element {
		width: calc(var(--connection-width) + 2 * var(--line-width));
		margin: 0 calc(-1 * var(--line-width));
		height: fit-content;
		border-radius: 50vh;
		padding: 4px 0;
		text-align: center;
		align-items: stretch;
	}

	.legs {
		width: 100%;
		gap: var(--line-width);
		margin: 0;
	}

	.leg {
		container-type: inline-size;
		container-name: leg;
		width: 100%;
		flex: var(--duration);
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		--border-color: var(--foreground-color--opaque);
		border: var(--border-color) solid 1px;
		&:not(:first-child) {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		&:not(:last-child) {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	:global(:root[data-theme="dark"]) .time {
		border: transparent solid 2px;
	}
	:global(:root[data-theme="dark"]) .leg {
		border: var(--border-color) solid 2px;
	}
</style>
