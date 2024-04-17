<script lang="ts" generics="T extends string | boolean | number">
	export let settingName: string;
	export let setting: T;
	type SettingInfo = T extends string
		? {
				type: "stringOptions";
				options: { value: T; name: string }[];
			}
		: T extends boolean
			? {
					type: "boolean";
				}
			: T extends number
				?
						| {
								type: "numberRange";
								min: T;
								max: T;
								step: number;
						  }
						| {
								type: "numberOptions";
								options: { value: T; name: string }[];
						  }
				: {
						type: "never";
					};
	export let settingInfo: SettingInfo;
</script>

<label class="flex-row">
	<span class="padded-top-bottom name">{settingName}</span>
	{#if settingInfo.type === "boolean" && typeof setting === "boolean"}
		<span class="flex-row">
			<input type="checkbox" role="switch" tabindex="0" bind:checked={setting} />
			<span class="toggle hoverable"></span>
		</span>
	{:else if settingInfo.type === "stringOptions" || settingInfo.type === "numberOptions"}
		<select class="padded-top-bottom hoverable" bind:value={setting}>
			{#each settingInfo.options as option}
				<option value={option.value}>
					{option.name}
				</option>
			{/each}
		</select>
	{:else if settingInfo.type === "numberRange"}
		<input
			type="number"
			min={settingInfo.min}
			max={settingInfo.max}
			step={settingInfo.step}
			bind:value={setting}
		/>
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
		height: 0;
		width: 0;
		visibility: hidden;
        margin: 0;
	}

	.toggle {
		cursor: pointer;
		width: 2rem;
		height: 1rem;
		background: transparent;
		display: block;
		border-radius: 100px;
		position: relative;
		border: 4px solid var(--foreground-color);
	}

	.toggle:hover {
		background-color: var(--foreground-color--opaque);
	}

	.toggle:after {
		content: "";
		display: flex;
		margin: 4px calc(100% - 1rem + 4px) 4px 4px;
		height: calc(1rem - 8px);
		background: var(--foreground-color);
		border-radius: 90px;
		transition:
			margin-left 0.4s var(--cubic-bezier),
			margin-right 0.4s var(--cubic-bezier) 0.1s,
			background-color .4s var(--cubic-bezier);
	}

	input:checked + .toggle {
		border-color: var(--accent-color);
	}

	input:checked + .toggle:after {
		margin: 4px 4px 4px calc(100% - 1rem + 4px);
		background-color: var(--accent-color);
		transition:
			margin-left 0.4s var(--cubic-bezier) 0.1s,
			margin-right 0.4s var(--cubic-bezier),
            background-color .4s var(--cubic-bezier);
	}
</style>
