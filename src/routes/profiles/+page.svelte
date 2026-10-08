<script lang="ts">
	import ProfileSelection from "$lib/components/profiles/ProfileSelection.svelte";
	import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
	<title>Vahrplan - {m.profiles()}</title>
	<meta name="title" content="Vahrplan - {m.profiles()}" />
	<meta name="description" content={m.profiles_intro()} />
</svelte:head>

<div class="content-wrapper" data-sveltekit-preload-data="off">
	<h1>{m.profiles()}</h1>
	<ProfileSelection />
</div>
