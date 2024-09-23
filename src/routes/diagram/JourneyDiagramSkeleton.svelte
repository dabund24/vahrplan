<script lang="ts">
	import Time from "$lib/components/Time.svelte";

	type Props = { depth: number };

	let { depth }: Props = $props();
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
		border-width: 1px calc(var(--line-width) / 2);
        border-color: transparent;
        border-style: solid;
		padding: 0 8px;
	}

	.diagram-element {
		width: calc(var(--connection-width) + 2 * var(--line-width));
		margin: 0 calc(-1 * var(--line-width));
		height: fit-content;
		border-radius: 50vh;
		padding: var(--line-width) 0;
		text-align: center;
		align-items: stretch;
		border: transparent var(--line-width) solid;
		box-sizing: border-box;
	}

	.legs {
		width: 100%;
		gap: var(--line-width);
		margin: 0;
	}

	.leg {
		width: 100%;
		flex: var(--duration);
		--border-color: var(--foreground-color--transparent);
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

	:global(:root[data-theme="dark"]) {
		.time {
			border-width: calc(var(--line-width) / 2);
		}
		.leg {
			border-width: calc(var(--line-width) / 2);
		}
	}

	@media (prefers-color-scheme: dark) {
		:global(:root[data-theme="system"]) {
			.time {
				border-width: calc(var(--line-width) / 2);
			}
			.leg {
				border-width: calc(var(--line-width) / 2);
			}
		}
	}
</style>
