<script lang="ts">
	import AccordionElement from "$lib/components/AccordionElement.svelte";
	import { PUBLIC_PAYPAL_LINK, PUBLIC_IMPRINT_EMAIL_ADDRESS } from "$env/static/public";
	import { version } from "$app/environment";
</script>

<svelte:head>
	<title>Vahrplan - Über</title>
	<meta name="title" content="Vahrplan - Über" />
	<meta name="description" content="Weiterführende Informationen über Vahrplan" />
</svelte:head>

<div class="content-wrapper">
	<h1>Über Vahrplan</h1>
	<h2>Name</h2>
	Vahrplan steht für
	<i
		><strong>V</strong>oll<strong>a</strong>utomatische <strong>H</strong>ilfe für
		<strong>R</strong>outen<strong>plan</strong>ung</i
	>.
	<h2>Historie</h2>
	Inspiration für Vahrplan war <a href="https://youtu.be/rD5iATcC9Mo">dieses tolle Video</a>, in
	dem (neben einigen allgemein sehr hilfreichen Tipps zur Reiseplanung bei Bahnfahrten) das
	Programm <a href="https://tespace.traines.eu/tstp">Tespace</a> vorgestellt wurde. In den Monaten
	danach habe ich mir einen anderen Ansatz für dasselbe Problem überlegt, um das Konzept etwas
	zugänglicher zu machen und dann schließlich im August 2023 mit dem Programmieren begonnen. Nach
	vielen Erweiterungen, Änderungen und sogar einem vollständigen Neuschreiben des Codes im
	Frühjahr 2024 konnte ich im September desselben Jahres Vahrplan endlich veröffentichen.
	<h2>Quellcode</h2>
	Der vollständige Quellcode für Vahrplan ist
	<a href="https://github.com/dabund24/vahrplan">auf Github</a>
	einsehbar.
	<h2>FAQ</h2>
	{#snippet tool(useCase: string, name: string, link: string)}
		<li>{useCase}: <a href={link}>{name}</a></li>
	{/snippet}
	<AccordionElement title="Lässt sich das Programm irgendwie als App installieren?">
		Ja. Vahrplan ist als sogenannte <a href="https://de.wikipedia.org/wiki/Progressive_Web_App"
			>Progressive Web App</a
		>
		verfügbar. Die Installation erfolgt über den Browser und ist nicht browserübergreifend einheitlich.
		Es handelt sich aber in der Regel um den Klick auf einen Button mit der Aufschrift
		<q>Zum Home-Bildschirm hinzufügen</q>
		oder <q>Installieren</q> im Browser-Menü.
	</AccordionElement>
	<AccordionElement title="Beim Teilen sind mir die Links zu lang. Geht das auch kürzer?">
		Ja. Aktiviere dafür in den <a href="/de/dbnav/settings">Einstellungen</a> unter
		<q>Generierung von Kurzlinks beim Teilen</q> die entsprechenden Optionen.
	</AccordionElement>
	<AccordionElement title="Wie kann ich meine Einstellungen sessionübergreifend behalten?">
		Wenn du in den <a href="/de/dbnav/settings">Einstellungen</a> unter
		<q>Dauerhaftes Speichern von Einstellungen</q> die Schalter aktivierst, sind die von dir gesetzten
		App-Einstellungen bzw. Verbindungsfilter auch in der nächsten Browser-Session noch verfügbar.
	</AccordionElement>
	<AccordionElement title="Was muss ich tun, wenn der Standortzugriff verweigert wird?">
		Erlaube deinem Browser den Zugriff auf den Standort. Dies kann in der Regel in den
		Systemeinstellungen getan werden.
	</AccordionElement>
	<AccordionElement title="Welche Tools/Bibliotheken/Frameworks verwendet Vahrplan?">
		<h2>Allgemeine Sachen</h2>
		<ul>
			{@render tool("Programmiersprache", "TypeScript", "https://www.typescriptlang.org/")}
			{@render tool("Meta-Framework", "SvelteKit", "https://kit.svelte.dev/")}
			{@render tool("Container-Virtualisierung", "Docker", "https://www.docker.com/")}
			{@render tool("Linter", "ESLint", "https://eslint.org/")}
			{@render tool("Code Formatter", "Prettier", "https://prettier.io/")}
		</ul>
		<h3>Backend</h3>
		<ul>
			{@render tool("Laufzeitumgebung", "Node.js", "https://nodejs.org/")}
			{@render tool("Nosql-Datenbank", "Valkey", "https://valkey.io/")}
			{@render tool(
				"Verbindungsdaten",
				"Hafas via db-vendo-client",
				"https://github.com/public-transport/db-vendo-client"
			)}
		</ul>
		<h3>Frontend</h3>
		<ul>
			{@render tool("Framework", "Svelte", "https://svelte.dev/")}
			{@render tool("Build-Tool", "Vite", "https://vitejs.dev/")}
			{@render tool("Karten-Bibliothek", "Leaflet", "https://leafletjs.com/")}
			{@render tool("Karten-Kacheln", "OpenStreetMap", "https://www.openstreetmap.org/")}
		</ul>
		<h3>Das Drumherum</h3>
		<ul>
			{@render tool("Cloud-Hosting", "Hetzner", "https://www.hetzner.com/cloud/")}
			{@render tool("Reverse-Proxy", "nginx", "https://nginx.org/")}
			{@render tool("Analytics", "Plausible (Communtiy Edition)", "https://plausible.io/")}
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
</style>
