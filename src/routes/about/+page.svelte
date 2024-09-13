<script>
	import Header from "$lib/components/Header.svelte";
	import AccordionElement from "$lib/components/AccordionElement.svelte";
	import {
		PUBLIC_PAYPAL_LINK,
		PUBLIC_IMPRINT_EMAIL_ADDRESS,
		PUBLIC_VERSION
	} from "$env/static/public";
</script>

<svelte:head>
	<title>Vahrplan - Über</title>
	<meta name="title" content="Vahrplan - Über" />
	<meta name="description" content="Weiterführende Informationen über Vahrplan" />
</svelte:head>

<Header title={"Über diese Seite"} mobileOnly={true} />
<div class="content-wrapper">
	<h1>Name</h1>
	Vahrplan steht für
	<i
		><strong>V</strong>oll<strong>a</strong>utomatische <strong>H</strong>ilfe für
		<strong>R</strong>outen<strong>plan</strong>ung</i
	>.
	<h1>Historie</h1>
	Inspiration für Vahrplan war <a href="https://youtu.be/rD5iATcC9Mo">dieses tolle Video</a>, in
	dem (neben einigen allgemein sehr hilfreichen Tipps zur Reiseplanung bei Bahnfahrten) das
	Programm <a href="https://tespace.traines.eu/tstp">time-space-train-planner</a> vorgestellt
	wurde. In den Monaten danach habe ich mir einen anderen Ansatz für dasselbe Problem überlegt, um
	das Konzept etwas zugänglicher zu machen und dann schließlich im August 2023 mit dem
	Programmieren begonnen. Nach vielen Erweiterungen, Änderungen und sogar einem vollständigen
	Neuschreiben des Codes im Frühjahr 2024 konnte ich im September desselben Jahres Vahrplan
	endlich veröffentichen.
	<h1>Quellcode</h1>
	Der vollständige Quellcode für Vahrplan ist
	<a href="https://github.com/dabund24/vahrplan">auf Github</a>
	einsehbar.
	<h1>FAQ</h1>
	{#snippet tool(useCase, name, link)}
		<li>{useCase}: <a href={link}>{name}</a></li>
	{/snippet}
	<AccordionElement title="Lässt sich das Programm irgendwie als App installieren?">
		Ja. Vahrplan ist als sogenannte <a href="https://de.wikipedia.org/wiki/Progressive_Web_App"
			>Progressive Web App</a
		> verfügbar. Die Installation erfolgt über den Browser und ist nicht browserübergreifend einheitlich.
		Es handelt sich aber in der Regel um den Klick auf einen Button mit der Aufschrift "Zum Home-Bildschirm
		hinzufügen" oder "Installieren" im Browser-Menü.
	</AccordionElement>
	<AccordionElement title="Welche Tools/Bibliotheken/Frameworks verwendet Vahrplan?">
		<h2>Allgemeine Sachen</h2>
		<ul>
			{@render tool("Programmiersprache", "TypeScript", "https://www.typescriptlang.org/")}
			{@render tool("Meta-Framework", "SvelteKit", "https://kit.svelte.dev/")}
			{@render tool("Build-Tool", "Vite", "https://vitejs.dev/")}
			{@render tool("Linter", "ESLint", "https://eslint.org/")}
			{@render tool("Code Formatter", "Prettier", "https://prettier.io/")}
		</ul>
		<h2>Backend</h2>
		<ul>
			{@render tool("Laufzeitumgebung", "Node.js", "https://nodejs.org/")}
			{@render tool("Nosql-Datenbank", "Valkey", "https://valkey.io/")}
			{@render tool(
				"Verbindungsdaten",
				"Hafas via hafas-client",
				"https://github.com/public-transport/hafas-client"
			)}
		</ul>
		<h2>Frontend</h2>
		<ul>
			{@render tool("Framework", "Svelte", "https://svelte.dev/")}
			{@render tool("Karten-Bibliothek", "Leaflet", "https://leafletjs.com/")}
			{@render tool("Karten-Kacheln", "OpenStreetMap", "https://www.openstreetmap.org/")}
		</ul>
		<h2>Das Drumherum</h2>
		<ul>
			{@render tool("Cloud-Hosting", "Hetzner", "https://www.hetzner.com/cloud/")}
			{@render tool("Analytics", "Umami", "https://umami.is/")}
			{@render tool("Mail-Server", "mailcow", "https://mailcow.email/")}
		</ul>
	</AccordionElement>
	<AccordionElement title="Wie kann ich Vahrplan unterstützen?">
		Am besten kannst du Vahrplan unterstützen, indem du das Programm in deinem Freundeskreis und
		in deiner Familie weiterempfielst. Wenn du magst, kannst du auch gerne über <a
			href={PUBLIC_PAYPAL_LINK}>Paypal</a
		> eine Spende hinterlassen.
	</AccordionElement>
	<AccordionElement title="Ich habe einen Bug gefunden. Wo kann ich den melden?">
		Falls du glaubst, einen Fehler gefunden zu haben, würde ich mich darüber freuen, davon zu
		erfahren. Du kannst gerne ein <a
			href="https://github.com/dabund24/vahrplan/issues/new?assignees=&labels=&projects=&template=bug_report.md&title="
			>Issue auf Github aufmachen</a
		>
		oder mir alternativ
		<a href="mailto:{PUBLIC_IMPRINT_EMAIL_ADDRESS}">eine E-Mail schreiben</a>.
	</AccordionElement>

	<AccordionElement title="Fahrplan schreibt man mit F. Bist du dumm?">
		Wofür Vahrplan steht, ist ganz oben auf der Seite beschrieben. Ähnlichkeiten mit echten
		Wörtern sind rein zufällig.
	</AccordionElement>
	<div class="mobile-only">
		<h1>Rechtliches</h1>
		<ul>
			<li><a href="/about/privacy">Datenschutz</a></li>
			<li><a href="/about/imprint">Impressum</a></li>
		</ul>
	</div>

	<footer class="flex-column">
		<small>Vahrplan {PUBLIC_VERSION}</small>
		<small>Daniel Bund, 2023-2024</small>
	</footer>
</div>

<style>
	.content-wrapper {
		padding: 0.5rem 1rem;
	}

	h1 {
		font-size: 1.2rem;
	}

	h2 {
		font-size: 1.1rem;
	}

	ul {
		list-style: initial;
		padding-left: 1rem;
	}

	footer {
		align-items: center;
		margin-top: 1rem;
	}
</style>
