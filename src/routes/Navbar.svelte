<script>
	import { page } from "$app/stores";
</script>

<nav>
	<ul>
		<li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
			<a href="/">Suche</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith("/blocks") ? "page" : undefined}>
			<a href="/journey/WyJUJEE9MUBPPUJhaG5ob2YsIEZyZWlzaW5nQEw9NjI1OTk1QGE9MTI4QCRBPTFATz1N%2FG5jaGVuLUZsdWdoYWZlbiBGbHVnaGFmZW4gQmVzdWNoZXJwYXJrLCBGcmVpc2luZ0BMPTYyNTY5NUBhPTEyOEAkMjAyNDAyMjIwNDAyJDIwMjQwMjIyMDQxNSRCdXMgIDYzNSQkMSQkJCQkJKdXJEE9MUBPPU38bmNoZW4tRmx1Z2hhZmVuIEZsdWdoYWZlbiBCZXN1Y2hlcnBhcmssIEZyZWlzaW5nQEw9NjI1Njk1QGE9MTI4QCRBPTFATz1N%2FG5jaGVuIEZsdWdoYWZlbiBCZXN1Y2hlcnBhcmtATD04MDA0MTY3QGE9MTI4QCQyMDI0MDIyMjA0MTUkMjAyNDAyMjIwNDIwJCQkMSQkJCQkJKdUJEE9MUBPPU38bmNoZW4gRmx1Z2hhZmVuIEJlc3VjaGVycGFya0BMPTgwMDQxNjdAYT0xMjhAJEE9MUBPPU38bmNoZW4gSGJmICh0aWVmKUBMPTgwOTgyNjNAYT0xMjhAJDIwMjQwMjIyMDQyNiQyMDI0MDIyMjA1MDMkUyAgICAgIDgkJDEkJCQkJCSnVyRBPTFATz1N%2FG5jaGVuIEhiZiAodGllZilATD04MDk4MjYzQGE9MTI4QCRBPTFATz1N%2FG5jaGVuIEhiZkBMPTgwMDAyNjFAYT0xMjhAJDIwMjQwMjIyMDUwMyQyMDI0MDIyMjA1MTMkJCQxJCQkJCQkp1QkQT0xQE89TfxuY2hlbiBIYmZATD04MDAwMjYxQGE9MTI4QCRBPTFATz1O%2FHJuYmVyZyBIYmZATD04MDAwMjg0QGE9MTI4QCQyMDI0MDIyMjA1MTQkMjAyNDAyMjIwNjI5JElDRSAgNjg0JCQxJCQkJCQkp1QkQT0xQE89TvxybmJlcmcgSGJmQEw9ODAwMDI4NEBhPTEyOEAkQT0xQE89SG9mIEhiZkBMPTgwMDI5MjRAYT0xMjhAJDIwMjQwMjIyMDYzNSQyMDI0MDIyMjA4MTckUkUgIDM0NDMkJDEkJCQkJCSnVCRBPTFATz1Ib2YgSGJmQEw9ODAwMjkyNEBhPTEyOEAkQT0xQE89UmVpY2hlbmJhY2goVm9ndGwpIG9iIEJmQEw9ODAxMjczOUBhPTEyOEAkMjAyNDAyMjIwODI3JDIwMjQwMjIyMDkxNiRSRSA3NDAxMSQkMSQkJCQkJCJd">Details</a>
		</li>
		<li aria-current={$page.url.pathname.startsWith("/map") ? "page" : undefined}>
			<a href="/">Karte</a>
		</li>
		<li aria-current={$page.url.pathname === "/settings" ? "page" : undefined}>
			<a href="/">Einstellungen</a>
		</li>
		<li aria-current={$page.url.pathname === "/about" ? "page" : undefined}>
			<a href="/">Über</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		position: fixed;
		bottom: 0;
        width: 100%;
        backdrop-filter: var(--blur);
        -webkit-backdrop-filter: var(--blur);
        background-color: var(--background-color--opaque);
        border-top: var(--border);
        z-index: 100;
    }
	ul {
		display: flex;
		padding: 0;
	}
	li {
        width: 100%;
		text-align: center;
	}
</style>