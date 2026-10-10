<script lang="ts">
	import AccordionElement from "$lib/components/AccordionElement.svelte";
	import { PUBLIC_PAYPAL_LINK } from "$env/static/public";
	import { version } from "$app/environment";
	import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
	<title>Vahrplan - {m.about()}</title>
	<meta name="title" content="Vahrplan - {m.about()}" />
	<meta name="description" content={m.about_subtitle()} />
</svelte:head>

<div class="content-wrapper">
	<h1>{m.about()}</h1>
	<h2>{m.about_source_code()}</h2>
	<a class="hoverable hoverable--visible" href="https://github.com/dabund24/vahrplan">Github</a>
	<h2>FAQ</h2>
	{#snippet tool(useCase: string, name: string, link: string)}
		<li>{useCase}: <a href={link}>{name}</a></li>
	{/snippet}
	<AccordionElement title={m.about_q_idea()}>
		<p>
			{m.about_a_idea()}
		</p>
		<p>
			<a class="hoverable hoverable--visible" href="https://tespace.traines.eu">Tespace</a
			>&nbsp;<a
				class="hoverable hoverable--visible"
				href="https://www.youtube.com/watch?v=rD5iATcC9Mo">Video</a
			>
		</p>
	</AccordionElement>
	<AccordionElement title={m.about_q_short_links()}>
		<p>
			{m.about_a_short_links()}
		</p>
	</AccordionElement>
	<AccordionElement title={m.about_q_remember_settings()}>
		<p>
			{m.about_a_remember_settings()}
		</p>
	</AccordionElement>
	<AccordionElement title={m.about_q_dependencies()}>
		<p>
			{m.about_a_dependencies()}
		</p>
		<h3>{m.about_a_dependencies_public_transport_data()}</h3>
		<ul>
			{@render tool(
				m.about_a_dependencies_public_transport_data_routing(),
				"Motis",
				"https://github.com/motis-project/motis",
			)}
			{@render tool(
				m.about_a_dependencies_public_transport_data_raw_data_collection(),
				"Transitous",
				"https://transitous.org/",
			)}
			{@render tool(
				m.about_a_dependencies_public_transport_data_motis_parsing(),
				"motis-fptf-client",
				"https://github.com/motis-project/motis-fptf-client",
			)}
			{@render tool(
				m.about_a_dependencies_public_transport_data_proprietary_parsing(),
				"hafas-client",
				"https://github.com/public-transport/hafas-client",
			)}
		</ul>
		<h3>{m.about_a_dependencies_miscellaneous_tools()}</h3>
		<ul>
			{@render tool(
				m.about_a_dependencies_miscellaneous_tools_programming_language(),
				"TypeScript",
				"https://www.typescriptlang.org/",
			)}
			{@render tool(
				m.about_a_dependencies_miscellaneous_tools_meta_framework(),
				"SvelteKit",
				"https://kit.svelte.dev/",
			)}
			{@render tool(
				m.about_a_dependencies_miscellaneous_tools_containerization(),
				"Docker",
				"https://www.docker.com/",
			)}
			{@render tool(
				m.about_a_dependencies_miscellaneous_tools_linter(),
				"ESLint",
				"https://eslint.org/",
			)}
			{@render tool(
				m.about_a_dependencies_miscellaneous_tools_formatter(),
				"Prettier",
				"https://prettier.io/",
			)}
		</ul>
		<h3>{m.about_a_dependencies_backend()}</h3>
		<ul>
			{@render tool(
				m.about_a_dependencies_backend_js_runtime_environment(),
				"Node.js",
				"https://nodejs.org/",
			)}
			{@render tool(
				m.about_a_dependencies_backend_database(),
				"Valkey",
				"https://valkey.io/",
			)}
		</ul>
		<h3>{m.about_a_dependencies_frontend()}</h3>
		<ul>
			{@render tool(
				m.about_a_dependencies_frontend_build_tool(),
				"Vite",
				"https://vitejs.dev/",
			)}
			{@render tool(
				m.about_a_dependencies_frontend_map_library(),
				"Leaflet",
				"https://leafletjs.com/",
			)}
			{@render tool(
				m.about_a_dependencies_frontend_map_tiles(),
				"OpenStreetMap",
				"https://www.openstreetmap.org/",
			)}
		</ul>
		<h3>{m.about_a_dependencies_broader_level()}</h3>
		<ul>
			{@render tool(
				m.about_a_dependencies_broader_level_reverse_proxy(),
				"nginx",
				"https://nginx.org/",
			)}
			{@render tool(
				m.about_a_dependencies_broader_level_analytics(),
				"Plausible (Communtiy Edition)",
				"https://plausible.io/",
			)}
			{@render tool(
				m.about_a_dependencies_broader_level_mail_server(),
				"mailcow",
				"https://mailcow.email/",
			)}
		</ul>
	</AccordionElement>
	<AccordionElement title={m.about_q_support()}>
		<p>
			{m.about_a_support()}
		</p>
		<p>
			<a class="hoverable hoverable--visible" href={PUBLIC_PAYPAL_LINK}>Paypal</a>
		</p>
	</AccordionElement>
	<AccordionElement title={m.about_q_bug()}>
		<p>
			{m.about_a_bug()}
		</p>
		<p>
			<a
				href="https://github.com/dabund24/vahrplan/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
				class="hoverable hoverable--visible"
			>
				{m.about_a_bug_link()}
			</a>
		</p>
	</AccordionElement>
	<AccordionElement title={m.about_q_f()}>
		<p>
			{m.about_a_f()}
		</p>
	</AccordionElement>

	<footer class="flex-column">
		<small>Vahrplan {version}</small>
		<small>Daniel Bund, 2023-{new Date().getFullYear()}</small>
	</footer>
</div>

<style>
	ul {
		list-style: initial;
		padding-left: 1rem;
	}

	footer {
		align-items: center;
		margin-top: 1rem;
	}
	a {
		width: fit-content;
	}
</style>
