<script lang="ts" generics="T extends string | boolean | number">
	export let settingName: string;
	export let setting: T;
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
	export let settingInfo: SettingInfo;
</script>

<label class="flex-row">
	<span class="padded-top-bottom name">{settingName}</span>
	{#if settingInfo.type === "boolean" && typeof setting === "boolean"}
		<input type="checkbox" role="switch" tabindex="0" bind:checked={setting} />
	{:else if settingInfo.type === "options"}
		<select class="hoverable" bind:value={setting}>
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
		gap: 2rem;
	}
	.name {
		margin-right: auto;
	}
	/*
		switch css is inspired from here: https://codepen.io/mburnette/pen/LxNxNg
	 */

	input[type="checkbox"] {
		appearance: none;
		cursor: pointer;
		width: 2rem;
		height: 1rem;
		background: transparent;
		border-radius: 50vh;
		position: relative;
		border: 4px solid var(--foreground-color);
		box-sizing: content-box;
		flex-shrink: 0;
	}

	input[type="checkbox"]:hover {
		background-color: var(--foreground-color--opaque);
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
			margin-right 0.4s var(--cubic-bezier) 0.1s,
			background-color 0.4s var(--cubic-bezier);
	}

	input:checked {
		border-color: var(--accent-color);
	}

	input:checked:after {
		margin: 4px 4px 4px calc(100% - 1rem + 4px);
		background-color: var(--accent-color);
		transition:
			margin-left 0.4s var(--cubic-bezier) 0.1s,
			margin-right 0.4s var(--cubic-bezier),
			background-color 0.4s var(--cubic-bezier);
	}

	select {
		background: url('data:image/svg+xml;charset=UTF-8,<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"><polyline points="4,7 8,11, 12,7" stroke="black" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>')
			no-repeat calc(100% - 0.5rem) 50%;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		padding: 0.5rem calc(1rem + 16px) 0.5rem 0.5rem;
		text-align-last: right;
		font-family: inherit;
	}
	select:focus-visible {
		outline: none;
		border: var(--line-width) solid var(--foreground-color--opaque);
		background-color: var(--foreground-color--opaque);
	}

	:global([data-theme="dark"]) select {
		background-image: url('data:image/svg+xml;charset=UTF-8,<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"><polyline points="4,7 8,11, 12,7" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>');
	}

	option {
		background-color: var(--background-color);
	}
</style>
