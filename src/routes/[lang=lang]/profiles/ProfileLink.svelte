<script lang="ts">
	import type { ProfileConfig } from "$lib/server/profiles/profile";
	import { page } from "$app/state";

	type Props = { profileConfig: ProfileConfig };
	const { profileConfig }: Props = $props();
</script>

<a href="/{page.data.lang}/{profileConfig.id}" class="hoverable hoverable--visible">
	{profileConfig.name} / <i>{profileConfig.id}</i>
</a>
