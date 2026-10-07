<script lang="ts">
	import {
		PUBLIC_IMPRINT_TOWN,
		PUBLIC_IMPRINT_STREET,
		PUBLIC_IMPRINT_EMAIL_ADDRESS,
	} from "$env/static/public";
	import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
	<title>Vahrplan - {m.imprint()}</title>
	<meta name="title" content="Vahrplan - {m.imprint()}" />
	<meta name="robots" content="noindex,follow" />
</svelte:head>

<div class="content-wrapper">
	<h1>{m.imprint()}</h1>
	<p>
		Daniel Bund<br />
		{PUBLIC_IMPRINT_STREET}<br />
		{PUBLIC_IMPRINT_TOWN}
	</p>
	<p>
		{m.imprint_email()}: {PUBLIC_IMPRINT_EMAIL_ADDRESS}<br />
	</p>
</div>
