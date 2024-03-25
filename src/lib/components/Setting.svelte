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
		<input type="checkbox" bind:checked={setting} />
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
	}
	.name {
		margin-right: auto;
	}
</style>
