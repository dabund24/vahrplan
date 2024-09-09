<script lang="ts" generics="T extends string | boolean | number">
	type Props = {
		settingName: string;
		setting: T;
		settingInfo: SettingInfo;
	};
	type SettingInfo = T extends string | number
		? {
				type: "options";
				options: { value: T; name: string }[];
			}
		: T extends boolean
			? {
					type: "boolean";
				}
			: {
					type: "never";
				};

	let { settingName, setting = $bindable(), settingInfo }: Props = $props();
</script>

<label class="flex-row">
	<span class="name">{settingName}</span>
	{#if settingInfo.type === "boolean" && typeof setting === "boolean"}
		<input
			type="checkbox"
			role="switch"
			tabindex="0"
			name={settingName}
			bind:checked={setting}
		/>
	{:else if settingInfo.type === "options"}
		<select class="hoverable hoverable--visible" name={settingName} bind:value={setting}>
			{#each settingInfo.options as option}
				<option value={option.value}>
					{option.name}
				</option>
			{/each}
		</select>
	{/if}
</label>

<style>
	.flex-row {
		align-items: center;
		gap: 1rem;
		justify-content: space-between;
	}

	.flex-row:not(:last-child) {
		margin-bottom: var(--line-width);
	}

	.name {
		padding: calc(var(--line-width) + 0.5rem) 0;
	}

	/*
		switch css is inspired from here: https://codepen.io/mburnette/pen/LxNxNg
	 */

	input[type="checkbox"] {
		appearance: none;
		cursor: pointer;
		width: 2rem;
		height: 1rem;
		background: var(--foreground-color--very-transparent);
		border-radius: 50vh;
		position: relative;
		border: 4px solid var(--foreground-color);
		box-sizing: content-box;
		flex-shrink: 0;
	}

	input[type="checkbox"]:hover {
		background-color: var(--foreground-color--transparent);
	}

	input[type="checkbox"]:after {
		content: "";
		display: flex;
		margin: 4px calc(100% - 1rem + 4px) 4px 4px;
		height: calc(1rem - 8px);
		background: var(--foreground-color);
		border-radius: 90px;
		transition:
			margin-left 0.4s var(--cubic-bezier),
			margin-right 0.4s var(--cubic-bezier) 0.1s;
	}

	input:checked {
		border-color: var(--accent-color);
	}

	input:checked:after {
		margin: 4px 4px 4px calc(100% - 1rem + 4px);
		background-color: var(--accent-color);
		transition:
			margin-left 0.4s var(--cubic-bezier) 0.1s,
			margin-right 0.4s var(--cubic-bezier);
	}

	select {
		background: url('data:image/svg+xml;charset=UTF-8,<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"><polyline points="4,7 8,11, 12,7" stroke="black" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>')
			var(--foreground-color--very-transparent) no-repeat calc(100% - 0.5rem) 50%;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		padding: 0.5rem calc(1rem + 16px) 0.5rem 0.75rem;
		text-align-last: right;
		font-family: inherit;
	}
	select:focus-visible {
		outline: none;
		border: var(--line-width) solid var(--foreground-color--transparent);
		background-color: var(--foreground-color--transparent);
	}

	:global([data-theme="dark"]) select {
		background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"><polyline points="4,7 8,11, 12,7" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>');
	}

	@media (prefers-color-scheme: dark) {
		:global(:root:not([data-theme])) select, :global([data-theme="system"]) select {
			background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"><polyline points="4,7 8,11, 12,7" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>');
		}
	}

	option {
		background-color: var(--background-color);
	}
</style>
